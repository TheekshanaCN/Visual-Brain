'use client';

import { CheckSquare, Check, Circle } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { useState } from 'react';

interface MVPChecklistCardProps {
    checklist: string[];
    onGenerate: () => void;
    isGenerating: boolean;
}

export default function MVPChecklistCard({ checklist, onGenerate, isGenerating }: MVPChecklistCardProps) {
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

    const toggleItem = (index: number) => {
        const newChecked = new Set(checkedItems);
        if (newChecked.has(index)) {
            newChecked.delete(index);
        } else {
            newChecked.add(index);
        }
        setCheckedItems(newChecked);
    };

    return (
        <ProjectCard
            title="MVP Checklist"
            icon={<CheckSquare className="w-8 h-4" />}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            hasData={checklist.length > 0}
            className="h-full w-full"
        >
            <div className="space-y-2">
                {checklist.map((item, i) => {
                    const isChecked = checkedItems.has(i);
                    return (
                        <div
                            key={i}
                            onClick={() => toggleItem(i)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group
                                ${isChecked
                                    ? 'bg-primary/5 border-primary/20'
                                    : 'bg-card border-border/50 hover:border-primary/20 hover:bg-muted/30'
                                }
                            `}
                        >
                            <div className={`mt-0.5 transition-colors ${isChecked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'}`}>
                                {isChecked ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            </div>
                            <span className={`text-sm leading-relaxed transition-all ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                {item}
                            </span>
                        </div>
                    );
                })}
            </div>
        </ProjectCard>
    );
}
