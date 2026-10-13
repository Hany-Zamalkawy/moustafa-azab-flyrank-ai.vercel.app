import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { Inngest } from "inngest";
import { serve } from "inngest/express";
import { randomUUID } from "node:crypto";
import type { GraphPayload, RunState, WorkflowLog } from "./src/types.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);
if (process.argv.includes("--dev")) process.env.INNGEST_DEV = "1";
const demoMode = (process.env.DEMO_MODE ?? (!process.env.OPENAI_API_KEY ? "true" : "false")).toLowerCase() === "true";
const mode: "demo" | "openai" = demoMode ? "demo" : "openai";
const inngest = new Inngest({ id: "branchline-ai-workflow" });
const runs = new Map<string, RunState>();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "demo-key-unused" });

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json({ limit: "1mb" }));

type Decision = "YES" | "NO";
type JobEvent = { runId: string; input: string; graph: GraphPayload };
const decisionSchema = {
  type: "object",
  properties: { decision: { type: "string", enum: ["YES", "NO"] } },
  required: ["decision"],
  additionalProperties: false,
} as const;

async function askOpenAI(prompt: string, input: string): Promise<Decision> {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required when DEMO_MODE=false.");
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0,
    response_format: { type: "json_schema", json_schema: { name: "binary_decision", strict: true, schema: decisionSchema } },
    messages: [
      { role: "system", content: "You are one step in a workflow. Answer the user's message against the given decision question. Return exactly the required JSON schema; decide YES only when the evidence supports yes, otherwise NO." },
      { role: "user", content: `Decision question: ${prompt}\n\nMessage to evaluate: ${input}` },
    ],
  });
  const raw = response.choices[0]?.message.content;
  if (!raw) throw new Error("The model returned an empty decision.");
  const parsed = JSON.parse(raw) as { decision?: unknown };
  if (parsed.decision !== "YES" && parsed.decision !== "NO") throw new Error("Model output failed the YES/NO schema check.");
  return parsed.decision;
}

function demoDecision(prompt: string, input: string): Decision {
  const question = prompt.toLowerCase();
  const message = input.toLowerCase();
  const negation = /\b(no|not|never|isn't|aren't|without)\b/;
  if (/(urgent|outage|safety)/.test(question)) return /\b(urgent|outage|safety|danger|emergency)\b/.test(message) ? "YES" : "NO";
  if (/(sales|price|pricing|buy|purchase|plan)/.test(question)) return /\b(price|pricing|buy|purchase|plan|sales|cost|quote)\b/.test(message) ? "YES" : "NO";
  if (/(support|help|problem|issue|product|service)/.test(question)) return /\b(support|help|problem|issue|can't|cannot|broken|error|billing|refund|charged|account|login|log in|crash)\b/.test(message) && !negation.test(message) ? "YES" : "NO";
  return /\b(yes|true|correct|contains|does|is)\b/.test(message) ? "YES" : "NO";
}

async function classify(prompt: string, input: string): Promise<Decision> {
  return mode === "demo" ? demoDecision(prompt, input) : askOpenAI(prompt, input);
}

function safeText(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} is required.`);
  if (value.length > maxLength) throw new Error(`${label} is too long.`);
  return value.trim();
}

function validateGraph(value: unknown): GraphPayload {
  if (!value || typeof value !== "object") throw new Error("Workflow graph is required.");
  const graph = value as GraphPayload;
  if (!Array.isArray(graph.nodes) || graph.nodes.length === 0 || graph.nodes.length > 30) throw new Error("Add between 1 and 30 decision nodes.");
  if (!Array.isArray(graph.edges) || graph.edges.length > 90) throw new Error("Workflow connections are invalid.");
  const ids = new Set<string>();
  for (const node of graph.nodes) {
    if (!node?.id || ids.has(node.id) || node.type !== "decision") throw new Error("Each node must have a unique id and be a decision node.");
    ids.add(node.id);
    safeText(node.data?.prompt, `Prompt for ${node.data?.title || node.id}`, 1600);
    safeText(node.data?.title, "Node name", 80);
  }
  for (const edge of graph.edges) {
    if (!ids.has(edge.source) || !ids.has(edge.target) || !["yes", "no"].includes(edge.sourceHandle ?? "")) throw new Error("A connection references a missing decision or branch.");
  }
  const outgoing = graph.edges.map((edge) => `${edge.source}:${edge.sourceHandle}`);
  if (new Set(outgoing).size !== outgoing.length) throw new Error("Each YES/NO branch can connect to only one next decision.");
  const incoming = new Map<string, number>();
  for (const edge of graph.edges) incoming.set(edge.target, (incoming.get(edge.target) ?? 0) + 1);
  if ([...incoming.values()].some((count) => count > 1)) throw new Error("A decision may have only one incoming connection.");
  if (graph.nodes.filter((node) => !incoming.has(node.id)).length !== 1) throw new Error("Connect the workflow so it has exactly one starting decision.");
  const start = graph.nodes.find((node) => !incoming.has(node.id))!;
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (nodeId: string) => {
    if (visiting.has(nodeId)) throw new Error("This workflow contains a loop. Remove the cycle before running it.");
    if (visited.has(nodeId)) return;
    visiting.add(nodeId);
    for (const edge of graph.edges.filter((candidate) => candidate.source === nodeId)) visit(edge.target);
    visiting.delete(nodeId); visited.add(nodeId);
  };
  visit(start.id);
  return graph;
}

const executeWorkflow = inngest.createFunction(
  {
    id: "execute-yes-no-workflow", retries: 2, idempotency: "event.data.runId", triggers: [{ event: "workflow/run.requested" }],
    onFailure: async ({ event, error }) => {
      const original = (event.data as { event?: { data?: JobEvent } }).event?.data;
      const failedRun = original ? runs.get(original.runId) : undefined;
      if (failedRun) { failedRun.status = "failed"; failedRun.failedNodeId = failedRun.activeNodeId; failedRun.activeNodeId = undefined; failedRun.error = error.message; }
    },
  },
  async ({ event, step }) => {
    const { runId, input, graph } = event.data as JobEvent;
    const run = runs.get(runId);
    if (!run) return { runId, status: "missing" };
    run.status = "running";
    const byId = new Map(graph.nodes.map((node) => [node.id, node]));
    const first = graph.nodes.find((node) => !graph.edges.some((edge) => edge.target === node.id));
    if (!first) throw new Error("Workflow start node is missing.");
    let currentId: string | undefined = first.id;
    const seen = new Set<string>();
    while (currentId) {
      if (seen.has(currentId)) throw new Error("This workflow contains a loop. Remove the cycle before running it.");
      seen.add(currentId);
      if (seen.size > graph.nodes.length) throw new Error("Workflow exceeded its node limit.");
      const node = byId.get(currentId);
      if (!node) throw new Error(`Next decision ${currentId} was not found.`);
      run.activeNodeId = node.id;
      const log = await step.run(`decision-${seen.size}`, async (): Promise<WorkflowLog> => {
        const decision = await classify(node.data.prompt, input);
        return { nodeId: node.id, title: node.data.title, decision, detail: `Prompt evaluated · ${mode === "openai" ? "OpenAI structured output" : "deterministic local demo"}`, at: new Date().toISOString() };
      });
      const prior = run.logs.findIndex((item) => item.nodeId === log.nodeId);
      if (prior >= 0) run.logs[prior] = log;
      else run.logs.push(log);
      run.activeNodeId = undefined;
      const branch = graph.edges.find((edge) => edge.source === node.id && edge.sourceHandle === log.decision?.toLowerCase());
      currentId = branch?.target;
    }
    run.status = "completed";
    run.activeNodeId = undefined;
    return { runId, status: "completed", visited: run.logs.map((log) => log.nodeId) };
  },
);

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "branchline", mode }));
app.post("/api/run", async (req, res) => {
  try {
    const input = safeText(req.body?.input, "Input message", 5000);
    const graph = validateGraph(req.body?.graph);
    const runId = randomUUID();
    const run: RunState = { runId, status: "queued", input, logs: [], mode };
    runs.set(runId, run);
    try { await inngest.send({ id: runId, name: "workflow/run.requested", data: { runId, input, graph } satisfies JobEvent }); }
    catch (error) { runs.delete(runId); throw error; }
    res.status(202).json(run);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not queue workflow.";
    res.status(400).json({ error: message });
  }
});
app.get("/api/runs/:runId", (req, res) => {
  const run = runs.get(req.params.runId);
  if (!run) return res.status(404).json({ error: "Run not found." });
  res.json(run);
});

app.use("/api/inngest", serve({ client: inngest, functions: [executeWorkflow] }));
app.listen(port, () => console.log(`Branchline API on http://localhost:${port} (${mode} mode)`));
