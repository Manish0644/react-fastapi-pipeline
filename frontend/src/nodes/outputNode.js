// // outputNode.js

import React, { useEffect, useState } from "react";
import BaseNode, { Row } from "./BaseNode";
import { useStore } from "../store";

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [name, setName] = useState(data?.outputName || id.replace("customOutput_", "output_"));
  const [type, setType] = useState(data?.outputType || "Text");

  useEffect(() => {
    updateNodeField(id, "outputName", name);
  }, [id, name, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, "outputType", type);
  }, [id, type, updateNodeField]);

  return (
    <BaseNode
      title="Output"
      leftHandles={[{ id: "value", top: 54 }]}
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
          <option value="Image">Image</option>
        </select>
      </Row>
    </BaseNode>
  );
};



