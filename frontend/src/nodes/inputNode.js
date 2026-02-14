// // inputNode.js


import React, { useEffect, useState } from "react";
import BaseNode, { Row } from "./BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [name, setName] = useState(data?.inputName || id.replace("customInput_", "input_"));
  const [type, setType] = useState(data?.inputType || "Text");

  useEffect(() => {
    updateNodeField(id, "inputName", name);
  }, [id, name, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, "inputType", type);
  }, [id, type, updateNodeField]);

  return (
    <BaseNode
      title="Input"
      rightHandles={[{ id: "value", top: 54 }]}
    >
      <Row label="Name:">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", height: 26 }}
        />
      </Row>

      <Row label="Type:">
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ height: 28 }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </Row>
    </BaseNode>
  );
};

