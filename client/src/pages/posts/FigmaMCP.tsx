import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Figma, Cpu, MoveRight, Sparkles, Box, Code, Layers } from 'lucide-react';
import HeroBanner from '@/components/blog/HeroBanner';

const FigmaMCP: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans pb-24 selection:bg-pink-500/30">

             {/* ── Hero Banner ── */}
            <HeroBanner
                badgeText="Implementation Ready"
                badgeIcon={Code}
                title="Figma MCP Setup"
                subtitle="Configure Figma MCP server on Google Antigravity"
                date="Mar 06, 2026"
                gradientContainer="from-slate-900 via-blue-900/60 to-[#0a0f18]"
                radialBackground="radial-gradient(circle at 50% 120%, rgba(0, 85, 255, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(45, 120, 255, 0.3), transparent 30%)"
                badgeContainerStyles="border border-blue-500/30 bg-blue-500/10"
                badgeTextStyles="text-blue-400"
                titleGradient="from-white to-white/60"
                subtitleColor="text-blue-300/70"
                avatarRing="from-indigo-400 to-blue-600"
                dateColor="text-slate-400"
            />

            {/* Article Content */}
            <main className="container mx-auto px-4 max-w-4xl pb-16">

                <article className="prose prose-invert prose-lg max-w-none">

                    <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 sm:p-6 mb-8 flex gap-4 not-prose">
                        <div className="mt-0.5 shrink-0 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">i</span>
                        </div>
                        <div>
                            <p className="m-0 text-slate-300 text-sm md:text-base leading-relaxed"><strong className="text-sky-400 font-semibold">Future Compatibility:</strong> This guide addresses current limitations with the Figma MCP server and Google Antigravity. Future updates to either the Figma MCP package or the IDE may resolve these issues, rendering this workaround unnecessary. Please check for native support or updated documentation before proceeding.</p>
                        </div>
                    </div>

                    <p className="mb-6">
                        This guide details how to set up the Figma MCP server on Google Antigravity. This is a key enabler for the <strong>"Vibe Coding"</strong> workflow described in <em>From Copy-Paste to Vibe Coding</em>, allowing your agent to "see" your designs and verify its own work.
                    </p>
                    <p className="mb-10">
                        Here are the critical fixes we discovered: local server, stdio mode, and silencing stdout pollutions.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Prerequisites</h2>
                    <ul className="list-disc pl-6 space-y-2 mb-10 text-slate-300 marker:text-slate-500">
                        <li><strong>Node.js:</strong> Version 18+ (verified with v24.11.1).</li>
                        <li><strong>npm:</strong> Installed with Node.js.</li>
                        <li><strong>Antigravity:</strong> Installed and configured.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 1: Generate Figma Personal Access Token</h2>
                    <ol className="list-decimal pl-6 space-y-3 mb-10 text-slate-300 marker:text-slate-500">
                        <li>Log in to Figma in your browser.</li>
                        <li>Go to <strong>Settings</strong> → <strong>Security</strong>.</li>
                        <li>Under <strong>Personal Access Tokens</strong>, click <strong>Generate new token</strong>.</li>
                        <li>Name it (e.g., "Antigravity MCP") and ensure it has <strong>file_read</strong> permission.</li>
                        <li><strong>Copy the token immediately.</strong> You will need it later.</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 2: Install the MCP Server Package</h2>
                    <p className="mb-6 text-slate-300">
                        Open your terminal in the Antigravity directory (or wherever you want the package to live) and install <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-pink-300">figma-mcp-server</code>.
                    </p>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 sm:p-6 mb-6 flex gap-4 not-prose">
                        <div className="mt-0.5 shrink-0 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        </div>
                        <div>
                            <p className="m-0 text-red-200 text-sm md:text-base leading-relaxed">Do <strong>NOT</strong> install <code className="bg-black/30 px-1.5 py-0.5 rounded text-red-300">@figma/mcp-server</code>. It does not support the required <code className="bg-black/30 px-1.5 py-0.5 rounded text-red-300">stdio</code> mode correctly for this setup. Use <code className="bg-black/30 px-1.5 py-0.5 rounded text-red-300">figma-mcp-server</code>.</p>
                        </div>
                    </div>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Shell</div>
                            <div className="flex-1 flex justify-end">
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install figma-mcp-server -g</code></pre>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 3: Patch the Server (Critical)</h2>
                    <p className="mb-6 text-slate-300">
                        The <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-pink-300">figma-mcp-server</code> package prints a debug message to standard output on startup, which breaks the JSON communication protocol used by Antigravity. You must silence this.
                    </p>
                    <ol className="list-decimal pl-6 space-y-3 mb-6 text-slate-300 marker:text-slate-500">
                        <li>Locate the file <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-sky-300">node_modules/figma-mcp-server/mcpServer.js</code>.</li>
                        <li>Open it in a text editor.</li>
                        <li>Find this line:</li>
                    </ol>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-6 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Javascript</div>
                            <div className="flex-1 flex justify-end">
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>{`dotenv.config({ path: path.resolve(__dirname, ".env") });`}</code></pre>
                        </div>
                    </div>

                    <ol className="list-decimal pl-6 space-y-3 mb-6 text-slate-300 marker:text-slate-500" start={4}>
                        <li><strong>Comment it out</strong> by adding <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-sky-300">//</code> at the beginning:</li>
                    </ol>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-6 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Javascript</div>
                            <div className="flex-1 flex justify-end">
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-emerald-400 m-0 bg-transparent p-0"><code>{`// dotenv.config({ path: path.resolve(__dirname, ".env") });`}</code></pre>
                        </div>
                    </div>

                    <ol className="list-decimal pl-6 space-y-3 mb-10 text-slate-300 marker:text-slate-500">
                        <li>Save the file.</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 4: Configure Antigravity</h2>
                    <p className="mb-6 text-slate-300">
                        Open or create your <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-pink-300">mcp_config.json</code> file and add the following configuration:
                    </p>

                    <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 sm:p-6 mb-6 flex gap-4 not-prose">
                        <div className="mt-0.5 shrink-0 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">i</span>
                        </div>
                        <div>
                            <p className="m-0 text-slate-300 text-sm md:text-base leading-relaxed">You must use <strong>absolute paths</strong> for the <code className="bg-black/30 px-1.5 py-0.5 rounded text-sky-300">command</code>, <code className="bg-black/30 px-1.5 py-0.5 rounded text-sky-300">args</code>, and <code className="bg-black/30 px-1.5 py-0.5 rounded text-sky-300">PATH</code> to avoid "ENOENT" errors. Replace the paths below with the actual paths on your own computer.</p>
                        </div>
                    </div>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Json</div>
                            <div className="flex-1 flex justify-end">
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/YOUR/node_modules/figma-mcp-server/mcpServer.js"
      ],
      "env": {
        "FIGMA_API_KEY": "YOUR_FIGMA_TOKEN_FROM_STEP_1"
      }
    }
  }
}`}</code></pre>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Example Configuration</h2>
                    <p className="mb-6 text-slate-300">
                        If your username is <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-sky-300">jcon</code>, it might look like this:
                    </p>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Json</div>
                            <div className="flex-1 flex justify-end">
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": [
        "/home/jcon/antigravity/node_modules/figma-mcp-server/mcpServer.js"
      ],
      "env": {
        "FIGMA_API_KEY": "figd_xxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}`}</code></pre>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Troubleshooting</h2>
                    <ul className="list-disc pl-6 space-y-3 mb-10 text-slate-300 marker:text-slate-500">
                        <li><strong className="text-white">EOF Error:</strong> Usually means Antigravity can't find the <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">node</code> executable. Check your absolute paths and the <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">PATH</code> environment variable.</li>
                        <li><strong className="text-white">Invalid Character Error:</strong> Usually means something is printing to stdout (like <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">dotenv</code>). Double-check Step 3.</li>
                        <li><strong className="text-white">Unauthorized:</strong> Check your <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-sky-300">FIGMA_API_KEY</code> in Step 4.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Test Case: Frontend Mentor QR Code Component</h2>
                    <p className="mb-6 text-slate-300">
                        I tested the Figma MCP by implementing the <a href="#" className="text-sky-400 hover:text-sky-300 underline underline-offset-4">Frontend Mentor QR Code Component</a> using React and Tailwind CSS.
                    </p>

                    <p className="mb-6 text-slate-300">comparison:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 not-prose">
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-white mb-4">Figma Design</span>
                            <div className="w-full aspect-[4/3] bg-[#1e1e24] rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden shadow-lg">
                                <div className="w-48 h-64 bg-slate-800 rounded-xl shadow-xl flex flex-col items-center justify-center">
                                    <div className="w-32 h-32 bg-slate-700/50 rounded-lg mb-6 border border-slate-600/50 flex items-center justify-center p-2">
                                        <div className="w-full h-full border border-slate-500 border-dashed rounded flex flex-wrap gap-[6px] p-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-500/50 rounded-sm" />
                                            <div className="w-3 h-3 rounded-full bg-slate-500/50 rounded-sm" />
                                            <div className="w-3 h-3 rounded-full bg-slate-500/50 rounded-sm" />
                                        </div>
                                    </div>
                                    <div className="w-3/4 h-3 bg-slate-600/50 rounded-full mb-3"></div>
                                    <div className="w-1/2 h-3 bg-slate-600/50 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-white mb-4">React Implementation</span>
                            <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-900/50 to-[#1e1e24] rounded-2xl flex items-center justify-center border border-blue-500/20 overflow-hidden relative shadow-lg">
                                <div className="absolute inset-0 bg-blue-500/10 blur-2xl"></div>
                                <div className="w-48 h-64 bg-white rounded-2xl shadow-2xl z-10 p-4 pb-6 flex flex-col items-center border border-blue-100/50">
                                    <div className="w-full aspect-square bg-blue-500 rounded-xl mb-5 flex items-center justify-center p-3 shadow-inner">
                                        <div className="w-full h-full bg-white flex flex-wrap gap-[4px] p-2 rounded shrink-0 overflow-hidden">
                                            {Array.from({ length: 25 }).map((_, i) => (
                                                <div key={i} className="w-[10px] h-[10px] bg-blue-500 rounded-sm" style={{ opacity: i % 3 !== 0 ? 1 : 0 }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="font-extrabold text-[#1f314f] text-center text-[15px] leading-tight mb-3 px-1">Improve your front-end skills by building projects</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-slate-300">
                        <strong>Result:</strong> The implementation closely matches the Figma design, demonstrating the effectiveness of using the Figma MCP to retrieve design data (colors, typography, spacing) directly within the IDE.
                    </p>

                </article>
            </main>

        </div>
    );
};

export default FigmaMCP;

