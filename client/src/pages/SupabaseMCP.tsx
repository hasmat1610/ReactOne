import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Zap, 
  Database, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Lock,
  Layers,
  Cloud,
  Cpu,
  Monitor,
  Workflow,
  CheckCircle2,
  Mail,
  Box,
  AlertTriangle,
  Terminal,
  Activity,
  UserPlus
} from 'lucide-react'

export default function SupabaseMCP() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-primary/30 font-sans antialiased">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* 1. Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Connecting AI to Backend</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Supabase <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">MCP</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            The Model Context Protocol (MCP) bridges the gap between AI tools (like Cursor or Claude) and your Supabase backend.
          </p>
        </motion.div>

        {/* 2. Problem: Complex Backend Workflows */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <AlertTriangle className="text-amber-500 w-7 h-7" />
            The Problem: Complex Backend Workflows
          </h2>
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm">
            <p className="text-neutral-400 leading-relaxed text-lg">
              Traditional backend development often involves manual configuration, repeated boilerplate, and constant context-switching between your editor and the database dashboard. This slows down development and increases the chance of errors.
            </p>
          </div>
        </motion.section>

        {/* 3. What is Supabase */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-primary pl-4">What is Supabase?</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            Supabase is an open-source Firebase alternative that provides a complete backend suite:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Database, title: "PostgreSQL", desc: "Enterprise-grade database." },
              { icon: ShieldCheck, title: "Auth", desc: "Secure user management." },
              { icon: Cloud, title: "Storage", desc: "Store images and files." }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800">
                <f.icon className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold text-white mb-2">{f.title}</h4>
                <p className="text-neutral-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. What is MCP */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-blue-400 pl-4">What is MCP?</h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            <span className="text-white font-medium italic">Model Context Protocol (MCP)</span> is a standard that allows AI models to safely talk to external tools. It's like giving your AI assistant a "direct line" to your favorite services.
          </p>
        </motion.section>

        {/* 5. How Supabase + MCP Work Together */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white">How Supabase + MCP Work Together</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-10">
            By connecting the Supabase MCP server to your AI tool, the models can perform backend actions directly on your project.
          </p>
          <div className="bg-neutral-900/50 p-8 rounded-[2rem] border border-neutral-800 flex flex-col md:flex-row items-center gap-8 justify-center last:border-0 italic">
            <div className="text-center px-4">
              <Code2 className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="text-xs font-mono">AI IDE</p>
            </div>
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 text-neutral-700" />
            <div className="text-center px-4">
              <Cpu className="w-10 h-10 text-blue-400 mx-auto mb-2" />
              <p className="text-xs font-mono">MCP Protocol</p>
            </div>
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 text-neutral-700" />
            <div className="text-center px-4">
              <Database className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs font-mono">Supabase Backend</p>
            </div>
          </div>
        </motion.section>

        {/* 6. Prompt-Based Backend Development */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white">Prompt-Based Backend Development</h2>
          <p className="text-neutral-400 leading-relaxed text-lg mb-8">
            Describe what you need in plain English, and the AI handles the implementation through the MCP server.
          </p>
          <div className="bg-[#111] p-6 rounded-2xl border border-primary/20 text-neutral-300 italic">
            "Create a 'profiles' table with RLS enabled so only users can see their own data."
          </div>
        </motion.section>

        {/* 7. Real Examples */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <CheckCircle2 className="text-primary w-8 h-8" />
            Real Examples
          </h2>
          <div className="space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 text-xs text-neutral-500 font-mono">
                Prompt: Design tables and track migrations
              </div>
              <div className="p-8 font-mono text-sm overflow-x-auto">
                <pre className="text-primary">
{`{
  "project_id": "ref-12345",
  "name": "create_posts_table",
  "query": "CREATE TABLE posts (id uuid, title text);"
}`}
                </pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 8. Benefits */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24 overflow-hidden rounded-3xl border border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-bold text-white">Benefit</th>
                <th className="px-6 py-4 font-bold text-white">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 bg-neutral-900/20">
              {[
                { b: "Faster Development", r: "Backend ready instantly" },
                { b: "Less Manual Coding", r: "AI generates SQL and APIs" },
                { b: "Production Ready", r: "Scale with PostgreSQL" }
              ].map((row, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-semibold text-primary">{row.b}</td>
                  <td className="px-6 py-4 text-neutral-400 italic">{row.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.section>

        {/* 9. Conclusion (Simplified Backend Summary Section integration) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 p-8 md:p-12 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-white">✅ Conclusion</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Supabase + MCP = Simplified Backend Development. Instead of building infrastructure, you can focus on building features and delivering a great user experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all hover:scale-105"
            >
              Get Started for Free
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
