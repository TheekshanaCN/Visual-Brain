import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';

export default function GlassNode({ data, selected, id }: NodeProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label as string);
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateNodeLabel, editingNodeId, setEditingNodeId } = useStore();

    // Determine node variant
    const variant = data.variant as 'root' | 'branch' | 'child' || 'child';

    // Watch for editingNodeId changes from context menu
    useEffect(() => {
        if (editingNodeId === id) {
            setIsEditing(true);
            setEditingNodeId(null); // Clear the trigger
        }
    }, [editingNodeId, id, setEditingNodeId]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (label.trim()) {
            updateNodeLabel(id, label.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setLabel(data.label as string);
            setIsEditing(false);
        }
    };

    // Dynamic styles based on variant
    const getVariantStyles = () => {
        const customColor = data.color as string;

        if (customColor) {
            return {
                borderColor: customColor,
                backgroundColor: `${customColor}20`, // 20 is hex for ~12% opacity
                boxShadow: selected
                    ? `0 0 0 2px ${customColor}40, 0 0 20px ${customColor}40`
                    : `0 0 20px ${customColor}20`,
                color: 'inherit'
            };
        }

        switch (variant) {
            case 'root':
                return { className: 'min-w-[200px] py-4 px-6 text-lg font-bold bg-primary/20 border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]' };
            case 'branch':
                return { className: 'min-w-[160px] py-3 px-5 text-base font-semibold bg-secondary/30 border-secondary/50' };
            default: // child
                return { className: 'min-w-[140px] py-2 px-4 text-sm font-medium bg-card/60 border-border' };
        }
    };

    const styles = getVariantStyles();
    const isCustom = !!data.color;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`shadow-lg rounded-full border backdrop-blur-md transition-all duration-300 text-center relative
        ${selected && !isCustom ? 'border-primary ring-2 ring-primary/20' : ''}
        ${!isCustom ? (styles as any).className : ''}
        text-card-foreground
      `}
            style={isCustom ? (styles as any) : undefined}
        >
            <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3" />

            <div onDoubleClick={handleDoubleClick} className="w-full h-full flex items-center justify-center">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-center w-full font-inherit"
                    />
                ) : (
                    <span className="pointer-events-none">{String(data.label)}</span>
                )}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3" />
        </motion.div>
    );
}
