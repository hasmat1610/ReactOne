import React from 'react';
import { ArrowRight, Zap, Cpu, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatbotUI from '../ChatbotUI';
import { SplineSceneBasic } from '../ui/spline-demo';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-10 overflow-hidden">

      {/* Background glow like original design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center pt-10">

        {/* Animated pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-sm mb-6 backdrop-blur-sm transition-all cursor-default">
          <span className="w-2 h-2 bg-[#40E0FF] rounded-full animate-pulse" />
          <span className="text-[#E9EEF5] font-medium text-sm">ReactOne — Your React Learning Hub</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-tight text-white">
          Master Modern React,<br />
          One Guide at a Time
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-xl text-[#E9EEF5]/60 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Production-ready code guides, AI prompts, and deep-dive library references — everything you need to build modern React apps with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all bg-white text-black hover:bg-white/90 h-12 px-8"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors bg-transparent text-white hover:bg-white/5 border border-white/20 h-12 px-8"
          >
            Explore Guides
          </a>
        </div>

        {/* Spline 3D Scene Banner */}
        <div className="w-full max-w-6xl mx-auto mt-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-20">
          <SplineSceneBasic />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
