import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import ProjectInitializer from '@/components/ProjectInitializer';
import InputSection from '@/components/InputSection';
import VisualMap from '@/components/VisualMap';
import InsightsPanel from '@/components/InsightsPanel';
import EmptyState from '@/components/EmptyState';
import SideToolbar from '@/components/SideToolbar';
import FlowProvider from '@/components/FlowProvider';
import ProjectNavbarWrapper from '@/components/project/ProjectNavbarWrapper';
import ProjectCards from '@/components/project/ProjectCards';
import NavigationDock from '@/components/project/NavigationDock';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const { id } = await params;
  await connectToDatabase();

  // Use lean() to get a plain JS object, which is serializable
  const project = await Project.findOne({ _id: id, userId }).lean();

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
    <main className="relative w-screen h-screen overflow-hidden bg-[#C9B59C] text-foreground selection:bg-primary/30 transition-colors duration-300 pt-[46px] pb-2 px-2">
      <ProjectInitializer project={serializedProject as any} />


      <ProjectNavbarWrapper projectId={serializedProject._id} initialProjectName={serializedProject.name} />

      {/* Main Components */}
      <div className="h-full relative">
        <div className="rounded-lg overflow-hidden w-full h-full relative">
          <FlowProvider>
            <VisualMap />
            <ProjectCards />
            <NavigationDock />
            <InputSection />
            <SideToolbar />
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
  );
}
