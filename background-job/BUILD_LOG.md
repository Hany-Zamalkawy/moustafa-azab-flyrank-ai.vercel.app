# Build log

## 2026-10-13 - first implementation

- The full-assignment PDF referred to in the request was not present in the project mirror. The `sources/` folder was empty, and no API scaffold was present. Implemented against the requirements pasted in chat and El-Mizan project context.
- Chose one binary-ish classifier: national ID lost/damaged replacement vs. other. Model confidence below 0.65 triggers human review. This keeps the model's scope narrow and makes the downstream action deterministic in code.
- Selected a dependency-free Python HTTP server to avoid requiring package installs or network access for local verification. Added Gemini and Groq provider adapters with schema-constrained JSON requests.
- Added exact-key/type/range validation after the model response. The model cannot choose the service URL or routing action; code makes those decisions locally.
- Retry plan: timeout/network, HTTP 408/429, and 5xx retry within a capped attempt budget. Other 4xx and schema failures stop immediately. Request timeout defaults to 8 seconds.
- Added eight standard-library tests with mocked model output; these tests do not claim live provider success. A real provider run still requires a user API key.

## 2026-10-13 - verification iteration

- First test run was blocked by the sandbox denying localhost sockets. Reran the local-only suite with authorization outside the sandbox.
- The first permitted run exposed a test double that raised a raw URL error outside the provider wrapper. Corrected the mock to match the production provider error contract.
- That run also showed malformed provider JSON was being retried through the generic provider-failure branch. Changed retry handling so malformed output and non-retryable 4xx stop immediately; only connection/timeouts, 408/429, and 5xx consume the retry budget.
- Final run: all 8 tests passed. They cover Arabic/English supported messages, an out-of-scope request, a low-confidence result, blank input, malformed JSON, oversized input, transient retry success, and stopping on permanent errors/invalid output.
- No live LLM request was made because no provider key was supplied. The end-to-end HTTP route was exercised locally using mocked model outputs.

## 2026-10-13 - A7 background-job iteration

- Added FastAPI + Inngest around the existing A6 classifier. The first submit path is deliberately narrow: one `topic`, one report ID, one 202 response, and one status resource.
- Installed FastAPI/Inngest dependencies in a disposable local package directory. The first import exposed that this SDK version requires `inngest.Concurrency(limit=2)` (a list), not an integer. Updated the function configuration to the SDK's actual type.
- The first local test attempt stalled while Windows Python tried to create an asyncio socket pair in the restricted sandbox. Re-ran with the authorized local test execution; async tests then ran normally. An early import also showed the local test process needs an `INNGEST_SIGNING_KEY`; tests and README now set a dummy local-only key.
- The initial worker callback passed synchronous lambdas to `step.run`. Changed them to async callbacks as required by the Python async worker model.
- Added a real failure case (`topic="fail"`) for Inngest to retry, with terminal failure state and an optional webhook alert. Alert log payload omits the user's topic. No alert is sent unless a webhook URL is configured.
- Added HTTP-level idempotency and an enqueue-timeout recovery case. On retry with the same key, the request reuses the same report and stable Inngest event ID; it does not erase state after an ambiguous send timeout.
- Cut automatic always-on model calls: no provider credential was available, so local runs honestly produce a `mode="demo"` result. With a configured key, the background step calls the existing A6 classifier and delegates retry attempts to Inngest.
- Known design cut: report state remains process-memory-only to keep the Week 4 learning MVP small. Inngest job steps are durable, but status/result state will be lost on API restart. A database is needed before deployment.
- Verification so far: all 10 local API/worker unit tests passed (no live model or Inngest service was involved). A real Dev Server end-to-end run, dashboard screenshot, and raw two-minute capture are still to be recorded by launching the two documented local processes; none has been fabricated.

