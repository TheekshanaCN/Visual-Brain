'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/lib/store';
import { Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// --- Types ---
interface KanbanBoardProps {
    items: ChecklistItem[];
    onUpdate: (items: ChecklistItem[]) => void;
}

interface ColumnDefinition {
    id: ChecklistItem['status'];
    label: string;
    color: string;
}

// --- Constants ---
const COLUMNS: ColumnDefinition[] = [
    { id: 'pending', label: 'To Do', color: 'bg-secondary text-secondary-foreground' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-blue-500/10 text-blue-500' },
    { id: 'completed', label: 'Done', color: 'bg-green-500/10 text-green-500' }
];

/**
 * KanbanBoard Component
 * A drag-and-drop style board for managing checklist items.
 * Supports adding, removing, and moving items between columns.
 */
export default function KanbanBoard({ items, onUpdate }: KanbanBoardProps) {
    const [newItemText, setNewItemText] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // --- Handlers ---

    const handleAddItem = () => {
        if (!newItemText.trim()) return;
        const newItem: ChecklistItem = {
            id: `manual-${Date.now()}`,
            task: newItemText,
            status: 'pending'
        };
        onUpdate([...items, newItem]);
        setNewItemText('');
        setIsAdding(false);
    };

    const handleMoveItem = (itemId: string, newStatus: ChecklistItem['status']) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, status: newStatus } : item
        );
        onUpdate(updatedItems);
    };

    const handleDeleteItem = (itemId: string) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        onUpdate(updatedItems);
    };

    // --- Render ---

    return (
        <div className="flex flex-col h-full w-full">
            {/* Board Columns */}
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar h-[350px]">
                {COLUMNS.map(col => (
                    <div
                        key={col.id}
                        className="min-w-[180px] flex-1 flex flex-col gap-2 bg-muted/30 rounded-xl p-2 border border-border/50"
                    >
                        {/* Column Header */}
                        <div className={cn("text-xs font-bold uppercase px-2 py-1 rounded-md w-fit tracking-wider", col.color)}>
                            {col.label}
                        </div>

                        {/* Column Items */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 p-0.5">
                            {items.filter(item => item.status === col.id).map(item => (
                                <div
                                    key={item.id}
                                    className="bg-background border border-border/60 p-3 rounded-lg shadow-sm text-xs group relative hover:border-primary/40 hover:shadow-md transition-all duration-200"
                                >
                                    <p className="pr-5 leading-relaxed">{item.task}</p>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                                        aria-label="Delete task"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Move Controls */}
                                    <div className="flex justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity pt-2 border-t border-border/30">
                                        {col.id !== 'pending' ? (
                                            <button
                                                onClick={() => handleMoveItem(item.id, col.id === 'completed' ? 'in-progress' : 'pending')}
                                                className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                                                title="Move back"
                                            >
                                                <ArrowLeft className="w-3 h-3" />
                                            </button>
                                        ) : <div />}

                                        {col.id !== 'completed' && (
                                            <button
                                                onClick={() => handleMoveItem(item.id, col.id === 'pending' ? 'in-progress' : 'completed')}
                                                className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                                                title="Move forward"
                                            >
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {items.filter(item => item.status === col.id).length === 0 && (
                                <div className="h-20 flex items-center justify-center text-muted-foreground/30 text-[10px] italic border-2 border-dashed border-muted-foreground/10 rounded-lg">
                                    Empty
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Task Section */}
            <div className="mt-3 pt-3 border-t border-border/50">
                {isAdding ? (
                    <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <Input
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder="What needs to be done?"
                            className="h-9 text-xs"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                            autoFocus
                        />
                        <Button size="sm" className="h-9 px-3" onClick={handleAddItem}>
                            <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-9 px-3" onClick={() => setIsAdding(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-9 text-xs text-muted-foreground hover:text-primary border border-dashed border-border hover:border-primary/50 hover:bg-primary/5"
                        onClick={() => setIsAdding(true)}
                    >
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Add New Task
                    </Button>
                )}
            </div>
        </div>
    );
}
