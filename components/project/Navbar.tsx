'use client';

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Brain, Moon, Sun, Pencil, Check, X, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface NavbarProps {
    projectId?: string;
    projectName?: string;
    onProjectNameUpdate?: (newName: string) => void;
    tags?: string[];
}

export default function Navbar({ projectId, projectName, onProjectNameUpdate, tags }: NavbarProps) {
    const { isSignedIn } = useUser();
    const { setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(projectName || '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setEditedName(projectName || '');
    }, [projectName]);

    const handleSave = async () => {
        if (!editedName.trim() || !projectId) return;

        setIsSaving(true);
        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editedName.trim() }),
            });

            if (res.ok) {
                onProjectNameUpdate?.(editedName.trim());
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to update project name', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditedName(projectName || '');
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-background/60 backdrop-blur-md z-50">
            <div className="w-full max-w-8xl mx-auto px-6 flex items-center justify-between h-[46px]">

                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Brain className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Visual Brain
                        </span>
                    </Link>

                    {/* Tags Display */}
                    {tags && tags.length > 0 && (
                        <div className="hidden md:flex items-center gap-2 ml-2 pl-4 border-l border-border/40 h-6">
                            {tags.slice(0, 3).map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground text-[10px] font-medium border border-border/50"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Center - Project Title */}
                {projectName && (
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="h-8 w-64 text-sm"
                                    autoFocus
                                    disabled={isSaving}
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                                    onClick={handleSave}
                                    disabled={isSaving || !editedName.trim()}
                                >
                                    <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 group/title">
                                <h1 className="text-sm font-semibold text-foreground">
                                    {projectName}
                                </h1>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 opacity-0 group-hover/title:opacity-100 transition-opacity"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {isSignedIn ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="px-4 h-8 text-sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <Button variant="ghost" className="text-sm px-3 h-8">Sign In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="text-sm px-4 h-8 bg-blue-600 hover:bg-blue-500 text-white">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
}
