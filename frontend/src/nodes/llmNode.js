// // llmNode.js

import React from "react";
import BaseNode from "./BaseNode";

export const LLMNode = () => {
  return (
    <BaseNode
      title="LLM"
      leftHandles={[
        { id: "system", top: 44 },
        { id: "prompt", top: 72 },
      ]}
      rightHandles={[{ id: "response", top: 58 }]}
    >
      <div style={{ fontSize: 12, color: "#333" }}>This is a LLM.</div>
    </BaseNode>
  );
};
















