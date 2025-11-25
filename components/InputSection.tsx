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
    reset();

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      if (data.clusters) {
        setClusters(data.clusters);
        // ... (Node generation logic would go here, simplified for brevity as it's same as before)
        // For this redesign, we focus on the UI. The store logic handles the rest.

        // Re-implementing the node generation for completeness
        const newNodes: any[] = [];
        const newEdges: any[] = [];
        let clusterIndex = 0;
        const centerX = 500;
        const centerY = 300;
        const radius = 300;

        for (const cluster of data.clusters) {
          const angle = (clusterIndex / data.clusters.length) * 2 * Math.PI;
          const clusterX = centerX + radius * Math.cos(angle);
          const clusterY = centerY + radius * Math.sin(angle);
          const clusterId = `cluster-${clusterIndex}`;

          newNodes.push({
            id: clusterId,
            position: { x: clusterX, y: clusterY },
            data: { label: cluster.label },
            type: 'glass',
            style: { width: 200, height: 200 },
          });

          cluster.items.forEach((item: string, itemIndex: number) => {
            const itemAngle = (itemIndex / cluster.items.length) * 2 * Math.PI;
            const itemRadius = 80;
            const itemX = clusterX + itemRadius * Math.cos(itemAngle);
            const itemY = clusterY + itemRadius * Math.sin(itemAngle);
            const nodeId = `${clusterId}-item-${itemIndex}`;

            newNodes.push({
              id: nodeId,
              position: { x: itemX, y: itemY },
              data: { label: item },
              type: 'glass',
            });

            newEdges.push({
              id: `e-${clusterId}-${nodeId}`,
              source: clusterId,
              target: nodeId,
              animated: true,
              style: { stroke: 'var(--primary)' },
            });
          });
          clusterIndex++;
        }
        setNodes(newNodes);
        setEdges(newEdges);
      }

      if (data.insight) setInsight(data.insight);
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
            className="w-full max-h-[200px] py-3 bg-transparent border-none text-foreground focus:ring-0 outline-none resize-none custom-scrollbar text-base z-10 relative"
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
