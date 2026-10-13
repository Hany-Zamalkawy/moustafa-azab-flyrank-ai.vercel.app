import type { Edge, Node } from "@xyflow/react";

export type DecisionData = { prompt: string; title: string; status?: "idle" | "active" | "yes" | "no" | "error"; result?: "YES" | "NO" };
export type DecisionNode = Node<DecisionData, "decision">;
export type WorkflowEdge = Edge<{ answer?: "YES" | "NO" }, "smoothstep">;
export type WorkflowLog = { nodeId: string; title: string; decision?: "YES" | "NO"; detail: string; at: string };
export type RunState = { runId: string; status: "queued" | "running" | "completed" | "failed"; input: string; logs: WorkflowLog[]; mode: "openai" | "demo"; activeNodeId?: string; failedNodeId?: string; error?: string };
export type GraphPayload = { nodes: DecisionNode[]; edges: WorkflowEdge[] };
