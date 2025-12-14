'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import { useStore } from '@/lib/store';

interface ProjectNavbarWrapperProps {
    projectId: string;
    initialProjectName: string;
}

export default function ProjectNavbarWrapper({ projectId, initialProjectName }: ProjectNavbarWrapperProps) {
    const { tags, projectName, setProjectName } = useStore();

    // Use initialProjectName as fallback if store hasn't loaded yet (though initializer runs first)
    // or if we are verifying SSR hydration.
    const displayName = projectName || initialProjectName;

    return (
        <Navbar
            projectId={projectId}
            projectName={displayName}
            onProjectNameUpdate={setProjectName}
            tags={tags}
        />
    );
}
