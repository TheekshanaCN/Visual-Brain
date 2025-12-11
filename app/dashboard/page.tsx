'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, ArrowRight, Loader2, FolderOpen, Trash2, MoreVertical, Pencil } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/app/actions/auth';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Project {
    _id: string;
    name: string;
    description?: string;
    updatedAt: string;
}

export default function Dashboard() {
    const router = useRouter();
    // Replaced Clerk hooks with custom state/effect
    const [user, setUser] = useState<any>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [editProject, setEditProject] = useState<Project | null>(null);
    const [editProjectName, setEditProjectName] = useState('');
    const [editProjectDesc, setEditProjectDesc] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const u = await getCurrentUser();
                if (!u) {
                    router.push('/'); // OR WorkOS Sign In
                } else {
                    setUser(u);
                }
            } catch (error) {
                console.error("Auth check failed", error);
            } finally {
                setAuthLoading(false);
            }
        }
        checkAuth();
    }, [router]);


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

        if (user) {
            fetchProjects();
        }
    }, [user]);

    const handleCreateProject = async () => {
        setCreating(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Untitled Project', description: '' }),
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

    const handleEditProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editProjectName.trim() || !editProject) return;

        setUpdating(true);
        try {
            const res = await fetch(`/api/projects/${editProject._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editProjectName.trim(), description: editProjectDesc }),
            });

            if (res.ok) {
                const updatedProject = await res.json();
                setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p));
                setEditProject(null);
                setEditProjectName('');
                setEditProjectDesc('');
            }
        } catch (error) {
            console.error('Failed to update project', error);
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteProject = async () => {
        if (!deleteProjectId) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/projects/${deleteProjectId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setProjects(projects.filter(p => p._id !== deleteProjectId));
                setDeleteProjectId(null);
            }
        } catch (error) {
            console.error('Failed to delete project', error);
        } finally {
            setDeleting(false);
        }
    };

    if (authLoading || (loading && user)) {
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
                    <Button
                        size="lg"
                        className="gap-2 shadow-lg shadow-primary/20"
                        onClick={handleCreateProject}
                        disabled={creating}
                    >
                        {creating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Plus className="w-5 h-5" />
                        )}
                        New Project
                    </Button>
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
                                <Card className="hover:border-primary/50 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                    <Link href={`/projects/${project._id}`}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="line-clamp-1 hover:text-primary transition-colors">
                                                    {project.name}
                                                </CardTitle>
                                                <ArrowRight className="w-5 h-5 text-muted-foreground -rotate-45 hover:rotate-0 hover:text-primary transition-all duration-300" />
                                            </div>
                                            <CardDescription className="line-clamp-2 h-10">
                                                {project.description || 'No description'}
                                            </CardDescription>
                                        </CardHeader>
                                    </Link>
                                    <CardFooter className="mt-auto pt-0 text-xs text-muted-foreground flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-accent"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setEditProject(project);
                                                        setEditProjectName(project.name);
                                                        setEditProjectDesc(project.description || '');
                                                    }}
                                                >
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Edit Project
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setDeleteProjectId(project._id);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete Project
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <AlertDialog open={!!deleteProjectId} onOpenChange={(open) => !open && setDeleteProjectId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your project
                            and all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteProject}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Project Dialog */}
            <Dialog open={!!editProject} onOpenChange={(open) => {
                if (!open) {
                    setEditProject(null);
                    setEditProjectName('');
                    setEditProjectDesc('');
                }
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                            Update your project details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditProject}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Project Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editProjectName}
                                    onChange={(e) => setEditProjectName(e.target.value)}
                                    placeholder="e.g., Marketing Strategy"
                                    autoFocus
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-description">Description (Optional)</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editProjectDesc}
                                    onChange={(e) => setEditProjectDesc(e.target.value)}
                                    placeholder="Brief description..."
                                    className="resize-none"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setEditProject(null);
                                    setEditProjectName('');
                                    setEditProjectDesc('');
                                }}
                                disabled={updating}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!editProjectName.trim() || updating}>
                                {updating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Updating...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
