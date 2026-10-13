# El-Mizan background report job (Week 4 / A7)

This project moves El-Mizan's A6 message classification out of the HTTP request. `POST /reports` validates and queues a report, then answers with `202 Accepted`. Inngest waits durably for eight seconds, runs the existing A6 classifier if a provider key is configured, and updates a pollable report record. Without a model key, it returns an explicitly labelled demo result; it never claims that AI ran.

The Python lane uses FastAPI and Inngest. Inngest's official Python quick start uses an Inngest client, FastAPI `serve`, and the local Dev Server for this integration. [Inngest Python Quick Start](https://www.inngest.com/docs/getting-started/python-quick-start)

## Start locally

Python 3.10+ is required. Open two PowerShell windows in this folder.

**Window 1 — API:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
$env:INNGEST_SIGNING_KEY = "0123456789abcdef0123456789abcdef"
$env:INNGEST_DEV = "1"
uvicorn background_jobs:app --reload --port 8000
```

For a real AI classification, also set one provider key before starting the API:

```powershell
$env:LLM_PROVIDER = "gemini"
$env:GEMINI_API_KEY = "your-key"
```

Or use `LLM_PROVIDER="groq"` and `GROQ_API_KEY`. The existing A6 classifier enforces the output schema and chooses the next action in code. The job sets its nested provider retry count to zero; Inngest owns the job-level retries so model errors do not multiply into hidden retry loops.

**Window 2 — Inngest Dev Server:**

```powershell
npx inngest-cli@latest dev -u http://127.0.0.1:8000/api/inngest
```

Open `http://localhost:8288` to see functions and job runs. The real local successful and failure runs are recorded in [LIVE_RUN_PROOF.md](LIVE_RUN_PROOF.md). A dashboard screenshot and raw video have not been attached; capture them from a fresh run before uploading the final submission.

## API and background functions

| Route / function | Behavior |
| --- | --- |
| `GET /health` | API and configured-provider status; exposes no secret |
| `POST /reports` | Accepts `{"topic":"..."}`; returns `202`, report `id`, and `Location` immediately |
| `GET /reports/{id}` | Polls `pending`, `running`, `done`, or `failed` and includes result/error |
| `GET /reports` | Lists report status records |
| `POST /api/inngest` | Inngest's function communication endpoint |
| `say-hello` (`test/hello`) | Durable five-second sleep, then greeting |
| `make-report` (`report/requested`) | Durable eight-second sleep, then build report; two retries (three attempts maximum); concurrency limit two |
| `heartbeat` (`* * * * *`) | Logs pending/running/done/failed counts every minute |

Example submit and poll:

```powershell
$r = Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/reports -ContentType 'application/json' -Body '{"topic":"My Egyptian ID card was lost"}' -Headers @{'Idempotency-Key'='demo-001'}
$r
Invoke-RestMethod -Uri "http://127.0.0.1:8000/reports/$($r.id)"
```

The initial response is expected to contain `status: pending`; repeat the poll until the report is `done`. With no provider key, the completed `result.mode` is `demo`, `ai_classification` is `null`, and the note explicitly says AI was skipped. Set a key for an actual A6 classification. To exercise final failure, submit topic `fail`: the worker raises, Inngest retries twice, and `on_failure` marks the report failed and logs a privacy-safe alert. Set `ALERT_WEBHOOK_URL` to also send an alert to a webhook; webhook failure is logged.

## Reliability decisions and limits

- Event IDs are stable per report and the function's idempotency expression is the report ID. `Idempotency-Key` on the HTTP request returns the original report for an identical topic and returns `409` if reused with different content. The Inngest SDK supports function retries and idempotency; see [Python function configuration](https://www.inngest.com/docs/reference/python/functions/create) and [idempotency guidance](https://www.inngest.com/docs/durable-execution/guides-and-advanced/idempotency).
- API input is strict: exactly one non-empty `topic`, ≤2,000 characters and ≤8,192 body bytes. Invalid JSON/fields return `400`, body too large `413`, key conflict `409`, unknown report `404`, and unavailable queue `503`.
- The terminal-failure callback extracts the original event data, marks the report failed, and emits an alert without logging the topic. Inngest documents the failure event data and failure handler behavior [here](https://www.inngest.com/docs/reference/system-events/inngest-function-failed).
- **Known limitation:** report state and HTTP idempotency keys are held in process memory. Inngest retains durable function steps, but restarting this API loses previously stored result/status records. This is acceptable for the Week 4 learning MVP, not for production; replace the in-memory store with SQLite/Postgres before deployment.
- **Known limitation:** no API key is included. The no-key result is a demo and not legal guidance. Even with AI configured, El-Mizan only routes a narrow national-ID replacement request and does not determine legal rights or submit a government form.

## Tests

```powershell
python -m pip install -r requirements.txt
$env:INNGEST_SIGNING_KEY = "0123456789abcdef0123456789abcdef"
python -m unittest -v test_app
```

The ten tests cover health, missing topic/no enqueue, fast `202` and pending poll, idempotency and conflicting reuse, recovery from an ambiguous enqueue timeout, unknown ID, worker completion and durable sleep, retry-triggering failure, terminal failure/alert privacy, and A6 schema validation. Tests do not make live provider requests or claim to replace an Inngest Dev Server end-to-end capture.

## Assignment answers and capture checklist

- Daily at 8 AM: `0 8 * * *`.
- Every Sunday at 10 PM: `0 22 * * 0`.
- A concurrency limit of two is useful for controlling pressure on a rate-limited model provider and keeping local resource use bounded.
- Record one continuous, unedited screen capture (~2 minutes): show both terminal windows and the Inngest dashboard; submit a report; show the immediate `202` response; poll pending; wait for the job to finish; show the final result and corresponding Inngest run. Use a non-sensitive sample topic. Save the raw capture separately for upload to the assignment portal. Do not edit the clip or substitute a fabricated result.

