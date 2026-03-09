export const AUTH_SNIPPETS = {
  signup: {
    title: "Sign Up (Normal)",
    files: [
      {
        filename: "Signup.tsx",
        code: `import React from 'react';
import { useSignupForm } from '@/hooks/useSignupForm';

const Signup = () => {
  const { register, handleSubmit, errors, isSubmitting, status, onSubmit } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Create Account</h2>
      {status && <div className={\`alert \${status.type}\`}>{status.message}</div>}
      
      <div className="input-group">
        <input 
          type="text" placeholder="Full Name" 
          {...register('name')} 
        />
        {errors.name && <span className="error-text text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
      </div>
      
      <div className="input-group mt-3">
        <input 
          type="email" placeholder="Email Address" 
          {...register('email')} 
        />
        {errors.email && <span className="error-text text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
      </div>
      
      <div className="input-group mt-3 mb-4">
        <input 
          type="password" placeholder="Password (min 8 chars)" 
          {...register('password')}
        />
        {errors.password && <span className="error-text text-red-500 text-sm mt-1 block">{errors.password.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Signup;`
      }
    ]
  },
  signin: {
    title: "Sign In (Normal)",
    files: [
      {
        filename: "Login.tsx",
        code: `import React from 'react';
import { useLoginForm } from '@/hooks/useLoginForm';

const Login = () => {
  const { register, handleSubmit, errors, isSubmitting, error, onSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Welcome Back</h2>
      {error && <div className="error-alert">{error}</div>}
      
      <div className="input-group">
        <input 
          type="email" placeholder="Email Address" 
          {...register('email')} 
        />
        {errors.email && <span className="error-text text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
      </div>
      
      <div className="input-group mt-3 mb-4">
        <input 
          type="password" placeholder="Password" 
          {...register('password')} 
        />
        {errors.password && <span className="error-text text-red-500 text-sm mt-1 block">{errors.password.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
      
      <div className="links">
         <a href="/forgot-password">Forgot Password?</a>
      </div>
    </form>
  );
};

export default Login;`
      }
    ]
  },
  dashboard: {
    title: 'Dashboard Shell',
    files: [
      {
        filename: 'Dashboard.jsx',
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

export default Dashboard;`
      }
    ]
  },
  pricing: {
    title: 'Pricing Section',
    files: [
      {
        filename: 'Pricing.jsx',
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

export default Pricing;`
      }
    ]
  }
};
