'use client';

import { useStore } from '@/lib/store';
import { Lightbulb, ChevronRight, Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InsightsPanel() {
  const { insight, insightsPanelOpen, toggleInsightsPanel } = useStore();

  if (!insight) return null;

  return (
    <>
      {/* Toggle Button - Side Strip */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          right: insightsPanelOpen ? '400px' : '0px'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={toggleInsightsPanel}
        className={`fixed top-1/2 -translate-y-1/2 z-40 p-1.5 rounded-l-xl border-y border-l border-border/50 shadow-sm transition-colors duration-300 group
          ${insightsPanelOpen ? 'bg-background border-r border-border/50 rounded-r-none' : 'bg-background/80 backdrop-blur-md hover:bg-background hover:pr-3'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${!insightsPanelOpen && 'rotate-180'}`} />
          <span className="writing-vertical-rl text-[10px] font-medium text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
            {insightsPanelOpen ? 'Close' : 'Insights'}
          </span>
        </div>
      </motion.button>

      {/* Insights Panel - Side Drawer */}
      <AnimatePresence>
        {insightsPanelOpen && (
          <motion.div
            key="insights-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-30 w-[400px] bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-foreground">
                  AI Insights
                </h3>
              </div>
              <button
                onClick={toggleInsightsPanel}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Summary */}
              <section className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Summary
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {insight.summary}
                </p>
              </section>

              {/* Themes */}
              <section className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Key Themes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {insight.themes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium border border-border/50"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </section>

              {/* Action Items */}
              <section className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Next Steps
                </h4>
                <div className="space-y-2">
                  {insight.nextSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/20 transition-colors group"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {i + 1}
                        </div>
                      </div>
                      <span className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
