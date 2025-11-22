'use client';

import { toPng } from 'html-to-image';
import { Download, RotateCcw } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Toolbar() {
  const { reset, nodes } = useStore();

  const handleExport = async () => {
    const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!viewport) return;

    try {
      const dataUrl = await toPng(viewport, {
        backgroundColor: '#0a0a0a',
        width: viewport.scrollWidth,
        height: viewport.scrollHeight,
        style: {
            width: '100%',
            height: '100%',
            transform: 'scale(1)',
        }
      });
      
      const link = document.createElement('a');
      link.download = 'visual-brain-snapshot.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (nodes.length === 0) return null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
      <button
        onClick={handleExport}
        className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export Snapshot
      </button>
      <button
        onClick={reset}
        className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-500/20 hover:text-red-400 transition-all flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}
