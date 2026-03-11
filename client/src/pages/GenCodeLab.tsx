import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Code,
    ArrowRight,
    Copy,
    CheckCircle2,
    RotateCcw,
    Zap,
    Terminal,
    Layers,
    Wand2
} from 'lucide-react';
import { AUTH_SNIPPETS } from '../constants/snippets';
import { chatApi } from '../api/chat';
import { Spotlight } from '../components/ui/spotlight';

const GenCodeLab = () => {
    const [selectedSnippet, setSelectedSnippet] = useState('signup');
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [activeView, setActiveView] = useState('original'); // 'original' | 'generated'

    const snippet = AUTH_SNIPPETS[selectedSnippet];

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setGeneratedCode('');

        try {
            // Simulate calling an AI that takes the context of the original code
            // and applies the prompt transformation.
            const context = snippet.files[0].code;
            const fullPrompt = `Modify this React component based on this instruction: "${prompt}"\n\nOriginal Code:\n${context}`;

            const { reply } = await chatApi.sendMessage(fullPrompt);

            // Extract code from markdown if present
            const codeMatch = reply.match(/```(?:jsx|javascript|tsx)?\n([\s\S]*?)```/);
            const code = codeMatch ? codeMatch[1] : reply;

            setGeneratedCode(code);
            setActiveView('generated');
        } catch (error) {
            console.error('Generation failed', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#E9EEF5] font-sans pb-24 overflow-hidden relative">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <main className="container mx-auto px-4 max-w-7xl pt-32 relative z-10">

                {/* Header Section */}
                <div className="mb-12 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6 font-medium text-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>AI Code Forge v2.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter"
                    >
                        Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Beyond Templates</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl leading-relaxed"
                    >
                        Take production-ready building blocks and evolve them with natural language.
                        Bridge the gap between "Copy-Paste" and "Custom Architecture".
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Controls Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="bg-[#0f1115] border border-white/5 rounded-3xl p-6 shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" />

                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-blue-400" />
                                Select Base Component
                            </h3>

                            <div className="space-y-3">
                                {Object.entries(AUTH_SNIPPETS).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setSelectedSnippet(key);
                                            setGeneratedCode('');
                                            setActiveView('original');
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all border ${selectedSnippet === key
                                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                            : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <span className="font-medium text-sm">{data.title}</span>
                                        {selectedSnippet === key && <Zap className="w-3 h-3 fill-current" />}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Wand2 className="w-4 h-4 text-purple-400" />
                                    Apply Transformation
                                </h3>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g. Add a social login section under the submit button and use an emerald color scheme..."
                                    className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim() || isGenerating}
                                    className="w-full mt-4 bg-white text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isGenerating ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </motion.div>
                                    ) : (
                                        <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isGenerating ? 'Forging Code...' : 'Generate with AI'}
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-white/5 rounded-3xl">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                                <Code className="w-4 h-4 text-blue-400" />
                                Vibe Coding Tip
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed italic">
                                "Be specific about layout, colors, and behavior. The more context you give the better the forge."
                            </p>
                        </div>
                    </motion.div>

                    {/* Workbench / Preview Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-8 flex flex-col h-full min-h-[600px]"
                    >
                        <div className="flex bg-[#0f1115] border-t border-x border-white/5 rounded-t-3xl p-1 gap-1 w-fit ml-auto mr-0 mb-[-1px] relative z-20">
                            <button
                                onClick={() => setActiveView('original')}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${activeView === 'original' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                Base Template
                            </button>
                            <button
                                onClick={() => generatedCode && setActiveView('generated')}
                                disabled={!generatedCode}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeView === 'generated' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300 disabled:opacity-30'
                                    }`}
                            >
                                <Sparkles className="w-3 h-3" />
                                AI Generated
                            </button>
                        </div>

                        <div className="flex-1 bg-[#0f1115] border border-white/5 rounded-3xl rounded-tr-none shadow-2xl relative overflow-hidden flex flex-col">
                            {/* Fake Terminal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#15171b]">
                                <div className="flex items-center gap-3 font-mono text-xs">
                                    <div className="flex gap-1.5 mr-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-50" />
                                    </div>
                                    <span className="text-slate-500">src/components/auth/</span>
                                    <span className="text-blue-400">{activeView === 'original' ? snippet.files[0].filename : 'AI_Generated_Component.tsx'}</span>
                                </div>

                                <button
                                    onClick={() => handleCopy(activeView === 'original' ? snippet.files[0].code : generatedCode)}
                                    className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all text-slate-400 hover:text-white"
                                >
                                    {copied ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy Code'}
                                </button>
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 p-8 overflow-auto font-mono text-sm relative">
                                <AnimatePresence mode="wait">
                                    {isGenerating ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30"
                                        >
                                            <div className="relative">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        rotate: [0, 90, 180, 270, 360]
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 3 }}
                                                    className="w-16 h-16 rounded-3xl border-2 border-blue-500/20"
                                                />
                                                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 w-8 h-8 animate-pulse" />
                                            </div>
                                            <p className="mt-8 text-blue-400 font-bold tracking-[0.2em] uppercase text-[10px]">Analyzing DNA & Re-assembling</p>
                                            <p className="mt-2 text-slate-500 italic text-xs">Applying transformation to production patterns...</p>
                                        </motion.div>
                                    ) : null}

                                    <motion.div
                                        key={activeView}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full"
                                    >
                                        <pre className="text-slate-300 leading-relaxed scrollbar-hide">
                                            <code>{activeView === 'original' ? snippet.files[0].code : (generatedCode || '// Your AI code will appear here after generation...')}</code>
                                        </pre>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Bottom bar */}
                            <div className="px-6 py-3 border-t border-white/5 bg-[#0f1115] flex items-center justify-between text-[10px] text-slate-600 font-mono">
                                <div className="flex gap-4">
                                    <span>UTF-8</span>
                                    <span>TypeScript</span>
                                </div>
                                <div className="flex gap-4">
                                    <span>LN 1, COL 1</span>
                                    <span>Spaces: 2</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default GenCodeLab;
