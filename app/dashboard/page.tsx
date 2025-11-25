'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Plus, Calendar, ArrowRight, Loader2, FolderOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface Project {
    _id: string;
    name: string;
    description?: string;
    updatedAt: string;
}

export default function Dashboard() {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setLoading(false);
            }
        }

        if (isSignedIn) {
            fetchProjects();
        }
    }, [isSignedIn]);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectName.trim()) return;

        setCreating(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newProjectName, description: newProjectDesc }),
            });

            if (res.ok) {
                const project = await res.json();
                router.push(`/projects/${project._id}`);
            }
        } catch (error) {
            console.error('Failed to create project', error);
            setCreating(false);
        }
    };

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">My Projects</h1>
                        <p className="text-muted-foreground">Manage your Visual Brain sessions</p>
                    </div>
                    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                                <Plus className="w-5 h-5" />
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Start a new visual session to organize your thoughts.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateProject}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Project Name</Label>
                                        <Input
                                            id="name"
                                            value={newProjectName}
                                            onChange={(e) => setNewProjectName(e.target.value)}
                                            placeholder="e.g., Marketing Strategy"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            value={newProjectDesc}
                                            onChange={(e) => setNewProjectDesc(e.target.value)}
                                            placeholder="Brief description..."
                                            className="resize-none"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={!newProjectName.trim() || creating}>
                                        {creating ? (
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        ) : (
                                            'Create Project'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {projects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl bg-card/50"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <FolderOpen className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                        <p className="text-muted-foreground mb-8 text-center max-w-md">
                            Create your first project to start visualizing your ideas.
                        </p>
                        <Button onClick={() => setShowCreateModal(true)} variant="outline">
                            Create Project
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/projects/${project._id}`}>
                                    <Card className="group hover:border-primary/50 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                                                    {project.name}
                                                </CardTitle>
                                                <ArrowRight className="w-5 h-5 text-muted-foreground -rotate-45 group-hover:rotate-0 group-hover:text-primary transition-all duration-300" />
                                            </div>
                                            <CardDescription className="line-clamp-2 h-10">
                                                {project.description || 'No description'}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="mt-auto pt-0 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
