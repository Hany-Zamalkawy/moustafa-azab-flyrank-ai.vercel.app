# Branchline build log

This is an incremental record of the Week 7 visual AI workflow build. It records the actual issues found while implementing the assignment rather than claiming tests or live model calls that have not happened.

## 2026-10-13 — initial build

- Read the supplied task brief. The project mirror has prior El-Mizan work, but no FL-06 platform selection for this new workflow task. Chose a React/Vite frontend because the brief explicitly requires React Flow. Recorded the missing-selection assumption in README.
- Set up React Flow, Inngest, OpenAI, Express, Tailwind CSS v4, and Shadcn configuration. Used a separate app folder (`ai-yes-no-workflow`) rather than changing the existing portfolio or El-Mizan API projects.
- Added a three-decision sample graph, prompt editor, YES/NO source handles, one-start/one-incoming branch validation, browser-local auto-save, JSON import/export, execution status/log panel, and error feedback.
- Added an Express API that queues runs with Inngest. Each visited decision calls an Inngest step, the current result chooses the matching YES/NO edge, and traversal ends when that branch has no destination. Runs have idempotency keyed by run ID and two retries.
- Implemented an OpenAI structured JSON output path. No API key was provided, so the local default is an explicitly named deterministic demo path; no live OpenAI result is claimed.

## Iteration observed during setup

- The first package install had no terminal output for a while; retrying with network access completed. It resolved current packages including Inngest 4.x and TypeScript 7, not the older versions initially assumed in the first manifest.
- First TypeScript build failed: Inngest 4 uses `triggers` in the function options (not the old second trigger argument), the CORS type package was absent, and TypeScript did not know the `@/` source alias. Updated the Inngest function registration, installed `@types/cors`, and configured the alias.
- TypeScript 7 then rejected `baseUrl`, which it has removed. Replaced it with relative `paths` aliases. A final nullable decision diagnostic was fixed with optional handling.
- Reviewing the initial demo classifier showed that matching the prompt and message together could make an “urgent?” question always answer YES because “urgent” appears in the prompt. Changed the demo classifier to match message terms relevant to each prompt category. This is still a clearly labelled local simulation, not model judgement.

## Not yet demonstrated

- The first Inngest startup showed repeated “cloud mode” warnings because `INNGEST_DEV` was not set. Updated the `dev` script to pass `--dev`, which enables that flag before the client is created, and restarted the API.
- The first Shadcn CLI install reported seven high-severity advisories in its toolchain. Replaced the CLI dependency with the audit-recommended `shadcn@1.0.0`; npm then reported zero vulnerabilities. The runtime React app still builds with this config.
- Final build verification after the dependency adjustment: `npm run build` passed TypeScript checking and Vite production bundling (2,067 modules transformed).
- Local service checks returned HTTP 200 for the React page, API health, and Inngest dashboard.
- Final end-to-end sample run through the running Inngest Dev Server returned `202` queued, then `completed` in demo mode. Run ID `20f26825-5546-40a9-9eb9-507664185590` visited `Support request? → YES`, then `Urgent issue? → NO` (two durable steps) and ended with no further connected branch.
- The OpenAI path requires the user to supply a key and was not called during this build.
- A continuous, raw screen capture has not been made. Record it locally after the three local processes work; do not describe a capture as attached when it is not.

## 2026-10-13 — documentation and final-package preparation

- Expanded README for the final documentation checkpoint: audience/use case, an API example, architecture diagram, exact observed verification evidence, limitations, and an AI-use disclosure.
- Added a 3–5 minute live-demo run-of-show that identifies the current demo-mode limitation and leaves the recording action to the author.
- Added a 601-word retrospective draft and a submission index. The index marks the demo upload, hours log, site/post URL, and human sign-off as incomplete because no evidence for those actions exists in this workspace.
- No formal v2 evaluation suite was found. Kept the observed smoke run separate from model-quality claims and did not invent a scorecard.
