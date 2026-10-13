# Branchline — Visual AI Workflow Studio

Branchline is a small React application for building a graph of YES/NO AI decisions. It uses React Flow for editing and visualization, an Express API to validate and queue runs, Inngest for durable step execution, and the OpenAI SDK with a strict JSON schema for each model decision.

## Run locally

Requirements: Node.js 20.19+ (or 22.12+) and npm. Install packages once:

```bash
npm install
```

Copy `.env.example` to `.env`. The app starts in clearly labelled **demo mode** unless `OPENAI_API_KEY` is set and `DEMO_MODE=false`. For actual model decisions, edit `.env`:

```dotenv
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
DEMO_MODE=false
PORT=3001
```

Open three terminals from this folder:

```bash
npm run dev          # Express API and Inngest function endpoint at :3001 (enables INNGEST_DEV)
npm run dev:inngest  # Inngest Dev Server, connected to the endpoint above
npm run dev:web      # Vite frontend at http://localhost:5173
```

The Inngest Dev Server UI is normally at `http://localhost:8288`. The exact address is printed in its terminal output.

## Try the workflow

The starter graph asks whether a message is support-related. YES leads to an urgency check; NO leads to a sales check. Select a node to edit its title or prompt. Drag from its green YES or gray NO handle to another node. Type a message in **Test input** and choose **Run workflow**. Follow the live run log and node/edge state; a path ends when its selected branch has no next node.

Each visited node is one durable Inngest `step.run`. The model is asked for a strict JSON object containing `decision: "YES" | "NO"`; API-side validation rejects any other shape/value. Inngest retries failed jobs twice and uses the run ID for idempotency; after retries, the run is marked failed and the UI identifies the failed node. Edit state auto-saves in the browser. The toolbar supports workflow JSON import/export.

### Demo mode

Demo mode uses a deterministic, keyword-based local decision function so the event queue, traversal, status polling, execution log, and visual state can be exercised without an API key. The UI and each run explicitly label this `DEMO`; it is not a model call and does not validate OpenAI connectivity. Use a real key with `DEMO_MODE=false` to exercise the OpenAI path. Do not put keys in frontend code or commit `.env`.

## API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Check backend and report OpenAI or demo mode |
| `POST /api/run` | Validate graph, emit an Inngest event, return `202` with run ID |
| `GET /api/runs/:runId` | Poll queued/running/completed run state and decision log |
| `GET /api/inngest` | Inngest function registration and event execution endpoint |

## Project structure

```text
src/App.tsx                 React Flow editor, inspector, run log
src/components/             Custom decision node and Shadcn UI primitives
server.ts                   Express API, OpenAI structured output, Inngest worker
components.json             Shadcn UI configuration; Shadcn CLI is a dev dependency
vite.config.ts              React, Tailwind CSS v4, aliases, API proxy
.env.example                Environment variable template
```

## Current scope and limitations

- Single starting node; one incoming edge per decision; one destination per YES/NO output. The server rejects malformed or cyclic runs. Graph size is capped at 30 decisions.
- Run status is held in process memory for this learning MVP. It is lost if the API process restarts; use a persistent database before deployment.
- API keys are not included. Local demo mode is not evidence of an OpenAI call.
- This brief did not provide the FL-06 platform choice; React/Vite was selected because the assignment specifically requires React Flow. This is a recorded platform assumption, not a claim that it matches the missing FL-06 selection.

## Verify

```bash
npm run build
```

For an end-to-end live run, start all three processes, use a sample message, show the immediate run ID and the Inngest Dev Server function execution, then leave the recording unedited. The repository does not include or claim a screen recording.
