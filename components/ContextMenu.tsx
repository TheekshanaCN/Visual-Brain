'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onAddNode?: () => void;
    onDeleteNode?: () => void;
    onEditNode?: () => void;
    onDeleteEdge?: () => void;
    type: 'canvas' | 'node' | 'edge';
}

export default function ContextMenu({ x, y, onClose, onAddNode, onDeleteNode, onEditNode, onDeleteEdge, type }: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Use timeout to avoid closing immediately on the same click that opened it
        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside, true); // Use capture phase
            document.addEventListener('keydown', handleEscape);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const menuItems = type === 'canvas'
        ? [
            { icon: Plus, label: 'Add New Node', onClick: onAddNode, color: 'text-primary' }
        ]
        : type === 'edge'
            ? [
                { icon: Trash2, label: 'Delete Connection', onClick: onDeleteEdge, color: 'text-red-500' }
            ]
            : [
                { icon: Edit2, label: 'Edit Label', onClick: onEditNode, color: 'text-blue-500' },
                { icon: Trash2, label: 'Delete Node', onClick: onDeleteNode, color: 'text-red-500' }
            ];

    return (
        <AnimatePresence>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="fixed z-[100] bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl overflow-hidden min-w-[180px]"
                style={{ left: x, top: y }}
            >
                <div className="py-1">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    item.onClick?.();
                                    onClose();
                                }}
                                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                            >
                                <Icon className={`w-4 h-4 ${item.color}`} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}