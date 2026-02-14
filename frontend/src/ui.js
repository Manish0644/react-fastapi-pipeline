
// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------
import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (s) => ({
  nodes: s.nodes,
  edges: s.edges,
  getNodeID: s.getNodeID,
  addNode: s.addNode,
  onNodesChange: s.onNodesChange,
  onEdgesChange: s.onEdgesChange,
  onConnect: s.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    // defaults that your nodes can use safely
    if (type === "customInput") return { inputName: nodeID.replace("customInput_", "input_"), inputType: "Text" };
    if (type === "customOutput") return { outputName: nodeID.replace("customOutput_", "output_"), outputType: "Text" };
    if (type === "text") return { text: "{{input}}" };
    return {};
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const wrapper = reactFlowWrapper.current;
      if (!wrapper || !reactFlowInstance) return;

      const reactFlowBounds = wrapper.getBoundingClientRect();
      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const appData = JSON.parse(raw);
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100vw", height: "70vh" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

