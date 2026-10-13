"""FastAPI + Inngest API for asynchronous El-Mizan classification reports."""
from __future__ import annotations

import asyncio
import json
import logging
import os
from typing import Any
from urllib.request import Request, urlopen

import inngest
import inngest.fast_api
from fastapi import FastAPI, HTTPException, Request as FastAPIRequest
from fastapi.responses import JSONResponse

import app as classifier
from report_store import (
    IdempotencyConflict,
    ensure_report,
    get_report,
    list_reports,
    report_counts,
    reserve_report,
    update_report,
)


LOGGER = logging.getLogger("report-api")
MAX_BODY_BYTES = 8192
MAX_TOPIC_CHARS = 2000

inngest_client = inngest.Inngest(app_id="report-api", logger=logging.getLogger("uvicorn"))
app = FastAPI(title="El-Mizan Background Report API", version="1.0.0")


def provider_is_configured() -> bool:
    provider = os.getenv("LLM_PROVIDER", "gemini").strip().lower()
    key_name = {"gemini": "GEMINI_API_KEY", "groq": "GROQ_API_KEY"}.get(provider)
    return bool(key_name and os.getenv(key_name, "").strip())


def make_demo_report(topic: str) -> dict[str, Any]:
    """Return an honest local demo result when no AI key is configured."""
    return {
        "mode": "demo",
        "summary": f"Background report created for topic: {topic}",
        "ai_classification": None,
        "note": "AI was skipped because no provider key is configured.",
    }


async def _build_report(report_id: str, topic: str) -> dict[str, Any]:
    if topic.strip().lower() == "fail":
        raise RuntimeError("The report oven is broken!")

    if provider_is_configured():
        classification = await asyncio.to_thread(
            classifier.classify_text, topic, provider_retries=0
        )
        result = {
            "mode": "ai",
            "summary": "The request was classified by the configured model.",
            "ai_classification": classification,
        }
    else:
        result = make_demo_report(topic)

    update_report(report_id, status="done", result=result, error=None)
    return result


async def make_report_handler(ctx: inngest.Context) -> dict[str, Any]:
    """Durable worker: wait, run A6 classification (when configured), save result."""
    report_id = str(ctx.event.data.get("report_id", ""))
    topic = str(ctx.event.data.get("topic", ""))
    if not report_id or not topic:
        raise ValueError("report_id and topic are required in report/requested events")

    existing = ensure_report(report_id, topic)
    if existing["status"] == "done":
        return existing["result"]
    if existing["status"] == "failed":
        return {"status": "failed", "report_id": report_id}

    await ctx.step.sleep("do-the-slow-work", "8s")

    async def mark_running() -> dict[str, Any]:
        return update_report(report_id, status="running")

    async def build_report() -> dict[str, Any]:
        return await _build_report(report_id, topic)

    await ctx.step.run("mark-report-running", mark_running)
    return await ctx.step.run("build-report", build_report)


def _original_event_from_failure(ctx: inngest.Context) -> dict[str, Any]:
    payload = ctx.event.data.get("event", {})
    if isinstance(payload, str):
        try:
            payload = json.loads(payload)
        except json.JSONDecodeError:
            return {}
    return payload if isinstance(payload, dict) else {}


def _post_alert(url: str, payload: dict[str, str]) -> None:
    body = json.dumps(payload).encode("utf-8")
    request = Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
    with urlopen(request, timeout=4) as response:
        response.read(256)


async def report_failure_handler(ctx: inngest.Context) -> None:
    """Record terminal failure and emit a privacy-safe log/webhook alert."""
    failure = ctx.event.data
    original_event = _original_event_from_failure(ctx)
    original_data = original_event.get("data", {}) if isinstance(original_event, dict) else {}
    report_id = original_data.get("report_id") if isinstance(original_data, dict) else None
    error = failure.get("error", {}) if isinstance(failure, dict) else {}
    if report_id:
        ensure_report(str(report_id), str(original_data.get("topic", "")))
        update_report(str(report_id), status="failed", error="The report failed after all retries.")

    run_id = str(failure.get("run_id", "unknown")) if isinstance(failure, dict) else "unknown"
    error_name = str(error.get("name", "Error")) if isinstance(error, dict) else "Error"
    alert = {
        "text": f"[ALERT] make-report failed after retries; report_id={report_id or 'unknown'}; run_id={run_id}; error={error_name}"
    }
    LOGGER.error(alert["text"])
    webhook = os.getenv("ALERT_WEBHOOK_URL", "").strip()
    if webhook:
        try:
            await asyncio.to_thread(_post_alert, webhook, alert)
        except Exception as exc:
            LOGGER.error("Failure alert webhook could not be delivered (%s).", type(exc).__name__)


async def hello_handler(ctx: inngest.Context) -> str:
    await ctx.step.sleep("hello-five-seconds", "5s")
    return "Hello from the background!"


async def heartbeat_handler(ctx: inngest.Context) -> dict[str, int]:
    counts = report_counts()
    LOGGER.info("HEARTBEAT pending=%d running=%d done=%d failed=%d", counts["pending"], counts["running"], counts["done"], counts["failed"])
    return counts


say_hello = inngest_client.create_function(
    fn_id="say-hello",
    trigger=inngest.TriggerEvent(event="test/hello"),
)(hello_handler)

make_report = inngest_client.create_function(
    fn_id="make-report",
    trigger=inngest.TriggerEvent(event="report/requested"),
    retries=2,
    concurrency=[inngest.Concurrency(limit=2)],
    idempotency="event.data.report_id",
    on_failure=report_failure_handler,
)(make_report_handler)

heartbeat = inngest_client.create_function(
    fn_id="heartbeat",
    trigger=inngest.TriggerCron(cron="* * * * *"),
)(heartbeat_handler)

FUNCTIONS = [say_hello, make_report, heartbeat]
inngest.fast_api.serve(app, inngest_client, FUNCTIONS)


@app.get("/health")
async def health() -> dict[str, Any]:
    return {"status": "ok", "provider_configured": provider_is_configured()}


async def _read_report_request(request: FastAPIRequest) -> tuple[str, str | None]:
    raw = await request.body()
    if len(raw) > MAX_BODY_BYTES:
        raise HTTPException(status_code=413, detail="Request body exceeds 8192 bytes.")
    try:
        payload = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=400, detail="Body must be valid UTF-8 JSON.") from exc
    if not isinstance(payload, dict) or set(payload) != {"topic"}:
        raise HTTPException(status_code=400, detail="Body must contain only a topic field.")
    topic = payload["topic"]
    if not isinstance(topic, str) or not topic.strip() or len(topic) > MAX_TOPIC_CHARS:
        raise HTTPException(status_code=400, detail="topic must be a non-empty string up to 2000 characters.")
    key = request.headers.get("Idempotency-Key")
    if key is not None and (not 1 <= len(key) <= 128 or not key.isprintable()):
        raise HTTPException(status_code=400, detail="Idempotency-Key must be 1-128 printable characters.")
    return topic.strip(), key


@app.post("/reports", status_code=202)
async def create_report(request: FastAPIRequest) -> JSONResponse:
    topic, idempotency_key = await _read_report_request(request)
    try:
        report, created = reserve_report(topic, idempotency_key)
    except IdempotencyConflict as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc

    # A repeated request with an idempotency key safely re-sends the same
    # stable event ID. This recovers from an ambiguous enqueue timeout without
    # creating a second report; Inngest deduplicates the event ID.
    if created or idempotency_key:
        try:
            await inngest_client.send(inngest.Event(
                id=f"report-requested-{report['id']}",
                name="report/requested",
                data={"report_id": report["id"], "topic": report["topic"]},
            ))
        except Exception as exc:
            LOGGER.error("Could not enqueue report (%s).", type(exc).__name__)
            return JSONResponse(
                status_code=503,
                headers={"Location": f"/reports/{report['id']}", "Retry-After": "2"},
                content={"id": report["id"], "status": report["status"], "error": "Queue unavailable; retry with the same Idempotency-Key."},
            )

    return JSONResponse(
        status_code=202,
        headers={"Location": f"/reports/{report['id']}", "Retry-After": "2"},
        content={"id": report["id"], "status": report["status"]},
    )


@app.get("/reports")
async def reports_index() -> list[dict[str, Any]]:
    return list_reports()


@app.get("/reports/{report_id}")
async def report_status(report_id: str) -> dict[str, Any]:
    report = get_report(report_id)
    if report is None:
        raise HTTPException(status_code=404, detail="Report not found.")
    return report

