"use client";

import { useEffect, useRef } from "react";
import InputSection from "@/components/newboard/InputSection";
import VisualMap from "@/components/newboard/VisualMap";
import FlowProvider from "@/components/FlowProvider";
import ProjectNavbarWrapper from "@/components/newboard/ProjectNavbarWrapper";
import ProjectCards from "@/components/project/ProjectCards";
import NavigationDock from "@/components/project/NavigationDock";
import OnboardingCards from "@/components/OnboardingCards";

import { AppSidebar } from "@/components/newboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ProjectPage() {
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Auto-click the trigger to open the modal on page load
    if (triggerRef.current) {
      triggerRef.current.click();
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        {/* Navbar - Now part of the flex layout, not fixed */}
        <ProjectNavbarWrapper projectId="ssssss" initialProjectName="untitle" />

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-hidden bg-background text-foreground selection:bg-primary/30 transition-colors duration-300 p-2">
          <div className="h-full relative">
            <div className="rounded-lg overflow-hidden w-full h-full relative">
              <FlowProvider>
                <VisualMap />
                <ProjectCards />
                <NavigationDock />
                <InputSection />
                <OnboardingCards />
              </FlowProvider>
            </div>
          </div>

          {/* Overlay for small screens */}
          <div className="md:hidden absolute inset-0 z-50 bg-background/80 flex items-center justify-center p-8 text-center backdrop-blur-sm">
            <div className="max-w-sm">
              <p className="text-muted-foreground mb-4">
                Please use a larger screen for the best Visual Brain experience.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Minimum recommended width: 768px
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
