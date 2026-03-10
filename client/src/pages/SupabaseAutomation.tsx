import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Zap, 
  Database, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Workflow,
  Search,
  CheckCircle2,
  Settings,
  Shield,
  Table as TableIcon,
  Box,
  AlertTriangle,
  Terminal,
  Activity,
  UserPlus
} from 'lucide-react'

export default function SupabaseAutomation() {
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

  const automationBenefits = [
    { title: "Read Schema", icon: Search, desc: "AI tools can inspect your database structure via MCP." },
    { title: "Run Queries", icon: Terminal, desc: "Execute complex SQL commands through natural language." },
    { title: "Create Tables", icon: TableIcon, desc: "Generate and apply database migrations instantly." },
    { title: "Manage Auth", icon: Shield, desc: "Automate user flow setup and security policies." },
    { title: "Automatic APIs", icon: Zap, color: "text-amber-400", desc: "Instant REST and Realtime APIs generated directly from your tables." },
    { title: "Manage Config", icon: Settings, desc: "Fetch project URLs and keys automatically." },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-primary/30 font-sans antialiased text-bold">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* 1. Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 backdrop-blur-md">
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Prompt-Driven Dev</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            Supabase + MCP <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Automation</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            How modern development tools automate backend creation via the Model Context Protocol.
          </p>
        </motion.div>

        {/* 2. Problem: Complex Backend Workflows */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <AlertTriangle className="text-rose-500 w-7 h-7" />
            The Problem: Complex Backend Workflows
          </h2>
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm shadow-xl shadow-black/5">
            <p className="text-neutral-400 leading-relaxed text-lg">
              Backend development used to mean manually configuring databases, writing CRUD APIs for every table, and setting up auth logic line-by-line. This process is time-consuming and pulls focus away from the core product.
            </p>
          </div>
        </motion.section>

        {/* 3. What is Supabase */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-emerald-500 pl-4">What is Supabase?</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            Supabase handles the core infrastructure (PostgreSQL database, Auth, Storage, and Realtime) so you don't have to build it from scratch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Scalable Auth Flow", "Instant Storage Buckets", "Realtime Sync", "Managed Postgres"].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. What is MCP */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-blue-400 pl-4">What is MCP?</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            The Model Context Protocol (MCP) allows AI coding assistants to securely integrate with external backend services, acting as a gateway for automated actions.
          </p>
          <div className="p-8 rounded-3xl bg-neutral-900/20 border border-neutral-800 italic text-neutral-500">
            "Instead of AI only generating code, MCP allows AI to directly create tables, run queries, and manage authentication."
          </div>
        </motion.section>

        {/* 5. How Supabase + MCP Work Together */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white">How Supabase + MCP Work Together</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-10">
            By connecting MCP to Supabase, you give your AI assistant the ability to manage your database, auth, and storage as if it were a direct member of your development team.
          </p>
          <div className="relative flex flex-col items-center gap-8">
            <div className="w-full max-w-sm p-4 rounded-xl bg-neutral-800 text-center border border-neutral-700 font-medium">
              AI processes prompt
            </div>
            <ArrowRight className="w-6 h-6 rotate-90 text-neutral-700" />
            <div className="w-full max-w-sm p-4 rounded-xl bg-primary text-center border border-primary font-bold shadow-lg shadow-primary/20">
              MCP executes management tool
            </div>
            <ArrowRight className="w-6 h-6 rotate-90 text-neutral-700" />
            <div className="w-full max-w-sm p-4 rounded-xl bg-neutral-800 text-center border border-neutral-700 font-medium">
              Supabase Backend automation complete
            </div>
          </div>
        </motion.section>

        {/* 6. Prompt-Based Backend Development */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-white">Prompt-Based Backend Development</h2>
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
            <p className="text-neutral-300 leading-relaxed mb-8 text-bold uppercase">
              Imagine building a backend by simply describing it:
            </p>
            <div className="p-6 rounded-2xl bg-black border border-primary/20 text-neutral-400 italic mb-6">
              "Configure a storage bucket for avatars and restrict access so users can only upload their own files."
            </div>
          </div>
        </motion.section>

        {/* 7. Real Examples */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Terminal className="text-primary w-8 h-8" />
            Real Examples
          </h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 text-xs text-neutral-500 font-mono">
              Query Result: SELECT posts.title FROM posts;
            </div>
            <div className="p-8 font-mono text-sm overflow-x-auto">
              <pre className="text-emerald-400">
{`[{ "title": "Building with AI" }, { "title": "Supabase Automation" }]`}
              </pre>
            </div>
          </div>
        </motion.section>

        {/* 8. Benefits */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800">
              <h4 className="font-bold text-white mb-4">Speed</h4>
              <p className="text-neutral-500 text-sm">Deploy backend tasks in seconds instead of hours of manual configuration.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800">
              <h4 className="font-bold text-white mb-4">Accuracy</h4>
              <p className="text-neutral-500 text-sm">AI-driven migrations and RLS policies reduce human error in security.</p>
            </div>
          </div>
        </motion.section>

        {/* 9. Conclusion */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-primary/10 via-black to-blue-500/10 p-12 rounded-[2.5rem] border border-primary/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-bold">✅ Conclusion</h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed italic">
            "Supabase + MCP = Simplified Backend Development. Describe what you need and let AI handle the heavy lifting."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="bg-white text-black px-10 py-5 rounded-2xl font-extrabold hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl shadow-white/5"
            >
              Sign Up for Free
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
