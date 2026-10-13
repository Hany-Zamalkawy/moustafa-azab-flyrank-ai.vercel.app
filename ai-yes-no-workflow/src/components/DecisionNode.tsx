import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Check, CircleDot, GitBranch, Sparkles } from "lucide-react";
import type { DecisionNode as DecisionNodeType } from "../types";

export function DecisionNodeView({ data, selected }: NodeProps<DecisionNodeType>) {
  const status = data.status ?? "idle";
  return <div className={`decision-node ${selected ? "selected" : ""} status-${status}`}>
    <Handle type="target" position={Position.Top} className="handle target-handle" />
    <div className="node-heading">
      <span className="node-icon"><GitBranch size={15} /></span>
      <span className="node-kind">AI DECISION</span>
      <span className="node-status">{status === "active" ? <><span className="pulse" /> RUNNING</> : status === "yes" || status === "no" ? <><Check size={12} /> {status.toUpperCase()}</> : status === "error" ? "ERROR" : <><CircleDot size={11} /> READY</>}</span>
    </div>
    <div className="node-title">{data.title}</div>
    <div className="node-prompt">{data.prompt}</div>
    <div className="node-llm"><Sparkles size={12} /> YES / NO</div>
    <Handle type="source" position={Position.Bottom} id="yes" className="handle yes-handle" />
    <Handle type="source" position={Position.Bottom} id="no" className="handle no-handle" />
    <span className="handle-label yes-label">YES</span><span className="handle-label no-label">NO</span>
  </div>;
}
