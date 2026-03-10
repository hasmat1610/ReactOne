import React, { useState } from 'react';
import { 
  Download, Copy, CheckCircle2, Code, Database, Shield, 
  Zap, Lock, Users, Globe, TerminalSquare, Sparkles 
} from 'lucide-react';

const guideData = [
    {
        id: 'setup', title: 'Supabase Setup', icon: <Download className="w-[18px] h-[18px]" />, files: [
            { name: 'Installation', content: 'npm install @supabase/supabase-js' },
            { name: 'supabaseClient.js', content: `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseKey = "YOUR_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseKey)` }
        ]
    },
    {
        id: 'auth', title: 'Authentication', icon: <Lock className="w-[18px] h-[18px]" />, files: [
            { name: 'Signup.js', content: `const { data, error } = await supabase.auth.signUp({
  email: "user@email.com",
  password: "password123"
})` },
            { name: 'Login.js', content: `const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@email.com",
  password: "password123"
})` },
            { name: 'GoogleAuth.js', content: `const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google"
  })
}` }
        ]
    },
    {
        id: 'database', title: 'Database & RLS', icon: <Database className="w-[18px] h-[18px]" />, files: [
            { name: 'Fetch.js', content: `const { data, error } = await supabase
  .from("posts")
  .select("*")` },
            { name: 'Insert.js', content: `const { data, error } = await supabase
  .from("posts")
  .insert([
    { title: "Supabase Guide", content: "Complete tutorial" }
  ])` },
            { name: 'Policy.sql', content: `-- Allow users to see only their posts.
CREATE POLICY "user_select_own" ON "public"."posts"
FOR SELECT USING (auth.uid() = user_id);` }
        ]
    },
    {
        id: 'mcp-ai', title: 'MCP & AI Workflow', icon: <Sparkles className="w-[18px] h-[18px]" />, files: [
            { name: 'MCPUsage.txt', content: `An MCP server allows AI tools to interact with your backend safely.
- Generate database queries
- Fetch user data
- Create APIs
- Manage authentication logic` },
            { name: 'AIPrompt.txt', content: `"Act as a senior full stack developer.
Create a Supabase authentication system using React.

Requirements:
- Email signup/login
- Google OAuth login
- Session persistence
- Logout functionality
- Fetch current user
- Protect routes

Tech stack: React, Supabase, TanStack Query."` }
        ]
    }
];

const SupabaseGuide = () => {
    const [activeGuideId, setActiveGuideId] = useState(guideData[0]?.id || 'setup');
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const activeGuide = guideData.find(g => g.id === activeGuideId);
    
    const handleGuideChange = (id: string) => { 
        setActiveGuideId(id); 
        setActiveFileIndex(0); 
        setIsCopied(false); 
    };

    const handleCopy = () => { 
        if (activeGuide && activeGuide.files[activeFileIndex]) {
            navigator.clipboard.writeText(activeGuide.files[activeFileIndex].content); 
            setIsCopied(true); 
            setTimeout(() => setIsCopied(false), 2000); 
        }
    };

    return (
        <div className="min-h-screen bg-[#060913] text-slate-200 font-sans pb-24 selection:bg-emerald-500/30">
            <div className="container mx-auto px-4 max-w-4xl pt-32 pb-16">
                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#1C1C1C] via-[#3ECF8E]/20 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
                    <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
                        background: "radial-gradient(circle at 50% 120%, rgba(62, 207, 142, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.3), transparent 30%)"
                    }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
                            background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
                            maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
                        }}></div>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Supabase</span>
                    </h1>
                </div>

                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-6 font-medium text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Backend Masterclass</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Supabase Authentication & Backend Guide
                    </h1>

                    <div className="flex items-center gap-4 mb-10 text-sm">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-sky-600 flex items-center justify-center p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="https://i.pravatar.cc/150?img=33" alt="Author" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-white text-base">Hasmat Patel</div>
                            <div className="text-slate-400">UI Developer</div>
                        </div>
                        <div className="text-slate-500 ml-auto flex items-center gap-4">
                            <span>Mar 10, 2026</span>
                            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-500"></span> 8 min read</span>
                        </div>
                    </div>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mb-12">
                        Modern developers want to build full-stack applications without managing complex backend infrastructure. Supabase provides the power of PostgreSQL with a delightful developer experience.
                    </p>

                    <h2 className="text-3xl font-bold text-white mb-6">Why Supabase?</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                        Supabase is an open-source Firebase alternative. It provides a complete backend suite:
                        Authentication, PostgreSQL Database, Realtime APIs, and Edge Functions.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
                            <Users className="w-8 h-8 text-emerald-400 mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">Auth Out-of-the-box</h3>
                            <p className="text-sm text-slate-400">Email, Google, GitHub, and Magic Links supported with a single client call.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
                            <Shield className="w-8 h-8 text-sky-400 mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">Dynamic RLS</h3>
                            <p className="text-sm text-slate-400">Secure your data directly in the database using Row Level Security policies.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-6">Complete Implementation</h2>
                    <p className="mb-6 text-slate-300">
                        Follow the steps below to integrate Supabase into your React platform.
                    </p>
                </article>
            </div>

            <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
                    <div className="w-full lg:w-72 shrink-0">
                        <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Knowledge Base</h3>
                        <div className="flex flex-col gap-2">
                            {guideData.map((g) => (
                                <button 
                                    key={g.id} 
                                    onClick={() => handleGuideChange(g.id)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-sm font-medium w-full text-left ${
                                        activeGuideId === g.id 
                                        ? 'bg-[#0f2d22] border-emerald-500/30 text-emerald-400' 
                                        : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5'
                                    }`}
                                >
                                    <span className={activeGuideId === g.id ? 'text-emerald-400' : 'text-slate-500'}>{g.icon}</span>
                                    {g.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex-1 bg-[#0d1c16] rounded-2xl overflow-hidden border border-[#2d4d3f]/20 flex flex-col min-h-[500px] lg:min-h-[600px]">
                        <div className="bg-[#152b22] border-b border-[#2d4d3f]/20 px-4 py-3 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-6 w-full">
                                <div className="flex gap-2 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="flex gap-2 overflow-x-auto flex-1">
                                    {activeGuide?.files.map((f, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setActiveFileIndex(i)}
                                            className={`px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap ${
                                                activeFileIndex === i 
                                                ? 'bg-[#2d4d3f]/40 text-white' 
                                                : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                        >
                                            {f.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={handleCopy}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] text-slate-400 hover:text-slate-200 hover:bg-[#2d4d3f]/20 border border-[#2d4d3f]/20"
                            >
                                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <div className="flex-1 p-5 sm:p-8 overflow-auto bg-[#0d1c16]">
                            <pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#6ee7b7] m-0">
                                <code>{activeGuide?.files?.[activeFileIndex]?.content}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </main>
            
            <div className="container mx-auto px-4 max-w-4xl mt-20">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 not-prose relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
                        <Sparkles className="w-32 h-32 text-emerald-400" />
                    </div>
                    <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-xl">
                        🔥 Best AI Prompt for Supabase
                    </h3>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-5 relative z-10">
                        <p className="text-zinc-300 font-mono text-sm leading-relaxed">
                            "Act as a senior full stack developer. Create a Supabase authentication system using React. Include Email signup, Google OAuth login, Session persistence, and Protected routes. Tech stack: React, Supabase, TanStack Query."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupabaseGuide;
