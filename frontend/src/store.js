// // store.js



import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const nodeIDs = { ...get().nodeIDs };
    nodeIDs[type] = (nodeIDs[type] ?? 0) + 1;
    set({ nodeIDs });
    return `${type}_${nodeIDs[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((n) => {
        if (n.id !== nodeId) return n;
        return {
          ...n,
          data: { ...(n.data || {}), [fieldName]: fieldValue },
        };
      }),
    });
  },
}));

