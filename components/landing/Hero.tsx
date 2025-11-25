'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Brain } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
        stiffness: 100,
        damping: 30
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    // Mouse move effect for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            ref={ref}
            className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-20 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
                }}
            />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-[10%] right-[10%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <motion.div
                style={{ y, opacity, scale }}
                className="container mx-auto px-6 relative z-10 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Badge variant="outline" className="mb-8 px-6 py-2 text-sm border-primary/20 bg-primary/5 text-primary rounded-full backdrop-blur-md shadow-lg shadow-primary/10">
                        <Sparkles className="w-4 h-4 mr-2 inline-block animate-pulse" />
                        <span className="font-semibold tracking-wide">V 2.0 IS LIVE</span>
                    </Badge>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                        Think at the <br />
                        <span className="relative inline-block">
                            <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-2xl opacity-20" />
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-300%">
                                Speed of Light
                            </span>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
                        Stop wrestling with messy notes. <span className="text-foreground font-medium">Visual Brain</span> uses advanced AI to instantly transform your chaotic thoughts into structured, interactive knowledge maps.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/dashboard">
                            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-2xl shadow-primary/20 transition-all hover:scale-105 hover:-translate-y-1">
                                Start Visualizing <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="#demo">
                            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-border/50 bg-background/50 hover:bg-accent/50 backdrop-blur-md transition-all hover:scale-105">
                                Live Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* 3D Tilt Visual */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 20, y: 100 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    className="mt-24 relative mx-auto max-w-5xl perspective-1000"
                >
                    <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-2 shadow-2xl shadow-blue-500/20 transform-gpu transition-transform hover:scale-[1.01] duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-2xl" />
                        <div className="aspect-[16/9] rounded-xl bg-neutral-900/90 overflow-hidden relative flex items-center justify-center border border-white/5 group">
                            {/* Animated Grid Background */}
                            <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-[0.05]">
                                {Array.from({ length: 1600 }).map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-white/20" />
                                ))}
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                                >
                                    <Brain className="w-16 h-16 text-blue-400" />
                                </motion.div>
                            </div>

                            {/* Orbiting Nodes */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-16 h-16 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm flex items-center justify-center"
                                    animate={{
                                        rotate: 360,
                                        x: [100, 150, 100],
                                        y: [0, 50, 0],
                                    }}
                                    transition={{
                                        duration: 10 + i * 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 2,
                                    }}
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        marginTop: -32,
                                        marginLeft: -32,
                                        transformOrigin: `${-100 + i * 50}px 50%`
                                    }}
                                >
                                    <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
