'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import { useStore } from '@/lib/store';

interface ProjectNavbarWrapperProps {
    projectId: string;
    initialProjectName: string;
}

export default function ProjectNavbarWrapper({ projectId, initialProjectName }: ProjectNavbarWrapperProps) {
    const [projectName, setProjectName] = useState(initialProjectName);
    const { tags } = useStore();

    return (
        <Navbar
            projectId={projectId}
            projectName={projectName}
            onProjectNameUpdate={setProjectName}
            tags={tags}
        />
    );
}
