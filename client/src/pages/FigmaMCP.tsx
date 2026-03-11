import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Figma, Cpu, MoveRight, Sparkles, Box, Code, Layers, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const FigmaMCP = () => {
  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans pb-24 selection:bg-pink-500/30">

      {/* Navigation Bar */}


      {/* Article Content */}
      <main className="container mx-auto px-4 max-w-4xl pt-32 pb-16">

        {/* Banner Image Prototype */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-900 via-sky-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
            background: "radial-gradient(circle at 50% 120%, rgba(242, 78, 30, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(162, 89, 255, 0.3), transparent 30%)"
          }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
              background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
              maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
            }}></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Figma MCP</span>
          </h1>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Bridging Design and Development</h1>

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
            For years, the holy grail of front-end development has been near-instantaneous translation from design tools into production-ready code. By setting up the Figma MCP server on Google Antigravity, we unlock a key enabler for the <strong>"Vibe Coding"</strong> workflow.
          </p>


          <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6 mb-10 flex gap-4 not-prose">
            <Info className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-sky-400 font-semibold mb-2">Future Compatibility Notice</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                This guide addresses current architectural limitations with the Figma MCP (Model Context Protocol) server when running alongside Google Antigravity. Future updates to the official package or the IDE may resolve these issues natively, making these workarounds obsolete. Always check the latest documentation before patching node modules.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">Bridging Design and Development</h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            For years, the holy grail of front-end development has been near-instantaneous translation from design tools into production-ready code. By setting up the Figma MCP server on Google Antigravity, we unlock a key enabler for the <strong>"Vibe Coding"</strong> workflow.
          </p>
          <p className="mb-10 leading-relaxed text-slate-300">
            This setup grants your AI agent the profound ability to "see" your wireframes, extract exact hex codes, identify auto-layout constraints, and verify its own implemented UI against the original Figma nodes. However, due to recent updates in the JSON-RPC stdio implementation, a few critical fixes are necessary.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
              <Layers className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Extract Design Tokens</h3>
              <p className="text-sm text-slate-400">Instantly pull typography, spacing, and color palettes without manual inspection.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
              <Code className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Vibe Verification</h3>
              <p className="text-sm text-slate-400">Agent autonomously cross-references its generated React components with the Figma canvas.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">0</span>
            Prerequisites
          </h2>
          <ul className="list-none pl-0 space-y-3 mb-10 text-slate-300">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <strong>Node.js:</strong> Version 18+ (verified with v24.11.1)</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <strong>Package Manager:</strong> npm accessible globally</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <strong>IDE:</strong> Google Antigravity configured and running locally</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Secure Your Access Token
          </h2>
          <p className="mb-4 text-slate-300">To allow local scripts to securely read your Figma files, you need a Personal Access Token.</p>
          <ol className="list-decimal pl-6 space-y-3 mb-10 text-slate-300 marker:text-slate-500">
            <li>Log in to your Figma account via the browser.</li>
            <li>Navigate to your avatar dropdown and select <strong>Settings</strong> → <strong>Security</strong>.</li>
            <li>In the <strong>Personal Access Tokens</strong> section, click <strong>Generate new token</strong>.</li>
            <li>Provide a descriptive name (e.g., "Antigravity Local MCP") and configure it with <strong>file_read</strong> scope.</li>
            <li><strong>Store the token securely.</strong> Figma will only display it once.</li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Install the Required Packages
          </h2>
          <p className="mb-6 text-slate-300">
            Open your terminal and install the <strong>community-maintained</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-pink-300">figma-mcp-server</code> package globally.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 sm:p-6 mb-6 flex gap-4 not-prose">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <div>
              <p className="m-0 text-red-200 text-sm md:text-base leading-relaxed">
                <strong>Crucial distinction:</strong> Avoid installing <code className="bg-black/30 px-1.5 py-0.5 rounded text-red-300">@figma/mcp-server</code>. The official package currently intercepts <code className="bg-black/30 px-1.5 py-0.5 rounded text-red-300">stdio</code> streams imperfectly on some operating systems, which disrupts the Model Context Protocol handshake.
              </p>
            </div>
          </div>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Terminal</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install figma-mcp-server -g</code></pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
            The stdio Patch (Critical)
          </h2>
          <p className="mb-6 text-slate-300">
            The MCP spec requires clean JSON-RPC over `stdio`. The `figma-mcp-server` package occasionally outputs `dotenv` debug logs during initialization, which corrupts the JSON stream. We must silence this initialization message.
          </p>
          <ol className="list-decimal pl-6 space-y-3 mb-6 text-slate-300 marker:text-slate-500">
            <li>Find your global node_modules path (run <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">npm root -g</code>).</li>
            <li>Navigate to <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-sky-300">figma-mcp-server/mcpServer.js</code>.</li>
            <li>Locate the following initialization line and comment it out:</li>
          </ol>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">mcpServer.js</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code><span className="text-slate-500">// Comment this out to prevent stdout pollution</span><br /><span className="text-emerald-400">// dotenv.config(&#123; path: path.resolve(__dirname, ".env") &#125;);</span></code></pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
            Configure the Server in Antigravity
          </h2>
          <p className="mb-6 text-slate-300">
            Inject the server into your Antigravity environment by mapping the executable and your API key in the <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">mcp_config.json</code> configuration file. Ensure you are using absolute paths everywhere.
          </p>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">mcp_config.json</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": [
        // CRITICAL: Use your absolute path here
        "/usr/local/lib/node_modules/figma-mcp-server/mcpServer.js"
      ],
      "env": {
        "FIGMA_API_KEY": "figd_xxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}`}</code></pre>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-3xl font-bold text-white mb-6">Test Case: Translating Figma to Code</h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            With the setup complete, the AI agent is now capable of digesting complex Figma tree structures. To validate this, we fed the agent a Node ID representing a complex dashboard layout. Without manually providing any CSS classes, the agent accurately translated the component hierarchy into a responsive React prototype.
          </p>

          <p className="mb-6 text-slate-400 uppercase tracking-widest text-sm font-semibold">Visual Comparison:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 not-prose">
            {/* FIGMA DESIGN SIDE */}
            <div className="flex flex-col items-center">
              <span className="font-semibold text-white mb-4">Figma Design Wireframe</span>
              <div className="w-full aspect-[4/3] bg-[#1e1e24] rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden shadow-lg hover:border-white/20 transition-colors">
                <div className="w-48 h-64 bg-slate-800 rounded-xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 duration-500">
                  <div className="w-32 h-32 bg-slate-700/50 rounded-lg mb-6 border border-slate-600/50 flex items-center justify-center p-2">
                    <div className="w-full h-full border border-slate-500 border-dashed rounded flex flex-wrap gap-[6px] p-2">
                      <div className="w-3 h-3 bg-slate-500/50 rounded-sm" />
                      <div className="w-3 h-3 bg-slate-500/50 rounded-sm" />
                      <div className="w-3 h-3 bg-slate-500/50 rounded-sm" />
                    </div>
                  </div>
                  <div className="w-3/4 h-3 bg-slate-600/50 rounded-full mb-3"></div>
                  <div className="w-1/2 h-3 bg-slate-600/50 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* REACT IMPLEMENTATION SIDE */}
            <div className="flex flex-col items-center">
              <span className="font-semibold text-white mb-4">React Implementation</span>
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-900/40 to-[#1e1e24] rounded-2xl flex items-center justify-center border border-blue-500/30 overflow-hidden relative shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)] hover:border-blue-500/60 transition-colors group">
                <div className="absolute inset-0 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                <div className="w-48 h-64 bg-white rounded-2xl shadow-2xl z-10 p-4 pb-6 flex flex-col items-center border border-blue-100/50 transition-transform hover:scale-105 duration-500">
                  <div className="w-full aspect-square bg-blue-500 rounded-xl mb-5 flex items-center justify-center p-3 shadow-inner">
                    <div className="w-full h-full bg-white flex flex-wrap gap-[4px] p-2 rounded shrink-0 overflow-hidden">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-[10px] h-[10px] bg-blue-500 rounded-sm transition-transform hover:scale-110" style={{ opacity: i % 3 !== 0 ? 1 : 0 }} />
                      ))}
                    </div>
                  </div>
                  <div className="font-extrabold text-[#1f314f] text-center text-[15px] leading-tight mb-3 px-1">Improve your front-end skills by building projects</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
              <Figma className="w-32 h-32 text-emerald-500" />
            </div>
            <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-xl">
              <Sparkles className="w-6 h-6" /> Test Conclusion
            </h3>
            <p className="text-slate-300 leading-relaxed m-0 text-base relative z-10">
              The React node structure perfectly mirrored the Figma auto-layout parameters. The MCP integration successfully extracted border radii, exact spacing gaps, and hex color values, proving that closing the gap between design and development is an immediate reality inside Google Antigravity.
            </p>
          </div>

        </article>
      </main>

    </div>
  );
};

export default FigmaMCP;
