import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Simple, one-time pricing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pay once, use forever. No recurring fees or hidden charges.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Starter Plan */}
          <div className="rounded-3xl border border-white/5 bg-white/5 p-8 relative flex flex-col h-full">
            <h3 className="text-xl font-medium text-white/70 mb-2">Starter</h3>
            <p className="text-sm text-muted-foreground mb-6">Perfect for personal projects and hobbies.</p>
            <div className="mb-6">
              <span className="text-muted-foreground line-through text-lg mr-2">$49</span>
              <span className="text-4xl font-bold">$29</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">Access to all basic components</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">React & Tailwind support</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">Community support</span>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-50">
                <Check className="w-5 h-5 text-transparent shrink-0" />
                <span>No premium animations</span>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-50">
                <Check className="w-5 h-5 text-transparent shrink-0" />
                <span>No commercial use limit</span>
              </li>
            </ul>

            <Link to="/signup" className="w-full inline-flex items-center justify-center rounded-xl font-medium transition-colors bg-white/10 text-white hover:bg-white/20 h-11 px-8">
              Get Started
            </Link>
          </div>

          {/* Ultimate Plan (Highlighted) */}
          <div className="rounded-3xl border border-primary/50 bg-black/50 p-8 shadow-[0_0_40px_rgba(182,167,255,0.1)] relative flex flex-col h-full md:scale-105 z-10">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent pointer-events-none"></div>
            
            {/* Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-primary to-purple-500 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg">
              Most Popular
            </div>

            <h3 className="text-xl font-medium text-white mb-2">Ultimate</h3>
            <p className="text-sm text-muted-foreground mb-6">Everything you need for professional projects.</p>
            <div className="mb-6">
              <span className="text-muted-foreground line-through text-lg mr-2">$149</span>
              <span className="text-4xl font-bold">$79</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/90 font-medium">Access to all premium components</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/90 font-medium">Framer Motion & WebGL effects</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/90 font-medium">Lifetime updates</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/90 font-medium">Figma UI Kit included</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/90 font-medium">Priority email support</span>
              </li>
            </ul>

            <Link to="/pricing" className="w-full inline-flex items-center justify-center rounded-xl font-semibold transition-colors bg-white text-black hover:bg-white/90 h-11 px-8 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get Lifetime Access
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl border border-white/5 bg-white/5 p-8 relative flex flex-col h-full">
            <h3 className="text-xl font-medium text-white/70 mb-2">Pro</h3>
            <p className="text-sm text-muted-foreground mb-6">For agencies and teams building at scale.</p>
            <div className="mb-6">
              <span className="text-muted-foreground line-through text-lg mr-2">$299</span>
              <span className="text-4xl font-bold">$199</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">Everything in Ultimate</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">Commercial use for unlimited projects</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">Custom component requests</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                <span className="text-foreground/80">Private Discord channel</span>
              </li>
            </ul>

            <Link to="/pricing" className="w-full inline-flex items-center justify-center rounded-xl font-medium transition-colors bg-white/10 text-white hover:bg-white/20 h-11 px-8">
              Contact Sales
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
