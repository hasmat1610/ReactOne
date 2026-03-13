import { useAppSelector } from '../../store/hooks';
import PostLayout from '../../components/blog/PostLayout';
import { Figma, Sparkles, Layers, Code, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const FigmaMCP = () => {
    const post = useAppSelector((state) => state.posts.allPosts.find(p => p.id === 'figma-mcp'));

    if (!post) return null;

    return (
        <PostLayout
            title={post.title}
            description={post.description}
            category={post.category}
            date={post.date}
            readingTime={post.readingTime}
            author={post.author}
            heroIcon={<Figma className="w-24 h-24 text-emerald-400 animate-pulse opacity-50" />}
        >
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

            <div className="bg-[#0f0f0f] rounded-[8px] p-[20px] my-[32px] border border-white/5 relative group overflow-hidden">
                <div className="text-[12px] text-slate-500 mb-4 font-mono font-bold uppercase tracking-[0.1em] flex justify-between items-center px-1">
                    <span>Terminal</span>
                </div>
                <pre className="m-0 font-['JetBrains_Mono',_monospace] text-[16px] leading-[1.6] text-slate-300 whitespace-pre-wrap break-words">
                    <code>npm install figma-mcp-server -g</code>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                The stdio Patch (Critical)
            </h2>
            <p className="mb-6 text-slate-300">
                The MCP spec requires clean JSON-RPC over `stdio`. The `figma-mcp-server` package occasionally outputs `dotenv` debug logs during initialization, which corrupts the JSON stream. We must silence this initialization message.
            </p>

            <div className="bg-[#0f0f0f] rounded-[8px] p-[20px] my-[32px] border border-white/5 relative group overflow-hidden">
                <div className="text-[12px] text-slate-500 mb-4 font-mono font-bold uppercase tracking-[0.1em] flex justify-between items-center px-1">
                    <span>mcpServer.js</span>
                </div>
                <pre className="m-0 font-['JetBrains_Mono',_monospace] text-[16px] leading-[1.6] text-slate-300 whitespace-pre-wrap break-words">
                    <code>{`// Comment this out to prevent stdout pollution
// dotenv.config({ path: path.resolve(__dirname, ".env") });`}</code>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Configure the Server in Antigravity
            </h2>
            
            <div className="bg-[#0f0f0f] rounded-[8px] p-[20px] my-[32px] border border-white/5 relative group overflow-hidden">
                <div className="text-[12px] text-slate-500 mb-4 font-mono font-bold uppercase tracking-[0.1em] flex justify-between items-center px-1">
                    <span>mcp_config.json</span>
                </div>
                <pre className="m-0 font-['JetBrains_Mono',_monospace] text-[16px] leading-[1.6] text-slate-300 whitespace-pre-wrap break-words">
                    <code>{`{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/figma-mcp-server/mcpServer.js"],
      "env": {
        "FIGMA_API_KEY": "figd_xxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}`}</code>
                </pre>
            </div>

            <hr className="border-white/10 my-12" />

            <h2 className="text-3xl font-bold text-white mb-6">Test Conclusion</h2>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 not-prose relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
                    <Figma className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-xl">
                    <Sparkles className="w-6 h-6" /> Result Analysis
                </h3>
                <p className="text-slate-300 leading-relaxed m-0 text-base relative z-10">
                    The React node structure perfectly mirrored the Figma auto-layout parameters. The MCP integration successfully extracted border radii, exact spacing gaps, and hex color values, proving that closing the gap between design and development is an immediate reality inside Google Antigravity.
                </p>
            </div>
        </PostLayout>
    );
};

export default FigmaMCP;
