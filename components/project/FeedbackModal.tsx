"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, MessageSquare } from "lucide-react";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  projectId?: string;
}

export default function FeedbackModal({ open, onClose, projectId }: FeedbackModalProps) {
  const [feedbackCategory, setFeedbackCategory] = useState<string>("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFeedbackSubmit = async () => {
    if (!feedbackCategory || !feedbackText.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: feedbackCategory,
          feedback: feedbackText,
          projectId: projectId || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFeedbackCategory("");
        setFeedbackText("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackCategories = [
    { id: "feature", label: "✨ Feature Request" },
    { id: "bug", label: "🐛 Bug Report" },
    { id: "improvement", label: "🚀 Improvement" },
    { id: "question", label: "❓ Question" },
    { id: "other", label: "💬 Other" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank You! 🎉</h3>
            <p className="text-muted-foreground text-center">
              Your feedback has been received. We appreciate your input!
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Share Your Feedback
              </DialogTitle>
              <DialogDescription>
                Help us improve IdeaForge by sharing your thoughts, ideas, or reporting issues.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">What type of feedback?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFeedbackCategory(category.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${feedbackCategory === category.id
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/50 hover:bg-accent"
                        }`}
                    >
                      <div className="text-sm font-medium">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {feedbackCategory && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="feedback" className="text-sm font-medium">
                    Tell us more
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, ideas, or describe the issue..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="min-h-[120px] resize-none"
                    autoFocus
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  setFeedbackCategory("");
                  setFeedbackText("");
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackCategory || !feedbackText.trim() || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}