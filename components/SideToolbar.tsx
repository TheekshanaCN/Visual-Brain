'use client';

import { Download, RotateCcw, Sun, Moon, Maximize } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useStore } from '@/lib/store';
import { toPng } from 'html-to-image';
import { useReactFlow } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SideToolbar() {
    const { theme, setTheme } = useTheme();
    const { reset, nodes } = useStore();
    const { fitView } = useReactFlow();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleExport = async () => {
        const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
        if (!viewport) return;

        try {
            // Temporarily hide card nodes for the snapshot
            const cardNodes = viewport.querySelectorAll('[data-id^="card-"]');
            cardNodes.forEach(node => {
                (node as HTMLElement).style.display = 'none';
            });

            // Take the snapshot
            const dataUrl = await toPng(viewport, {
                // Using hardcoded values that match globals.css constants for canvas export
                backgroundColor: theme === 'dark' ? '#2a2418' : '#f5eee2',
                width: viewport.scrollWidth,
                height: viewport.scrollHeight,
                style: {
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                }
            });

            // Restore card nodes visibility
            cardNodes.forEach(node => {
                (node as HTMLElement).style.display = '';
            });

            const link = document.createElement('a');
            link.download = 'visual-brain-snapshot.png';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Export failed:', error);

            // Ensure card nodes are restored even if export fails
            const cardNodes = viewport.querySelectorAll('[data-id^="card-"]');
            cardNodes.forEach(node => {
                (node as HTMLElement).style.display = '';
            });
        }
    };

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4"
        >
            <div className="flex flex-col gap-2 p-2 rounded-2xl glass-premium shadow-premium">
                <TooltipButton
                    onClick={handleExport}
                    icon={<Download className="w-5 h-5" />}
                    label="Export Snapshot"
                    disabled={nodes.length === 0}
                />
                <TooltipButton
                    onClick={() => fitView({ duration: 800 })}
                    icon={<Maximize className="w-5 h-5" />}
                    label="Fit View"
                    disabled={nodes.length === 0}
                />
                <TooltipButton
                    onClick={reset}
                    icon={<RotateCcw className="w-5 h-5" />}
                    label="Reset Canvas"
                    disabled={nodes.length === 0}
                />
                <div className="h-px w-full bg-border/50 my-1" />
                <TooltipButton
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    icon={theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    label="Toggle Theme"
                />
            </div>
        </motion.div>
    );
}

function TooltipButton({ onClick, icon, label, disabled }: { onClick: () => void, icon: React.ReactNode, label: string, disabled?: boolean }) {
    return (
        <div className="group relative flex items-center">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`p-3 rounded-xl transition-all duration-200 
          ${disabled
                        ? 'opacity-40 cursor-not-allowed text-muted-foreground'
                        : 'hover:bg-primary/10 text-muted-foreground hover:text-primary active:scale-95'
                    }`}
            >
                {icon}
            </button>

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-foreground/90 text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {label}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-foreground/90" />
            </div>
        </div>
    );
}
