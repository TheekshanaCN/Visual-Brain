'use client';

import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, Brain, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

const sampleIdeas = [
    {
        icon: Lightbulb,
        title: "Project Ideas",
        text: "Build a mobile app for fitness tracking\nCreate an online marketplace for handmade crafts\nDevelop a task management system\nDesign a recipe sharing platform"
    },
    {
        icon: Brain,
        title: "Research Topics",
        text: "AI in healthcare\nClimate change solutions\nQuantum computing applications\nSpace exploration\nRenewable energy technologies"
    },
    {
        icon: Zap,
        title: "Learning Goals",
        text: "Master React and TypeScript\nLearn system design patterns\nUnderstand machine learning basics\nImprove UI/UX design skills"
    }
];

export default function EmptyState() {
    const { nodes, setInputValue, setInputDockOpen } = useStore();

    if (nodes.length > 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 flex items-center justify-center p-8 pointer-events-none"
        >
            <div className="max-w-4xl text-center pointer-events-auto">
                {/* Header */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 shadow-premium">
                        <Sparkles className="w-10 h-10 text-primary/80" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">
                        Visual Brain
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Transform your thoughts into clear, organized visual maps.
                    </p>
                </motion.div>

                {/* Sample Ideas */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {sampleIdeas.map((idea, i) => {
                            const Icon = idea.icon;
                            return (
                                <motion.button
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    onClick={() => {
                                        setInputValue(idea.text);
                                        // Focus logic handled by store/input component
                                    }}
                                    className="group bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-background/80 hover:border-primary/20 hover:shadow-premium transition-all text-left"
                                >
                                    <div className="mb-4 p-3 rounded-xl bg-muted/50 w-fit group-hover:bg-primary/10 transition-colors">
                                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors">
                                        {idea.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                        {idea.text.split('\n').join(' • ')}
                                    </p>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
