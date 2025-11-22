'use client';

import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '@/lib/store';

export default function VisualMap() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  return (
    <div className="w-full h-full bg-neutral-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-neutral-950"
      >
        <Background color="#333" gap={20} />
        <Controls className="bg-black/50 border-white/10 text-white fill-white" />
        <MiniMap 
          className="bg-black/50 border-white/10" 
          nodeColor={() => '#3b82f6'}
        />
      </ReactFlow>
    </div>
  );
}
