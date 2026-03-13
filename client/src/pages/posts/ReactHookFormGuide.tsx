import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Zap, Settings, ShieldCheck, Download, Copy, CheckCircle2, Code, FileText, ClipboardCheck } from 'lucide-react';

interface FileItem {
    name: string;
    content: string;
}

interface GuideItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    files: FileItem[];
}

const guideData: GuideItem[] = [
    {
        id: 'setup', title: 'Setup & Installation', icon: <Download className="w-[18px] h-[18px]" />, files: [
            { name: 'Terminal', content: 'npm install react-hook-form zod @hookform/resolvers' },
            { name: 'Why RHF?.txt', content: '// React Hook Form advantages:\n// 1. Minimal re-renders — uncontrolled inputs\n// 2. Tiny bundle size (~9KB)\n// 3. Built-in validation or schema validation (Zod/Yup)\n// 4. Easy integration with UI libraries\n// 5. TypeScript-first\n// 6. No dependencies on controlled components\n// 7. DevTools available' }
        ]
    },
    {
        id: 'basic-form', title: 'Basic Form', icon: <FileText className="w-[18px] h-[18px]" />, files: [
            { name: 'LoginForm.jsx', content: `import { useForm } from 'react-hook-form';
          
          const LoginForm = () => {
          const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          } = useForm();
          
          const onSubmit = async (data) => {
          console.log(data);
          // { email: '...', password: '...' }
          };
          
          return (
          <form onSubmit={handleSubmit(onSubmit)}>
          <input
          {...register('email', {
          required: 'Email is required',
          pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
          },
          })}
          placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}
          
          <input
          type="password"
          {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 characters' },
          })}
          placeholder="Password"
          />
          {errors.password && <span>{errors.password.message}</span>}
          
          <button disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          </form>
          );
          };` }
        ]
    },
    {
        id: 'zod', title: 'Zod Validation', icon: <ShieldCheck className="w-[18px] h-[18px]" />, files: [
            { name: 'schema.js', content: `import { z } from 'zod';
          
          export const registerSchema = z.object({
          name: z.string().min(2, 'Name must be at least 2 characters'),
          email: z.string().email('Invalid email'),
          password: z
          .string()
          .min(8, 'Min 8 characters')
          .regex(/[A-Z]/, 'Must contain uppercase')
          .regex(/[0-9]/, 'Must contain a number'),
          confirmPassword: z.string(),
          }).refine((data) => data.password === data.confirmPassword, {
          message: 'Passwords do not match',
          path: ['confirmPassword'],
          });` },
            { name: 'RegisterForm.jsx', content: `import { useForm } from 'react-hook-form';
          import { zodResolver } from '@hookform/resolvers/zod';
          import { registerSchema } from './schema';
          
          const RegisterForm = () => {
          const {
          register,
          handleSubmit,
          formState: { errors },
          } = useForm({
          resolver: zodResolver(registerSchema),
          });
          
          const onSubmit = (data) => console.log(data);
          
          return (
          <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} placeholder="Name" />
          {errors.name && <p>{errors.name.message}</p>}
          
          <input {...register('email')} placeholder="Email" />
          {errors.email && <p>{errors.email.message}</p>}
          
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
          
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          
          <button type="submit">Register</button>
          </form>
          );
          };` }
        ]
    },
    {
        id: 'advanced', title: 'Advanced Patterns', icon: <Zap className="w-[18px] h-[18px]" />, files: [
            { name: 'DynamicFields.jsx', content: `import { useForm, useFieldArray } from 'react-hook-form';
          
          const DynamicForm = () => {
          const { register, control, handleSubmit } = useForm({
          defaultValues: { items: [{ name: '' }] },
          });
          
          const { fields, append, remove } = useFieldArray({
          control,
          name: 'items',
          });
          
          return (
          <form onSubmit={handleSubmit(console.log)}>
          {fields.map((field, index) => (
          <div key={field.id}>
          <input {...register(\`items.\${index}.name\`)} />
          <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
          ))}
          <button type="button" onClick={() => append({ name: '' })}>Add Item</button>
          <button type="submit">Submit</button>
          </form>
          );
          };` },
            { name: 'WatchExample.jsx', content: `import { useForm } from 'react-hook-form';
          
          const WatchForm = () => {
          const { register, watch, handleSubmit } = useForm();
          const watchRole = watch('role'); // Watch specific field
          
          return (
          <form onSubmit={handleSubmit(console.log)}>
          <select {...register('role')}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          </select>
          
          {watchRole === 'admin' && (
          <input
          {...register('adminCode')}
          placeholder="Admin Code"
          />
          )}
          
          <button type="submit">Submit</button>
          </form>
          );
          };` }
        ]
    },
    {
        id: 'best-practices', title: 'Best Practices', icon: <ClipboardCheck className="w-[18px] h-[18px]" />, files: [
            { name: 'FormWrapper.jsx', content: `// Reusable form input component
          import { useFormContext } from 'react-hook-form';
          
          const FormInput = ({ name, label, type = 'text', ...rest }) => {
          const { register, formState: { errors } } = useFormContext();
          
          return (
          <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
          id={name}
          type={type}
          {...register(name)}
          {...rest}
          />
          {errors[name] && (
          <span className="error">{errors[name].message}</span>
          )}
          </div>
          );
          };
          
          // Usage with FormProvider:
          // <FormProvider {...methods}>
          //   <FormInput name="email" label="Email" />
          // </FormProvider>` },
            { name: 'tips.txt', content: '// Best Practices:\n// 1. Use Zod + zodResolver for type-safe validation\n// 2. Create reusable FormInput components\n// 3. Use useFormContext for nested components\n// 4. Use watch() sparingly — it causes re-renders\n// 5. Use defaultValues for all fields\n// 6. Use useFieldArray for dynamic fields\n// 7. Handle async validation with validate function\n// 8. Reset form with reset() after successful submit' }
        ]
    }
];

const ReactHookFormGuide = () => {
    const [activeGuideId, setActiveGuideId] = useState<string>(guideData[0]?.id || 'setup');
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedPrompt1, setCopiedPrompt1] = useState(false);
    const [copiedPrompt2, setCopiedPrompt2] = useState(false);
    const activeGuide = guideData.find(g => g.id === activeGuideId);
    const handleGuideChange = (id: string) => { setActiveGuideId(id); setActiveFileIndex(0); setIsCopied(false); };
    const handleCopyPrompt = (text: string, n: number) => { navigator.clipboard.writeText(text); if (n === 1) { setCopiedPrompt1(true); setTimeout(() => setCopiedPrompt1(false), 2000); } else { setCopiedPrompt2(true); setTimeout(() => setCopiedPrompt2(false), 2000); } };
    const handleCopy = () => { if (activeGuide) { navigator.clipboard.writeText(activeGuide.files[activeFileIndex]?.content || ''); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); } };

    if (!activeGuide) return null;


    return (
        <div className="min-h-screen bg-[#060913] text-slate-200 font-sans pb-24 selection:bg-indigo-500/30">
            

            <div className="container mx-auto px-4 max-w-4xl pt-32 pb-16">
                {/* Banner Image Prototype */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-900 via-sky-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
           {/* Abstract Pattern */}
           <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
               background: "radial-gradient(circle at 50% 120%, rgba(236, 89, 144, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(190, 50, 100, 0.3), transparent 30%)"
           }}></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
               background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
               maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
               WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
             }}></div>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">React Hook Form</span>
           </h1>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Deep Dive: React Hook Form</h1>
          
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
          Performant, flexible, and extensible forms with easy-to-use validation.
          </p>

                    <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">React Hook Form is a lightweight form library that leverages uncontrolled components and React hooks to deliver high performance. Unlike controlled form libraries, it minimizes re-renders by using refs instead of state, resulting in a smoother user experience even with complex forms.</p>

                    <h2 className="text-3xl font-bold text-white mb-6">RHF vs Formik vs Controlled</h2>
                    <div className="overflow-x-auto mb-10 not-prose"><table className="w-full text-left border-collapse text-sm text-slate-300"><thead><tr className="border-b border-white/10 bg-white/5"><th className="py-3 px-4 font-semibold text-white">Feature</th><th className="py-3 px-4 font-semibold text-white">React Hook Form</th><th className="py-3 px-4 font-semibold text-white">Formik / Controlled</th></tr></thead><tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Re-renders</td><td className="py-3 px-4 text-green-400">Minimal — uncontrolled inputs with refs</td><td className="py-3 px-4 text-slate-500">Every keystroke causes re-render</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Bundle Size</td><td className="py-3 px-4 text-green-400">~9KB — no dependencies</td><td className="py-3 px-4">Formik ~13KB + Yup ~12KB</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Validation</td><td className="py-3 px-4 text-green-400">Built-in + Zod/Yup resolvers</td><td className="py-3 px-4">Requires Yup or manual validation</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Dynamic Fields</td><td className="py-3 px-4 text-green-400">useFieldArray — first-class support</td><td className="py-3 px-4 text-slate-500">Complex manual setup</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">TypeScript</td><td className="py-3 px-4 text-green-400">First-class with inference</td><td className="py-3 px-4">Partial support</td></tr>
                    </tbody></table></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"><FileText className="w-8 h-8 text-yellow-400 mb-4" /><h3 className="text-white font-semibold text-lg mb-2">register()</h3><p className="text-sm text-slate-400">Connect inputs to the form with a single function call. Supports validation rules inline.</p></div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"><ShieldCheck className="w-8 h-8 text-purple-400 mb-4" /><h3 className="text-white font-semibold text-lg mb-2">Zod Resolver</h3><p className="text-sm text-slate-400">Type-safe schema validation with automatic error messages and TypeScript inference.</p></div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>Installation</h2>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Terminal</div></div><div className="p-5"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install react-hook-form zod @hookform/resolvers</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>Basic Form with Validation</h2>
                    <p className="mb-6 text-slate-300">Use <code>useForm()</code> to get <code>register</code>, <code>handleSubmit</code>, and <code>formState</code>. Spread register on inputs to connect them.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">LoginForm.jsx</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await loginAPI(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /\\S+@\\S+\\.\\S+/, message: 'Invalid email' },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 chars' },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button disabled={isSubmitting}>Login</button>
    </form>
  );
};`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>Schema Validation with Zod</h2>
                    <p className="mb-6 text-slate-300">Use Zod schemas with <code>zodResolver</code> for type-safe validation and automatic error messages.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">RegisterForm.jsx</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters')
    .regex(/[A-Z]/, 'Need uppercase')
    .regex(/[0-9]/, 'Need a number'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      {/* ... other fields */}
    </form>
  );
};`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>Dynamic Fields with useFieldArray</h2>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">DynamicForm.jsx</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useForm, useFieldArray } from 'react-hook-form';

const DynamicForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: { items: [{ name: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control, name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, i) => (
        <div key={field.id}>
          <input {...register(\`items.\${i}.name\`)} />
          <button type="button" onClick={() => remove(i)}>×</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '' })}>
        + Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};`}</code></pre></div></div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-8 not-prose mt-12 mb-12"><h3 className="text-indigo-400 font-bold mb-4 text-xl">Best Practice Tip</h3><p className="text-slate-300 leading-relaxed m-0 text-base">Always use <strong>Zod + zodResolver</strong> for type-safe validation. Create <strong>reusable FormInput components</strong> with <code>useFormContext</code>. Use <strong>defaultValues</strong> for all fields and <strong>reset()</strong> after successful submission.</p></div>

                    <div className="border border-white/10 rounded-xl p-8 bg-white/5 mb-8 hover:bg-white/10 transition-colors"><h2 className="text-2xl font-bold text-white mb-6 mt-0">Key Takeaways</h2><ul className="list-disc list-outside ml-5 space-y-4 text-slate-300 m-0"><li><strong className="text-white">register()</strong> — connect inputs with zero re-renders using refs.</li><li><strong className="text-white">zodResolver</strong> — type-safe schema validation with Zod.</li><li><strong className="text-white">useFieldArray</strong> — first-class dynamic field support.</li><li><strong className="text-white">watch()</strong> — conditionally show fields based on form values.</li><li><strong className="text-white">FormProvider</strong> — share form methods with nested components.</li></ul></div>

                    <div className="mt-16 mb-8 border-t border-white/10 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4"><span className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"><Settings className="w-6 h-6" /></span>AI Master Prompts</h2>
                        <p className="mb-8 text-lg text-slate-300 leading-relaxed max-w-3xl">Copy these prompts to scaffold React Hook Form architecture instantly.</p>
                        <div className="grid gap-8">
                            <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-blue-400/50"><div className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-blue-400 m-0 flex items-center gap-2"><Zap className="w-5 h-5" /> 1. Complete Auth Forms</h3><p className="text-sm text-slate-400 mt-2 mb-0">Generate login, register, and forgot password forms.</p></div><button onClick={() => handleCopyPrompt("Create login, register, and forgot password forms using React Hook Form with Zod validation. Include email, password, confirm password fields with error messages. Add loading states, form reset on success, and Tailwind CSS styling. Use zodResolver and typed form values.", 1)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-colors font-medium border border-blue-500/20 shrink-0 cursor-pointer">{copiedPrompt1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copiedPrompt1 ? 'Copied!' : 'Copy Prompt'}</button></div><div className="p-4 sm:p-6 bg-black/20"><p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">"Create login, register, and forgot password forms using React Hook Form with Zod validation. Include email, password, confirm password fields with error messages. Add loading states, form reset on success, and Tailwind CSS styling. Use zodResolver and typed form values."</p></div></div>
                            <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-purple-400/50"><div className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-purple-400 m-0 flex items-center gap-2"><Code className="w-5 h-5" /> 2. Multi-Step Form Wizard</h3><p className="text-sm text-slate-400 mt-2 mb-0">Build a dynamic multi-step form with validation per step.</p></div><button onClick={() => handleCopyPrompt("Build a multi-step form wizard using React Hook Form. Include 3 steps: personal info, address, review. Add Zod validation per step, progress indicator, back/next navigation, useFieldArray for dynamic items, and final submission with loading state.", 2)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-colors font-medium border border-purple-500/20 shrink-0 cursor-pointer">{copiedPrompt2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copiedPrompt2 ? 'Copied!' : 'Copy Prompt'}</button></div><div className="p-4 sm:p-6 bg-black/20"><p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">"Build a multi-step form wizard using React Hook Form. Include 3 steps: personal info, address, review. Add Zod validation per step, progress indicator, back/next navigation, useFieldArray for dynamic items, and final submission with loading state."</p></div></div>
                        </div>
                    </div>
                </article>
            </div>

            <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
                    <div className="w-full lg:w-72 shrink-0"><h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Form Management</h3><div className="flex flex-col gap-2">{guideData.map((g) => (<button key={g.id} onClick={() => handleGuideChange(g.id)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-sm font-medium w-full text-left ${activeGuideId === g.id ? 'bg-[#0f1b2d] border-indigo-500/30 text-indigo-400' : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5'}`}><span className={activeGuideId === g.id ? 'text-indigo-400' : 'text-slate-500'}>{g.icon}</span>{g.title}</button>))}</div></div>
                    <div className="w-full flex-1 bg-[#0d121c] rounded-2xl overflow-hidden border border-[#1e293b] flex flex-col min-h-[500px] lg:min-h-[600px]">
                        <div className="bg-[#151b2b] border-b border-[#1e293b] px-4 py-3 flex items-center justify-between shrink-0"><div className="flex items-center gap-6 w-full"><div className="flex gap-2 shrink-0"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div className="w-3 h-3 rounded-full bg-[#27c93f]"></div></div><div className="flex gap-2 overflow-x-auto flex-1">{activeGuide?.files.map((f, i) => (<button key={i} onClick={() => setActiveFileIndex(i)} className={`px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap ${activeFileIndex === i ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>{f.name}</button>))}</div></div><button onClick={handleCopy} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] text-slate-400 hover:text-slate-200 hover:bg-[#1e293b] border border-[#1e293b]">{isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{isCopied ? 'Copied' : 'Copy'}</button></div>
                        <div className="flex-1 p-5 sm:p-8 overflow-auto bg-[#0d121c]"><pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#a5b4fc] m-0"><code>{activeGuide?.files[activeFileIndex]?.content}</code></pre></div>
                    </div>
                </div>
            </main>
            <div className="container mx-auto max-w-6xl px-4 mt-8 pb-12 flex justify-end"><p className="text-xs text-slate-600 font-medium">React Hook Form Reference</p></div>
        </div>
    );
};

export default ReactHookFormGuide;
