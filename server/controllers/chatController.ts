import type { Request, Response } from 'express'

type ChatBody = { message?: unknown }

type AiResponseEntry = {
  keywords: string[]
  answer: string
}

const GEN_PROMPTS = [
  {
    keywords: ['login', 'signin', 'auth', 'form'],
    code: `import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => console.log('Authenticating...', data);

  return (
    <div className="p-8 rounded-2xl bg-[#0d1520] border border-white/5 shadow-xl w-[320px]">
      <h2 className="text-xl font-bold mb-6 text-white">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input 
          {...register('email')}
          placeholder="Email" 
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
        />
        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        
        <input 
          type="password"
          {...register('password')}
          placeholder="Password" 
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
        />
        {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20">
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginForm;`,
    explanation:
      "I've generated a production-ready login form using **React Hook Form** and **Zod** for validation. The layout is optimized for dark mode with a modern, clean look.",
  },
  {
    keywords: ['axios', 'api', 'interceptor', 'service'],
    code: `import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;`,
    explanation:
      "Here's a production-ready **Axios instance** with request and response interceptors. This handles dynamic base URLs, automatic auth token injection, and global 401 handling.",
  },
  {
    keywords: ['dashboard', 'sidebar', 'layout'],
    code: `import React, { useState } from 'react';
import { Home, BarChart2, Users, Settings, LogOut, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const navItems = [
    { icon: <Home size={20}/>, label: 'Overview' },
    { icon: <BarChart2 size={20}/>, label: 'Analytics' },
    { icon: <Users size={20}/>, label: 'Team' },
    { icon: <Settings size={20}/>, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-[#050505]">
      {/* Sidebar */}
      <aside className={\`bg-[#0f1115] border-r border-white/5 transition-all duration-300 \${isOpen ? 'w-64' : 'w-20'}\`}>
        <div className="p-6 flex items-center justify-between">
          {isOpen && <span className="font-bold text-xl text-blue-400">NexCore</span>}
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white">
            {isOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item, i) => (
            <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all">
              {item.icon}
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-white">System Reports</h1>
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="p-6 rounded-3xl bg-[#0f1115] border border-white/5 h-40 animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;`,
    explanation:
      "I've created a modern, responsive **Dashboard Layout** with a collapsible sidebar and glassmorphism elements.",
  },
  {
    keywords: ['pricing', 'plans', 'tiers'],
    code: `import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: '0', features: ['Core Components', 'Community Access', 'MIT License'] },
    { name: 'Pro', price: '49', features: ['Premium Templates', 'Priority Support', 'Cloud Sync'], highlight: true },
    { name: 'Enterprise', price: 'Custom', features: ['Custom Branding', 'Dedicated Account Manager', 'SLA'] },
  ];

  return (
    <div className="py-20 bg-black flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
        {plans.map((plan, i) => (
          <div key={i} className={\`p-8 rounded-3xl border transition-all duration-500 \${plan.highlight ? 'bg-blue-600 border-blue-400 scale-105 shadow-[0_0_40px_rgba(59,130,246,0.3)]' : 'bg-[#0f1115] border-white/5 hover:border-white/20'}\`}>
            <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-white">$\${plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-slate-400">/mo</span>}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check size={16} className={plan.highlight ? 'text-white' : 'text-blue-400'} /> {f}
                </li>
              ))}
            </ul>
            <button className={\`w-full py-3 rounded-xl font-bold transition-all \${plan.highlight ? 'bg-white text-blue-600 hover:bg-slate-100' : 'bg-blue-600 text-white hover:bg-blue-700'}\`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;`,
    explanation:
      'Here is a clean, conversion-optimized **Pricing Section**. It features a highlighted "Pro" tier and subtle hover transitions.',
  },
] as const

const AI_RESPONSES: AiResponseEntry[] = [
  ...GEN_PROMPTS.map((g) => ({
    keywords: [...g.keywords],
    answer: `${g.explanation}\n\n\`\`\`jsx\n${g.code}\n\`\`\``,
  })),
  {
    keywords: ['hook', 'hooks', 'usestate', 'useeffect', 'useref', 'usememo', 'usecallback'],
    answer:
      'React Hooks let you use state and lifecycle features in functional components. Start with **useState** for local state, then learn **useEffect** for side effects.',
  },
  {
    keywords: ['state', 'state management', 'redux', 'context', 'zustand'],
    answer:
      'For local state, use `useState`. For global state, use Context for simple cases or a store library like Redux Toolkit or Zustand.',
  },
  {
    keywords: ['form', 'validation', 'zod', 'react hook form'],
    answer:
      'Use **React Hook Form** for performance-optimized form handling combined with **Zod** for type-safe validation.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'start', 'begin', 'help'],
    answer:
      "Welcome back to ReactOne! I can generate production-ready code. Try asking me for a 'login form' or an 'axios instance' to see examples.",
  },
]

const FALLBACK_RESPONSE =
  "That's a great topic! Try asking me for a 'login form' or an 'axios instance' to see production-ready examples."

export function handleChatRequest(req: Request, res: Response) {
  const { message } = req.body as ChatBody
  if (typeof message !== 'string' || !message) {
    return res.status(400).json({ error: 'message is required' })
  }

  const lower = message.toLowerCase()
  let reply = FALLBACK_RESPONSE

  for (const entry of AI_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      reply = entry.answer
      break
    }
  }

  setTimeout(() => {
    res.json({ reply })
  }, 600)
}

