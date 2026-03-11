import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Zap, Settings, ShieldCheck, Download, Copy, CheckCircle2, Code, Layers, Box } from 'lucide-react';

const guideData = [
    {
        id: 'setup', title: 'Setup & Installation', icon: <Download className="w-[18px] h-[18px]" />, files: [
            { name: 'Terminal', content: 'npm install zustand' },
            { name: 'Why Zustand?.txt', content: '// Zustand advantages:\n// 1. No Provider wrapper needed\n// 2. Under 1KB bundle size\n// 3. No boilerplate\n// 4. Built-in middleware (persist, devtools)\n// 5. Works outside React components\n// 6. TypeScript-first API' }
        ]
    },
    {
        id: 'basic-store', title: 'Basic Store', icon: <Box className="w-[18px] h-[18px]" />, files: [
            { name: 'useStore.js', content: `import { create } from 'zustand';
          
          const useStore = create((set) => ({
          count: 0,
          increment: () => set((state) => ({ count: state.count + 1 })),
          decrement: () => set((state) => ({ count: state.count - 1 })),
          reset: () => set({ count: 0 }),
          }));
          
          export default useStore;` },
            { name: 'Counter.jsx', content: `import useStore from './useStore';
          
          const Counter = () => {
          const count = useStore((state) => state.count);
          const increment = useStore((state) => state.increment);
          const decrement = useStore((state) => state.decrement);
          
          return (
          <div>
          <h1>{count}</h1>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
          </div>
          );
          };` }
        ]
    },
    {
        id: 'async', title: 'Async Actions', icon: <Server className="w-[18px] h-[18px]" />, files: [
            { name: 'useTodoStore.js', content: `import { create } from 'zustand';
          import axios from 'axios';
          
          const useTodoStore = create((set) => ({
          todos: [],
          loading: false,
          error: null,
          
          fetchTodos: async () => {
          set({ loading: true, error: null });
          try {
          const { data } = await axios.get('/api/todos');
          set({ todos: data, loading: false });
          } catch (err) {
          set({ error: err.message, loading: false });
          }
          },
          
          addTodo: async (title) => {
          const { data } = await axios.post('/api/todos', { title });
          set((state) => ({ todos: [...state.todos, data] }));
          },
          }));
          
          export default useTodoStore;` }
        ]
    },
    {
        id: 'middleware', title: 'Middleware', icon: <Layers className="w-[18px] h-[18px]" />, files: [
            { name: 'persistStore.js', content: `import { create } from 'zustand';
          import { persist, devtools } from 'zustand/middleware';
          
          const useAuthStore = create(
          devtools(
          persist(
          (set) => ({
          user: null,
          token: null,
          login: (user, token) => set({ user, token }),
          logout: () => set({ user: null, token: null }),
          }),
          { name: 'auth-storage' }
          )
          )
          );
          
          export default useAuthStore;` }
        ]
    },
    {
        id: 'best-practices', title: 'Best Practices', icon: <ShieldCheck className="w-[18px] h-[18px]" />, files: [
            { name: 'slices.js', content: `// Split store into slices
          const createAuthSlice = (set) => ({
          user: null,
          login: (user) => set({ user }),
          logout: () => set({ user: null }),
          });
          
          const createTodoSlice = (set) => ({
          todos: [],
          addTodo: (todo) =>
          set((s) => ({ todos: [...s.todos, todo] })),
          });
          
          // Combine slices
          import { create } from 'zustand';
          const useStore = create((...a) => ({
          ...createAuthSlice(...a),
          ...createTodoSlice(...a),
          }));` },
            { name: 'selectors.js', content: `// Use shallow comparison to prevent re-renders
          import { shallow } from 'zustand/shallow';
          
          const { count, increment } = useStore(
          (state) => ({
          count: state.count,
          increment: state.increment
          }),
          shallow
          );` }
        ]
    }
];

const ZustandGuide = () => {
    const [activeGuideId, setActiveGuideId] = useState(guideData[0].id);
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedPrompt1, setCopiedPrompt1] = useState(false);
    const [copiedPrompt2, setCopiedPrompt2] = useState(false);
    const activeGuide = guideData.find(g => g.id === activeGuideId);
    const handleGuideChange = (id) => { setActiveGuideId(id); setActiveFileIndex(0); setIsCopied(false); };
    const handleCopyPrompt = (text, n) => { navigator.clipboard.writeText(text); if (n === 1) { setCopiedPrompt1(true); setTimeout(() => setCopiedPrompt1(false), 2000); } else { setCopiedPrompt2(true); setTimeout(() => setCopiedPrompt2(false), 2000); } };
    const handleCopy = () => { navigator.clipboard.writeText(activeGuide.files[activeFileIndex].content); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };

    return (
        <div className="min-h-screen bg-[#060913] text-slate-200 font-sans pb-24 selection:bg-amber-500/30">
            

            <div className="container mx-auto px-4 max-w-4xl pt-32 pb-16">
                {/* Banner Image Prototype */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-900 via-sky-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
           {/* Abstract Pattern */}
           <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
               background: "radial-gradient(circle at 50% 120%, rgba(230, 162, 70, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(180, 120, 50, 0.3), transparent 30%)"
           }}></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
               background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
               maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
               WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
             }}></div>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Zustand</span>
           </h1>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Deep Dive: Zustand for React</h1>
          
          {/* Author Meta */}
          <div className="flex items-center gap-4 mb-10 text-sm">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-sky-600 flex items-center justify-center p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=33" alt="Author" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-base">Hasmat Patel</div>
              <div className="text-slate-400">UI Developer</div>
            </div>
            <div className="text-slate-500 ml-auto flex items-center gap-4">
              <span>Mar 06, 2026</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-500"></span> 6 min read</span>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mb-12">
          A small, fast, and scalable state management solution. No boilerplate, no providers, just hooks.
          </p>

                    <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">Zustand is a lightweight state management library that uses simplified flux principles. It requires no providers, no boilerplate, and no context wrapping. Just create a store with a hook and use it anywhere. At under 1KB, it's one of the smallest state management solutions available while still being incredibly powerful.</p>

                    <h2 className="text-3xl font-bold text-white mb-6">Zustand vs Redux vs Context</h2>
                    <div className="overflow-x-auto mb-10 not-prose"><table className="w-full text-left border-collapse text-sm text-slate-300"><thead><tr className="border-b border-white/10 bg-white/5"><th className="py-3 px-4 font-semibold text-white">Feature</th><th className="py-3 px-4 font-semibold text-white">Zustand</th><th className="py-3 px-4 font-semibold text-white">Redux / Context</th></tr></thead><tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Bundle Size</td><td className="py-3 px-4 text-green-400">~1KB — extremely lightweight</td><td className="py-3 px-4">Redux ~7KB / Context built-in</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Provider Required</td><td className="py-3 px-4 text-green-400">No — works without wrappers</td><td className="py-3 px-4 text-slate-500">Yes — Provider at root required</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Boilerplate</td><td className="py-3 px-4 text-green-400">Minimal — create + use</td><td className="py-3 px-4 text-slate-500">Actions + reducers + dispatch</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Middleware</td><td className="py-3 px-4 text-green-400">persist, devtools, immer built-in</td><td className="py-3 px-4">Requires extra packages</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Re-renders</td><td className="py-3 px-4 text-green-400">Selector-based — minimal re-renders</td><td className="py-3 px-4 text-slate-500">Context re-renders all consumers</td></tr>
                    </tbody></table></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"><Zap className="w-8 h-8 text-yellow-400 mb-4" /><h3 className="text-white font-semibold text-lg mb-2">No Provider</h3><p className="text-sm text-slate-400">Use your store from any component without wrapping your app. Just import and call the hook.</p></div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"><Layers className="w-8 h-8 text-purple-400 mb-4" /><h3 className="text-white font-semibold text-lg mb-2">Slice Pattern</h3><p className="text-sm text-slate-400">Split stores into slices for large apps and combine them into a single store.</p></div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>Installation</h2>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Terminal</div></div><div className="p-5"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install zustand</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>Create a Store</h2>
                    <p className="mb-6 text-slate-300">A Zustand store is created with <code>create()</code>. The set function is used to update state. No actions files, no constants.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">useStore.js</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>Using in Components</h2>
                    <p className="mb-6 text-slate-300">Just import the hook and call it with a selector. Zustand only re-renders when the selected state changes.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Counter.jsx</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import useStore from './useStore';

const Counter = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+1</button>
    </div>
  );
};`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>Async Actions</h2>
                    <p className="mb-6 text-slate-300">Async actions are just regular async functions. No thunks, no middleware required.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">useTodoStore.js</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { create } from 'zustand';
import axios from 'axios';

const useTodoStore = create((set) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get('/api/todos');
      set({ todos: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addTodo: async (title) => {
    const { data } = await axios.post('/api/todos', { title });
    set((state) => ({ todos: [...state.todos, data] }));
  },
}));`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>Middleware (Persist & DevTools)</h2>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">persistStore.js</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        login: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null }),
      }),
      { name: 'auth-storage' }
    )
  )
);`}</code></pre></div></div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-8 not-prose mt-12 mb-12"><h3 className="text-amber-400 font-bold mb-4 text-xl">Best Practice Tip</h3><p className="text-slate-300 leading-relaxed m-0 text-base">Use <strong>selectors</strong> to pick only what you need from the store. Use <strong>shallow</strong> comparison when selecting multiple values. Split large stores into <strong>slices</strong> for maintainability.</p></div>

                    <div className="border border-white/10 rounded-xl p-8 bg-white/5 mb-8 hover:bg-white/10 transition-colors"><h2 className="text-2xl font-bold text-white mb-6 mt-0">Key Takeaways</h2><ul className="list-disc list-outside ml-5 space-y-4 text-slate-300 m-0"><li><strong className="text-white">No Provider</strong> — just create a store and use it anywhere with hooks.</li><li><strong className="text-white">Under 1KB</strong> — smallest footprint of any state management library.</li><li><strong className="text-white">Async is simple</strong> — plain async functions, no thunks needed.</li><li><strong className="text-white">Middleware</strong> — built-in persist, devtools, and immer support.</li><li><strong className="text-white">Slice pattern</strong> — combine multiple slices into one store for large apps.</li></ul></div>

                    <div className="mt-16 mb-8 border-t border-white/10 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4"><span className="bg-gradient-to-br from-amber-500 to-orange-500 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"><Settings className="w-6 h-6" /></span>AI Master Prompts</h2>
                        <p className="mb-8 text-lg text-slate-300 leading-relaxed max-w-3xl">Copy these prompts to scaffold Zustand state management instantly.</p>
                        <div className="grid gap-8">
                            <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-blue-400/50"><div className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-blue-400 m-0 flex items-center gap-2"><Zap className="w-5 h-5" /> 1. Zustand Store Architecture</h3><p className="text-sm text-slate-400 mt-2 mb-0">Create a modular Zustand store with slices.</p></div><button onClick={() => handleCopyPrompt("Create a Zustand store for my React app using the slice pattern. Include auth slice (login, logout, user), todo slice (CRUD with async axios calls), and UI slice (theme, sidebar). Use persist middleware for auth and devtools for debugging. Use shallow selectors.", 1)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-colors font-medium border border-blue-500/20 shrink-0 cursor-pointer">{copiedPrompt1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copiedPrompt1 ? 'Copied!' : 'Copy Prompt'}</button></div><div className="p-4 sm:p-6 bg-black/20"><p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">"Create a Zustand store for my React app using the slice pattern. Include auth slice (login, logout, user), todo slice (CRUD with async axios calls), and UI slice (theme, sidebar). Use persist middleware for auth and devtools for debugging. Use shallow selectors."</p></div></div>
                            <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-purple-400/50"><div className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-purple-400 m-0 flex items-center gap-2"><Code className="w-5 h-5" /> 2. Migrate from Redux</h3><p className="text-sm text-slate-400 mt-2 mb-0">Replace Redux with Zustand for simpler state management.</p></div><button onClick={() => handleCopyPrompt("Migrate my React app from Redux to Zustand. Replace configureStore with create(), slices with store functions, useSelector with Zustand selectors, and useDispatch with direct action calls. Add persist middleware and show before/after comparison.", 2)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-colors font-medium border border-purple-500/20 shrink-0 cursor-pointer">{copiedPrompt2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copiedPrompt2 ? 'Copied!' : 'Copy Prompt'}</button></div><div className="p-4 sm:p-6 bg-black/20"><p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">"Migrate my React app from Redux to Zustand. Replace configureStore with create(), slices with store functions, useSelector with Zustand selectors, and useDispatch with direct action calls. Add persist middleware and show before/after comparison."</p></div></div>
                        </div>
                    </div>
                </article>
            </div>

            <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
                    <div className="w-full lg:w-72 shrink-0"><h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Lightweight State</h3><div className="flex flex-col gap-2">{guideData.map((g) => (<button key={g.id} onClick={() => handleGuideChange(g.id)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-sm font-medium w-full text-left ${activeGuideId === g.id ? 'bg-[#0f1b2d] border-amber-500/30 text-amber-400' : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5'}`}><span className={activeGuideId === g.id ? 'text-amber-400' : 'text-slate-500'}>{g.icon}</span>{g.title}</button>))}</div></div>
                    <div className="w-full flex-1 bg-[#0d121c] rounded-2xl overflow-hidden border border-[#1e293b] flex flex-col min-h-[500px] lg:min-h-[600px]">
                        <div className="bg-[#151b2b] border-b border-[#1e293b] px-4 py-3 flex items-center justify-between shrink-0"><div className="flex items-center gap-6 w-full"><div className="flex gap-2 shrink-0"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div className="w-3 h-3 rounded-full bg-[#27c93f]"></div></div><div className="flex gap-2 overflow-x-auto flex-1">{activeGuide.files.map((f, i) => (<button key={i} onClick={() => setActiveFileIndex(i)} className={`px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap ${activeFileIndex === i ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>{f.name}</button>))}</div></div><button onClick={handleCopy} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] text-slate-400 hover:text-slate-200 hover:bg-[#1e293b] border border-[#1e293b]">{isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{isCopied ? 'Copied' : 'Copy'}</button></div>
                        <div className="flex-1 p-5 sm:p-8 overflow-auto bg-[#0d121c]"><pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#a5b4fc] m-0"><code>{activeGuide.files[activeFileIndex].content}</code></pre></div>
                    </div>
                </div>
            </main>
            <div className="container mx-auto max-w-6xl px-4 mt-8 pb-12 flex justify-end"><p className="text-xs text-slate-600 font-medium">Zustand Reference</p></div>
        </div>
    );
};

export default ZustandGuide;
