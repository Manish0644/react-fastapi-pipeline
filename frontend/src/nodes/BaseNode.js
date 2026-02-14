import React from "react";
import { Handle, Position } from "reactflow";

export const Row = ({ label, children }) => {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
      <div style={{ width: 70, fontSize: 12, color: "#111" }}>{label}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export default function BaseNode({
  title = "Node",
  width = 260,
  leftHandles = [],   // [{ id, top }]
  rightHandles = [],  // [{ id, top }]
  children,
}) {
  return (
    <div
      style={{
        width,
        border: "2px solid #222",
        borderRadius: 10,
        background: "#fff",
        padding: 12,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* handles (LEFT) */}
      {leftHandles.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={h.id}
          style={{
            top: h.top,
            width: 10,
            height: 10,
            border: "2px solid #111",
            background: "#fff",
          }}
        />
      ))}

      {/* handles (RIGHT) */}
      {rightHandles.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={h.id}
          style={{
            top: h.top,
            width: 10,
            height: 10,
            border: "2px solid #111",
            background: "#fff",
          }}
        />
      ))}

      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );
}
