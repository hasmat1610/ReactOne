import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowLeft, Server, Database, Shield, Zap, TerminalSquare, Sparkles } from 'lucide-react';

const BackendIntegration = () => {
    return (
        <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5] font-sans pb-24 selection:bg-[#216be4]/30">

            {/* Navigation Bar */}


            {/* Article Content */}
            <main className="container mx-auto px-4 max-w-4xl pt-32 pb-16">

                {/* Banner Image Prototype */}
                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-900 via-sky-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
                    {/* Abstract Pattern */}
                    <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
                        background: "radial-gradient(circle at 50% 120%, rgba(16, 185, 129, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(5, 150, 105, 0.3), transparent 30%)"
                    }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
                            background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
                            maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
                        }}></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Backend Integration</span>
                    </h1>
                </div>

                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
                        <Code className="w-4 h-4" />
                        <span>Implementation Ready</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Bridging the Gap</h1>

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
                        While React handles the UI gracefully, communicating with a backend structure requires standard patterns. Whether you are using a custom REST API or tRPC, understanding the data flow structure is essential to avoiding race conditions and ensuring security.
                    </p>



                    <h2 className="text-3xl font-bold text-white mb-6">Bridging the Gap</h2>
                    <p className="mb-6 leading-relaxed text-zinc-300">
                        While React handles the UI gracefully, communicating with a backend structure requires standard patterns. Whether you are using a custom REST API or tRPC, understanding the data flow structure is essential to avoiding race conditions and ensuring security.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 not-prose">
                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-[#216be4]/30 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
                                <Database className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-bold mb-2">Data Persistence</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Ensure safe transmission of user data to SQL/NoSQL databases via properly structured API endpoints.</p>
                        </div>

                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-[#216be4]/30 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-bold mb-2">Secure Authentication</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Best practices for setting HttpOnly cookies, storing JWTs, and validating CSRF tokens.</p>
                        </div>

                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-[#216be4]/30 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-bold mb-2">Request Caching</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Utilizing React Query or SWR to automatically cache, refetch, and deduplicate backend queries.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Standard Express.js API Setup</h2>
                    <p className="mb-6 text-zinc-300">
                        For users implementing the Auth Flow and needing a quick Node.js backend.
                    </p>

                    <div className="bg-[#0a0d14] rounded-xl border border-white/5 overflow-hidden not-prose mb-10">
                        <div className="flex items-center px-4 py-3 bg-[#1A1A1A] border-b border-white/5">
                            <TerminalSquare className="w-4 h-4 text-zinc-500 mr-2" />
                            <div className="text-xs text-zinc-400 font-mono tracking-wider">server.js</div>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <pre className="text-sm font-mono text-zinc-300 leading-relaxed m-0 p-0 bg-transparent"><code>{`const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Standard middleware for React frontend integration
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true, // Crucial for accepting cookies/JWT
}));
app.use(express.json());
app.use(cookieParser());

// Example API Route matching our Auth frontend
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // 1. Verify credentials with DB
  // 2. Generate JWT
  // 3. Set standard secure cookie
  res.cookie('access_token', 'jwt_string_here', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({ success: true, user: { email, role: 'user' } });
});

app.listen(8080, () => console.log('Backend running on port 8080'));`}</code></pre>
                        </div>
                    </div>

                    {/* AI Master Prompt */}
                    <div className="bg-[#216be4]/10 border border-[#216be4]/20 rounded-xl p-8 not-prose relative overflow-hidden mt-16 mb-8">
                        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
                            <Server className="w-32 h-32 text-[#216be4]" />
                        </div>
                        <h3 className="text-[#216be4] font-bold mb-4 flex items-center gap-2 text-xl">
                            <Sparkles className="w-6 h-6" /> AI Master Prompt
                        </h3>
                        <div className="bg-black/40 border border-white/10 rounded-lg p-5 relative z-10">
                            <p className="text-zinc-300 font-mono text-sm leading-relaxed">
                                "Write a Node.js/Express backend controller and route for [Feature, e.g., User Authentication]. Implement input validation using Zod, secure password hashing using bcrypt, and return an HTTP-only cookie with a JWT. Include error handling for common edge cases (e.g., user exists, invalid credentials) and follow RESTful best practices."
                            </p>
                        </div>
                        <p className="text-zinc-400 text-sm mt-4 relative z-10">
                            Use this prompt to generate robust, secure endpoints for your backend infrastructure.
                        </p>
                    </div>

                </article>
            </main>
        </div>
    );
};

export default BackendIntegration;
