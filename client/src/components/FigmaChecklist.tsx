import React, { useState } from 'react';
import { CheckCircle2, Circle, Code2 } from 'lucide-react';

const checklistItems = [
  {
    id: 'rename',
    title: 'Group & Rename Layers',
    desc: 'Change cryptic names like "Frame 12" to logical names like "Hero Section" or "Primary Button". AI agents read these names to understand components.',
  },
  {
    id: 'autolayout',
    title: 'Apply Auto Layout',
    desc: 'Wrap your rows and columns in Figma Auto Layout. This translates directly to Flexbox/CSS Grid, ensuring your generated code is naturally responsive.',
  },
  {
    id: 'variables',
    title: 'Define Local Variables',
    desc: 'Save your hex codes and font families as local Figma Styles or Variables. The MCP Server passes these as CSS variables to the IDE.',
  },
  {
    id: 'export',
    title: 'Mark for Export',
    desc: 'Any complex icons or images that Stitch generated need to be marked for export so the AI can slice them into SVGs or WebP files.',
  }
];

const FigmaChecklist = () => {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompleted(newCompleted);
  };

  const progress = (completed.size / checklistItems.length) * 100;

  return (
    <div className="bg-card/40 border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Code2 className="text-emerald-400" />
            The Figma Polish Checklist
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Raw AI output needs organization. Complete these steps <strong>before</strong> turning on the MCP Server.
          </p>

          <div className="space-y-3">
            {checklistItems.map((item) => {
              const isChecked = completed.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full text-left flex gap-4 p-4 rounded-xl transition-all border ${
                    isChecked 
                      ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                      : 'hover:bg-white/5 border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="mt-1 flex-shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold transition-colors ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-sm leading-relaxed mt-1 transition-colors ${isChecked ? 'text-emerald-foreground/80' : 'text-muted-foreground'}`}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Sidebar */}
        <div className="w-full md:w-64 bg-black/40 border border-white/5 rounded-2xl p-6 sticky top-24">
           <h3 className="font-semibold mb-4 text-center">Polish Progress</h3>
           <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className="text-white/5" 
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="text-emerald-500 transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                 <span className="text-xs text-muted-foreground uppercase tracking-wider">Done</span>
              </div>
           </div>
           
           {progress === 100 && (
             <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2">
               <div className="inline-flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                 <CheckCircle2 className="w-4 h-4" /> Ready for MCP
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default FigmaChecklist;
