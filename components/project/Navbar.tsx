"use client";

import Link from "next/link";
import { Pencil, Check, X, MessageSquare, Download, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import FeedbackModal from "@/components/project/FeedbackModal";
import { toPng } from "html-to-image";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

interface NavbarProps {
  projectId?: string;
  projectName?: string;
  onProjectNameUpdate?: (newName: string) => void;
  tags?: string[];
}

export default function Navbar({
  projectId,
  projectName,
  onProjectNameUpdate,
  tags,
}: NavbarProps) {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    setEditedName(projectName || "");
  }, [projectName]);

  const handleSave = async () => {
    if (!editedName.trim() || !projectId) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName.trim() }),
      });

      if (res.ok) {
        onProjectNameUpdate?.(editedName.trim());
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update project name", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedName(projectName || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleExport = async () => {
    const viewport = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;
    if (!viewport) return;

    try {
      // Temporarily hide card nodes for the snapshot
      const cardNodes = viewport.querySelectorAll('[data-id^="card-"]');
      cardNodes.forEach((node) => {
        (node as HTMLElement).style.display = "none";
      });

      // Take the snapshot
      const dataUrl = await toPng(viewport, {
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        width: viewport.scrollWidth,
        height: viewport.scrollHeight,
        style: {
          width: "100%",
          height: "100%",
          transform: "scale(1)",
        },
      });

      // Restore card nodes visibility
      cardNodes.forEach((node) => {
        (node as HTMLElement).style.display = "";
      });

      const link = document.createElement("a");
      link.download = "visual-brain-snapshot.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);

      // Ensure card nodes are restored even if export fails
      const cardNodes = viewport.querySelectorAll('[data-id^="card-"]');
      cardNodes.forEach((node) => {
        (node as HTMLElement).style.display = "";
      });
    }
  };

  return (
    <header className="sticky top-0 w-full bg-background/60 backdrop-blur-md z-40 shrink-0 border-b border-border/40">
      <div className="w-full max-w-8xl mx-auto px-2 flex items-center justify-between h-[46px]">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle */}
          <SidebarTrigger className="h-8 w-8 text-foreground hover:bg-muted transition-colors" />

          {/* Tags Display */}
          {tags && tags.length > 0 && (
            <div className="hidden md:flex items-center gap-2 ml-2 pl-4 border-l border-border/40 h-6">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground text-[10px] font-medium border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Center - Project Title */}
        {projectName && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-8 w-64 text-sm font-serif"
                  autoFocus
                  disabled={isSaving}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                  onClick={handleSave}
                  disabled={isSaving || !editedName.trim()}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group/title">
                <h1 className="text-lg font-serif font-bold text-foreground">
                  {projectName}
                </h1>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 opacity-0 group-hover/title:opacity-100 transition-opacity"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowFeedbackModal(true)}
            className="
        gap-2 h-8 px-4
        bg-foreground text-background border border-border
        shadow-lg
        overflow-hidden relative inline-flex items-center justify-center
        transition-all duration-100
        [box-shadow:5px_5px_rgba(var(--foreground),0.2)]
        active:translate-x-[3px] active:translate-y-[3px]
        active:[box-shadow:0px_0px_transparent]
        cursor-pointer
    "
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Feedback</span>
          </Button>
          <Button
            className="gap-2 h-8 px-4 cursor-pointer border bg-background text-foreground hover:bg-muted"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </Button>

          <Button
            className="gap-2 h-8 px-4 cursor-pointer border bg-background text-foreground hover:bg-muted"
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">Pricing</span>
          </Button>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        open={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        projectId={projectId}
      />
    </header>
  );
}
