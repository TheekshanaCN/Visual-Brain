'use client';

import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { getClerkAppearance } from '@/lib/clerk-appearance';
import { Sparkles } from 'lucide-react';

export default function Page() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
            {/* Top Header */}
            <div className="w-full px-4 text-center border-b">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Your Unicorn Awaits
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Left Side - Image/Hero */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-500 via-blue-600 to-purple-700 dark:from-purple-900 dark:via-blue-900 dark:to-purple-950">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-grid-white/10 bg-grid-16" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Start Your Journey
                        </h2>
                        <p className="text-lg text-white/80 max-w-md">
                            Join thousands of creators building amazing experiences with our platform
                        </p>
                    </div>
                </div>

                {/* Right Side - Sign Up Form */}
                <div className="flex-1 flex items-center justify-center px-4 py-12 lg:px-8">
                    <SignUp appearance={getClerkAppearance(isDark)} />
                </div>
            </div>
        </div>
    );
}