'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function OnboardingCards() {
    const { nodes, inputValue } = useStore();
    const [isVisible, setIsVisible] = useState(true);

    // Filter out card-type nodes (like AI Insights, Tech Stack, etc.)
    // Only hide when there are actual graph/visual map nodes
    const graphNodes = nodes.filter(node => node.type !== 'card');

    // Hide cards when user starts typing or when graph nodes exist
    useEffect(() => {
        if (inputValue.trim() || graphNodes.length > 0) {
            setIsVisible(false);
        }
    }, [inputValue, graphNodes.length]);

    // Don't show if graph nodes already exist (not a new/empty project)
    if (graphNodes.length > 0) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-5xl w-full px-8"
                    >
                        {/* Title */}
                        <motion.h1
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-3xl font-medium text-center text-foreground mb-16"
                        >
                            How to Use IdeaForge
                        </motion.h1>

                        {/* Cards Container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
                            {/* Card 1 - Enter Your Raw Thoughts */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="stone-card premium-card-hover"
                            >
                                <div className="p-8">
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-stone-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold mb-4">
                                        1
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-foreground mb-3">
                                        Enter Your Idea
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground">
                                        Just type your raw thoughts — no structure needed
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 2 - AI Processing */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="stone-card premium-card-hover"
                            >
                                <div className="p-8">
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-stone-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold mb-4">
                                        2
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-foreground mb-4">
                                        AI Analyzes & Organizes
                                    </h3>

                                    {/* Feature list */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>Mind-map visualization</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>Key themes identified</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>Tech stack recommendations</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>Smart insights generated</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3 - Results */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="stone-card premium-card-hover"
                            >
                                <div className="p-8">
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-stone-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold mb-4">
                                        3
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-foreground mb-4">
                                        Get Actionable Results
                                    </h3>

                                    {/* Feature list */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>Next steps outlined</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>Detailed prompt to Make Idea To Reality</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600"></div>
                                            <span>MVP to-do list ready</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
