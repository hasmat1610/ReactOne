import React, { useState } from 'react';
import { CheckCircle2, Copy, Sparkles, XCircle } from 'lucide-react';

const promptTemplates = [
  {
    id: 'ecommerce',
    label: 'E-Commerce Product Page',
    badPrompt: "Make a page for a shoe store.",
    badReason: "Too vague. Stitch has to guess the layout, the target audience, and the branding, which usually results in a generic, messy output.",
    parts: [
      { text: "Design an ", type: "static" },
      { text: "e-commerce product page", type: "variable", key: "type" },
      { text: " for ", type: "static" },
      { text: "high-end running shoes", type: "variable", key: "niche" },
      { text: ". Keep the vibe ", type: "static" },
      { text: "clean and minimalist with a lot of whitespace", type: "variable", key: "theme" },
      { text: ". Sections: ", type: "static" },
      { text: "A large hero product image on the left, product details and a bold 'Add to Cart' button on the right, followed by a 'Related Products' 4-column grid below", type: "variable", key: "sections" },
      { text: ". Use a ", type: "static" },
      { text: "light gray background with energetic orange accents", type: "variable", key: "colors" },
      { text: ".", type: "static" }
    ],
    goodReason: "It explicitly tells Stitch how to structure the layout (left/right split, 4-column grid) and gives clear color direction."
  },
  {
    id: 'dashboard',
    label: 'Analytics Dashboard',
    badPrompt: "Create a data dashboard.",
    badReason: "\"Dashboard\" can mean a million different things. Stitch won't know what metrics to prioritize or how to organize the navigation.",
    parts: [
      { text: "Create a ", type: "static" },
      { text: "web-based analytics dashboard", type: "variable", key: "type" },
      { text: " for a ", type: "static" },
      { text: "social media manager", type: "variable", key: "niche" },
      { text: ". The vibe should be ", type: "static" },
      { text: "professional and data-heavy", type: "variable", key: "theme" },
      { text: ". Sections: ", type: "static" },
      { text: "A left-hand navigation sidebar, a top row with 4 summary metric cards (followers, engagement, clicks, revenue), and a main content area featuring a large line chart and a 'Recent Posts' data table", type: "variable", key: "sections" },
      { text: ". Use a ", type: "static" },
      { text: "sleek dark mode UI with vibrant blue and green for the data visualizations", type: "variable", key: "colors" },
      { text: ".", type: "static" }
    ],
    goodReason: "It defines the exact UI components needed (sidebar, metric cards, line chart, data table) and sets a specific dark mode aesthetic."
  },
  {
    id: 'portfolio',
    label: 'Personal Portfolio',
    badPrompt: "Design a portfolio website for me.",
    badReason: "It lacks structure. The AI will likely generate a standard template that doesn't fit the user's specific content.",
    parts: [
      { text: "Design a ", type: "static" },
      { text: "single-page personal portfolio", type: "variable", key: "type" },
      { text: " for a ", type: "static" },
      { text: "UX designer", type: "variable", key: "niche" },
      { text: ". The vibe should be ", type: "static" },
      { text: "creative, modern, and accessible", type: "variable", key: "theme" },
      { text: ". Sections: ", type: "static" },
      { text: "A hero section with a circular profile photo and a bold greeting, a 'Selected Works' masonry grid showing 6 project thumbnails, a 'Skills' section with pill-shaped tags, and a simple contact form at the bottom", type: "variable", key: "sections" },
      { text: ". Use a ", type: "static" },
      { text: "warm beige background with dark charcoal typography", type: "variable", key: "colors" },
      { text: ".", type: "static" }
    ],
    goodReason: "It dictates the exact flow of the page from top to bottom, making the transition into Figma Auto Layout much easier later on."
  }
];

const PromptBuilder = () => {
  const [activeTemplate, setActiveTemplate] = useState('ecommerce');
  const [copied, setCopied] = useState(false);

  const template = promptTemplates.find(t => t.id === activeTemplate) || promptTemplates[0];

  const getFullText = () => {
    if (!template) return '';
    return template.parts.map(p => p.text).join('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!template) return null;

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center">
        {promptTemplates.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTemplate(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTemplate === t.id 
                ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Bad Prompt Section */}
        <div className="lg:col-span-1 bg-red-500/5 border border-red-500/20 rounded-2xl p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 text-red-400 mb-4 font-semibold">
            <XCircle className="w-5 h-5" /> The Weak Prompt
          </div>
          <div className="bg-black/40 p-4 rounded-lg font-mono text-sm text-white/70 mb-4 border border-red-500/10">
            "{template.badPrompt}"
          </div>
          <div className="mt-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-red-400/80 block mb-1">Why it fails:</span>
              {template.badReason}
            </p>
          </div>
        </div>

        {/* Good Prompt Section */}
        <div className="lg:col-span-2 relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
             <div className="flex justify-between items-start mb-6 gap-4">
                <div className="flex items-center gap-2 text-green-400 font-semibold">
                  <Sparkles className="w-5 h-5" />
                  The Pro Formula
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors text-muted-foreground hover:text-white"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
             </div>
            
            <div className="font-mono text-sm sm:text-base leading-relaxed tracking-tight mb-6">
              {template.parts.map((part, i) => (
                part.type === 'static' ? (
                  <span key={i} className="text-white/80">{part.text}</span>
                ) : (
                  <span 
                    key={i} 
                    className="inline-block px-1.5 py-0.5 mx-0.5 my-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-sm leading-tight"
                    title={`Variable: ${part.key}`}
                  >
                    [{part.text}]
                  </span>
                )
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-green-400/80 block mb-1">Why it works:</span>
                {template.goodReason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;
