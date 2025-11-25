'use client';

import { motion } from 'framer-motion';
import { Zap, Brain, Share2, Lock, Layout, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "Instant Visualization",
        description: "Paste any text, and watch as AI instantly transforms it into a structured node graph.",
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        className: "md:col-span-2",
        gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
        title: "Smart Grouping",
        description: "Related concepts are automatically clustered together, revealing hidden connections.",
        icon: <Layout className="w-6 h-6 text-blue-400" />,
        className: "md:col-span-1",
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "AI Insights",
        description: "Get automated summaries, key themes, and actionable next steps from your messy notes.",
        icon: <Brain className="w-6 h-6 text-purple-400" />,
        className: "md:col-span-1",
        gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "Export & Share",
        description: "Download high-quality snapshots of your mind maps to share with your team.",
        icon: <Share2 className="w-6 h-6 text-green-400" />,
        className: "md:col-span-2",
        gradient: "from-green-500/20 to-emerald-500/20"
    },
];

export default function BentoGrid() {
    return (
        <section className="py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Everything you need to <br />
                        <span className="text-muted-foreground">think clearly.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl border border-white/10 bg-card/30 backdrop-blur-sm p-8 hover:bg-card/50 transition-all duration-500",
                                feature.className
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                feature.gradient
                            )} />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-background/50 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                                        {feature.icon}
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
