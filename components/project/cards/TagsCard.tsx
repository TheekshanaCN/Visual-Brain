'use client';

import { Tag } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Badge } from '@/components/ui/badge';

interface TagsCardProps {
    tags: string[];
    onGenerate: () => void;
    isGenerating: boolean;
}

export default function TagsCard({ tags, onGenerate, isGenerating }: TagsCardProps) {
    return (
        <ProjectCard
            title="Tags"
            icon={<Tag className="w-4 h-4" />}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            hasData={tags.length > 0}
            className="h-full"
        >
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <Badge
                        key={i}
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </ProjectCard>
    );
}
