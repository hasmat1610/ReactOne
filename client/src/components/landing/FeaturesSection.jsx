import React from 'react';
import { Zap, Palette, Rocket, Smartphone } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">Built to stand out</h2>
        <p className="text-zinc-400 text-base md:text-lg mb-16 max-w-2xl mx-auto">
          Everything you need to build stunning interfaces.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Feature Card 1 */}
          <div className="group relative rounded-3xl border border-white/5 bg-[#0e131f] p-8 text-left overflow-hidden transition-all hover:bg-[#131a29] hover:border-white/10 flex flex-col items-start justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-yellow-500 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <Zap className="w-6 h-6 fill-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white tracking-tight">Production Grade</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Designs crafted with care from scratch, ready to deploy from day one.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group relative rounded-3xl border border-white/5 bg-[#0e131f] p-8 text-left overflow-hidden transition-all hover:bg-[#131a29] hover:border-white/10 flex flex-col items-start justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white tracking-tight">Total Control</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every pixel is yours. Components come with extensive customization props.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group relative rounded-3xl border border-white/5 bg-[#0e131f] p-8 text-left overflow-hidden transition-all hover:bg-[#131a29] hover:border-white/10 flex flex-col items-start justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white tracking-tight">Ship at Warp Speed</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Stop reinventing the wheel. Assemble your dream UI within minutes, not months.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="group relative rounded-3xl border border-white/5 bg-[#0e131f] p-8 text-left overflow-hidden transition-all hover:bg-[#131a29] hover:border-white/10 flex flex-col items-start justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white tracking-tight">Flawless Everywhere</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Looks stunning on any device. From mobile phones to ultra-wide monitors.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
