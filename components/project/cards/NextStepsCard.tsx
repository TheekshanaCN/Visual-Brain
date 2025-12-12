'use client';

import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface NextStepsCardProps {
    steps: string[];
    onGenerate: () => void;
    isGenerating: boolean;
}

export default function NextStepsCard({ steps, onGenerate, isGenerating }: NextStepsCardProps) {
    return (
        <ProjectCard
            title="Next Steps"
            icon={<ArrowRight className="w-4 h-4" />}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            hasData={steps.length > 0}
            className="h-full"
        >
            <div className="space-y-3">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="flex gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/20 transition-colors group"
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                {i + 1}
                            </div>
                        </div>
                        <span className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                            {step}
                        </span>
                    </div>
                ))}
            </div>
        </ProjectCard>
    );
}
