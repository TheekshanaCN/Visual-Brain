'use client';

import { useReactFlow } from '@xyflow/react';
import { Lightbulb, Code, CheckSquare, ArrowRight, Map, Compass, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function NavigationDock() {
    const { fitView, setCenter } = useReactFlow();

    const zoomToNode = (nodeId: string) => {
        fitView({
            nodes: [{ id: nodeId }],
            duration: 800,
            padding: 0.5,
        });
    };

    const zoomToMap = () => {
        // Zoom to the center cluster area (where the main visual map is)
        setCenter(500, 300, { zoom: 0.8, duration: 800 });
    };

    const showAll = () => {
        // Fit all nodes in view including cards
        fitView({
            duration: 800,
            padding: 0.2,
        });
    };

    const navItems = [
        { id: 'all', label: 'Show All', icon: Compass, action: showAll },
        { id: 'map', label: 'Map', icon: Map, action: zoomToMap },
        { id: 'card-insights', label: 'AI Insights', icon: Lightbulb, action: () => zoomToNode('card-insights') },
        { id: 'card-tech', label: 'Tech Stack', icon: Code, action: () => zoomToNode('card-tech') },
        { id: 'card-mvp', label: 'MVP', icon: CheckSquare, action: () => zoomToNode('card-mvp') },
        { id: 'card-next', label: 'Next Steps', icon: ArrowRight, action: () => zoomToNode('card-next') },
    ];

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed right-4 bottom-8 z-50 pointer-events-auto cursor-move"
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        >
            <div className="flex flex-col gap-2 p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl">
                <div className="flex items-center gap-2 px-2 pb-2 border-b border-border/50">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <Compass className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground">Navigate</span>
                </div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            size="sm"
                            onClick={item.action}
                            className="h-9 px-3 gap-2 hover:bg-primary/10 hover:text-primary transition-all justify-start cursor-pointer"
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Button>
                    );
                })}
            </div>
        </motion.div>
    );
}
