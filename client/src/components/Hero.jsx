import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-20 overflow-visible text-white">
      {/* 
        No background color here so that the SplashCursor from App.jsx 
        can be seen clearly underneath everything.
      */}
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs font-medium uppercase tracking-widest text-white/70 animate-fade-in-up">
          <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
          Engineering Pipeline
        </div>
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase" style={{ wordSpacing: '-0.1em' }}>
          Design <br/>
          <span className="text-white/40 italic font-serif lowercase tracking-normal -ml-2">to</span><br/>
          Code
        </h1>
        
        <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
          The ultimate pipeline for teams shipping faster. Orchestrate Google Stitch, Figma, & MCP Servers autonomously.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          <button className="px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
            Start the Journey
          </button>
          <button className="px-10 py-5 rounded-full border border-white/20 hover:border-white/50 bg-black/50 backdrop-blur-sm text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto">
            Explore Architecture
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
