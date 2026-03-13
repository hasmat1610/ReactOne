import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowLeft, Bot, Youtube } from 'lucide-react';
import PromptBuilder from '../../components/PromptBuilder';
import StitchMentor from '../../components/StitchMentor';

const StitchGuide = () => {
  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans pb-24 selection:bg-blue-500/30">
      {/* Navigation Bar */}


      {/* Article Content */}
      <main className="container mx-auto px-4 max-w-3xl pt-32 pb-16">

        {/* Banner Image Prototype */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-indigo-900 via-purple-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
          {/* Abstract Wave Pattern */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
            background: `radial-gradient(circle at 50% 120%, rgba(120, 119, 198, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(14, 165, 233, 0.3), transparent 30%)`
          }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
              background: `conic-gradient(from 0deg, transparent 0 340deg, white 360deg)`,
              maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
            }}></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Stitch</span>
          </h1>
        </div>



        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Google Stitch For UI Design</h1>




          {/* Author Meta */}
          <div className="flex items-center gap-4 mb-10 text-sm">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Author" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-base">Travis Miller</div>
              <div className="text-slate-400">Product Designer</div>
            </div>
            <div className="text-slate-500 ml-auto flex items-center gap-4">
              <span>Nov 12, 2023</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-500"></span> 5 min read</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-8 text-lg">
            Whether you are building a SaaS dashboard or a simple landing page, speeding up the UI design process is critical. Google Stitch uses natural language prompts to generate structural layouts that seamlessly bridge the gap between ideation and production. Let's break down how you can leverage Stitch to accelerate your UI design workflow.
          </p>

          {/* Video Embed Placeholder */}
          <div className="w-full aspect-video bg-[#111827] rounded-2xl border border-white/10 mb-10 relative overflow-hidden group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200" alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />

            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">UI Design with Google Stitch Tutorial</h3>
                  <p className="text-slate-300 font-medium">Travis Miller</p>
                </div>
                <div className="hidden md:block">
                  <span className="bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded font-mono">14:05</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <Youtube className="w-16 h-16 md:w-20 md:h-20 text-[#FF0000] bg-white rounded-full transition-transform group-hover:scale-110 shadow-lg" />
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-6 text-lg">
            One of the most profound shifts in modern UI design is moving from manual pixel-pushing to structural generation. By utilizing a Model Context Protocol (<strong className="text-white">MCP</strong>) server, Stitch connects the output of an AI directly into your Figma workspace.
          </p>
          <p className="text-slate-300 leading-relaxed mb-10 text-lg">
            Think of it as having a junior designer who instantly sets up autolayout, basic colors, and container structures, so you can spend your time perfecting the typography, gradients, and micro-interactions.
          </p>

          <h3 className="text-2xl font-bold text-white mb-5">The Perfect Prompt Structure</h3>
          <p className="text-slate-300 mb-6 text-lg">
            To get the most out of Stitch, your prompts need to be descriptive, structural, and clear about the layout intent. Here is an example of an effective prompt:
          </p>

          {/* Code Block */}
          <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden mb-10 shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2333] border-b border-white/5 text-xs text-slate-400 font-mono">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <span className="ml-2 pl-2 border-l border-white/10">prompt.txt</span>
            </div>
            <div className="p-6 font-mono text-sm md:text-base text-slate-300 leading-loose overflow-x-auto">
              <span className="text-sky-400 font-semibold">Create</span> a modern dashboard Hero section that includes:<br />
              <br />
              1. A top navigation bar with a logo left, and auth buttons right<br />
              2. A large headline saying <span className="text-emerald-400">"Accelerate your AI Apps"</span><br />
              3. A "Get Started" primary button and "Documentation" secondary button<br />
              4. Use a dark mode aesthetic with deep purples and cyber blues<br />
              5. Include placeholder cards underneath the hero for features
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-5">Reviewing Stitch Output</h3>
          <p className="text-slate-300 mb-8 text-lg">
            Once generated, the UI elements are structured sequentially. You can immediately see how the padding, flexbox arrangements, and initial aesthetic choices hold up before finalizing them in your design tool.
          </p>

          {/* Image Placeholder 1 */}
          <div className="w-full bg-[#111827] rounded-2xl border border-white/10 mb-8 overflow-hidden shadow-2xl relative">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full z-10 flex items-center gap-2 font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Live Preview
            </div>
            <div className="aspect-[16/10] sm:aspect-video w-full bg-[#0d131f] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] p-6 sm:p-10 flex items-center justify-center">
              {/* Fake UI component - Dashboard Layout */}
              <div className="w-full h-full max-w-2xl bg-[#0a0f18] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
                {/* Fake Header */}
                <div className="h-14 border-b border-white/5 flex justify-between items-center px-6 bg-[#111827]">
                  <div className="w-24 h-5 bg-white/10 rounded"></div>
                  <div className="hidden sm:flex gap-4">
                    <div className="w-12 h-4 bg-white/5 rounded"></div>
                    <div className="w-12 h-4 bg-white/5 rounded"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50"></div>
                </div>
                {/* Fake Body */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                  <div className="h-6 w-1/3 bg-white/20 rounded relative z-10"></div>
                  <div className="h-4 w-2/3 bg-white/10 rounded relative z-10"></div>
                  <div className="flex gap-4 relative z-10">
                    <div className="h-10 w-32 bg-primary rounded-lg"></div>
                    <div className="h-10 w-32 bg-white/5 border border-white/10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#111827] text-center text-sm text-slate-400 border-t border-white/5">
              Example generated dashboard structure ready to be imported into Figma.
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-6 text-lg">
            Integrating with MCP means that these structural blocks aren't just flat images. They carry underlying properties—like gap spacing, border radius, and token variables—making the transition to code almost instantaneous once the design is approved.
          </p>

          {/* Image Placeholder 2 - Mobile View */}
          <div className="w-full bg-[#111827] rounded-2xl border border-white/10 mb-10 overflow-hidden shadow-2xl relative">
            <div className="aspect-[16/10] w-full bg-[#111827] p-8 flex items-center justify-center gap-8 md:gap-16">

              {/* Fake Mobile Device 1 */}
              <div className="w-48 h-[340px] bg-black rounded-3xl border-[6px] border-[#2a303c] relative overflow-hidden shadow-xl scale-90 sm:scale-100 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#2a303c] rounded-b-xl z-20"></div>
                <div className="w-full h-full bg-[#0f172a] p-4 flex flex-col gap-4 pt-10">
                  <div className="w-full h-32 rounded-xl bg-gradient-to-br from-purple-500/20 to-sky-500/10 border border-white/5 mb-2"></div>
                  <div className="w-3/4 h-3 rounded bg-white/20"></div>
                  <div className="w-1/2 h-3 rounded bg-white/10"></div>
                  <div className="flex justify-between mt-auto">
                    <div className="w-8 h-8 rounded-full bg-white/5"></div>
                    <div className="w-8 h-8 rounded-full bg-white/5"></div>
                    <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>

              {/* Fake Mobile Device 2 */}
              <div className="w-48 h-[340px] bg-black rounded-3xl border-[6px] border-[#2a303c] relative overflow-hidden shadow-xl scale-90 sm:scale-100 rotate-[5deg] hover:rotate-0 transition-transform duration-500 hidden sm:block">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#2a303c] rounded-b-xl z-20"></div>
                <div className="w-full h-full bg-[#0a0f1a] p-4 flex flex-col gap-3 pt-10">
                  <div className="w-full h-12 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10"></div>
                    <div className="w-16 h-2 rounded bg-white/10"></div>
                  </div>
                  <div className="w-full h-12 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10"></div>
                    <div className="w-16 h-2 rounded bg-white/10"></div>
                  </div>
                  <div className="w-full h-12 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20"></div>
                    <div className="w-16 h-2 rounded bg-white/20"></div>
                  </div>
                  <div className="mt-auto w-full h-10 rounded-lg bg-primary/80"></div>
                </div>
              </div>

            </div>
            <div className="p-4 bg-[#111827] text-center text-sm text-slate-400 border-t border-white/5">
              Stitch automatically generates responsive variants like these mobile layouts.
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 mt-12">Efficiency: Traditional vs AI-Driven</h3>
          <p className="text-slate-300 mb-8 text-lg">
            By shifting from manual pixel execution to high-level structural rules, Google Stitch drastically reduces the time and complexity of building production-ready UIs.
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/10 mb-12 not-prose bg-[#0a0f18]">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider">Workflow Feature</th>
                  <th className="px-6 py-4 font-bold text-slate-200">Traditional Design</th>
                  <th className="px-6 py-4 font-bold text-sky-400">Google Stitch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-300 bg-white/5 italic">Component Setup</td>
                  <td className="px-6 py-4 text-slate-400 font-mono">15-30 mins</td>
                  <td className="px-6 py-4 text-sky-300 font-bold bg-sky-500/5 font-mono">~10 secs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-300 bg-white/5 italic">Auto-Layout Rules</td>
                  <td className="px-6 py-4 text-slate-400">Manual constraints</td>
                  <td className="px-6 py-4 text-sky-300 font-bold bg-sky-500/5">Inherent Logic</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-300 bg-white/5 italic">Responsiveness</td>
                  <td className="px-6 py-4 text-slate-400">Manual breakpoints</td>
                  <td className="px-6 py-4 text-sky-300 font-bold bg-sky-500/5">Semantic Adaptation</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-300 bg-white/5 italic">Design Handoff</td>
                  <td className="px-6 py-4 text-slate-400">Static Figma Specs</td>
                  <td className="px-6 py-4 text-sky-300 font-bold bg-sky-500/5">React Blueprints</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 mt-8">Conclusion</h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            By adopting an AI-driven approach for UI structuring, design teams can radically decrease the time from ideation to high-fidelity wireframing. Try combining Google Stitch, MCP, and Figma today to supercharge your design process.
          </p>

        </article>
      </main>

      {/* Interactive Tools Section */}
      <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-16 border-t border-white/10 pt-16">

        {/* Preserved PromptBuilder Section */}
        <section>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-4">Crafting the Perfect Stitch Prompt</h2>
            <p className="text-slate-400 text-lg">Stitch needs specific details to give you a solid foundation. Use our interactive builder to learn the formula.</p>
          </div>
          <div className="w-full bg-[#111827]/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
            <PromptBuilder />
          </div>
        </section>

        {/* Preserved StitchMentor Section */}
        <section className="pt-8 mb-10">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-4 flex items-center justify-center gap-3">
              <Bot className="text-sky-400 w-8 h-8" />
              Practice with the Mentor
            </h2>
            <p className="text-slate-400 text-lg">
              Ready to try writing your own prompts? Use this specialized AI mentor to refine your ideas before sending them to Google Stitch.
            </p>
          </div>
          <div className="w-full bg-[#111827]/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <StitchMentor />
          </div>
        </section>

      </div>

    </div>
  );
};

export default StitchGuide;
