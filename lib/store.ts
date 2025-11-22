import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

export type Cluster = {
  id: string;
  label: string;
  items: string[];
};

export type Insight = {
  summary: string;
  nextSteps: string[];
  themes: string[];
};

interface AppState {
  nodes: Node[];
  edges: Edge[];
  clusters: Cluster[];
  insight: Insight | null;
  isProcessing: boolean;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  setClusters: (clusters: Cluster[]) => void;
  setInsight: (insight: Insight) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  clusters: [],
  insight: null,
  isProcessing: false,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
  addNode: (node: Node) => set({ nodes: [...get().nodes, node] }),
  setClusters: (clusters: Cluster[]) => set({ clusters }),
  setInsight: (insight: Insight) => set({ insight }),
  setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
  reset: () => set({ nodes: [], edges: [], clusters: [], insight: null, isProcessing: false }),
}));
