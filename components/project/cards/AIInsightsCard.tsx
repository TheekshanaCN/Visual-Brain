'use client';

import { Sparkles, Lightbulb } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface AIInsightsCardProps {
    insights: {
        summary: string;
        themes: string[];
    } | null;
    onGenerate: () => void;
    isGenerating: boolean;
}

export default function AIInsightsCard({ insights, onGenerate, isGenerating }: AIInsightsCardProps) {
    return (
        <ProjectCard
            title="AI Insights"
            icon={<Sparkles className="w-4 h-4" />}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            hasData={!!insights}
            className="h-full"
        >
            {insights && (
                <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Summary</span>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                            {insights.summary}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Themes</span>
                        <div className="flex flex-wrap gap-2">
                            {insights.themes.map((theme, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium border border-border/50"
                                >
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </ProjectCard>
    );
}
