"use client"

import { useRouter } from "next/navigation"
import {
    FolderOpen,
    MoreHorizontal,
    Trash2,
    Loader2,
    ExternalLink,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

interface Project {
    _id: string;
    name: string;
    description?: string;
    updatedAt: string;
}

export function NavProjects({
    projects,
    loading,
    currentProjectId,
    onRefresh,
}: {
    projects: Project[]
    loading: boolean
    currentProjectId?: string
    onRefresh?: () => void
}) {
    const { isMobile } = useSidebar()
    const router = useRouter()

    const handleProjectClick = (projectId: string) => {
        if (projectId !== currentProjectId) {
            router.push(`/projects/${projectId}`)
        }
    }

    const handleDeleteProject = async (projectId: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                onRefresh?.()
                if (projectId === currentProjectId) {
                    router.push('/dashboard')
                }
            }
        } catch (error) {
            console.error('Failed to delete project', error)
        }
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
            <SidebarMenu>
                {loading ? (
                    <SidebarMenuItem>
                        <div className="flex items-center justify-center py-4">
                            <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        </div>
                    </SidebarMenuItem>
                ) : projects.length === 0 ? (
                    <SidebarMenuItem>
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                            <FolderOpen className="size-8 text-muted-foreground/50 mb-2" />
                            <p className="text-xs text-muted-foreground">No projects yet</p>
                        </div>
                    </SidebarMenuItem>
                ) : (
                    projects.map((project) => (
                        <SidebarMenuItem key={project._id}>
                            <SidebarMenuButton
                                asChild
                                isActive={project._id === currentProjectId}
                                tooltip={project.name}
                            >
                                <button onClick={() => handleProjectClick(project._id)}>
                                    <FolderOpen className="size-4" />
                                    <span className="truncate cursor-pointer">{project.name}</span>
                                    {project._id === currentProjectId && (
                                        <span className="ml-auto flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                    )}
                                </button>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover className="cursor-pointer">
                                        <MoreHorizontal />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem onClick={() => handleProjectClick(project._id)} className="cursor-pointer">
                                        <ExternalLink className="text-muted-foreground" />
                                        <span>Open Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => handleDeleteProject(project._id)}
                                        className="text-destructive focus:text-destructive cursor-pointer"
                                    >
                                        <Trash2 className="text-destructive" />
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
