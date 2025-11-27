'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

export type CardNodeData = {
    title: string;
    icon: ReactNode;
    content: ReactNode;
    onGenerate?: () => void;
    isGenerating?: boolean;
    hasData?: boolean;
};

export default function CardNode({ data }: NodeProps<CardNodeData>) {
    return (
        <div className="w-[340px] bg-background/80 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border/40 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="text-primary">{data.icon}</div>
                    <h3 className="font-semibold text-sm tracking-wide">{data.title}</h3>
                </div>
                {data.onGenerate && !data.hasData && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={(e) => {
                            e.stopPropagation();
                            data.onGenerate?.();
                        }}
                        disabled={data.isGenerating}
                    >
                        {data.isGenerating ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <Sparkles className="w-3 h-3" />
                        )}
                    </Button>
                )}
            </div>

            {/* Content */}
            <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                {!data.hasData && data.onGenerate ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                        <p className="text-xs text-muted-foreground">No data generated yet</p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 shadow-sm"
                            onClick={data.onGenerate}
                            disabled={data.isGenerating}
                        >
                            {data.isGenerating ? (
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
                    data.content
                )}
            </div>
        </div>
    );
}
