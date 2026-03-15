import React from 'react';
import { ArrowRight, Zap, Cpu, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatbotUI from '../ChatbotUI';
import { SplineSceneBasic } from '../ui/spline-demo';
import LoveButton from '../ui/LoveButton';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 -mb-40 overflow-hidden">

      {/* Background glow like original design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center pt-10 max-w-6xl"
      >

        {/* Animated pill badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-sm mb-6 backdrop-blur-sm transition-all cursor-default text-zinc-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#216be4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#216be4]"></span>
          </span>
          <span className="font-medium text-sm">ReactOne — Your React Learning Hub</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-tight text-white"
        >
          Master Modern React,<br />
          One Guide at a Time
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl text-[#E9EEF5]/60 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Production-ready code guides, AI prompts, and deep-dive library references — everything you need to build modern React apps with confidence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
        >
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-sm font-bold transition-all bg-white text-black hover:bg-white/90 h-12 px-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Get Started
          </Link>
          <LoveButton label="Explore Guides" />
        </motion.div>

        {/* Spline 3D Scene Banner */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-6xl mx-auto mt-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-20"
        >
          <SplineSceneBasic />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
