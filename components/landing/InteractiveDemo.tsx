'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

const DEMO_TEXT = "Project X Launch: Need to coordinate marketing, dev, and design teams. Marketing needs assets by Friday. Dev is blocked on API. Design needs new brand guidelines.";

export default function InteractiveDemo() {
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showNodes, setShowNodes] = useState(false);

    useEffect(() => {
        if (isTyping) {
            if (text.length < DEMO_TEXT.length) {
                const timeout = setTimeout(() => {
                    setText(DEMO_TEXT.slice(0, text.length + 1));
                }, 30); // Typing speed
                return () => clearTimeout(timeout);
            } else {
                setIsTyping(false);
                setTimeout(() => setShowNodes(true), 500);
            }
        }
    }, [text, isTyping]);

    return (
        <section id="demo" className="py-32 px-6 bg-accent/5 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Input Simulation */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50" />
                        <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="ml-auto text-xs text-muted-foreground font-mono">input.txt</span>
                            </div>
                            <div className="font-mono text-sm md:text-base text-muted-foreground min-h-[200px]">
                                {text}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Visualization Result */}
                    <div className="relative h-[400px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!showNodes ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    {!isTyping && (
                                        <>
                                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                            <p className="text-muted-foreground font-medium animate-pulse">AI Analyzing...</p>
                                        </>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="nodes"
                                    className="relative w-full h-full"
                                >
                                    {/* Central Node */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 backdrop-blur-md border border-primary/50 rounded-full flex items-center justify-center text-center p-4 font-bold text-primary shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                    >
                                        Project X Launch
                                    </motion.div>

                                    {/* Satellite Nodes */}
                                    {[
                                        { label: "Marketing", x: -120, y: -80, color: "bg-purple-500/20 border-purple-500/50 text-purple-400" },
                                        { label: "Dev Team", x: 120, y: -80, color: "bg-blue-500/20 border-blue-500/50 text-blue-400" },
                                        { label: "Design", x: 0, y: 120, color: "bg-pink-500/20 border-pink-500/50 text-pink-400" },
                                    ].map((node, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                            animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                                            transition={{ type: "spring", bounce: 0.6, delay: i * 0.2 }}
                                            className={`absolute top-1/2 left-1/2 w-24 h-24 ${node.color} backdrop-blur-md border rounded-2xl flex items-center justify-center text-sm font-semibold shadow-lg`}
                                            style={{ marginLeft: -48, marginTop: -48 }}
                                        >
                                            {node.label}
                                            {/* Connection Line (Pseudo) */}
                                            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ transform: `translate(${-node.x}px, ${-node.y}px)` }}>
                                                <motion.line
                                                    x1="50%" y1="50%" x2="50%" y2="50%"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeDasharray="4 4"
                                                    className="opacity-30"
                                                />
                                            </svg>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
