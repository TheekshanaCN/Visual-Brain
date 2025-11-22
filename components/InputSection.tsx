'use client';
'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Sparkles, Loader2 } from 'lucide-react';

export default function InputSection() {
  const [input, setInput] = useState('');
  const { setIsProcessing, setClusters, setInsight, setNodes, setEdges, reset } = useStore();
  const [localProcessing, setLocalProcessing] = useState(false); // LOCK
  const [error, setError] = useState<string | null>(null);

  const handleVisualize = async () => {
    if (!input.trim() || localProcessing) return; // immediately block

    setLocalProcessing(true);   // lock immediately
    setIsProcessing(true);      // global state
    setError(null);
    reset();

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.clusters) {
        setClusters(data.clusters);

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
            type: 'default',
            style: {
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 200,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)',
            },
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
              type: 'default',
              style: {
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '20px',
                padding: '10px',
                fontSize: '12px',
              },
            });

            newEdges.push({
              id: `e-${clusterId}-${nodeId}`,
              source: clusterId,
              target: nodeId,
              animated: true,
              style: { stroke: 'rgba(255,255,255,0.3)' },
            });
          });

          clusterIndex++;
        }

        setNodes(newNodes);
        setEdges(newEdges);
      }

      if (data.insight) setInsight(data.insight);
    } catch (error: any) {
      console.error('Failed to visualize:', error);
      setError(error.message || 'Failed to process ideas');
    } finally {
      setIsProcessing(false);
      setLocalProcessing(false); // unlock
    }
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-80 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
      <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-400" />
        Visual Brain
      </h2>

      <textarea
        className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none mb-3"
        placeholder="Paste your messy ideas, notes, or links here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleVisualize}
        disabled={localProcessing}
        className={`w-full bg-blue-600 cursor-pointer hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
        ${localProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {localProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Visualizing...
          </>
        ) : (
          'Visualize'
        )}
      </button>

      {error && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-xs text-red-200 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
