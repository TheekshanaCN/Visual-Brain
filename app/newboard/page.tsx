'use client'

import { useEffect, useRef } from 'react'
import InputSection from '@/components/newboard/InputSection'
import SideToolbar from '@/components/SideToolbar'
import FlowProvider from '@/components/FlowProvider'
import ProjectNavbarWrapper from '@/components/newboard/ProjectNavbarWrapper'
import NavigationDock from '@/components/project/NavigationDock'
import VisualMap from '@/components/newboard/VisualMap'
import OnboardingCards from '@/components/OnboardingCards'
import { AuthModal } from '@/components/AuthModal'

export default function ProjectPage() {
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Auto-click the trigger to open the modal on page load
    if (triggerRef.current) {
      triggerRef.current.click()
    }
  }, [])

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#C9B59C] text-foreground selection:bg-primary/30 transition-colors duration-300 pt-[46px] pb-2 px-2">

      <ProjectNavbarWrapper
        projectId="ssssss"
        initialProjectName="untitle"
      />

      <div className="h-full relative">
        <div className="rounded-lg overflow-hidden w-full h-full relative">
          <FlowProvider>
            <VisualMap />
            <NavigationDock />
            <InputSection />
            <SideToolbar />
            <OnboardingCards />
          </FlowProvider>
        </div>
      </div>

      {/* Mobile screen block */}
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

      {/* Hidden Auth Modal that auto-opens */}
      <AuthModal 
        trigger={<button ref={triggerRef} className="hidden" />} 
        mode="sign-in"
      />
    </main>
  )
}