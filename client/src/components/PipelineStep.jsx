import React from 'react';

const PipelineStep = ({ number, title, description, tools, colorClass, gradientClass, icon }) => {
  return (
    <div className="relative flex flex-col md:flex-row gap-8 items-center bg-card/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-card/40 transition-all duration-300">
      
      {/* Visual Connector Line (Hidden on mobile) */}
      <div className="absolute left-1/2 -top-16 -bottom-16 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block -z-10" />

      {/* Step Indicator */}
      <div className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg ${gradientClass}`}>
        <span className="text-white drop-shadow-md">{number}</span>
      </div>

      {/* Content */}
      <div className="flex-grow space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-3xl font-bold">{title}</h3>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
        
        {/* Tools Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tools.map((tool, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 rounded-full text-sm font-medium border border-white/10 ${colorClass}`}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineStep;
