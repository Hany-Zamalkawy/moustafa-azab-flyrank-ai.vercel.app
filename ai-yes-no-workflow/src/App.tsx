import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState, type Connection, type Edge, type Node, type OnConnect } from "@xyflow/react";
import { Activity, ArrowDownToLine, ArrowUpFromLine, Bot, Check, ChevronDown, CircleHelp, Clock3, Code2, FileJson2, GitBranch, LoaderCircle, Play, Plus, RotateCcw, Save, Sparkles, Trash2, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { DecisionNodeView } from "./components/DecisionNode";
import type { DecisionNode, GraphPayload, RunState, WorkflowEdge, WorkflowLog } from "./types";

const STORAGE_KEY = "branchline.workflow.v1";
const nodeTypes = { decision: DecisionNodeView };
const starter: GraphPayload = {
  nodes: [
    { id: "support", type: "decision", position: { x: 330, y: 120 }, data: { title: "Support request?", prompt: "Does the message ask for help with a product or service problem?" } },
    { id: "urgent", type: "decision", position: { x: 85, y: 430 }, data: { title: "Urgent issue?", prompt: "Does the support request describe an urgent outage or safety issue?" } },
    { id: "sales", type: "decision", position: { x: 575, y: 430 }, data: { title: "Sales inquiry?", prompt: "Is the message asking about pricing, plans, or buying a product?" } },
  ],
  edges: [
    { id: "e-support-urgent", source: "support", sourceHandle: "yes", target: "urgent", type: "smoothstep", label: "YES", data: { answer: "YES" }, animated: false },
    { id: "e-support-sales", source: "support", sourceHandle: "no", target: "sales", type: "smoothstep", label: "NO", data: { answer: "NO" }, animated: false },
  ],
};
function restoreGraph(): GraphPayload {
  try { const value = localStorage.getItem(STORAGE_KEY); if (value) return JSON.parse(value) as GraphPayload; } catch { /* use starter */ }
  return starter;
}
const formatTime = (value: string) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export default function App() {
  const initial = useMemo(restoreGraph, []);
  const [nodes, setNodes, onNodesChange] = useNodesState<DecisionNode>(initial.nodes as DecisionNode[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(initial.edges as WorkflowEdge[]);
  const [selectedId, setSelectedId] = useState<string | null>(initial.nodes[0]?.id ?? null);
  const [input, setInput] = useState("I can't log in to my account after the update. Please help.");
  const [run, setRun] = useState<RunState | null>(null);
  const [health, setHealth] = useState<{ ok: boolean; mode: string } | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedNode = nodes.find((node) => node.id === selectedId);
  const completedNodes = new Set((run?.logs ?? []).map((log) => log.nodeId));

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes: nodes.map(({ data, ...n }) => ({ ...n, data: { title: data.title, prompt: data.prompt } })), edges })); }, [nodes, edges]);
  useEffect(() => { fetch("/api/health").then((r) => r.json()).then(setHealth).catch(() => setHealth(null)); }, []);
  const onConnect: OnConnect = useCallback((connection: Connection) => {
    if (!connection.sourceHandle || !connection.source || !connection.target) return;
    const answer = connection.sourceHandle.toUpperCase() as "YES" | "NO";
    setEdges((eds) => addEdge({ ...connection, id: `e-${connection.source}-${answer.toLowerCase()}-${connection.target}-${crypto.randomUUID().slice(0, 5)}`, type: "smoothstep", label: answer, data: { answer }, animated: false }, eds) as WorkflowEdge[]);
  }, [setEdges]);

  const startRun = async () => {
    setError(""); setRun(null);
    setNodes((current) => current.map((node) => ({ ...node, data: { ...node.data, status: "idle", result: undefined } })));
    setEdges((current) => current.map((edge) => ({ ...edge, animated: false, className: "" })));
    if (!input.trim()) { setError("Add an example message to classify first."); return; }
    const graph: GraphPayload = { nodes: nodes.map((n) => ({ ...n, data: { title: n.data.title, prompt: n.data.prompt } })), edges };
    try {
      const response = await fetch("/api/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input, graph }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Could not start workflow.");
      setRun(payload as RunState);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to reach the workflow API."); }
  };

  useEffect(() => {
    if (!run?.runId || ["completed", "failed"].includes(run.status)) return;
    let alive = true;
    const poll = async () => {
      try {
        const response = await fetch(`/api/runs/${run.runId}`);
        if (!response.ok) return;
        const next = await response.json() as RunState;
        if (!alive) return;
        setRun(next);
        setNodes((current) => current.map((node) => {
          const entry = next.logs.find((log) => log.nodeId === node.id);
          const isActive = next.status === "running" && next.activeNodeId === node.id;
          if (next.failedNodeId === node.id) return { ...node, data: { ...node.data, status: "error", result: undefined } };
          if (entry) return { ...node, data: { ...node.data, status: entry.decision === "YES" ? "yes" : "no", result: entry.decision } };
          return { ...node, data: { ...node.data, status: isActive ? "active" : "idle", result: undefined } };
        }));
        setEdges((current) => current.map((edge) => {
          const traversed = next.logs.some((log) => log.nodeId === edge.source && log.decision === edge.sourceHandle?.toUpperCase());
          return { ...edge, animated: traversed && next.status === "running", className: traversed ? "traversed-edge" : "" };
        }));
      } catch { /* a transient poll failure is retried on the next interval */ }
    };
    const timer = window.setInterval(poll, 700); void poll();
    return () => { alive = false; window.clearInterval(timer); };
  }, [run?.runId, run?.status, setNodes, setEdges]);

  const addNode = () => {
    const id = `decision-${crypto.randomUUID().slice(0, 6)}`;
    const node: DecisionNode = { id, type: "decision", position: { x: 360 + Math.random() * 70, y: 180 + Math.random() * 90 }, data: { title: "New decision", prompt: "Write a question that can be answered YES or NO." } };
    setNodes((current) => [...current, node]); setSelectedId(id);
  };
  const updateSelected = (key: "title" | "prompt", value: string) => {
    if (!selectedId) return;
    setNodes((current) => current.map((node) => node.id === selectedId ? { ...node, data: { ...node.data, [key]: value } } : node));
  };
  const removeSelected = () => {
    if (!selectedId) return;
    setNodes((current) => current.filter((node) => node.id !== selectedId));
    setEdges((current) => current.filter((edge) => edge.source !== selectedId && edge.target !== selectedId));
    setSelectedId(null);
  };
  const exportGraph = () => {
    const blob = new Blob([JSON.stringify({ nodes, edges }, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = href; anchor.download = "branchline-workflow.json"; anchor.click(); URL.revokeObjectURL(href);
  };
  const importGraph = async (file?: File) => {
    if (!file) return;
    try { const value = JSON.parse(await file.text()) as GraphPayload; if (!Array.isArray(value.nodes) || !Array.isArray(value.edges)) throw new Error("Workflow JSON needs nodes and edges arrays."); setNodes(value.nodes); setEdges(value.edges); setSelectedId(value.nodes[0]?.id ?? null); setError(""); }
    catch (e) { setError(e instanceof Error ? e.message : "Invalid workflow file."); }
  };
  const clearRun = () => { setRun(null); setNodes((current) => current.map((node) => ({ ...node, data: { ...node.data, status: "idle", result: undefined } }))); setEdges((current) => current.map((edge) => ({ ...edge, animated: false, className: "" }))); };

  return <main className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="Branchline home"><span className="brand-mark"><GitBranch size={19} /></span><span>branchline<span className="brand-dot">.</span><small>AI WORKFLOW STUDIO</small></span></a>
      <div className="topbar-center"><span className="crumb">Workflows</span><span className="slash">/</span><span className="flow-name">Untitled workflow <ChevronDown size={14} /></span><span className="saved"><span /> Saved locally</span></div>
      <div className="topbar-right"><div className={`connection ${health?.ok ? "connected" : "disconnected"}`}><span />{health?.ok ? `API ${health.mode === "openai" ? "+ OpenAI" : "+ Demo"}` : "API offline"}</div><Button onClick={exportGraph} size="sm"><ArrowDownToLine size={15} /> Export</Button><Button variant="primary" size="sm" onClick={startRun} disabled={run?.status === "queued" || run?.status === "running"}><Play size={14} fill="currentColor" /> Run workflow</Button></div>
    </header>
    <div className="workspace">
      <aside className="rail"><button className="rail-item active" title="Flow editor"><GitBranch size={18} /><span>Builder</span></button><button className="rail-item" title="Execution history"><Clock3 size={18} /><span>Runs</span></button><div className="rail-spacer" /><button className="rail-item" title="Help"><CircleHelp size={18} /><span>Help</span></button><div className="avatar">H</div></aside>
      <section className="editor-column">
        <div className="canvas-toolbar"><div className="canvas-title"><span className="eyebrow">VISUAL EDITOR</span><span className="node-count">{nodes.length} decisions <i /> {edges.length} connections</span></div><div className="toolbar-actions"><Button size="sm" onClick={addNode}><Plus size={15} /> Add decision</Button><Button size="sm" onClick={() => fileRef.current?.click()}><ArrowUpFromLine size={14} /> Import</Button><input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => void importGraph(e.target.files?.[0])} /></div></div>
        <div className="flow-canvas">
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node) => setSelectedId(node.id)} onPaneClick={() => setSelectedId(null)} fitView fitViewOptions={{ padding: 0.24 }} minZoom={0.35} maxZoom={1.6} defaultEdgeOptions={{ type: "smoothstep", animated: false, style: { strokeWidth: 1.8, stroke: "#a9b4c5" }, labelStyle: { fill: "#536176", fontWeight: 700, fontSize: 10 } }}>
            <Background variant={BackgroundVariant.Dots} gap={19} size={1} color="#d6deea" /><Controls position="bottom-left" showInteractive={false} /><MiniMap position="bottom-right" nodeColor={(node) => node.data && (node.data as DecisionNode["data"]).status === "yes" ? "#38a47f" : "#8b9cb7"} maskColor="rgba(244,247,251,.7)" />
          </ReactFlow>
          <div className="canvas-hint"><span className="hint-dot" /> Drag from a node’s <b>YES</b> or <b>NO</b> handle to branch</div>
          {nodes.length === 0 && <div className="empty-state"><span className="empty-icon"><GitBranch size={24} /></span><h3>Start your workflow</h3><p>Add a decision node, then connect its YES and NO paths.</p><Button variant="primary" onClick={addNode}><Plus size={15} /> Add first node</Button></div>}
        </div>
        <div className="runbar"><div className="runbar-heading"><span className="runbar-icon"><Activity size={16} /></span><div><b>Execution log</b><small>{run ? run.status === "queued" ? "Queued with Inngest" : run.status === "running" ? "Inngest function running" : run.status === "completed" ? "Run completed" : "Run failed" : "Your decisions appear here when you run the workflow."}</small></div></div><div className="runbar-meta">{run && <><span className={`run-pill ${run.mode}`}>{run.mode === "openai" ? <Sparkles size={11} /> : <Code2 size={11} />}{run.mode === "openai" ? "OPENAI" : "DEMO"}</span><span className="run-id">RUN {run.runId.slice(0, 8).toUpperCase()}</span><button className="icon-button" title="Clear run" onClick={clearRun}><RotateCcw size={15} /></button></>}</div></div>
        {run && <div className="log-list">{run.logs.map((log: WorkflowLog, index) => <div className="log-row" key={`${log.nodeId}-${index}`}><span className="log-step">{String(index + 1).padStart(2, "0")}</span><span className={`log-answer ${log.decision?.toLowerCase()}`}>{log.decision}</span><span className="log-title">{log.title}</span><span className="log-detail">{log.detail}</span><time>{formatTime(log.at)}</time></div>)}{(run.status === "queued" || run.status === "running") && <div className="log-pending"><LoaderCircle className="spin" size={15} /> {run.status === "queued" ? "Waiting for Inngest worker…" : "Evaluating next decision…"}</div>}{run.status === "completed" && <div className="run-finish"><Check size={14} /> Workflow reached an endpoint after {run.logs.length} {run.logs.length === 1 ? "decision" : "decisions"}.</div>}{run.status === "failed" && <div className="run-error"><X size={14} /> {run.error || "Execution failed."}</div>}</div>}
        {error && <div className="error-banner"><X size={14} /> {error}<button onClick={() => setError("")}><X size={14} /></button></div>}
      </section>
      <aside className="inspector">
        <div className="inspector-tabs"><span className="tab active">Configure</span><span className="tab">History</span><span className="panel-menu">···</span></div>
        {selectedNode ? <>
          <div className="inspector-heading"><span className="inspector-type-icon"><GitBranch size={16} /></span><div><h2>Decision node</h2><small>AI evaluates a prompt and picks a path</small></div><button className="icon-button delete-node" title="Delete node" onClick={removeSelected}><Trash2 size={15} /></button></div>
          <label className="field-label" htmlFor="node-title">Node name</label><input id="node-title" className="text-input" value={selectedNode.data.title} onChange={(e) => updateSelected("title", e.target.value)} placeholder="e.g. Support request?" />
          <label className="field-label prompt-label" htmlFor="node-prompt">Decision prompt <span>Required</span></label><textarea id="node-prompt" className="text-area" rows={5} value={selectedNode.data.prompt} onChange={(e) => updateSelected("prompt", e.target.value)} placeholder="Ask one clear question with a YES or NO answer." /><div className="field-note">Be specific. The AI must return only YES or NO.</div>
          <div className="divider" />
          <div className="branch-title"><span>OUTPUT BRANCHES</span><span>2 paths</span></div>
          <div className="branch-card yes-branch"><span className="branch-mark">✓</span><div><b>YES</b><small>Connect to the next decision</small></div><span className="branch-link-count">{edges.filter((edge) => edge.source === selectedNode.id && edge.sourceHandle === "yes").length}</span></div>
          <div className="branch-card no-branch"><span className="branch-mark">×</span><div><b>NO</b><small>Connect to the next decision</small></div><span className="branch-link-count">{edges.filter((edge) => edge.source === selectedNode.id && edge.sourceHandle === "no").length}</span></div>
          <div className="inspector-tip"><Sparkles size={14} /><span><b>Tip</b><br />A path with no outgoing connection ends the workflow.</span></div>
          <div className="node-id">NODE ID <code>{selectedNode.id}</code></div>
        </> : <div className="inspector-empty"><span className="empty-icon"><Bot size={23} /></span><h3>Select a decision</h3><p>Choose any node on the canvas to edit its prompt and configure its branches.</p><Button size="sm" onClick={addNode}><Plus size={14} /> Add decision</Button></div>}
        <div className="run-input-wrap"><div className="divider" /><label className="field-label" htmlFor="run-input">TEST INPUT</label><textarea id="run-input" className="text-area test-input" rows={3} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message to classify…" /><Button variant="primary" className="run-full" onClick={startRun} disabled={run?.status === "queued" || run?.status === "running"}><Play size={14} fill="currentColor" /> Run workflow</Button><small className="shortcut">Runs are executed as durable Inngest jobs.</small></div>
      </aside>
    </div>
    <footer className="status-footer"><span className="footer-left"><span className={health?.ok ? "status-green" : "status-gray"} />{health?.ok ? `Backend connected · ${health.mode === "openai" ? "OpenAI enabled" : "demo mode"}` : "Connecting to workflow backend…"}</span><span><Save size={12} /> Auto-saved in this browser</span><span className="footer-right">React Flow <i /> Inngest <i /> OpenAI</span></footer>
  </main>;
}
