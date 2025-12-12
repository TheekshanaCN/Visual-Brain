"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Italic, Plus, Sun, Moon } from "lucide-react"
import { AuthModal } from "../AuthModal";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const loginTriggerRef = React.useRef<HTMLButtonElement>(null);
  const newProjectTriggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleNewProject = () => {
    if (newProjectTriggerRef.current) {
      newProjectTriggerRef.current.click();
    }
  };

  const handleLogin = () => {
    if (loginTriggerRef.current) {
      loginTriggerRef.current.click();
    }
  };

  return (
    <>
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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogin}
                className="bg-foreground transition-all"
              >
                <span>Login</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Hidden Auth Modal Triggers */}
      <AuthModal
        trigger={<button ref={loginTriggerRef} className="hidden" />}
        mode="sign-in"
      />
      <AuthModal
        trigger={<button ref={newProjectTriggerRef} className="hidden" />}
        mode="sign-in"
      />
    </>
  );
}