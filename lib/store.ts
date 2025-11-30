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

export type TechItem = {
  name: string;
  category: string;
  reason: string;
};

export type ChecklistItem = {
  id: string;
  task: string;
  status: 'pending' | 'completed';
};

export type NextStepItem = {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
};

interface AppState {
  nodes: Node[];
  edges: Edge[];
  clusters: Cluster[];
  insight: Insight | null;
  techStack: TechItem[];
  mvpChecklist: ChecklistItem[];
  nextSteps: NextStepItem[];
  
  isProcessing: boolean;
  insightsPanelOpen: boolean;
  inputDockOpen: boolean;
  inputValue: string;
  editingNodeId: string | null;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  addManualNode: (position: { x: number; y: number }, label?: string) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  setEditingNodeId: (nodeId: string | null) => void;
  setClusters: (clusters: Cluster[]) => void;
  setInsight: (insight: Insight) => void;
  setTechStack: (stack: TechItem[]) => void;
  setMvpChecklist: (checklist: ChecklistItem[]) => void;
  setNextSteps: (steps: NextStepItem[]) => void;
  
  setIsProcessing: (isProcessing: boolean) => void;
  toggleInsightsPanel: () => void;
  setInputDockOpen: (open: boolean) => void;
  setInputValue: (value: string) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  clusters: [],
  insight: null,
  techStack: [],
  mvpChecklist: [],
  nextSteps: [],
  
  isProcessing: false,
  editingNodeId: null,
  insightsPanelOpen: true,
  inputDockOpen: false,
  inputValue: '',

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
  
  addManualNode: (position: { x: number; y: number }, label?: string) => {
    const newNode: Node = {
      id: `manual-${Date.now()}`,
      type: 'glass',
      position,
      data: { label: label || 'New Node' },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  
  deleteNode: (nodeId: string) => {
    const nodes = get().nodes.filter(node => node.id !== nodeId);
    const edges = get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
    set({ nodes, edges });
  },
  
  updateNodeLabel: (nodeId: string, label: string) => {
    const nodes = get().nodes.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, label } }
        : node
    );
    set({ nodes });
  },
  
  setEditingNodeId: (nodeId: string | null) => set({ editingNodeId: nodeId }),
  
  setClusters: (clusters: Cluster[]) => set({ clusters }),
  setInsight: (insight: Insight) => set({ insight }),
  setTechStack: (techStack: TechItem[]) => set({ techStack }),
  setMvpChecklist: (mvpChecklist: ChecklistItem[]) => set({ mvpChecklist }),
  setNextSteps: (nextSteps: NextStepItem[]) => set({ nextSteps }),
  
  setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
  toggleInsightsPanel: () => set({ insightsPanelOpen: !get().insightsPanelOpen }),
  setInputDockOpen: (open: boolean) => set({ inputDockOpen: open }),
  setInputValue: (value: string) => set({ inputValue: value }),
  reset: () => set({ 
    nodes: [], 
    edges: [], 
    clusters: [], 
    insight: null, 
    techStack: [],
    mvpChecklist: [],
    nextSteps: [],
    isProcessing: false, 
    editingNodeId: null 
  }),
}));
