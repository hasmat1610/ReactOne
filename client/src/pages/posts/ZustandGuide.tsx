import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import PostLayout from '../../components/blog/PostLayout';
import { ChevronRight, Layers } from 'lucide-react';

const ZustandGuide = () => {
    const [isCopied, setIsCopied] = useState(false);
    const post = useAppSelector((state) => state.posts.allPosts.find(p => p.id === 'zustand-guide'));

    const handleCopy = (text: string) => { 
        navigator.clipboard.writeText(text); 
        setIsCopied(true); 
        setTimeout(() => setIsCopied(false), 2000); 
    };

    if (!post) return null;

    return (
        <PostLayout
            title={post.title}
            description={post.description}
            category={post.category}
            date={post.date}
            readingTime={post.readingTime}
            author={post.author}
            badgeIcon={Layers}
            gradientContainer="from-slate-900 via-yellow-900/40 to-[#0a0f18]"
            radialBackground="radial-gradient(circle at 50% 120%, rgba(250, 204, 21, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(202, 138, 4, 0.3), transparent 30%)"
            badgeContainerStyles="border border-yellow-500/30 bg-yellow-500/10"
            badgeTextStyles="text-yellow-400"
            titleGradient="from-white to-white/60"
            subtitleColor="text-yellow-300/70"
            avatarRing="from-yellow-400 to-amber-600"
            dateColor="text-slate-400"
        >
            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">Introduction</h2>
            <p className="text-[18px] font-[400] leading-[1.6] text-slate-300 mb-[16px]">
                State management shouldn't be a burden. Zustand provides a small, fast, and scalable bear-necessity for managing state in React without the boilerplate of Redux or the performance pitfalls of Context API.
            </p>
            <p className="text-[18px] font-[400] leading-[1.6] text-slate-300 mb-[16px]">
                Developed by the team at Poimandres, Zustand is a client-side state management solution that follows the Flux principles but focuses on a hooks-based API that feels native to React.
            </p>

            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">Concept Explanation</h2>
            <p className="text-[18px] font-[400] leading-[1.6] text-slate-300 mb-[16px]">
                Zustand operates as a centralized object store. Components "select" specific pieces of state, and the store ensures that components only re-render when their selected state actually changes. This granular reactivity is the "secret sauce" for performance.
            </p>

            {/* Rule 7.3: Comparison Tables */}
            <h3 className="text-[24px] font-[600] text-white mt-[32px] mb-[16px]">Comparison: Zustand vs Redux</h3>
            <div className="overflow-x-auto mb-[32px]">
                <table className="w-full border-collapse border border-[#eaeaea]/10 text-[16px]">
                    <thead>
                        <tr className="bg-white/5">
                            <th className="border border-[#eaeaea]/10 p-[12px] text-left text-white font-[700]">Feature</th>
                            <th className="border border-[#eaeaea]/10 p-[12px] text-left text-white font-[700]">Zustand</th>
                            <th className="border border-[#eaeaea]/10 p-[12px] text-left text-white font-[700]">Redux (RTK)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-300">Boilerplate</td>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-400">Minimal</td>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-400">Moderate</td>
                        </tr>
                        <tr className="bg-white/5">
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-300">Learning Curve</td>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-400">Low</td>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-400">High</td>
                        </tr>
                        <tr>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-300">Bundle Size</td>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-400">~1kb</td>
                            <td className="border border-[#eaeaea]/10 p-[12px] text-slate-400">~10kb+</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Rule 6.2: Tip Callout */}
            <div className="p-[16px] border-l-[4px] border-amber-500 bg-amber-500/5 rounded-[6px] my-[32px] not-prose text-left">
                <div className="font-bold text-amber-500 mb-2 font-[700]">💡 Tip</div>
                <p className="text-slate-300 leading-[1.6] m-0 text-[18px]">
                    Use caching to reduce API calls when syncing with Zustand stores.
                </p>
            </div>

            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">Architecture Overview</h2>
            <p className="text-[18px] font-[400] leading-[1.6] text-slate-300 mb-[24px]">
                Zustand's architecture is strictly unidirectional, minimizing side effects and state drift across complex component trees.
            </p>

            {/* Rule 11.1: Architecture Diagram */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-[24px] mb-[40px] font-mono text-center">
                <div className="text-amber-400">Client (React)</div>
                <div className="my-[8px] text-slate-600 font-bold">↓</div>
                <div className="text-blue-400 font-bold">API Layer</div>
                <div className="my-[8px] text-slate-600 font-bold">↓</div>
                <div className="text-purple-400 font-bold">Backend Service</div>
                <div className="my-[8px] text-slate-600 font-bold">↓</div>
                <div className="text-emerald-400 font-bold">Database</div>
            </div>

            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">Code Examples</h2>
            
            {/* Rule 5: Code Block System */}
            <div className="bg-[#0f0f0f] rounded-[8px] p-[20px] my-[32px] border border-white/5 relative group overflow-hidden">
                <div className="text-[12px] text-slate-500 mb-4 font-mono font-bold uppercase tracking-[0.1em] flex justify-between items-center px-1">
                    <span>src/store/useStore.ts</span>
                    <button 
                        onClick={() => handleCopy('import { create } from \'zustand\';\n\nexport const useStore = create((set) => ({\n  count: 0,\n  inc: () => set((state) => ({ count: state.count + 1 })),\n}));')} 
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre className="m-0 font-['JetBrains_Mono',_monospace] text-[16px] leading-[1.6] text-[#a5b4fc] whitespace-pre-wrap break-words overflow-x-auto">
                    <code>{`import { create } from 'zustand';

export const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));`}</code>
                </pre>
            </div>

            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">Best Practices</h2>
            <ul className="list-none p-0 space-y-[16px]">
                <li className="text-[18px] font-[400] leading-[1.6] text-slate-300">
                    <span className="text-amber-500 font-bold mr-2">01.</span> **Split Slices**: For large applications, split your store into functional slices.
                </li>
                <li className="text-[18px] font-[400] leading-[1.6] text-slate-300">
                    <span className="text-amber-500 font-bold mr-2">02.</span> **Use Selectors**: Always select specific state to avoid excessive re-renders.
                </li>
            </ul>

            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">Common Mistakes</h2>
            <div className="p-[16px] border-l-[4px] border-red-500 bg-red-500/5 rounded-[6px] my-[32px] not-prose text-left">
                <div className="font-bold text-red-500 mb-2 font-[700]">⚠️ Warning</div>
                <p className="text-slate-300 leading-[1.6] m-0 text-[18px]">
                    Never expose API keys in client-side code, even within your global stores.
                </p>
            </div>

            <h2 className="text-[32px] font-[700] text-white mt-[56px] mb-[24px]">FAQ</h2>
            <div className="space-y-[16px] mb-[56px]">
                <details className="group border border-white/10 rounded-xl p-[20px] cursor-pointer bg-white/5 hover:bg-white/10 transition-all shadow-lg">
                    <summary className="font-[700] text-white list-none flex justify-between items-center group-open:mb-4">
                        Is Zustand better than Redux?
                        <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-slate-400 text-[16px] border-t border-white/10 pt-4 m-0 leading-[1.6]">
                        Better is subjective, but Zustand offers significantly less boilerplate and no Provider overhead.
                    </p>
                </details>
            </div>
        </PostLayout>
    );
};

export default ZustandGuide;
