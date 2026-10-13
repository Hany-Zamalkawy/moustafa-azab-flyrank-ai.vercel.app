# Branchline live demo script (3–5 minutes)

This is a run-of-show, not a recording. Record the running application continuously with narration; do not use slides or edit the result. The current verified setup has no OpenAI key, so it runs in **DEMO** mode. Say that clearly before interpreting the outcome. If recording a live OpenAI run instead, configure a private key, set `DEMO_MODE=false`, restart the API, and confirm `/api/health` reports `openai` first.

## Before recording (off camera)

1. From this folder, run `npm install` if dependencies are not installed.
2. Start three terminals with `npm run dev`, `npm run dev:inngest`, and `npm run dev:web`.
3. Open `http://localhost:5173` and the Inngest dashboard at `http://localhost:8288`.
4. Confirm the sample graph is visible and the UI shows its active mode. Do not show a secret key.

## Continuous recording outline

| Time | On screen | Narration and action |
| --- | --- | --- |
| 0:00–0:35 | Editor and sample graph | “This is Branchline, a visual YES/NO decision workflow. I’ll show a message entering a support decision, then how the answer selects the next connected node. This run is in deterministic demo mode because I have not configured a model key; it demonstrates the job and routing loop, not LLM quality.” |
| 0:35–1:15 | Select first node; show prompt and branch handles | Explain why the prompt is on the node and how its green YES and gray NO handles make the route visible. Optionally edit a prompt in the UI and explain that the graph is saved in this browser. Avoid manually editing files during the run. |
| 1:15–2:20 | Enter `The checkout page crashes when I try to pay.` and click Run | Narrate that the editor submits the graph and input; the API checks one start node, valid connections and loops, then answers `202` with a run ID while Inngest works in the background. Show the status/log panel updating. |
| 2:20–3:05 | Inngest dashboard and back to editor | Show the Inngest function run, then the ordered decisions and highlighted path in the editor. Explain that each reached decision is an Inngest step and its YES/NO result selects an edge. Mention retries and run-ID idempotency as reliability choices. |
| 3:05–3:45 | Point out limitation in README or UI | “One limitation is that this MVP keeps run status in API process memory. Restarting the API loses status records, so I would add a database before deploying this for real users. Also, today’s run is demo mode; the OpenAI path still needs a configured key and its quality has not been evaluated.” |
| 3:45–4:10 | Show final completed state, then finish | Summarize what worked end to end and stop the recording only after the final status is visible. Keep the raw capture unedited. |

## After recording

Watch enough of the raw file to confirm audio, the complete request-to-result loop, and the disclosed limitation. Upload the original file to the showcase thread and add its share URL to `SUBMISSION_INDEX.md`. No video link is recorded in this repository yet.
