'use client';

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Brain, Moon, Sun, Pencil, Check, X, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackCategory, setFeedbackCategory] = useState<string>('');
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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

    const handleFeedbackSubmit = async () => {
        if (!feedbackCategory || !feedbackText.trim()) return;

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: feedbackCategory,
                    feedback: feedbackText,
                    projectId: projectId || null
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to submit feedback');
            }

            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setShowFeedbackModal(false);
                setFeedbackCategory('');
                setFeedbackText('');
            }, 2000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const feedbackCategories = [
        { id: 'feature', label: '✨ Feature Request', icon: '✨' },
        { id: 'bug', label: '🐛 Bug Report', icon: '🐛' },
        { id: 'improvement', label: '🚀 Improvement', icon: '🚀' },
        { id: 'question', label: '❓ Question', icon: '❓' },
        { id: 'other', label: '💬 Other', icon: '💬' }
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-[#C9B59C] backdrop-blur-md z-50">
            <div className="w-full max-w-8xl mx-auto px-2 flex items-center justify-between h-[46px]">

                <div className="flex items-center">
                    <Link href="/dashboard" className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md font-medium">

                        {/* Default (top) view */}
                        <div className="inline-flex h-10 translate-y-0 items-center justify-center px-2 text-neutral-950 transition duration-500 group-hover:-translate-y-[150%]">
                            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <Brain className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold bg-clip-text text-transparent bg-white">
                                Visual Brain
                            </span>
                        </div>

                        {/* Hover (bottom) view */}
                        <div className="absolute inline-flex h-3 w-full translate-y-[100%] items-center justify-center text-[#c9b59c] transition duration-500 group-hover:translate-y-0">
                            <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-white transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>

                            <div className="z-10 p-1.5 bg-white/10 rounded-lg">
                                <ArrowLeft className="w-4 h-4 text-[#c9b59c]" />
                            </div>
                            <span className="z-10 font-bold">Back</span>
                        </div>
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
                    <Button
                        variant="default"
                        size="sm"
                        className="gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg shadow-emerald-500/20 h-8 px-4"
                        onClick={() => setShowFeedbackModal(true)}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">Feedback</span>
                    </Button>

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


                    <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />

                </div>

            </div>

            <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
                <DialogContent className="sm:max-w-[500px]">
                    {showSuccess ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                <Check className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Thank You! 🎉</h3>
                            <p className="text-muted-foreground text-center">
                                Your feedback has been received. We appreciate your input!
                            </p>
                        </div>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Share Your Feedback
                                </DialogTitle>
                                <DialogDescription>
                                    Help us improve Visual Brain by sharing your thoughts, ideas, or reporting issues.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">What type of feedback?</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {feedbackCategories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setFeedbackCategory(category.id)}
                                                className={`p-3 rounded-lg border-2 transition-all text-left ${feedbackCategory === category.id
                                                    ? 'border-primary bg-primary/5 shadow-sm'
                                                    : 'border-border hover:border-primary/50 hover:bg-accent'
                                                    }`}
                                            >
                                                <div className="text-sm font-medium">{category.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {feedbackCategory && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <Label htmlFor="feedback" className="text-sm font-medium">
                                            Tell us more
                                        </Label>
                                        <Textarea
                                            id="feedback"
                                            placeholder="Share your thoughts, ideas, or describe the issue..."
                                            value={feedbackText}
                                            onChange={(e) => setFeedbackText(e.target.value)}
                                            className="min-h-[120px] resize-none"
                                            autoFocus
                                        />
                                    </div>
                                )}
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowFeedbackModal(false);
                                        setFeedbackCategory('');
                                        setFeedbackText('');
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleFeedbackSubmit}
                                    disabled={!feedbackCategory || !feedbackText.trim() || isSubmitting}
                                    className="gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Submit Feedback
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </header>
    );
}
