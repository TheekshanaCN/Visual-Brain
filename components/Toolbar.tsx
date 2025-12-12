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
    <div className="absolute bottom-8 right-8 z-10 flex gap-2">
      <button
        onClick={handleExport}
        className="bg-card/60 backdrop-blur-md border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-2 shadow-lg"
      >
        <Download className="w-4 h-4" />
        Export Snapshot
      </button>
      <button
        onClick={reset}
        className="bg-card/60 backdrop-blur-md border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition-all flex items-center gap-2 shadow-lg"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}
