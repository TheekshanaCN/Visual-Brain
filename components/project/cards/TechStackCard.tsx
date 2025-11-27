'use client';

import { Layers } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface TechStackCardProps {
    techStack: string[];
    onGenerate: () => void;
    isGenerating: boolean;
}

export default function TechStackCard({ techStack, onGenerate, isGenerating }: TechStackCardProps) {
    return (
        <ProjectCard
            title="Tech Stack"
            icon={<Layers className="w-4 h-4" />}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            hasData={techStack.length > 0}
            className="h-full"
        >
            <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/50 text-sm font-medium"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {tech}
                    </div>
                ))}
            </div>
        </ProjectCard>
    );
}
