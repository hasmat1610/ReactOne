import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Layers, FileText, TerminalSquare } from 'lucide-react';

const tabs = [
  { id: 'auth', label: 'Auth', icon: Shield },
  { id: 'state', label: 'State Mgmt', icon: Layers },
  { id: 'forms', label: 'Forms', icon: FileText },
  { id: 'api', label: 'API', icon: TerminalSquare },
];

const HardStuffSection = () => {
  const [activeTab, setActiveTab] = useState('auth');

  return (
    <section className="py-32 relative overflow-hidden bg-[#000000]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#216be4]/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            We break down the <span className="text-[#216be4]">hard stuff</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            State management, form validation, API integration, authentication — all the complex patterns explained with real, production-ready code.
          </motion.p>
        </div>

        {/* Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-[#0a0d14] shadow-2xl overflow-hidden ring-1 ring-white/5"
        >
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#050505]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-32 py-1.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-zinc-500 font-mono flex items-center justify-center">
                reactone.dev/guides
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Browser Tabs */}
          <div className="flex border-b border-white/5 bg-[#0a0d14]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-all relative cursor-pointer ${isActive ? 'text-[#216be4]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#216be4]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Browser Content Area */}
          <div className="h-[450px] bg-[#111111] relative overflow-hidden flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'auth' && (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-[360px] bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
                >
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/5 rounded-xl mx-auto mb-4 border border-white/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white">Welcome back</h3>
                    <p className="text-sm text-zinc-500 mt-1">Google OAuth + Email/Password</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-11 rounded-lg bg-white/5 border border-white/10 w-full flex items-center justify-center gap-2 text-sm text-zinc-400">
                      <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /></svg>
                      Sign in with Google
                    </div>
                    <div className="h-11 rounded-lg bg-white/5 border border-white/10 w-full flex items-center px-4">
                      <div className="w-24 h-2 bg-zinc-600 rounded-full" />
                    </div>
                    <div className="h-11 rounded-lg bg-[#216be4] w-full mt-2 opacity-90 flex items-center justify-center text-white text-sm font-medium">Sign In</div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'state' && (
                <motion.div
                  key="state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-lg bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-[#216be4]" />
                    <span className="text-white font-semibold">Zustand Store</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-400/10 text-orange-400 border border-orange-400/20 font-semibold">~1KB</span>
                  </div>
                  <pre className="text-[13px] font-mono text-zinc-400 leading-relaxed">
                    {`import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ 
    count: s.count + 1 
  })),
  reset: () => set({ count: 0 }),
}));`}
                  </pre>
                </motion.div>
              )}

              {activeTab === 'forms' && (
                <motion.div
                  key="forms"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-lg bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-[#216be4]" />
                    <span className="text-white font-semibold">React Hook Form + Zod</span>
                  </div>
                  <pre className="text-[13px] font-mono text-zinc-400 leading-relaxed">
                    {`const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  {errors.email && <p>{errors.email.message}</p>}
  <button type="submit">Submit</button>
</form>`}
                  </pre>
                </motion.div>
              )}

              {activeTab === 'api' && (
                <motion.div
                  key="api"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-lg bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TerminalSquare className="w-5 h-5 text-[#216be4]" />
                    <span className="text-white font-semibold">Axios + React Query</span>
                  </div>
                  <pre className="text-[13px] font-mono text-zinc-400 leading-relaxed">
                    {`const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => api.get('/users'),
  staleTime: 5 * 60 * 1000,
});`}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HardStuffSection;
