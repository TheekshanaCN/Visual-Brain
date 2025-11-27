'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Lightbulb, Code, CheckSquare, ArrowRight } from 'lucide-react';
import type { CardNodeData } from './nodes/CardNode';

export default function ProjectCards() {
    const {
        nodes,
        setNodes,
        insight,
        setInsight,
        techStack,
        setTechStack,
        mvpChecklist,
        setMvpChecklist,
        nextSteps,
        setNextSteps,
        isGenerating
    } = useStore();

    // Add card nodes to the ReactFlow canvas when data exists
    useEffect(() => {
        if (nodes.length === 0) return;

        // Check if card nodes already exist
        const hasCardNodes = nodes.some(n => n.type === 'card');
        if (hasCardNodes) return;

        // Define card nodes positioned around the visual map
        const cardNodes = [
            // AI Insights - Top Left
            {
                id: 'card-insights',
                type: 'card',
                position: { x: -600, y: -400 },
                data: {
                    title: 'AI Insights',
                    icon: <Lightbulb className="w-4 h-4" />,
                    hasData: !!insight,
                    isGenerating,
                    onGenerate: () => {
                        setInsight({
                            summary: "This project aims to build a comprehensive visual workspace...",
                            themes: ["Productivity", "Visualization", "AI"],
                            nextSteps: ["Setup repo", "Design schema"]
                        });
                    },
                    content: insight ? (
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Summary</h4>
                                <p className="text-sm leading-relaxed text-foreground/90">{insight.summary}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Key Themes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {insight.themes.map((theme, i) => (
                                        <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                            {theme}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null
                } as CardNodeData,
                draggable: true,
            },
            // Tech Stack - Top Right
            {
                id: 'card-tech',
                type: 'card',
                position: { x: 1200, y: -400 },
                data: {
                    title: 'Tech Stack',
                    icon: <Code className="w-4 h-4" />,
                    hasData: techStack.length > 0,
                    isGenerating,
                    onGenerate: () => {
                        setTechStack([
                            { name: "Next.js", category: "Frontend", reason: "React framework" },
                            { name: "Tailwind CSS", category: "Styling", reason: "Utility-first" },
                            { name: "Framer Motion", category: "Animation", reason: "Smooth interactions" }
                        ]);
                    },
                    content: techStack.length > 0 ? (
                        <div className="space-y-3">
                            {techStack.map((tech, i) => (
                                <div key={i} className="flex items-start justify-between p-2 rounded-lg bg-muted/30 border border-border/50">
                                    <div>
                                        <div className="font-medium text-sm">{tech.name}</div>
                                        <div className="text-xs text-muted-foreground">{tech.reason}</div>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                                        {tech.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null
                } as CardNodeData,
                draggable: true,
            },
            // MVP Checklist - Bottom Left
            {
                id: 'card-mvp',
                type: 'card',
                position: { x: -600, y: 800 },
                data: {
                    title: 'MVP Checklist',
                    icon: <CheckSquare className="w-4 h-4" />,
                    hasData: mvpChecklist.length > 0,
                    isGenerating,
                    onGenerate: () => {
                        setMvpChecklist([
                            { id: "1", task: "Initialize Project", status: "completed" },
                            { id: "2", task: "Setup Database", status: "pending" },
                            { id: "3", task: "Create API Routes", status: "pending" }
                        ]);
                    },
                    content: mvpChecklist.length > 0 ? (
                        <div className="space-y-2">
                            {mvpChecklist.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.status === 'completed' ? 'bg-green-500/20 border-green-500/50' : 'border-muted-foreground/40'}`}>
                                        {item.status === 'completed' && <div className="w-2 h-2 rounded-sm bg-green-500" />}
                                    </div>
                                    <span className={`text-sm ${item.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                        {item.task}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null
                } as CardNodeData,
                draggable: true,
            },
            // Next Steps - Bottom Right
            {
                id: 'card-next',
                type: 'card',
                position: { x: 1200, y: 800 },
                data: {
                    title: 'Next Steps',
                    icon: <ArrowRight className="w-4 h-4" />,
                    hasData: nextSteps.length > 0,
                    isGenerating,
                    onGenerate: () => {
                        setNextSteps([
                            { id: "1", title: "User Research", description: "Interview potential users", priority: "high" },
                            { id: "2", title: "Prototyping", description: "Create Figma mockups", priority: "medium" }
                        ]);
                    },
                    content: nextSteps.length > 0 ? (
                        <div className="space-y-3">
                            {nextSteps.map((step) => (
                                <div key={step.id} className="p-3 rounded-xl bg-gradient-to-br from-background to-muted/30 border border-border/50">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-sm">{step.title}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${step.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                                                step.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {step.priority}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : null
                } as CardNodeData,
                draggable: true,
            },
        ];

        // Add card nodes to the existing nodes
        setNodes([...nodes, ...cardNodes]);
    }, [nodes.length, insight, techStack, mvpChecklist, nextSteps]);

    // This component doesn't render anything - it just manages card nodes
    return null;
}
