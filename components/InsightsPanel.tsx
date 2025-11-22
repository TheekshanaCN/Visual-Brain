'use client';

import { useStore } from '@/lib/store';
import { Lightbulb, ListTodo, Tag } from 'lucide-react';

export default function InsightsPanel() {
  const { insight } = useStore();

  if (!insight) return null;

  return (
    <div className="absolute top-24 right-4 z-10 w-80 bg-black/40 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-xl max-h-[calc(100vh-7rem)] overflow-y-auto">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
        <Lightbulb className="w-4 h-4 text-yellow-400" />
        AI Insights
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2 font-medium">Summary</h4>
          <p className="text-sm text-white/90 leading-relaxed">
            {insight.summary}
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2 font-medium flex items-center gap-1">
            <Tag className="w-3 h-3" /> Themes
          </h4>
          <div className="flex flex-wrap gap-2">
            {insight.themes.map((theme, i) => (
              <span key={i} className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/5">
                {theme}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2 font-medium flex items-center gap-1">
            <ListTodo className="w-3 h-3" /> Next Steps
          </h4>
          <ul className="space-y-2">
            {insight.nextSteps.map((step, i) => (
              <li key={i} className="text-sm text-white/80 flex gap-2">
                <span className="text-blue-400 mt-1">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
