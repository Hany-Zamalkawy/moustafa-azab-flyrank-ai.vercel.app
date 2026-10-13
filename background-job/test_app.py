"""Local checks for the queued-report API and A6 model contract."""
from __future__ import annotations

import asyncio
import json
import unittest
from types import SimpleNamespace
from unittest.mock import AsyncMock, patch

from fastapi.testclient import TestClient

import app as classifier
import background_jobs as jobs
from report_store import IDEMPOTENCY_KEYS, REPORTS, REPORTS_LOCK


class FakeStep:
    def __init__(self):
        self.sleeps = []
        self.runs = []

    async def sleep(self, name, duration):
        self.sleeps.append((name, duration))

    async def run(self, name, callback):
        self.runs.append(name)
        result = callback()
        if hasattr(result, "__await__"):
            return await result
        return result


class BackgroundJobTests(unittest.TestCase):
    def setUp(self):
        with REPORTS_LOCK:
            REPORTS.clear()
            IDEMPOTENCY_KEYS.clear()
        self.client = TestClient(jobs.app)

    def test_health(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertIn("provider_configured", response.json())

    def test_missing_topic_is_400_without_enqueue(self):
        with patch.object(jobs.inngest_client, "send", new=AsyncMock()) as send:
            response = self.client.post("/reports", json={})
        self.assertEqual(response.status_code, 400)
        send.assert_not_awaited()

    def test_submit_returns_202_and_poll_is_pending(self):
        with patch.object(jobs.inngest_client, "send", new=AsyncMock(return_value=["evt"])):
            response = self.client.post("/reports", json={"topic": "lost national ID"})
        self.assertEqual(response.status_code, 202)
        self.assertEqual(response.json()["status"], "pending")
        self.assertEqual(response.headers["location"], f"/reports/{response.json()['id']}")
        poll = self.client.get(response.headers["location"])
        self.assertEqual(poll.status_code, 200)
        self.assertEqual(poll.json()["status"], "pending")

    def test_idempotency_reuses_job_and_rejects_conflicting_body(self):
        with patch.object(jobs.inngest_client, "send", new=AsyncMock(return_value=["evt"])) as send:
            first = self.client.post("/reports", json={"topic": "lost ID"}, headers={"Idempotency-Key": "one"})
            second = self.client.post("/reports", json={"topic": "lost ID"}, headers={"Idempotency-Key": "one"})
            conflict = self.client.post("/reports", json={"topic": "other"}, headers={"Idempotency-Key": "one"})
        self.assertEqual(first.json()["id"], second.json()["id"])
        self.assertEqual(send.await_count, 2)
        self.assertEqual(conflict.status_code, 409)

    def test_enqueue_retry_reuses_report_and_stable_event_id(self):
        async def send(event):
            if send.calls == 0:
                send.calls += 1
                raise TimeoutError("ambiguous enqueue result")
            send.ids.append(event.id)
            return ["evt"]
        send.calls = 0
        send.ids = []
        headers = {"Idempotency-Key": "recover-me"}
        with patch.object(jobs.inngest_client, "send", new=AsyncMock(side_effect=send)):
            failed = self.client.post("/reports", json={"topic": "retry submit"}, headers=headers)
            recovered = self.client.post("/reports", json={"topic": "retry submit"}, headers=headers)
        self.assertEqual(failed.status_code, 503)
        self.assertEqual(recovered.status_code, 202)
        self.assertEqual(failed.json()["id"], recovered.json()["id"])
        self.assertEqual(send.ids, [f"report-requested-{recovered.json()['id']}"])

    def test_unknown_report_is_404(self):
        self.assertEqual(self.client.get("/reports/not-a-real-id").status_code, 404)

    def test_worker_runs_durable_sleep_and_builds_demo_report(self):
        with patch.object(jobs, "provider_is_configured", return_value=False):
            report, _ = __import__("report_store").reserve_report("replace ID", None)
            step = FakeStep()
            ctx = SimpleNamespace(event=SimpleNamespace(data={"report_id": report["id"], "topic": "replace ID"}), step=step)
            result = asyncio.run(jobs.make_report_handler(ctx))
        self.assertEqual(step.sleeps, [("do-the-slow-work", "8s")])
        self.assertEqual(step.runs, ["mark-report-running", "build-report"])
        self.assertEqual(result["mode"], "demo")
        self.assertEqual(self.client.get(f"/reports/{report['id']}").json()["status"], "done")

    def test_fail_topic_raises_for_inngest_retry(self):
        report, _ = __import__("report_store").reserve_report("fail", None)
        step = FakeStep()
        ctx = SimpleNamespace(event=SimpleNamespace(data={"report_id": report["id"], "topic": "fail"}), step=step)
        with self.assertRaisesRegex(RuntimeError, "oven is broken"):
            asyncio.run(jobs.make_report_handler(ctx))

    def test_failure_callback_marks_failed_without_exposing_topic(self):
        report, _ = __import__("report_store").reserve_report("private topic text", None)
        data = {"event": {"data": {"report_id": report["id"], "topic": "private topic text"}}, "run_id": "run-1", "error": {"name": "RuntimeError"}}
        ctx = SimpleNamespace(event=SimpleNamespace(data=data))
        with self.assertLogs(jobs.LOGGER, level="ERROR") as captured:
            asyncio.run(jobs.report_failure_handler(ctx))
        self.assertEqual(self.client.get(f"/reports/{report['id']}").json()["status"], "failed")
        self.assertNotIn("private topic text", " ".join(captured.output))

    def test_a6_schema_rejects_invalid_confidence(self):
        bad = {"intent": "other", "confidence": 1.1, "language": "en", "reason": "bad"}
        with self.assertRaises(classifier.InvalidModelOutput):
            classifier._validate_model_answer(bad)


if __name__ == "__main__":
    unittest.main(verbosity=2)

