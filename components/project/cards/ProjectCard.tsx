'use client';

import { motion, useDragControls, useMotionValue, MotionValue } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Minus, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    onGenerate?: () => void;
    isGenerating?: boolean;
    hasData?: boolean;
    defaultPosition?: { x: number; y: number };
    x?: MotionValue<number>;
    y?: MotionValue<number>;
}

export default function ProjectCard({
    title,
    icon,
    children,
    className = "",
    onGenerate,
    isGenerating = false,
    hasData = false,
    defaultPosition = { x: 0, y: 0 },
    x,
    y
}: ProjectCardProps) {
    const [isMinimized, setIsMinimized] = useState(false);
    const dragControls = useDragControls();

    // Use passed motion values or internal ones if not provided (fallback)
    const styleX = x || useMotionValue(defaultPosition.x);
    const styleY = y || useMotionValue(defaultPosition.y);

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            style={{ x: styleX, y: styleY }}
            className={cn(
                "absolute w-[340px] flex flex-col",
                "bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg",
                "transition-colors duration-200 hover:border-primary/20 hover:shadow-premium",
                isMinimized ? "h-auto" : "h-[340px]",
                className
            )}
        >
            {/* Header / Drag Handle */}
            <div
                className="flex items-center justify-between p-3 border-b border-border/40 bg-muted/20 cursor-grab active:cursor-grabbing select-none"
                onPointerDown={(e) => dragControls.start(e)}
            >
                <div className="flex items-center gap-2">
                    {icon && <div className="text-primary">{icon}</div>}
                    <h3 className="font-semibold text-sm tracking-wide truncate max-w-[100px]">{title}</h3>
                </div>
                <div className="flex items-center gap-1">
                    {onGenerate && !hasData && !isMinimized && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                onGenerate();
                            }}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Sparkles className="w-3 h-3" />
                            )}
                        </Button>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMinimized(!isMinimized);
                        }}
                    >
                        {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    </Button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 p-4 overflow-y-auto custom-scrollbar relative max-h-[300px]"
                >
                    {!hasData && onGenerate ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                            <p className="text-xs text-muted-foreground">No data generated yet</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 shadow-sm"
                                onClick={onGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-3 h-3 text-primary" />
                                        Generate
                                    </>
                                )}
                            </Button>
                        </div>
                    ) : (
                        children
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
