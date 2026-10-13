# Local end-to-end run proof

Run date: 2026-10-13 (Africa/Cairo), local Inngest Dev Server v1.46.0, no LLM provider key configured.

## Successful report

- `POST /reports` returned **202 Accepted** immediately with `{"id":"c394aefc28cb443db7ba50960c76c8a3","status":"pending"}`.
- The local Inngest Dev Server logged the `report/requested` event and started `make-report`.
- After the durable 8-second wait, `GET /reports/c394aefc28cb443db7ba50960c76c8a3` returned status `done` at 15:26:52 +03:00.
- The result used `mode: demo`, set `ai_classification: null`, and explicitly reported that AI was skipped because no provider key was configured. This proves the background loop, not a live model result.

## Retry/failure path

- `POST /reports` with topic `fail` returned 202 and report ID `a0fb735507254eb3b7823fefd5e5c52d`.
- Inngest retried the worker according to `retries=2` (up to three attempts total).
- The status endpoint returned `failed` at 15:28:33 +03:00 with `The report failed after all retries.` The failure callback emitted a privacy-safe alert.

## Evidence still to add for submission

The above is test evidence transcribed from actual local process output. No screenshot or raw video is attached. Before submission, make one unedited ~2-minute desktop capture following the README checklist and include the Inngest dashboard function run. Keep the AI-key absence visible or set a provider key and repeat the run if the grader specifically expects live AI classification.

