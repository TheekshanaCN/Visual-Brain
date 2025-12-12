'use client';

import { ReactFlowProvider } from '@xyflow/react';

export default function FlowProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactFlowProvider>
            {children}
        </ReactFlowProvider>
    );
}
