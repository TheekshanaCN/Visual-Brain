'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Sparkles, ArrowUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function InputSection() {
  const {
    inputValue,
    setInputValue,
    setIsProcessing,
    setClusters,
    setInsight,
    setNodes,
    setEdges,
    setTags,
    reset,
    nodes
  } = useStore();
  const [localProcessing, setLocalProcessing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholderText = useTypewriter();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [inputValue]);

  const handleVisualize = async () => {
    if (!inputValue.trim() || localProcessing) return;

    setLocalProcessing(true);
    setIsProcessing(true);

    // Don't reset if we are updating an existing map
    const isUpdate = !!nodes.length;
    if (!isUpdate) {
      reset();
    }

    try {
      // Get current graph data from store if available
      const currentGraphData = useStore.getState().graphData;

      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputValue,
          currentMap: isUpdate ? currentGraphData : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      if (data.root) {
        // Save the hierarchical data for future updates
        useStore.getState().setGraphData(data.root);

        // Extract tags from insight themes if available
        const insightTags = data.insight?.themes || [];
        setTags(insightTags);

        const newNodes: any[] = [];
        const newEdges: any[] = [];

        const centerX = 0;
        const centerY = 0;

        // 1. Create Root Node
        const rootId = 'root';
        newNodes.push({
          id: rootId,
          position: { x: centerX, y: centerY },
          data: { label: data.root.label, variant: 'root' },
          type: 'glass',
        });

        // 2. Create Main Branches (Radial Layout)
        const branches = data.root.branches;
        const branchRadius = 400; // Distance from root

        branches.forEach((branch: any, index: number) => {
          const angle = (index / branches.length) * 2 * Math.PI - Math.PI / 2; // Start from top
          const branchX = centerX + branchRadius * Math.cos(angle);
          const branchY = centerY + branchRadius * Math.sin(angle);
          const branchId = `branch-${index}`;

          newNodes.push({
            id: branchId,
            position: { x: branchX, y: branchY },
            data: { label: branch.label, variant: 'branch' },
            type: 'glass',
          });

          // Edge from Root -> Branch
          newEdges.push({
            id: `e-root-${branchId}`,
            source: rootId,
            target: branchId,
            animated: true,
            style: { stroke: 'var(--primary)', strokeWidth: 2 },
          });

          // 3. Create Child Nodes (Cluster around Branch)
          const children = branch.children;
          const childRadius = 150; // Distance from branch node
          const startAngle = angle - Math.PI / 3; // Spread children in a fan shape
          const totalSpread = (Math.PI * 2) / 3; // 120 degrees spread

          children.forEach((child: string, childIndex: number) => {
            const childAngle = startAngle + (childIndex / (children.length - 1 || 1)) * totalSpread;
            // Adjust angle to point away from center
            const finalChildAngle = angle + (childIndex - (children.length - 1) / 2) * 0.5;

            const childX = branchX + childRadius * Math.cos(finalChildAngle);
            const childY = branchY + childRadius * Math.sin(finalChildAngle);
            const childId = `${branchId}-child-${childIndex}`;

            newNodes.push({
              id: childId,
              position: { x: childX, y: childY },
              data: { label: child, variant: 'child' },
              type: 'glass',
            });

            // Edge from Branch -> Child
            newEdges.push({
              id: `e-${branchId}-${childId}`,
              source: branchId,
              target: childId,
              animated: false,
              style: { stroke: 'var(--muted-foreground)', opacity: 0.5 },
            });
          });
        });

        setNodes(newNodes);
        setEdges(newEdges);
      }

      if (data.insight) setInsight(data.insight);

      // Auto-update project name and description if this is a new map
      if (!isUpdate && data.root && data.insight) {
        const projectId = useStore.getState().projectId;
        if (projectId) {
          try {
            await fetch(`/api/projects/${projectId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: data.root.label,
                description: data.insight.summary
              }),
            });
          } catch (error) {
            console.error('Failed to update project metadata:', error);
          }
        }
      }
      setInputValue(''); // Clear input after sending
    } catch (error) {
      console.error('Failed to visualize:', error);
    } finally {
      setIsProcessing(false);
      setLocalProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleVisualize();
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center px-4 pointer-events-none">
      <motion.div
        layout
        initial={{ width: '400px' }}
        animate={{ width: isFocused || inputValue ? '650px' : '400px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`pointer-events-auto relative flex items-end gap-2 p-2 rounded-3xl glass-premium shadow-premium transition-colors duration-300 ${isFocused ? 'ring-2 ring-primary/20' : ''}`}
      >
        <div className="flex-shrink-0 p-5">
          <Sparkles className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>

        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full max-h-[200px] py-3 bg-transparent border-none text-foreground
  focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
  outline-none ring-0 resize-none custom-scrollbar text-base z-10 relative"
            rows={1}
            style={{ minHeight: '48px' }}
          />


          {/* Typewriter Placeholder */}
          {!inputValue && (
            <div className="absolute top-3 left-0 pointer-events-none text-muted-foreground/60 truncate w-full">
              {placeholderText}
              <span className="animate-pulse">|</span>
            </div>
          )}
        </div>

        <button
          onClick={handleVisualize}
          disabled={!inputValue.trim() || localProcessing}
          className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-200
            ${inputValue.trim() && !localProcessing
              ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
        >
          {localProcessing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowUp className="w-5 h-5" />
          )}
        </button>
      </motion.div>
    </div>
  );
}