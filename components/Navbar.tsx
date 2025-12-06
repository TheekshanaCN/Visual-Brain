'use client';

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Brain, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AuthModal } from '@/components/AuthModal';
import { getClerkAppearance } from '@/lib/clerk-appearance';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { isSignedIn } = useUser();
    const { setTheme, theme } = useTheme();
    const isDark = theme === 'dark';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-sm'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        Visual Brain
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {isSignedIn ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                            <UserButton
                                appearance={getClerkAppearance(isDark)}
                            />
                        </>
                    ) : (
                        <>
                            <>
                                <AuthModal
                                    mode="sign-in"
                                    trigger={<Button variant="ghost">Sign In</Button>}
                                />
                                <AuthModal
                                    mode="sign-up"
                                    trigger={
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                            Get Started
                                        </Button>
                                    }
                                />
                            </>
                        </>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="flex flex-col gap-4 mt-8">
                                {isSignedIn ? (
                                    <>
                                        <Link href="/dashboard">
                                            <Button variant="ghost" className="w-full justify-start">
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <div className="flex justify-start px-4">
                                            <UserButton appearance={getClerkAppearance(isDark)} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <>
                                            <AuthModal
                                                mode="sign-in"
                                                trigger={
                                                    <Button variant="ghost" className="w-full justify-start">
                                                        Sign In
                                                    </Button>
                                                }
                                            />
                                            <AuthModal
                                                mode="sign-up"
                                                trigger={
                                                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                                        Get Started
                                                    </Button>
                                                }
                                            />
                                        </>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
