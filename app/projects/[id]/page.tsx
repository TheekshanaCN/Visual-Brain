import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import ProjectInitializer from '@/components/ProjectInitializer';
import InputSection from '@/components/InputSection';
import VisualMap from '@/components/VisualMap';
import FlowProvider from '@/components/FlowProvider';
import ProjectNavbarWrapper from '@/components/project/ProjectNavbarWrapper';
import ProjectCards from '@/components/project/ProjectCards';
import NavigationDock from '@/components/project/NavigationDock';
import OnboardingCards from '@/components/OnboardingCards';

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { user } = await withAuth();
  if (!user) {
    redirect('/newboard');
  }

  const { id } = await params;
  await connectToDatabase();

  // Use lean() to get a plain JS object, which is serializable
  const project = await Project.findOne({ _id: id, userId: user.id }).lean();

  if (!project) {
    redirect('/dashboard');
  }

  // Convert _id and dates to strings to avoid serialization issues
  const serializedProject = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
    updatedAt: project.updatedAt?.toISOString(),
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        {/* Navbar - Now part of the flex layout, not fixed */}
        <ProjectNavbarWrapper
          projectId={serializedProject._id}
          initialProjectName={serializedProject.name}
        />

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-hidden bg-background text-foreground selection:bg-primary/30 transition-colors duration-300 p-2">
          <ProjectInitializer project={serializedProject as any} />

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
                Please use a larger screen for the best experience.
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
