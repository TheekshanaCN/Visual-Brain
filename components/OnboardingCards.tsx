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
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-6xl w-full px-8"
                    >
                        {/* Title */}
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-5xl font-serif text-center text-white mb-12 italic drop-shadow-2xl"
                        >
                            How to Use SandBoard
                        </motion.h1>

                        {/* Cards Container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
                            {/* Card 1 - Enter Your Thoughts */}
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative bg-gradient-to-br from-white/95 to-white/90 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="aspect-[4/3] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    {/* Upload Illustration */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="w-48 h-48 border-4 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white/50">
                                            <div className="text-center">
                                                <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                <p className="text-sm text-gray-500 font-medium">Enter your idea</p>
                                                <p className="text-xs text-gray-400 mt-1">Type in the input below</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-6 bg-white border-t border-gray-200 flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                                        1
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Enter your thoughts</h3>
                                </div>
                            </motion.div>

                            {/* Card 2 - AI Processing */}
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="relative bg-gradient-to-br from-white/95 to-white/90 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="aspect-[4/3] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    {/* AI Processing Illustration */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="text-center space-y-3">
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                <span className="text-sm font-medium">Generate visuals</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-medium">Organize ideas</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-medium">Create structure</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-medium">AI insights</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-6 bg-white border-t border-gray-200 flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                                        2
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">AI organizes & visualizes</h3>
                                </div>
                            </motion.div>

                            {/* Card 3 - Results */}
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative bg-gradient-to-br from-white/95 to-white/90 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="aspect-[4/3] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
                                    {/* Results Illustration */}
                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                        {/* Simulated Dashboard Cards */}
                                        <div className="absolute inset-0 p-4 space-y-2">
                                            {/* Dashboard card */}
                                            <div className="bg-white rounded-lg shadow-md p-3 transform rotate-[-2deg] transition-transform">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500"></div>
                                                    <div className="flex-1">
                                                        <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                                        <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Web page card */}
                                            <div className="bg-white rounded-lg shadow-md p-3 transform rotate-[1deg] transition-transform">
                                                <div className="h-2 bg-blue-200 rounded mb-2"></div>
                                                <div className="h-2 bg-blue-100 rounded w-3/4 mb-2"></div>
                                                <div className="flex gap-1">
                                                    <div className="h-12 w-16 bg-yellow-400 rounded"></div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="h-1 bg-gray-200 rounded"></div>
                                                        <div className="h-1 bg-gray-200 rounded"></div>
                                                        <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Image card */}
                                            <div className="bg-white rounded-lg shadow-md p-2 transform rotate-[2deg] transition-transform">
                                                <div className="h-16 bg-gradient-to-br from-orange-300 to-pink-300 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-6 bg-white border-t border-gray-200 flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                                        3
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Get amazing results</h3>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
