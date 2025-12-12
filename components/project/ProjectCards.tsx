'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Lightbulb, Code, CheckSquare, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { CardNodeData } from './nodes/CardNode';
import KanbanBoard from './KanbanBoard';
import NextStepsList from './NextStepsList';

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
        ideaId
    } = useStore();

    // Add card nodes to the ReactFlow canvas when data exists
    useEffect(() => {
        // Helper to create or update a card node
        const createOrUpdateCard = (
            id: string,
            position: { x: number; y: number },
            data: Partial<CardNodeData>,
            defaultStyle?: React.CSSProperties
        ) => {
            const existingNode = nodes.find(n => n.id === id);

            if (existingNode) {
                // Update existing node data but keep position and dimensions
                return {
                    ...existingNode,
                    data: {
                        ...existingNode.data,
                        ...data
                    }
                };
            } else {
                // Create new node
                return {
                    id,
                    type: 'card',
                    position,
                    data,
                    draggable: true,
                    style: defaultStyle,
                };
            }
        };

        const newNodes = [...nodes];
        let hasChanges = false;

        // Define card definitions
        const cardDefinitions = [
            {
                id: 'card-insights',
                position: { x: -600, y: -400 },
                defaultStyle: { width: 340, height: 400 },
                data: {
                    title: 'AI Insights',
                    icon: <Lightbulb className="w-4 h-4" />,
                    hasData: !!insight,
                    isGenerating: false,
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
                }
            },
            {
                id: 'card-tech',
                position: { x: 1200, y: -400 },
                defaultStyle: { width: 340, height: 400 },
                data: {
                    title: 'Tech Stack',
                    icon: <Code className="w-4 h-4" />,
                    hasData: techStack.length > 0,
                    isGenerating: false,
                    onGenerate: async () => {
                        const updateNodeLoading = (isLoading: boolean) => {
                            setNodes(useStore.getState().nodes.map(n =>
                                n.id === 'card-tech'
                                    ? { ...n, data: { ...n.data, isGenerating: isLoading } }
                                    : n
                            ));
                        };

                        updateNodeLoading(true);

                        try {
                            // Use ideaId returned from the initial process call
                            if (!ideaId) {
                                toast.error('No AI ID found. Please generate a map first.');
                                return;
                            }
                            const res = await fetch(`/api/tech-stack/${ideaId}`, {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                            });

                            if (!res.ok) {
                                const errText = await res.text();
                                throw new Error(`Generation failed: ${res.status} ${errText}`);
                            }

                            const data = await res.json();
                            setTechStack(data);
                            toast.success('Tech Stack generated!');
                        } catch (error) {
                            console.error(error);
                            toast.error('Failed to generate Tech Stack');
                        } finally {
                            updateNodeLoading(false);
                        }
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
                }
            },
            {
                id: 'card-mvp',
                position: { x: -600, y: 800 },
                defaultStyle: { width: 800, height: 500 },
                data: {
                    title: 'MVP Checklist',
                    icon: <CheckSquare className="w-4 h-4" />,
                    hasData: mvpChecklist.length > 0,
                    isGenerating: false,
                    onGenerate: async () => {
                        const updateNodeLoading = (isLoading: boolean) => {
                            setNodes(useStore.getState().nodes.map(n =>
                                n.id === 'card-mvp'
                                    ? { ...n, data: { ...n.data, isGenerating: isLoading } }
                                    : n
                            ));
                        };

                        updateNodeLoading(true);

                        try {
                            if (!ideaId) {
                                toast.error('No AI ID found. Please generate a map first.');
                                return;
                            }
                            const res = await fetch(`/api/mvp/${ideaId}`, {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                            });

                            if (!res.ok) {
                                const errText = await res.text();
                                throw new Error(`Generation failed: ${res.status} ${errText}`);
                            }

                            const data = await res.json();

                            const newChecklist: any[] = [];
                            if (data.todo) {
                                data.todo.forEach((task: string, i: number) =>
                                    newChecklist.push({ id: `todo-${i}`, task, status: 'pending' })
                                );
                            }
                            if (data.inProgress) {
                                data.inProgress.forEach((task: string, i: number) =>
                                    newChecklist.push({ id: `prog-${i}`, task, status: 'in-progress' })
                                );
                            }
                            if (data.done) {
                                data.done.forEach((task: string, i: number) =>
                                    newChecklist.push({ id: `done-${i}`, task, status: 'completed' })
                                );
                            }

                            setMvpChecklist(newChecklist);
                            toast.success('MVP Checklist generated!');
                        } catch (error) {
                            toast.error('Failed to generate MVP Checklist');
                        } finally {
                            updateNodeLoading(false);
                        }
                    },
                    content: mvpChecklist.length > 0 ? (
                        <KanbanBoard
                            items={mvpChecklist}
                            onUpdate={setMvpChecklist}
                        />
                    ) : null
                }
            },
            {
                id: 'card-next',
                position: { x: 1200, y: 800 },
                defaultStyle: { width: 340, height: 400 },
                data: {
                    title: 'Next Steps',
                    icon: <ArrowRight className="w-4 h-4" />,
                    hasData: nextSteps.length > 0,
                    isGenerating: false,
                    onGenerate: () => {
                        setNextSteps([
                            { id: "1", title: "User Research", description: "Interview potential users", priority: "high" },
                            { id: "2", title: "Prototyping", description: "Create Figma mockups", priority: "medium" }
                        ]);
                    },
                    content: nextSteps.length > 0 ? (
                        <NextStepsList
                            items={nextSteps}
                            onUpdate={setNextSteps}
                        />
                    ) : null
                }
            }
        ];

        // Use functional update to access latest nodes without adding 'nodes' to dependency array
        setNodes((currentNodes) => {
            const newNodes = [...currentNodes];
            let hasChanges = false;

            cardDefinitions.forEach(def => {
                const existingIndex = newNodes.findIndex(n => n.id === def.id);
                // We need to pass the current nodes to createOrUpdateCard logic, 
                // but createOrUpdateCard currently uses 'nodes' from closure which is stale.
                // Let's inline the logic or pass currentNodes.

                if (existingIndex !== -1) {
                    const existingNode = newNodes[existingIndex];
                    // Merge data
                    newNodes[existingIndex] = {
                        ...existingNode,
                        data: {
                            ...existingNode.data,
                            ...def.data
                        }
                    };
                    // We assume data changed because dependencies (insight, etc) changed
                    hasChanges = true;
                } else {
                    newNodes.push({
                        id: def.id,
                        type: 'card',
                        position: def.position,
                        data: def.data,
                        draggable: true,
                        style: def.defaultStyle,
                    } as any);
                    hasChanges = true;
                }
            });

            return hasChanges ? newNodes : currentNodes;
        });

    }, [insight, techStack, mvpChecklist, nextSteps, setNodes]);

    // This component doesn't render anything - it just manages card nodes
    return null;
}
