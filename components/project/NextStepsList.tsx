'use client';

import { useState } from 'react';
import { NextStepItem } from '@/lib/store';
import { Plus, X, Edit2, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// --- Types ---
interface NextStepsListProps {
    items: NextStepItem[];
    onUpdate: (items: NextStepItem[]) => void;
}

/**
 * NextStepsList Component
 * A list view for managing next steps with priority levels.
 * Supports adding, editing, and deleting steps.
 */
export default function NextStepsList({ items, onUpdate }: NextStepsListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<NextStepItem['priority']>('medium');

    // --- Handlers ---

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setEditingId(null);
        setIsAdding(false);
    };

    const handleSave = () => {
        if (!title.trim()) return;

        if (editingId) {
            // Update existing
            const updatedItems = items.map(item =>
                item.id === editingId
                    ? { ...item, title, description, priority }
                    : item
            );
            onUpdate(updatedItems);
        } else {
            // Add new
            const newItem: NextStepItem = {
                id: `manual-${Date.now()}`,
                title,
                description,
                priority
            };
            onUpdate([...items, newItem]);
        }
        resetForm();
    };

    const handleEdit = (item: NextStepItem) => {
        setEditingId(item.id);
        setTitle(item.title);
        setDescription(item.description);
        setPriority(item.priority);
        setIsAdding(false);
    };

    const handleDelete = (itemId: string) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        onUpdate(updatedItems);
    };

    // --- Render ---

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1 p-1">
                {items.map((step) => (
                    <div
                        key={step.id}
                        className={cn(
                            "p-3 rounded-xl border transition-all duration-200 group relative",
                            editingId === step.id
                                ? "bg-muted/50 border-primary shadow-sm"
                                : "bg-gradient-to-br from-background to-muted/30 border-border/50 hover:border-primary/30 hover:shadow-md"
                        )}
                    >
                        {editingId === step.id ? (
                            <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title"
                                    className="h-8 text-sm font-medium"
                                    autoFocus
                                />
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                    className="h-16 text-xs resize-none"
                                />
                                <div className="flex items-center justify-between">
                                    <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                        <SelectTrigger className="h-7 w-[100px] text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex gap-1">
                                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive" onClick={resetForm}>
                                            <X className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button size="sm" className="h-7 w-7 p-0" onClick={handleSave}>
                                            <Check className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm">{step.title}</span>
                                    <span className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide",
                                        step.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                                            step.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                                'bg-blue-500/10 text-blue-500'
                                    )}>
                                        {step.priority}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground pr-6 leading-relaxed">{step.description}</p>

                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background/80 backdrop-blur-sm rounded-md p-0.5 border border-border/50 shadow-sm">
                                    <button onClick={() => handleEdit(step)} className="p-1 hover:text-primary transition-colors rounded hover:bg-muted">
                                        <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button onClick={() => handleDelete(step.id)} className="p-1 hover:text-destructive transition-colors rounded hover:bg-muted">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {items.length === 0 && !isAdding && (
                    <div className="h-20 flex items-center justify-center text-muted-foreground/30 text-xs italic border-2 border-dashed border-muted-foreground/10 rounded-xl">
                        No next steps defined
                    </div>
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-border/50">
                {isAdding ? (
                    <div className="space-y-2 bg-muted/30 p-2 rounded-lg border border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="New Step Title"
                            className="h-8 text-sm font-medium"
                            autoFocus
                        />
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="h-16 text-xs resize-none"
                        />
                        <div className="flex items-center justify-between">
                            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                <SelectTrigger className="h-7 w-[100px] text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-1">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={resetForm}>
                                    <X className="w-3.5 h-3.5" />
                                </Button>
                                <Button size="sm" className="h-7 w-7 p-0" onClick={handleSave}>
                                    <Check className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-9 text-xs text-muted-foreground hover:text-primary border border-dashed border-border hover:border-primary/50 hover:bg-primary/5"
                        onClick={() => {
                            resetForm();
                            setIsAdding(true);
                        }}
                    >
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Next Step
                    </Button>
                )}
            </div>
        </div>
    );
}
