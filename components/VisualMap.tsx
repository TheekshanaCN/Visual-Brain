'use client';

import { ReactFlow, Background, Controls, MiniMap, NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '@/lib/store';
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';
import GlassNode from './GlassNode';

export default function VisualMap() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const nodeTypes = useMemo<NodeTypes>(() => ({
    glass: GlassNode,
  }), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full bg-background transition-colors duration-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-background transition-colors duration-300"
      >
        <Background
          color={isDark ? '#333' : '#e5e7eb'}
          gap={20}
        />
        {/* <Controls className={`${isDark ? 'bg-black/50 border-white/10 text-white fill-white' : 'bg-white/50 border-black/10 text-black fill-black'} backdrop-blur-md rounded-lg border shadow-lg`} /> */}
        {/* <MiniMap
          className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-black/10'} backdrop-blur-md rounded-lg border shadow-lg`}
          nodeColor={isDark ? '#3b82f6' : '#2563eb'}
          maskColor={isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}
        /> */}
      </ReactFlow>
    </div>
  );
}
