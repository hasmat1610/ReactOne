import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Sparkles, Database, Code, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const BentoFeatures = () => {
  return (
    <section id="features" className="py-24 pt-48 relative overflow-hidden bg-[#000000]">
      {/* Background glow for primary color #216be4 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#216be4]/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl perspective-2000">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* --- Row 1 --- */}

          {/* Auth Guides (col-span-2) */}
          <motion.div
            whileHover={{ rotateY: 4, rotateX: -2, z: 20, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-2 perspective-1000"
          >
            <Link to="/auth-flow-code" className="h-full group relative rounded-3xl border border-white/5 bg-[#0a0d14] p-8 text-left overflow-hidden transition-all hover:border-[#216be4]/30 flex flex-col justify-between no-underline">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#216be4]/10 border border-[#216be4]/20 flex items-center justify-center text-[#216be4] shadow-[0_0_15px_rgba(33,107,228,0.2)]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Auth Guides</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md">
                  Production-ready authentication flows — Google OAuth, email/password login, signup, OTP verification, and password recovery.
                </p>
              </div>

              {/* Auth Mock UI */}
              <div className="mt-auto space-y-4">
                <button className="w-full py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-zinc-300 text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Sign In with Google
                </button>

                <div className="flex items-center gap-3 text-xs text-zinc-600">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span>or</span>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="space-y-3">
                  <input type="email" placeholder="Email" readOnly className="w-full py-3 px-4 rounded-xl border border-white/5 bg-black/40 text-zinc-300 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#216be4]/50" />
                  <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/5">
                    Sign In
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Library Deep-Dives (col-span-1) */}
          <motion.div
            whileHover={{ rotateY: 5, rotateX: -2, z: 20, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="col-span-1 perspective-1000"
          >
            <Link to="/axios-react" className="h-full group relative rounded-3xl border border-white/5 bg-[#0a0d14] p-8 text-left overflow-hidden transition-all hover:border-[#216be4]/30 flex flex-col justify-between no-underline">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#216be4]/10 border border-[#216be4]/20 flex items-center justify-center text-[#216be4] shadow-[0_0_15px_rgba(33,107,228,0.2)]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Library Guides</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Deep-dive guides for every essential React library — from state management to form handling.
                </p>
              </div>

              {/* Library Mock UI */}
              <div className="mt-auto space-y-2.5 font-mono text-xs">
                {[
                  { name: 'Axios', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                  { name: 'Redux Toolkit', color: 'text-violet-400', bg: 'bg-violet-400/10' },
                  { name: 'Zustand', color: 'text-orange-400', bg: 'bg-orange-400/10' },
                  { name: 'TanStack Query', color: 'text-rose-400', bg: 'bg-rose-400/10' },
                  { name: 'React Hook Form', color: 'text-sky-400', bg: 'bg-sky-400/10' },
                ].map((lib) => (
                  <div key={lib.name} className="flex items-center gap-3 p-2.5 rounded-lg border border-white/5 bg-black/40">
                    <span className={`${lib.color} ${lib.bg} px-2 py-0.5 rounded font-semibold text-[10px]`}>{lib.name}</span>
                  </div>
                ))}
              </div>
            </Link>
          </motion.div>

          {/* AI Prompts (col-span-1) */}
          <motion.div
            whileHover={{ rotateY: 5, rotateX: -2, z: 20, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="col-span-1 perspective-1000"
          >
            <Link to="/figma-mcp" className="h-full group relative rounded-3xl border border-white/5 bg-[#0a0d14] p-8 text-left overflow-hidden transition-all hover:border-[#216be4]/30 flex flex-col justify-between no-underline">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#216be4]/10 border border-[#216be4]/20 flex items-center justify-center text-[#216be4] shadow-[0_0_15px_rgba(33,107,228,0.2)]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">AI Prompts</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Ready-to-use master prompts for scaffolding React projects with AI tools like Figma MCP.
                </p>
              </div>

              {/* AI Prompts Mock UI */}
              <div className="mt-auto space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg border border-white/5 bg-black/40 text-zinc-400">
                  <span className="text-[#216be4]">"</span>Generate a login form with React Hook Form + Zod...<span className="text-[#216be4]">"</span>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-black/40 text-zinc-400">
                  <span className="text-[#216be4]">"</span>Create an Axios instance with interceptors...<span className="text-[#216be4]">"</span>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-black/40 text-zinc-400">
                  <span className="text-[#216be4]">"</span>Build a Redux Toolkit store with async thunks...<span className="text-[#216be4]">"</span>
                </div>

                <div className="flex items-center gap-2 pt-2 text-zinc-600 font-sans mt-2">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs">Copy &middot; Scaffold &middot; Ship</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* --- Row 2 --- */}

          <motion.div
            whileHover={{ rotateY: 5, rotateX: -2, z: 20, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="col-span-1 perspective-1000"
          >
            <Link to="/supabase-guide" className="h-full group relative rounded-3xl border border-white/5 bg-[#0a0d14] p-8 text-left overflow-hidden transition-all hover:border-[#3ECF8E]/30 flex flex-col justify-between no-underline">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 flex items-center justify-center text-[#3ECF8E] shadow-[0_0_15px_rgba(62,207,142,0.2)]">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Supabase Guide</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Authentication, PostgreSQL, RLS policies, and full-stack integration patterns.
                </p>
              </div>

              {/* Backend Mock UI */}
              <div className="mt-auto space-y-3 font-mono text-xs text-white/40">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
                  <span className="text-[#3ECF8E]/70 bg-[#3ECF8E]/10 px-2 py-0.5 rounded font-semibold text-[10px]">AUTH</span>
                  <span className="text-zinc-400">/supabase-login</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
                  <span className="text-sky-400/70 bg-sky-400/10 px-2 py-0.5 rounded font-semibold text-[10px]">DATA</span>
                  <span className="text-zinc-400">/api/fetch-posts</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* UI/UX Guides (col-span-2) */}
          <motion.div
            whileHover={{ rotateY: -4, rotateX: -2, z: 20, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="col-span-2 perspective-1000"
          >
            <Link to="/stitch-guide" className="h-full group relative rounded-3xl border border-white/5 bg-[#0a0d14] p-8 text-left overflow-hidden transition-all hover:border-[#216be4]/30 flex flex-col justify-between no-underline">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#216be4]/10 border border-[#216be4]/20 flex items-center justify-center text-[#216be4] shadow-[0_0_15px_rgba(33,107,228,0.2)]">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">UI/UX Guides</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  AI-powered UI generation workflows — turn Figma designs into production React code.
                </p>
              </div>

              {/* UI/UX Mock UI */}
              <div className="mt-auto space-y-3">
                <div className="p-4 rounded-xl border border-white/5 bg-black/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Palette className="w-4 h-4 text-[#216be4]" />
                      Stitch Guide
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-semibold">
                      AI-Powered
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500 space-x-2">
                    <span>Figma → Code</span>
                    <span>&middot;</span>
                    <span>MCP Pipeline</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-white/5 bg-black/40 flex flex-col items-center justify-center text-center">
                    <span className="text-[#216be4] font-mono font-bold text-sm">Design</span>
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mt-1">Input</span>
                  </div>
                  <div className="p-3 rounded-xl border border-white/5 bg-black/40 flex flex-col items-center justify-center text-center">
                    <span className="text-emerald-400 font-mono font-bold text-sm">React</span>
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mt-1">Output</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Explore All (col-span-1) */}
          <div className="col-span-1 group relative rounded-3xl border border-white/5 bg-[#0a0d14] p-8 text-left overflow-hidden transition-all hover:border-[#216be4]/30 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#216be4]/20 to-purple-500/20 border border-[#216be4]/20 flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-7 h-7 text-[#216be4]" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">Explore All</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Browse all guides, code snippets, and AI prompts in our growing library.
              </p>
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#216be4] hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(33,107,228,0.3)] hover:shadow-[0_0_30px_rgba(33,107,228,0.5)]">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
