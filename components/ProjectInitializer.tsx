'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';
import { IProject } from '@/models/Project';
import { toast } from 'sonner';

interface ProjectInitializerProps {
    project: IProject;
}

export default function ProjectInitializer({ project }: ProjectInitializerProps) {
    const { setNodes, setEdges, setClusters, setInsight, nodes, edges, clusters, insight } = useStore();
    const initialized = useRef(false);
    const saveTimeout = useRef<NodeJS.Timeout>(null);

    // Initialize store
    useEffect(() => {
        if (!initialized.current && project.data) {
            if (project.data.nodes) setNodes(project.data.nodes);
            if (project.data.edges) setEdges(project.data.edges);
            if (project.data.clusters) setClusters(project.data.clusters);
            if (project.data.insight) setInsight(project.data.insight);
            initialized.current = true;
        }
    }, [project, setNodes, setEdges, setClusters, setInsight]);

    // Auto-save
    useEffect(() => {
        if (!initialized.current) return;

        const saveData = async () => {
            try {
                const data = {
                    nodes,
                    edges,
                    clusters,
                    insight,
                };

                const res = await fetch(`/api/projects/${project._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                });

                if (!res.ok) {
                    throw new Error('Failed to save');
                }
                console.log('Project saved successfully');
            } catch (error) {
                console.error('Error saving project:', error);
                toast.error('Failed to save project');
            }
        };

        // Debounce save
        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
        }

        saveTimeout.current = setTimeout(saveData, 2000); // Save after 2 seconds of inactivity

        return () => {
            if (saveTimeout.current) {
                clearTimeout(saveTimeout.current);
            }
        };
    }, [nodes, edges, clusters, insight, project._id]);

    return null;
}
