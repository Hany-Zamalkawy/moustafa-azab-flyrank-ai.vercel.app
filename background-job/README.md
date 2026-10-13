# El-Mizan background job (A7)

Stage 0: narrow the job before adding the worker. The A6 classifier will run as a background report task: accept a topic, return an ID immediately, and let the user poll for its result.

Planned implementation: FastAPI + Inngest, one durable worker, a status endpoint, failure retries, idempotency, and a heartbeat. See the staged commits for the build progression.
