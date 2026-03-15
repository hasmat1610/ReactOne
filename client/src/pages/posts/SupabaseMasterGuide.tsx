/**
---
title: "Supabase Master Guide: Auth, DB, RLS & AI Automation"
description: "Master Supabase for production: from scalable authentication and RLS policies to advanced AI-driven backend automation with MCP and Edge Functions."
date: 2026-03-12
updated: 2026-03-12
type: guide
difficulty: advanced
tags: [supabase, postgres, auth, mcp, ai]
primaryKeyword: "supabase guide"
secondaryKeywords: ["supabase auth", "supabase rls", "supabase edge functions", "supabase mcp"]
readingTime: 15
author: "Hasmat Patel"
relatedArticles:
  - /articles/auth-flow-code
  - /articles/backend-integration
  - /articles/axios-react
---
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Copy, CheckCircle2, Code, Database, Shield, 
  Zap, Lock, Users, Globe, Terminal, Sparkles, 
  AlertTriangle, Cpu, ArrowRight, Table as TableIcon, 
  Settings, Activity, Search, Box, Layers, Mail, Monitor,
  Clock, List, ChevronRight, Check, X, ShieldCheck, Anchor,
  FlaskConical, TerminalSquare
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import HeroBanner from '../../components/blog/HeroBanner';

// Shared Types
type Status = 'idle' | 'loading' | 'ok' | 'error';

const SupabaseMasterGuide = () => {
    // State for the interactive code explorer
    const [activeSection, setActiveSection] = useState('setup');
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    
    // State for Supabase Status check (from SupabaseStatus.tsx)
    const [status, setStatus] = useState<Status>('idle');
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            setStatus('loading');
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    setStatus('error');
                    return;
                }
                setUserEmail(data.user?.email ?? null);
                setStatus('ok');
            } catch (e) {
                setStatus('error');
            }
        };
        void checkStatus();
    }, []);

    const guideData = [
        {
            id: 'setup', 
            title: 'Project Setup', 
            icon: <Download className="w-4 h-4" />, 
            files: [
                { 
                    name: 'Terminal', 
                    content: 'npm install @supabase/supabase-js',
                    lang: 'bash'
                },
                { 
                    name: 'lib/supabase.ts', 
                    content: `// src/lib/supabase.ts\nimport { createClient } from '@supabase/supabase-js'\n\nconst supabaseUrl = import.meta.env.VITE_SUPABASE_URL\nconst supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY\n\nexport const supabase = createClient(supabaseUrl, supabaseKey)`,
                    lang: 'ts'
                }
            ]
        },
        {
            id: 'auth', 
            title: 'Authentication', 
            icon: <Lock className="w-4 h-4" />, 
            files: [
                { 
                    name: 'Signup.ts', 
                    content: `const { data, error } = await supabase.auth.signUp({\n  email: "dev@reactone.dev",\n  password: "secure-password-123"\n})`,
                    lang: 'ts'
                },
                { 
                    name: 'GoogleAuth.ts', 
                    content: `const loginWithGoogle = async () => {\n  const { data, error } = await supabase.auth.signInWithOAuth({\n    provider: "google",\n    options: {\n      redirectTo: window.location.origin\n    }\n  })\n}`,
                    lang: 'ts'
                }
            ]
        },
        {
            id: 'database', 
            title: 'Database & RLS', 
            icon: <Database className="w-4 h-4" />, 
            files: [
                { 
                    name: 'FetchData.ts', 
                    content: `const { data, error } = await supabase\n  .from("posts")\n  .select("*")\n  .order("created_at", { ascending: false })`,
                    lang: 'ts'
                },
                { 
                    name: 'Policy.sql', 
                    content: `-- Enable RLS\nALTER TABLE posts ENABLE ROW LEVEL SECURITY;\n\n-- Allow users to see only their posts\nCREATE POLICY "Users can only access their own posts" ON "public"."posts"\nFOR SELECT USING (auth.uid() = user_id);`,
                    lang: 'sql'
                }
            ]
        },
        {
            id: 'automation', 
            title: 'AI Automation', 
            icon: <Cpu className="w-4 h-4" />, 
            files: [
                { 
                    name: 'MCPConfig.json', 
                    content: `{\n  "mcpServers": {\n    "supabase": {\n      "command": "npx",\n      "args": ["-y", "@supabase/mcp-server-supabase"],\n      "env": {\n        "SUPABASE_URL": "...",\n        "SUPABASE_SERVICE_ROLE_KEY": "..."\n      }\n    }\n  }\n}`,
                    lang: 'json'
                }
            ]
        }
    ];

    const currentSection = guideData.find(g => g.id === activeSection);

    const handleCopy = () => { 
        if (currentSection && currentSection.files[activeFileIndex]) {
            navigator.clipboard.writeText(currentSection.files[activeFileIndex].content); 
            setIsCopied(true); 
            setTimeout(() => setIsCopied(false), 2000); 
        }
    };

    return (
        <div className="min-h-screen bg-[#080B16] text-slate-200 font-sans pb-24 selection:bg-emerald-500/30">
            <Helmet>
                <title>Supabase Master Guide: Auth, Database & AI Automation | ReactOne</title>
                <meta name="description" content="Master Supabase for production: from scalable authentication and RLS policies to advanced AI-driven backend automation with MCP." />
            </Helmet>

            {/* ── Hero Banner ── */}
            <HeroBanner
                badgeText="The Complete Backend Masterclass"
                badgeIcon={Zap}
                title="Supabase Master Guide"
                subtitle="Building Scalable Full-Stack Apps with Supabase"
                date="Updated Mar 12, 2026"
                gradientContainer="from-[#064E3B] via-[#059669]/40 to-[#080B16]"
                radialBackground="radial-gradient(circle at 50% 120%, rgba(16, 185, 129, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(52, 211, 153, 0.3), transparent 30%)"
                badgeContainerStyles="border border-emerald-500/30 bg-emerald-500/10"
                badgeTextStyles="text-emerald-400"
                titleGradient="from-white to-white/60 text-emerald-400"
                subtitleColor="text-emerald-300/70"
                avatarRing="from-emerald-400 to-blue-600"
                dateColor="text-slate-400"
            />

            <div className="container mx-auto px-4 max-w-4xl pb-16">

                <article className="prose prose-invert prose-lg max-w-none">
                    {/* Status Pill */}
                    <div className="flex justify-end mb-8 not-prose">
                        <div className={`px-3 py-1 rounded-full border flex items-center gap-2 transition-colors ${
                            status === 'ok' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 
                            status === 'error' ? 'bg-rose-500/5 border-rose-500/20 text-rose-400' :
                            'bg-neutral-900 border-neutral-800 text-neutral-400'
                        }`}>
                            <Activity className={`w-3 h-3 ${status === 'loading' ? 'animate-spin' : ''}`} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status: {status}</span>
                        </div>
                    </div>

                    {/* Table of Contents */}
                    <div className="bg-[#0a0f1d] border border-white/10 rounded-2xl p-6 mb-12 not-prose shadow-sm">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400">
                            <List className="w-4 h-4" />
                            Table of Contents
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-400 font-medium">
                            <li className="flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <a href="#intro" className="hover:text-white transition-colors">Introduction (The Pain Point)</a>
                            </li>
                            <li className="flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <a href="#prerequisites" className="hover:text-white transition-colors">Prerequisites & Setup</a>
                            </li>
                            <li className="flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <a href="#comparison" className="hover:text-white transition-colors">Supabase vs Firebase</a>
                            </li>
                            <li className="flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <a href="#mcp" className="hover:text-white transition-colors">AI Automation with MCP</a>
                            </li>
                            <li className="flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <a href="#implementation" className="hover:text-white transition-colors">Implementation Lab</a>
                            </li>
                            <li className="flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <a href="#architecture" className="hover:text-white transition-colors">Production Architecture</a>
                            </li>
                        </ul>
                    </div>

                    <h2 id="intro" className="text-3xl font-bold text-white mb-6">Introduction: The Backend Bottleneck</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                      Traditional backend development involves manual PostgreSQL configuration, building identical CRUD APIs for every table, and writing sensitive security logic line-by-line. This context-switching between your IDE and Database Dashboard slows momentum and introduces security gaps.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-8">
                      **Supabase** solves this by providing the power of an enterprise-grade PostgreSQL database with a high-level client SDK. By leveraging Row Level Security (RLS) and built-in Auth, you can eliminate the middleman and connect your frontend directly to your data securely.
                    </p>

                    <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 mb-12 not-prose rounded-r-2xl">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                            What You'll Learn:
                        </h4>
                        <ul className="space-y-2 text-slate-300 font-medium">
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Configuring the Supabase client for React/TypeScript production environments.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Implementing secure Auth flows (Google OAuth, Email/OTP).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Mastering Row Level Security (RLS) to protect data at the database layer.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Integrating AI Automation via the Model Context Protocol (MCP).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Structuring your codebase for high-scale, multi-project architectures.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Advanced error handling and testing patterns for mission-critical apps.</span>
                            </li>
                        </ul>
                    </div>

                    <h2 id="prerequisites" className="text-3xl font-bold text-white mb-6">Prerequisites & Setup</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                      Before implementing the patterns in this guide, ensure your environment meets these requirements:
                    </p>
                    <ul className="text-slate-300 mb-8 list-disc pl-6 space-y-2">
                      <li>**Supabase Project** created at [supabase.com](https://supabase.com)</li>
                      <li>**Node.js v18+** installed locally</li>
                      <li>**VITE_SUPABASE_URL** and **VITE_SUPABASE_ANON_KEY** in your `.env`</li>
                    </ul>
                    
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-12 not-prose font-mono text-sm text-emerald-400 leading-relaxed shadow-inner">
                        <div className="flex items-center gap-2 mb-3 text-slate-500 uppercase tracking-widest text-[10px] font-black">
                           <TerminalSquare className="w-3 h-3" /> Terminal Installation
                        </div>
                        <div className="text-white">$ npm install @supabase/supabase-js</div>
                        <div className="text-slate-500 mt-2"># For AI Automation (Optional)</div>
                        <div className="text-white">$ npm install @supabase/mcp-server-supabase</div>
                    </div>

                    <h2 id="comparison" className="text-3xl font-bold text-white mb-8">Supabase vs Firebase</h2>
                    <div className="overflow-x-auto mb-8 not-prose border border-white/10 rounded-2xl bg-[#0a0f1d]">
                        <table className="w-full text-left text-[14px]">
                            <thead className="bg-white/5 text-white font-black uppercase tracking-widest text-[11px]">
                                <tr>
                                    <th className="px-8 py-5 border-b border-white/10">Feature Matrix</th>
                                    <th className="px-8 py-5 border-b border-white/10 text-emerald-400">Supabase</th>
                                    <th className="px-8 py-5 border-b border-white/10 text-amber-500">Firebase</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-400 font-medium">
                                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6 font-bold text-white">Data Structure</td>
                                    <td className="px-8 py-6 text-emerald-400 font-bold">Relational (PostgreSQL)</td>
                                    <td className="px-8 py-6">Document (NoSQL)</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6 font-bold text-white">Security Model</td>
                                    <td className="px-8 py-6 text-emerald-400 font-bold">Row Level Security (RLS)</td>
                                    <td className="px-8 py-6">Security Rules (JSON/CommonExpression)</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6 font-bold text-white">Migrations</td>
                                    <td className="px-8 py-6 text-emerald-400 font-bold">SQL-based (Versioned)</td>
                                    <td className="px-8 py-6">Dynamic / No Schema</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6 font-bold text-white">Complex Queries</td>
                                    <td className="px-8 py-6 text-emerald-400 font-bold">Full SQL Support</td>
                                    <td className="px-8 py-6">Limited Index-based</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6 font-bold text-white">Edge Logic</td>
                                    <td className="px-8 py-6 text-emerald-400 font-bold">Deno (V8) Functions</td>
                                    <td className="px-8 py-6">Node.js Cloud Functions</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-white mb-4">When to Use Each</h3>
                        <p className="text-slate-300 mb-4">
                            **Use Supabase** when your application core relies on relational data (Users {"->"} Posts {"->"} Comments), requires complex reporting, or mandates specific security policies via RLS. It is the gold standard for SaaS applications.
                        </p>
                        <p className="text-slate-300">
                            **Use Firebase** for simple, document-centric prototypes where the development speed of NoSQL outweighs the need for data integrity and complex relational joins.
                        </p>
                    </div>

                    <h2 id="mcp" className="text-3xl font-bold text-white mb-8">AI Automation with MCP</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                      The Model Context Protocol (MCP) is the "killer feature" for AI-native development. By exposing your Supabase schema and management tools to an MCP server, modern AI agents (like Claude or Cursor) can actually **understand and modify** your backend structure in real-time.
                    </p>
                    
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-8 mb-12 flex flex-col items-center justify-center text-center not-prose shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-blue-400/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <div className="flex items-center gap-6 mb-6">
                            <Monitor className="w-10 h-10 text-slate-400" />
                            <ArrowRight className="w-6 h-6 text-blue-500 animate-pulse" />
                            <Cpu className="w-12 h-12 text-blue-400 animate-bounce" />
                            <ArrowRight className="w-6 h-6 text-emerald-500 animate-pulse" />
                            <Database className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">AI Agent Command Chain</h4>
                        <p className="text-slate-500 text-xs italic">{"\"Claude, create a 'profiles' table that syncs with auth.users and enable RLS. \""}</p>
                    </div>

                    <h2 id="errors" className="text-3xl font-bold text-white mb-8">Production Error Handling</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        Silent failures in data fetching lead to corrupted UI states. Always implement specific error handling for the Supabase SDK by checking the `error` object returned from every call.
                    </p>

                    <div className="bg-[#0f1122] border border-white/10 rounded-2xl overflow-hidden not-prose mb-8">
                        <div className="px-4 py-2 bg-white/5 border-b border-white/10 font-mono text-[10px] text-slate-500">Error Handling Pattern</div>
                        <pre className="p-6 text-sm font-mono text-emerald-300">
{`const { data, error } = await supabase
  .from('posts')
  .select('*')

if (error) {
  console.error('Fetch failed:', error.message)
  toast.error(\`Data Error: \${error.code}\`)
  return
}`}
                        </pre>
                    </div>
                </article>
            </div>

            {/* 2. Interactive Explorer Section */}
            <h2 id="implementation" className="text-4xl font-extrabold text-center text-white mb-12 tracking-tight group">
                <FlaskConical className="inline-block mr-3 text-emerald-400 group-hover:rotate-12 transition-transform" />
                Implementation Lab
            </h2>
            <main className="container mx-auto px-4 max-w-6xl mb-32">
                <div className="flex flex-col lg:flex-row items-start gap-12 w-full">
                    <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 px-4">Navigation Pane</h3>
                        <div className="flex flex-col gap-2">
                            {guideData.map((g) => (
                                <button 
                                    key={g.id} 
                                    onClick={() => {
                                        setActiveSection(g.id);
                                        setActiveFileIndex(0);
                                    }}
                                    className={`flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all text-[14px] font-bold w-full text-left cursor-pointer group/btn ${
                                        activeSection === g.id 
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-white shadow-2xl shadow-emerald-500/5' 
                                        : 'bg-transparent border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                    }`}
                                >
                                    <span className={`p-2 rounded-lg transition-colors ${activeSection === g.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-600 group-hover/btn:text-slate-400'}`}>
                                        {g.icon}
                                    </span>
                                    {g.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex-1 bg-[#0a0c1f] rounded-[2rem] overflow-hidden border border-white/10 flex flex-col min-h-[550px] shadow-3xl relative backdrop-blur-xl">
                        <div className="bg-[#12142b]/80 border-b border-white/[0.08] px-6 py-5 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-10 w-full">
                                <div className="flex gap-2 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex gap-2 overflow-x-auto flex-1 no-scrollbar">
                                    {currentSection?.files?.map((f, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setActiveFileIndex(i)}
                                            className={`px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-3 cursor-pointer ${
                                                activeFileIndex === i 
                                                ? 'bg-emerald-500/10 text-emerald-300 shadow-inner border border-emerald-500/20' 
                                                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                            }`}
                                        >
                                            <Code className="w-3.5 h-3.5 opacity-50" />
                                            {f.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={handleCopy}
                                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-black text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer active:scale-95 bg-white/5"
                            >
                                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'COPIED' : 'COPY CODE'}
                            </button>
                        </div>
                        <div className="flex-1 p-8 sm:p-12 overflow-auto bg-[#0a0c1f]/50">
                            <p className="text-[10px] font-black text-slate-700 mb-8 uppercase tracking-[0.5em] flex items-center gap-3">
                                <TerminalSquare className="w-4 h-4" /> Source Code Inspector
                            </p>
                            <pre className="text-[15px] sm:text-[17px] leading-relaxed font-mono text-emerald-50 m-0">
                                <code className="block whitespace-pre-wrap">{currentSection?.files?.[activeFileIndex]?.content}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. Production & Performance Sections */}
            <div className="container mx-auto px-4 max-w-4xl space-y-32">
                <article className="prose prose-invert prose-lg max-w-none">
                    <h2 id="architecture" className="text-3xl font-bold text-white mb-8">Production Architecture</h2>
                    <div className="bg-[#0f1225] p-8 rounded-3xl border border-white/10 mb-8 not-prose shadow-sm">
                        <h4 className="text-emerald-400 font-bold mb-6 text-xs uppercase tracking-widest flex items-center gap-2">
                             <Layers className="w-4 h-4" /> Scalable Directory Layout
                        </h4>
                        <pre className="text-sm font-mono text-slate-400 leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/5">
{`src/
├── lib/
│   └── supabase.ts        # Client singleton with generic types
├── hooks/
│   ├── useSupabase.ts     # Context wrapper for global reach
│   └── useCollection.ts   # Generic real-time list hook
├── services/
│   ├── auth_service.ts    # Logic for signups/social logins
│   └── data_service.ts    # Reusable query builders
└── types/
    └── database.ts        # Generated via 'supabase gen types'`}
                        </pre>
                    </div>

                    <p className="mb-10 text-slate-300 leading-relaxed font-medium">
                        **Why this scales:** By abstracting the Supabase client behind a service layer, you ensure that network retries, logging, and complex joins are defined in one place rather than scattered across individual React components.
                    </p>

                    <h2 id="performance" className="text-3xl font-bold text-white mb-8">Performance & Optimization</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose mb-12">
                        <div className="p-6 rounded-2xl bg-[#080B16] border border-white/5 group hover:border-emerald-500/20 transition-colors">
                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-emerald-400" /> Selective Columns
                            </h5>
                            <p className="text-slate-500 text-sm">Never use `.select("*")` in production. Always specify the exact columns needed to reduce payload size.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#080B16] border border-white/5 group hover:border-emerald-500/20 transition-colors">
                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                <Database className="w-4 h-4 text-blue-400" /> Strategic Indexing
                            </h5>
                            <p className="text-slate-500 text-sm">Ensure columns used in `.eq()`, `.order()`, or `.filter()` are indexed in the Postgres dashboard.</p>
                        </div>
                    </div>

                    <h2 id="testing" className="text-3xl font-bold text-white mb-8">Testing Patterns</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        Testing full-stack code requires mocking the Supabase client or using a local development instance with the **Supabase CLI**.
                    </p>
                    <div className="bg-[#12142b] border border-white/10 rounded-2xl p-6 not-prose mb-12">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <Code className="w-3.5 h-3.5" /> Mocking with Vitest
                        </div>
                        <pre className="text-sm font-mono text-blue-300">
{`vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockResolvedValue({ data: [], error: null })
  }
}))`}
                        </pre>
                    </div>

                    <h2 id="best-practices" className="text-3xl font-bold text-white mb-10">Engineering Best Practices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 not-prose">
                        <div className="bg-[#0a0f1d] border border-white/10 rounded-3xl p-10 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-20 h-20" />
                            </div>
                            <h4 className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest text-xs mb-10">
                                <CheckCircle2 className="w-4 h-4" /> Senior Guidelines
                            </h4>
                            <div className="space-y-8">
                                {[
                                    { t: "Type-First Development", d: "Run 'supabase gen types' to catch database drift during CI/CD." },
                                    { t: "Granular RLS Policies", d: "Define separate policies for INSERT and SELECT to prevent leaked data." },
                                    { t: "Service Role Hygiene", d: "Strictly forbid usage of 'service_role' keys in client-side code." },
                                    { t: "Atomic SQL Migrations", d: "Commit every table change as a versioned .sql file in your repo." },
                                    { t: "Edge Prefetching", d: "Use SWR or TanStack Query to pre-warm data transitions." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm mb-1">{item.t}</p>
                                            <p className="text-slate-500 text-[12px] leading-relaxed italic">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0a0f1d] border border-white/10 rounded-3xl p-10 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <AlertTriangle className="w-20 h-20" />
                            </div>
                            <h4 className="flex items-center gap-2 text-rose-400 font-black uppercase tracking-widest text-xs mb-10">
                                <X className="w-4 h-4" /> Common Pitfalls
                            </h4>
                            <div className="space-y-8">
                                {[
                                    { t: "Client-side Filtering", d: "Pulling 10k rows and filtering in JS. Use '.eq()' or '.filter()' server-side." },
                                    { t: "Performance Audit", d: "Fetching data across multiple related tables (posts -> authors -> categories)." },
                                    { t: "Missing Row Counts", d: "Fetching data for pagination without requesting '{ count: \"exact\" }'." },
                                    { t: "Direct Port Exposure", d: "Exposing Postgres port 5432 to the web. Always route through the API proxy." },
                                    { t: "Unstored Secrets", d: "Hardcoding anon keys in version control instead of using .env files." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <X className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white/80 font-bold text-sm mb-1">{item.t}</p>
                                            <p className="text-slate-500 text-[12px] leading-relaxed italic">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-10">AI Master Prompts</h2>
                    <div className="space-y-6 mb-32 not-prose">
                        {[
                            {
                                type: "Scaffold Auth",
                                prompt: "Act as a senior full-stack developer. Create a production-ready Supabase auth handler in TypeScript including email signup, Google OAuth, and error handling for common edge cases like 'email already exists'. Ensure proper typing for the User object and use Zod for payload validation.",
                                tip: "Ask the AI to include a 'useAuth' hook implementation for a cleaner UI."
                            },
                            {
                                type: "RLS Policy Generator",
                                prompt: "Generate a SQL migration file for a 'team_projects' table. Implement a complex Row Level Security policy: Users can only view projects if they exist in a many-to-many relationship table called 'project_members'. Include an audit column for 'updated_at' via a Postgres function.",
                                tip: "Paste your existing schema first to get more accurate policy logic."
                            },
                            {
                                type: "Performance Audit",
                                prompt: "I am using the Supabase JS client to fetch data across multiple related tables (posts -> authors -> categories). Analyze the current query pattern: [PASTE CODE] and suggest optimizations to minimize network calls and reduce the response JSON size.",
                                tip: "Mention you want to use Postgres Views if the AI suggests overly complex JS-side joins."
                            }
                        ].map((p, i) => (
                            <div key={i} className="bg-[#080B16] border border-white/10 p-10 rounded-[2rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <h4 className="text-emerald-400 font-extrabold mb-6 flex items-center gap-3 tracking-[0.2em] text-xs">
                                    <Box className="w-4 h-4" /> {p.type}
                                </h4>
                                <p className="text-slate-400 font-mono text-sm leading-relaxed border-l-4 border-emerald-500/30 pl-8 mb-6 italic select-all">
                                    "{p.prompt}"
                                </p>
                                <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-2">
                                    <Zap className="w-3 h-3 text-emerald-500" /> Pro Tip: {p.tip}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-4xl font-black text-white mb-12 text-center uppercase tracking-tighter">Key Takeaways</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32 not-prose">
                        {[
                            "Supabase is a full backend orchestration layer, not just a managed database.",
                            "Row Level Security (RLS) is your primary defense against data leaks—never skip it.",
                            "MCP Servers enable AI-native workflows by bridging the gap between LLMs and DB state.",
                            "Strongly-typed clients generated from your schema prevent 80% of runtime backend errors.",
                            "Abstracting Supabase logic into dedicated services ensures code maintainability at scale."
                        ].map((takeaway, i) => (
                            <div key={i} className="flex gap-5 p-8 rounded-3xl bg-white/[0.02] border border-white/5 items-center group hover:bg-white/[0.05] transition-colors shadow-sm">
                                <div className="text-emerald-500 font-black text-3xl group-hover:scale-110 transition-transform">0{i+1}</div>
                                <p className="text-sm text-slate-400 leading-relaxed font-bold group-hover:text-slate-300 transition-colors">{takeaway}</p>
                            </div>
                        ))}
                    </div>

                    <h2 id="faq" className="text-3xl font-bold text-white mb-12 border-b border-white/10 pb-6 uppercase tracking-widest text-sm flex items-center gap-3">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-12 mb-32 not-prose">
                        {[
                            {
                                q: "Is Supabase production ready for large enterprise apps?",
                                a: "Yes. Supabase handles production-grade loads for thousands of companies including Mozilla and 1Password. It uses enterprise PostgreSQL clusters with automated backups and global availability zones."
                            },
                            {
                                q: "How do I handle database migrations in a team environment?",
                                a: "Use the Supabase CLI. It allows you to 'diff' your schema changes locally and commit them as timestamped SQL files. These can be pushed via GitHub Actions to ensure team-wide consistency."
                            },
                            {
                                q: "Should I always use the Supabase SDK instead of Prisma?",
                                a: "For client-side apps, the SDK is superior because it leverages RLS. For server-side Node.js logic (like Edge Functions or a private API), Prisma is a great companion for complex relational data modeling."
                            },
                            {
                                q: "Can I self-host Supabase if I want full control?",
                                a: "Absolutely. Supabase is open-source (ELv2/Apache 2.0). You can self-host the entire stack using Docker, giving you full control over data sovereignty while keeping the same DevExp."
                            },
                            {
                                q: "What is the best way to handle real-time subscriptions?",
                                a: "Use the `on()` method in the SDK. It uses PostgreSQL Logical Replication to broadcast changes in real-time. Just remember to enable the 'realtime' publication for the specific tables you want to track."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="group border-l-2 border-white/5 pl-8 hover:border-emerald-500/30 transition-all">
                                <h4 className="text-lg font-extrabold mb-4 group-hover:text-emerald-400 transition-colors uppercase tracking-tight flex items-center gap-3">
                                    <span className="text-slate-600 text-[12px] font-black">{i + 1}.</span>
                                    {faq.q}
                                </h4>
                                <p className="text-slate-400 leading-relaxed text-base font-medium">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <div className="border-t border-white/10 pt-20">
                    <h3 className="text-white font-black mb-12 text-2xl flex items-center gap-3 tracking-tighter">
                        <Anchor className="w-6 h-6 text-emerald-400" />
                        RELATED ENGINEERING GUIDES
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/auth-flow-code" className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-all group active:scale-95 no-underline shadow-lg hover:border-emerald-500/20">
                            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-6 group-hover:scale-125 transition-transform" />
                            <h4 className="text-base font-black text-white mb-2 uppercase tracking-wide">Secure Auth Patterns</h4>
                            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Production-ready identity flows with session persistent strategies.</p>
                        </Link>
                        <Link to="/backend-integration" className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-all group active:scale-95 no-underline shadow-lg hover:border-blue-500/20">
                            <Box className="w-8 h-8 text-blue-400 mb-6 group-hover:scale-125 transition-transform" />
                            <h4 className="text-base font-black text-white mb-2 uppercase tracking-wide">Backend Integration</h4>
                            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Building resilient communication between Node and React.</p>
                        </Link>
                        <Link to="/axios-react" className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-all group active:scale-95 no-underline shadow-lg hover:border-yellow-500/20">
                            <Zap className="w-8 h-8 text-yellow-400 mb-6 group-hover:scale-125 transition-transform" />
                            <h4 className="text-base font-black text-white mb-2 uppercase tracking-wide">Axios Mastery</h4>
                            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Mastering interceptors, abort controllers, and global config.</p>
                        </Link>
                    </div>
                </div>

                <div className="mt-32 pb-20 text-center">
                    <div className="inline-block px-6 py-3 rounded-full border border-white/10 bg-black/40 text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] backdrop-blur-md">
                        The Global Engineering Hub • ReactOne Documentation
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for Lucide icon
function shieldCheckIcon() {
    return ShieldCheck;
}

export default SupabaseMasterGuide;

