'use client';
import { ReactFlow, Background, Controls, MiniMap, NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '@/lib/store';
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo, useCallback } from 'react';
import GlassNode from './GlassNode';
import CardNode from './project/nodes/CardNode';
import ContextMenu from './ContextMenu';

export default function VisualMap() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addManualNode, deleteNode, setEditingNodeId } = useStore();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'canvas' | 'node' | 'edge'; nodeId?: string; edgeId?: string } | null>(null);

  const nodeTypes = useMemo<NodeTypes>(() => ({
    glass: GlassNode,
    card: CardNode,
  }), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle right-click on canvas
  const handlePaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      type: 'canvas'
    });
  }, []);

  // Handle right-click on node
  const handleNodeContextMenu = useCallback((event: React.MouseEvent, node: any) => {
    event.preventDefault();
    // Don't show context menu for card nodes
    if (node.id.startsWith('card-')) return;

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      type: 'node',
      nodeId: node.id
    });
  }, []);

  // Handle right-click on edge
  const handleEdgeContextMenu = useCallback((event: React.MouseEvent, edge: any) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      type: 'edge',
      edgeId: edge.id
    });
  }, []);

  // Add node at context menu position
  const handleAddNode = useCallback(() => {
    if (contextMenu) {
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (reactFlowBounds) {
        const position = {
          x: contextMenu.x - reactFlowBounds.left - 100,
          y: contextMenu.y - reactFlowBounds.top - 100,
        };
        addManualNode(position);
      }
    }
  }, [contextMenu, addManualNode]);

  // Trigger edit mode for node
  const handleEditNode = useCallback(() => {
    if (contextMenu?.nodeId) {
      setEditingNodeId(contextMenu.nodeId);
    }
  }, [contextMenu, setEditingNodeId]);

  // Handle node deletion with Delete/Backspace key
  const handleNodesDelete = useCallback((nodesToDelete: any[]) => {
    nodesToDelete.forEach(node => {
      // Don't allow deleting card nodes
      if (!node.id.startsWith('card-')) {
        deleteNode(node.id);
      }
    });
  }, [deleteNode]);

  // Handle edge deletion with Delete/Backspace key
  const handleEdgesDelete = useCallback((edgesToDelete: any[]) => {
    const edgeIds = edgesToDelete.map(edge => edge.id);
    const remainingEdges = edges.filter(edge => !edgeIds.includes(edge.id));
    onEdgesChange(remainingEdges.map((edge, index) => ({
      type: 'remove',
      id: edge.id
    })));
  }, [edges, onEdgesChange]);

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
        onNodesDelete={handleNodesDelete}
        onEdgesDelete={handleEdgesDelete}
        onPaneContextMenu={handlePaneContextMenu}
        onNodeContextMenu={handleNodeContextMenu}
        onEdgeContextMenu={handleEdgeContextMenu}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-background transition-colors duration-300"
        minZoom={0.1}
        maxZoom={2}
        deleteKeyCode={['Backspace', 'Delete']}
        edgesReconnectable={true}
        edgesFocusable={true}
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

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          type={contextMenu.type}
          onClose={() => setContextMenu(null)}
          onAddNode={contextMenu.type === 'canvas' ? handleAddNode : undefined}
          onDeleteNode={contextMenu.type === 'node' && contextMenu.nodeId ? () => deleteNode(contextMenu.nodeId!) : undefined}
          onEditNode={contextMenu.type === 'node' ? handleEditNode : undefined}
          onDeleteEdge={contextMenu.type === 'edge' && contextMenu.edgeId ? () => {
            onEdgesChange([{ type: 'remove', id: contextMenu.edgeId! }]);
            setContextMenu(null);
          } : undefined}
        />
      )}
    </div>
  );
}
