"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Italic, Plus, LayoutDashboard, Sun, Moon } from "lucide-react";
import { getCurrentUser } from "@/app/actions/auth";

import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarRail,
} from "@/components/ui/sidebar";

interface Project {
  _id: string;
  name: string;
  description?: string;
  updatedAt: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const params = useParams();
  const { theme, setTheme } = useTheme();
  const currentProjectId = params?.id as string;
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    setMounted(true);
    fetchProjects();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserData({
          name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : "User",
          email: user.email || "",
          avatar: user.profilePictureUrl || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  }

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = () => {
    router.push("/newboard");
  };


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-accent to-accent/60 text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200 cursor-pointer">
                <Italic className="w-4 h-4 text-accent-foreground relative z-10 transition-transform duration-300 hover:rotate-12" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-serif font-bold tracking-wide">Idea<span className="text-[#d4b999]">Forge</span></span>
                <span className="truncate text-xs text-muted-foreground">
                  Idea to Reality
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Create New Project */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleNewProject}
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-sm active:scale-95"
              >
                <Plus className="size-4" />
                <span className="font-medium">New Project</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Dashboard Link */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/dashboard")}
                tooltip="Dashboard"
              >
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Projects List */}
        <NavProjects
          projects={projects}
          loading={loading}
          currentProjectId={currentProjectId}
          onRefresh={fetchProjects}
        />
      </SidebarContent>
      {/* Theme Toggle */}
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            {mounted && (
              <SidebarMenuButton
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-sidebar-accent/50"
              >
                {theme === "dark" ? (
                  <Sun className="size-8" />
                ) : (
                  <Moon className="size-8" />
                )}
                <span>Toggle Theme</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarFooter className="border-t border-sidebar-border">
        {userData ? <NavUser user={userData} /> : <div className="p-4 text-xs text-muted-foreground">Loading user...</div>}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
