"""In-memory report state for the background-job learning project."""
from __future__ import annotations

from datetime import datetime, timezone
from threading import RLock
from typing import Any
from uuid import uuid4


REPORTS: dict[str, dict[str, Any]] = {}
IDEMPOTENCY_KEYS: dict[str, str] = {}
REPORTS_LOCK = RLock()


class IdempotencyConflict(ValueError):
    """An idempotency key was reused with different request content."""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def reserve_report(topic: str, idempotency_key: str | None) -> tuple[dict[str, Any], bool]:
    """Create one pending report or return the earlier report for a retry."""
    with REPORTS_LOCK:
        if idempotency_key and idempotency_key in IDEMPOTENCY_KEYS:
            existing = REPORTS[IDEMPOTENCY_KEYS[idempotency_key]]
            if existing["topic"] != topic:
                raise IdempotencyConflict("Idempotency-Key was already used for another topic.")
            return dict(existing), False

        report_id = uuid4().hex
        record = {
            "id": report_id,
            "topic": topic,
            "status": "pending",
            "result": None,
            "error": None,
            "created_at": _now(),
            "updated_at": _now(),
        }
        REPORTS[report_id] = record
        if idempotency_key:
            IDEMPOTENCY_KEYS[idempotency_key] = report_id
        return dict(record), True


def ensure_report(report_id: str, topic: str) -> dict[str, Any]:
    """Rehydrate missing process-local state from a durable event payload."""
    with REPORTS_LOCK:
        if report_id not in REPORTS:
            now = _now()
            REPORTS[report_id] = {
                "id": report_id, "topic": topic, "status": "pending",
                "result": None, "error": None, "created_at": now, "updated_at": now,
            }
        return dict(REPORTS[report_id])


def update_report(report_id: str, **changes: Any) -> dict[str, Any]:
    with REPORTS_LOCK:
        record = REPORTS[report_id]
        record.update(changes)
        record["updated_at"] = _now()
        return dict(record)


def get_report(report_id: str) -> dict[str, Any] | None:
    with REPORTS_LOCK:
        record = REPORTS.get(report_id)
        return dict(record) if record else None


def list_reports() -> list[dict[str, Any]]:
    with REPORTS_LOCK:
        return [dict(record) for record in REPORTS.values()]


def report_counts() -> dict[str, int]:
    counts = {"pending": 0, "running": 0, "done": 0, "failed": 0}
    with REPORTS_LOCK:
        for record in REPORTS.values():
            status = record["status"]
            if status in counts:
                counts[status] += 1
    return counts

