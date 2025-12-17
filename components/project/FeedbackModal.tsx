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
import { Check, Send, Sparkles, Bug, TrendingUp, HelpCircle, MessageCircle } from "lucide-react";

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
    {
      id: "feature",
      label: "Feature Request",
      icon: Sparkles,
      description: "Suggest new ideas"
    },
    {
      id: "bug",
      label: "Bug Report",
      icon: Bug,
      description: "Report an issue"
    },
    {
      id: "improvement",
      label: "Improvement",
      icon: TrendingUp,
      description: "Enhance existing"
    },
    {
      id: "question",
      label: "Question",
      icon: HelpCircle,
      description: "Ask us anything"
    },
    {
      id: "other",
      label: "Other",
      icon: MessageCircle,
      description: "General feedback"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] border-stone-200 dark:border-stone-800 max-h-[90vh] flex flex-col p-0">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 px-6">
            <div className="w-14 h-14 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center mb-4 ring-4 ring-stone-200/50 dark:ring-stone-800/50">
              <Check className="w-7 h-7 text-stone-800 dark:text-stone-200" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-stone-900 dark:text-stone-100">
              Feedback Received
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 text-center max-w-sm leading-relaxed">
              Thank you for your input. It shapes our future.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader className="px-6 pt-6 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
                  <MessageCircle className="w-4.5 h-4.5 text-stone-700 dark:text-stone-300" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    We Value Your Feedback
                  </DialogTitle>
                  <DialogDescription className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    Help us build something better together
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="px-6 py-3 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  What would you like to share?
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setFeedbackCategory(category.id)}
                        className={`
                          group relative px-3 py-2.5 rounded-lg text-left
                          transition-all duration-200
                          ${feedbackCategory === category.id
                            ? "bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 shadow-md ring-2 ring-stone-900 dark:ring-stone-100"
                            : "bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 hover:shadow-sm"
                          }
                        `}
                      >
                        <div className="flex items-start gap-2">
                          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feedbackCategory === category.id
                              ? "text-stone-50 dark:text-stone-900"
                              : "text-stone-600 dark:text-stone-400"
                            }`} strokeWidth={2} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium mb-0.5">
                              {category.label}
                            </div>
                            <div className={`text-xs ${feedbackCategory === category.id
                                ? "text-stone-300 dark:text-stone-700"
                                : "text-stone-500 dark:text-stone-500"
                              }`}>
                              {category.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {feedbackCategory && (
                <div className="space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label
                    htmlFor="feedback"
                    className="text-sm font-medium text-stone-700 dark:text-stone-300"
                  >
                    Tell us more
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, ideas, or describe the issue in detail..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="min-h-[100px] resize-none bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 focus:border-stone-400 dark:focus:border-stone-600 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-800"
                    autoFocus
                  />
                  <div className="flex items-start gap-2 px-2.5 py-2 bg-stone-100/50 dark:bg-stone-900/50 rounded-lg border border-stone-200/50 dark:border-stone-800/50">
                    <div className="w-3.5 h-3.5 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-600 dark:bg-stone-400" />
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Your feedback helps shape our roadmap. Be specific to help us understand better.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0 px-6 pb-6 pt-3 shrink-0 border-t border-stone-200/50 dark:border-stone-800/50">
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  setFeedbackCategory("");
                  setFeedbackText("");
                }}
                disabled={isSubmitting}
                className="border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackCategory || !feedbackText.trim() || isSubmitting}
                className="gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-stone-400 dark:border-stone-600 border-t-stone-50 dark:border-t-stone-900 rounded-full animate-spin" />
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Feedback</span>
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