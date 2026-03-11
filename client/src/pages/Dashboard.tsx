import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Code2, 
  Cpu, 
  Layout, 
  Rocket, 
  Settings, 
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
  User,
  LogOut,
  Bell,
  Search,
  Command,
  Zap
} from 'lucide-react';
import Aurora from '../components/ui/aurora/Aurora';

const PHASES = [
  {
    id: 'architect',
    title: '01. Architect',
    description: 'Design systems, Figma conversion, and structural planning.',
    icon: Layout,
    color: '#F97316',
    tasks: ['Design to Code', 'Folder Structure', 'Schema Design'],
    progress: 100,
    status: 'Completed',
    link: '/figma-mcp'
  },
  {
    id: 'frontend',
    title: '02. Frontend',
    description: 'Mastering React 19, strict TypeScript, and modular UI.',
    icon: Code2,
    color: '#3B82F6',
    tasks: ['Hook Form + Zod', 'State Management', 'TanStack Query'],
    progress: 65,
    status: 'In Progress',
    link: '/zustand'
  },
  {
    id: 'backend',
    title: '03. Backend',
    description: 'APIs, Supabase integration, and secure Edge Functions.',
    icon: Cpu,
    color: '#A855F7',
    tasks: ['Authentication', 'Edge Functions', 'Database RLS'],
    progress: 40,
    status: 'Up Next',
    link: '/supabase-guide'
  },
  {
    id: 'deploy',
    title: '04. Optimization',
    description: 'CI/CD, Monitoring, and AI-powered automation.',
    icon: Rocket,
    color: '#10B981',
    tasks: ['Deployment', 'Performance Audit', 'AI Prompting'],
    progress: 10,
    status: 'Coming Soon',
    link: '/supabase-automation'
  }
];

const QUICK_ACTIONS = [

  { title: 'Auth Snippets', icon: Code2, link: '/auth-flow-code', desc: 'Secure login templates' },
  { title: 'MCP Guide', icon: BookOpen, link: '/supabase-mcp', desc: 'Master the protocol' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* --- Global Background Aurora --- */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <Aurora colorStops={['#216be4', '#7c3aed', '#216be4']} amplitude={1.2} />
      </div>

      {/* --- Sidebar --- */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-3xl p-6 flex flex-col z-20 relative">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#216be4] to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-[#216be4]/20">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ReactOne</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'overview', name: 'Overview', icon: Layout },
            { id: 'roadmap', name: 'Roadmap', icon: Rocket },
            { id: 'vault', name: 'Prompt Vault', icon: Sparkles },
            { id: 'guides', name: 'All Guides', icon: BookOpen },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                  : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth z-10 relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-black/20 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 max-w-md w-full">
            <Search className="w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search guides, components..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-neutral-600"
            />
            <Command className="w-3 h-3 text-neutral-600" />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full relative text-neutral-400">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
            </button>
            <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-white/10 group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white group-hover:text-[#216be4] transition-colors">{user?.name || 'Developer'}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Pro Account</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 overflow-hidden">
                {user?.picture ? (
                  <img src={user.picture} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-4 h-4 text-neutral-400" />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Workbench <span className="text-neutral-500">/</span> Overview
            </h1>
            <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
              Welcome back, <span className="text-white font-medium">{user?.name}</span>. Your path to mastering the full MERN stack and production automation continues.
            </p>
          </div>

          {/* Lifecycle Navigator */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#216be4]" />
                Lifecycle Navigator
              </h2>
              <span className="text-xs text-neutral-500 px-3 py-1 rounded-full border border-white/5 bg-white/5 font-medium uppercase tracking-widest">
                Dynamic Progress
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PHASES.map((phase) => (
                <Link 
                  to={phase.link} 
                  key={phase.id}
                  className="group relative flex flex-col bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-10 blur-3xl pointer-events-none" style={{ background: phase.color }} />
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 text-white ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500" style={{ color: phase.color }}>
                      <phase.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                      {phase.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{phase.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-6 flex-1">
                    {phase.description}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">Learning Curve</span>
                      <span className="text-xs font-mono text-neutral-400">{phase.progress}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${phase.progress}%`, backgroundColor: phase.color }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {phase.tasks.map(task => (
                        <span key={task} className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-500 border border-white/5">
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Actions & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <ChevronRight className="w-4 h-4 text-[#216be4]" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Quick Tools</h2>
              </div>
              <div className="space-y-4">
                {QUICK_ACTIONS.map((action) => (
                  <Link 
                    to={action.link} 
                    key={action.title}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 text-neutral-400 group-hover:text-[#216be4] transition-colors">
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{action.title}</h4>
                      <p className="text-xs text-neutral-500 tracking-tight">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Insights / Recommendation */}
            <div className="lg:col-span-2">
              <div className="relative rounded-3xl bg-gradient-to-br from-[#216be4]/10 to-transparent border border-[#216be4]/20 p-8 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <Sparkles className="w-12 h-12 text-[#216be4] animate-pulse opacity-20" />
                </div>
                
                <div className="relative z-10 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#216be4]/20 rounded-full border border-[#216be4]/20 text-[#216be4] text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3" />
                    AI Recommendation
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mastering Backend Guardrails</h3>
                  <p className="text-neutral-400 leading-relaxed mb-6">
                    Based on your progress in <span className="text-white font-medium">Frontend State Management</span>, we recommend diving into <span className="text-white font-medium">Supabase RLS Policies</span> next. Secure your data layer while learning the MERN stack.
                  </p>
                  <Link 
                    to="/supabase-guide" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-[#216be4] hover:text-white transition-all shadow-xl shadow-white/5"
                  >
                    Explore Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
