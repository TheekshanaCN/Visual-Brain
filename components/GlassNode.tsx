import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';

export default function GlassNode({ data, selected, id }: NodeProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label as string);
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateNodeLabel, editingNodeId, setEditingNodeId } = useStore();

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

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-4 py-2 shadow-lg rounded-full border backdrop-blur-md transition-all duration-300 min-w-[150px] text-center
        ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}
        bg-card/60 text-card-foreground
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3" />

            <div className="font-medium text-sm" onDoubleClick={handleDoubleClick}>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-center w-full"
                    />
                ) : (
                    data.label as string
                )}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3" />
        </motion.div>
    );
}
