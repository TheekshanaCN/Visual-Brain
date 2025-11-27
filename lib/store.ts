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
  tags: string[];
  techStack: TechItem[];
  mvpChecklist: ChecklistItem[];
  nextSteps: NextStepItem[];
  
  isProcessing: boolean;
  isGenerating: boolean; // General generating state
  
  insightsPanelOpen: boolean;
  inputDockOpen: boolean;
  inputValue: string;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  setClusters: (clusters: Cluster[]) => void;
  setInsight: (insight: Insight | null) => void;
  setTags: (tags: string[]) => void;
  setTechStack: (stack: TechItem[]) => void;
  setMvpChecklist: (checklist: ChecklistItem[]) => void;
  setNextSteps: (steps: NextStepItem[]) => void;
  
  setIsProcessing: (isProcessing: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  
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
  tags: [],
  techStack: [],
  mvpChecklist: [],
  nextSteps: [],
  
  isProcessing: false,
  isGenerating: false,
  
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
  setClusters: (clusters: Cluster[]) => set({ clusters }),
  setInsight: (insight: Insight | null) => set({ insight }),
  setTags: (tags: string[]) => set({ tags }),
  setTechStack: (techStack: TechItem[]) => set({ techStack }),
  setMvpChecklist: (mvpChecklist: ChecklistItem[]) => set({ mvpChecklist }),
  setNextSteps: (nextSteps: NextStepItem[]) => set({ nextSteps }),
  
  setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
  
  toggleInsightsPanel: () => set({ insightsPanelOpen: !get().insightsPanelOpen }),
  setInputDockOpen: (open: boolean) => set({ inputDockOpen: open }),
  setInputValue: (value: string) => set({ inputValue: value }),
  reset: () => set({ 
    nodes: [], 
    edges: [], 
    clusters: [], 
    insight: null, 
    tags: [],
    techStack: [],
    mvpChecklist: [],
    nextSteps: [],
    isProcessing: false,
    isGenerating: false
  }),
}));
