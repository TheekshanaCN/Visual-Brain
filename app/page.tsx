'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import BentoGrid from '@/components/landing/BentoGrid';
import InteractiveDemo from '@/components/landing/InteractiveDemo';
import { Brain } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden transition-colors duration-300">
            <Navbar />

            <Hero />
            <BentoGrid />
            <InteractiveDemo />

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-border bg-card/50 backdrop-blur-lg">
                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Brain className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Visual Brain</span>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                        <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Visual Brain.
                    </div>
                </div>
            </footer>
        </div>
    );
}
