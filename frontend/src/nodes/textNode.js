// // textNode.js


import React, { useEffect, useMemo, useState } from "react";
import BaseNode, { Row } from "./BaseNode";
import { useStore } from "../store";

function extractVariables(text) {
  // captures: {{   abc_12   }}
  const re = /{{\s*([A-Za-z_][\w]*)\s*}}/g;
  const set = new Set();
  let m;
  while ((m = re.exec(text)) !== null) set.add(m[1]);
  return Array.from(set);
}

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [text, setText] = useState(data?.text ?? "{{input}}");

  // keep store in sync
  useEffect(() => {
    updateNodeField(id, "text", text);
  }, [id, text, updateNodeField]);

  const vars = useMemo(() => extractVariables(text), [text]);

  // create a LEFT handle per variable
  const leftHandles = useMemo(() => {
    const startTop = 58; // where handles start vertically
    const gap = 22;
    return vars.map((v, idx) => ({
      id: `var:${v}`, // stable id
      top: startTop + idx * gap,
    }));
  }, [vars]);

  return (
    <BaseNode
      title="Text"
      width={360}
      leftHandles={leftHandles}
      rightHandles={[{ id: "output", top: 58 }]}
    >
      <Row label="Text:">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", height: 26 }}
        />
      </Row>

      <div style={{ marginTop: 10, fontSize: 12, color: "#222" }}>
        <b>Variables:</b> {vars.length ? vars.map((v) => `{{${v}}}`).join(", ") : "None"}
      </div>
    </BaseNode>
  );
};






















