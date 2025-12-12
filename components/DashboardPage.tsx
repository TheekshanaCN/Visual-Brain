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

export default function DashboardPage() {
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
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <main className="container mx-auto px-6 pt-24 pb-16 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold mb-1.5 tracking-tight">
                            PROJECTS
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                        </p>
                    </div>
                    <Button
                        size="default"
                        className="gap-2 h-10 px-5 cursor-pointer"
                        onClick={handleCreateProject}
                        disabled={creating}
                    >
                        {creating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                        New Project
                    </Button>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 rounded-2xl border border-dashed border-border/60"
                    >
                        <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
                            <FolderOpen className="w-7 h-7 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1.5">No projects yet</h3>
                        <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                            Create your first project to get started
                        </p>
                        <Button
                            onClick={handleCreateProject}
                            variant="outline"
                            size="sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Project
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03, duration: 0.3 }}
                            >
                                <Card className="group h-full flex flex-col border-border/60 hover:border-border hover:shadow-sm transition-all duration-200">
                                    <Link href={`/projects/${project._id}`} className="flex-1">
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                    <FolderOpen className="w-4.5 h-4.5 text-muted-foreground" />
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-muted-foreground/40 -rotate-45 group-hover:rotate-0 group-hover:text-muted-foreground transition-all duration-200 shrink-0" />
                                            </div>
                                            <CardTitle className="text-base font-medium line-clamp-1 mb-1.5">
                                                {project.name}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2 text-sm leading-relaxed min-h-[2.5rem]">
                                                {project.description || 'No description'}
                                            </CardDescription>
                                        </CardHeader>
                                    </Link>
                                    <CardFooter className="pt-3 border-t border-border/40 flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 hover:bg-muted"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <MoreVertical className="w-3.5 h-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setEditProject(project);
                                                        setEditProjectName(project.name);
                                                        setEditProjectDesc(project.description || '');
                                                    }}
                                                >
                                                    <Pencil className="w-3.5 h-3.5 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive cursor-pointer text-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setDeleteProjectId(project._id);
                                                    }}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                                                    Delete
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
