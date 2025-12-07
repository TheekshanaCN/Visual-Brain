'use client';
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { AuthModal } from '../AuthModal';

export default function VisualMap() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const authTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (authTriggerRef.current) {
      authTriggerRef.current.click();
    }
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <>
      <div 
        className="w-full h-full bg-background"
        onContextMenu={handleContextMenu}
      >
        <ReactFlow
          nodes={[]} // Empty nodes array
          edges={[]} // Empty edges array
          proOptions={{ hideAttribution: true }}
          className="bg-background"
          minZoom={0.1}
          maxZoom={2}
          fitView
        >
          <Background
            color={isDark ? '#333' : '#e5e7eb'}
            gap={20}
            variant="dots" // Options: 'dots', 'lines', 'cross'
          />
        </ReactFlow>
      </div>

      {/* Hidden Auth Modal */}
      <AuthModal 
        trigger={<button ref={authTriggerRef} className="hidden" />} 
        mode="sign-in"
      />
    </>
  );
}