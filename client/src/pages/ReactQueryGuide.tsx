import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Zap, Settings, ShieldCheck, Download, Copy, CheckCircle2, Code, RefreshCw, Database } from 'lucide-react';

interface GuideFile {
    name: string;
    content: string;
}

interface GuideItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    files: GuideFile[];
}

const guideData: GuideItem[] = [
    {
        id: 'setup', title: 'Setup & Installation', icon: <Download className="w-[18px] h-[18px]" />, files: [
            { name: 'Terminal', content: 'npm install @tanstack/react-query @tanstack/react-query-devtools' },
            { name: 'Why React Query?.txt', content: '// React Query advantages:\n// 1. Automatic caching & background refetching\n// 2. Stale-while-revalidate strategy\n// 3. Parallel & dependent queries\n// 4. Pagination & infinite scroll built-in\n// 5. Optimistic updates\n// 6. DevTools for debugging\n// 7. No Redux/global state needed for server data' }
        ]
    },
    {
        id: 'basic-query', title: 'Basic Query', icon: <Database className="w-[18px] h-[18px]" />, files: [
            { name: 'useUsers.js', content: `import { useQuery } from '@tanstack/react-query';
          import axios from 'axios';
          
          const fetchUsers = async () => {
          const { data } = await axios.get('/api/users');
          return data;
          };
          
          export const useUsers = () => {
          return useQuery({
          queryKey: ['users'],
          queryFn: fetchUsers,
          staleTime: 5 * 60 * 1000, // 5 minutes
          });
          };` },
            { name: 'UserList.jsx', content: `import { useUsers } from './useUsers';
          
          const UserList = () => {
          const { data: users, isLoading, isError, error } = useUsers();
          
          if (isLoading) return <div>Loading...</div>;
          if (isError) return <div>Error: {error.message}</div>;
          
          return (
          <ul>
          {users.map(user => (
          <li key={user.id}>{user.name}</li>
          ))}
          </ul>
          );
          };` }
        ]
    },
    {
        id: 'mutations', title: 'Mutations', icon: <Zap className="w-[18px] h-[18px]" />, files: [
            { name: 'useCreateUser.js', content: `import { useMutation, useQueryClient } from '@tanstack/react-query';
          import axios from 'axios';
          
          export const useCreateUser = () => {
          const queryClient = useQueryClient();
          
          return useMutation({
          mutationFn: (newUser) => axios.post('/api/users', newUser),
          onSuccess: () => {
          // Invalidate and refetch users list
          queryClient.invalidateQueries({ queryKey: ['users'] });
          },
          onError: (error) => {
          console.error('Failed to create user:', error);
          },
          });
          };` },
            { name: 'CreateUserForm.jsx', content: `import { useCreateUser } from './useCreateUser';
          
          const CreateUserForm = () => {
          const { mutate, isPending, isError } = useCreateUser();
          
          const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          mutate({
          name: formData.get('name'),
          email: formData.get('email'),
          });
          };
          
          return (
          <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" required />
          <input name="email" placeholder="Email" required />
          <button disabled={isPending}>
          {isPending ? 'Creating...' : 'Create User'}
          </button>
          </form>
          );
          };` }
        ]
    },
    {
        id: 'advanced', title: 'Advanced Patterns', icon: <RefreshCw className="w-[18px] h-[18px]" />, files: [
            { name: 'optimisticUpdate.js', content: `import { useMutation, useQueryClient } from '@tanstack/react-query';
          
          export const useToggleTodo = () => {
          const queryClient = useQueryClient();
          
          return useMutation({
          mutationFn: (todo) => axios.patch(\`/api/todos/\${todo.id}\`, {
          completed: !todo.completed
          }),
          // Optimistic Update
          onMutate: async (todo) => {
          await queryClient.cancelQueries({ queryKey: ['todos'] });
          const previous = queryClient.getQueryData(['todos']);
          queryClient.setQueryData(['todos'], (old) =>
          old.map(t => t.id === todo.id
          ? { ...t, completed: !t.completed } : t
          )
          );
          return { previous };
          },
          onError: (err, todo, context) => {
          queryClient.setQueryData(['todos'], context.previous);
          },
          onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          },
          });
          };` },
            { name: 'infiniteQuery.js', content: `import { useInfiniteQuery } from '@tanstack/react-query';
          
          export const usePosts = () => {
          return useInfiniteQuery({
          queryKey: ['posts'],
          queryFn: ({ pageParam = 1 }) =>
          axios.get(\`/api/posts?page=\${pageParam}\`).then(r => r.data),
          getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
          });
          };
          
          // Usage: const { data, fetchNextPage, hasNextPage } = usePosts();` }
        ]
    },
    {
        id: 'best-practices', title: 'Best Practices', icon: <ShieldCheck className="w-[18px] h-[18px]" />, files: [
            { name: 'queryClient.js', content: `import { QueryClient } from '@tanstack/react-query';
          
          export const queryClient = new QueryClient({
          defaultOptions: {
          queries: {
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
          retry: 2,
          refetchOnWindowFocus: false,
          },
          },
          });` },
            { name: 'queryKeys.js', content: `// Centralize query keys for consistency
          export const queryKeys = {
          users: {
          all: ['users'],
          detail: (id) => ['users', id],
          search: (query) => ['users', 'search', query],
          },
          todos: {
          all: ['todos'],
          byStatus: (status) => ['todos', { status }],
          },
          };
          
          // Usage: useQuery({ queryKey: queryKeys.users.detail(userId) })` }
        ]
    }
];

const ReactQueryGuide = () => {
    const [activeGuideId, setActiveGuideId] = useState(guideData[0]?.id || 'setup');
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedPrompt1, setCopiedPrompt1] = useState(false);
    const [copiedPrompt2, setCopiedPrompt2] = useState(false);
    const activeGuide = guideData.find(g => g.id === activeGuideId);
    
    if (!activeGuide) return null;

    const handleGuideChange = (id: string) => { setActiveGuideId(id); setActiveFileIndex(0); setIsCopied(false); };
    const handleCopyPrompt = (text: string, n: number) => { navigator.clipboard.writeText(text); if (n === 1) { setCopiedPrompt1(true); setTimeout(() => setCopiedPrompt1(false), 2000); } else { setCopiedPrompt2(true); setTimeout(() => setCopiedPrompt2(false), 2000); } };
    const handleCopy = () => { if (activeGuide.files[activeFileIndex]) { navigator.clipboard.writeText(activeGuide.files[activeFileIndex].content); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); } };

    return (
        <div className="min-h-screen bg-[#060913] text-slate-200 font-sans pb-24 selection:bg-rose-500/30">
            

            <div className="container mx-auto px-4 max-w-4xl pt-32 pb-16">
                {/* Banner Image Prototype */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-900 via-sky-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
           {/* Abstract Pattern */}
           <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
               background: "radial-gradient(circle at 50% 120%, rgba(255, 65, 84, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(220, 40, 60, 0.3), transparent 30%)"
           }}></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
               background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
               maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
               WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
             }}></div>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">React Query</span>
           </h1>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Deep Dive: React Query (TanStack Query)</h1>
          
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
          The missing data-fetching library for React — caching, background updates, and stale data handling out of the box.
          </p>

                    <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">React Query (now part of TanStack Query) is a powerful server-state management library. Instead of writing complex useEffect + useState combinations for data fetching, React Query gives you declarative hooks that handle loading states, error handling, caching, background refetching, and much more — all automatically.</p>

                    <h2 className="text-3xl font-bold text-white mb-6">React Query vs Manual Fetching</h2>
                    <div className="overflow-x-auto mb-10 not-prose"><table className="w-full text-left border-collapse text-sm text-slate-300"><thead><tr className="border-b border-white/10 bg-white/5"><th className="py-3 px-4 font-semibold text-white">Feature</th><th className="py-3 px-4 font-semibold text-white">React Query</th><th className="py-3 px-4 font-semibold text-white">useEffect + fetch</th></tr></thead><tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Caching</td><td className="py-3 px-4 text-green-400">Automatic with stale-while-revalidate</td><td className="py-3 px-4 text-slate-500">Manual implementation required</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Loading/Error States</td><td className="py-3 px-4 text-green-400">Built-in isLoading, isError, data</td><td className="py-3 px-4 text-slate-500">Multiple useState hooks</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Background Refetching</td><td className="py-3 px-4 text-green-400">Automatic on window focus</td><td className="py-3 px-4 text-slate-500">Not supported by default</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Deduplication</td><td className="py-3 px-4 text-green-400">Same query used by multiple components</td><td className="py-3 px-4 text-slate-500">Duplicate requests everywhere</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-4">Pagination</td><td className="py-3 px-4 text-green-400">useInfiniteQuery built-in</td><td className="py-3 px-4 text-slate-500">Complex manual logic</td></tr>
                    </tbody></table></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"><Database className="w-8 h-8 text-yellow-400 mb-4" /><h3 className="text-white font-semibold text-lg mb-2">useQuery</h3><p className="text-sm text-slate-400">Declarative data fetching with automatic caching, refetching, and stale data management.</p></div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"><Zap className="w-8 h-8 text-purple-400 mb-4" /><h3 className="text-white font-semibold text-lg mb-2">useMutation</h3><p className="text-sm text-slate-400">Handle create/update/delete with optimistic updates and automatic cache invalidation.</p></div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>Installation & Setup</h2>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Terminal</div></div><div className="p-5"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install @tanstack/react-query @tanstack/react-query-devtools</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>Provider Setup</h2>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">main.jsx</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>Fetching Data with useQuery</h2>
                    <p className="mb-6 text-slate-300">useQuery takes a unique key and an async function. It returns loading/error/data states automatically.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">useUsers.js</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
  });
};

// In component:
// const { data, isLoading, isError } = useUsers();`}</code></pre></div></div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>Mutations & Cache Invalidation</h2>
                    <p className="mb-6 text-slate-300">useMutation handles POST/PUT/DELETE. Invalidate queries on success to refetch stale data.</p>
                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose"><div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5"><div className="flex gap-2 flex-1"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div><div className="text-xs text-slate-500 font-mono tracking-wider uppercase">useCreateUser.js</div></div><div className="p-5 overflow-x-auto"><pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser) => axios.post('/api/users', newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Usage: const { mutate, isPending } = useCreateUser();
// mutate({ name: 'John', email: 'john@example.com' });`}</code></pre></div></div>

                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-8 not-prose mt-12 mb-12"><h3 className="text-rose-400 font-bold mb-4 text-xl">Best Practice Tip</h3><p className="text-slate-300 leading-relaxed m-0 text-base">Create <strong>custom hooks</strong> for each query/mutation (e.g., <code>useUsers</code>, <code>useCreateUser</code>). Centralize <strong>query keys</strong> in a factory object. Set <strong>staleTime</strong> based on how often data changes.</p></div>

                    <div className="border border-white/10 rounded-xl p-8 bg-white/5 mb-8 hover:bg-white/10 transition-colors"><h2 className="text-2xl font-bold text-white mb-6 mt-0">Key Takeaways</h2><ul className="list-disc list-outside ml-5 space-y-4 text-slate-300 m-0"><li><strong className="text-white">useQuery</strong> — declarative data fetching with automatic caching.</li><li><strong className="text-white">useMutation</strong> — create/update/delete with cache invalidation.</li><li><strong className="text-white">Stale-while-revalidate</strong> — serves cached data while refetching in background.</li><li><strong className="text-white">Query keys</strong> — unique identifiers for caching and invalidation.</li><li><strong className="text-white">Optimistic updates</strong> — instant UI feedback before server confirms.</li></ul></div>

                    <div className="mt-16 mb-8 border-t border-white/10 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4"><span className="bg-gradient-to-br from-rose-500 to-pink-500 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"><Settings className="w-6 h-6" /></span>AI Master Prompts</h2>
                        <p className="mb-8 text-lg text-slate-300 leading-relaxed max-w-3xl">Copy these prompts to scaffold React Query architecture instantly.</p>
                        <div className="grid gap-8">
                            <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-blue-400/50"><div className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-blue-400 m-0 flex items-center gap-2"><Zap className="w-5 h-5" /> 1. Data Fetching Layer</h3><p className="text-sm text-slate-400 mt-2 mb-0">Set up React Query with custom hooks and caching.</p></div><button onClick={() => handleCopyPrompt("Set up React Query in my React app. Create QueryClient with optimal defaults, custom hooks for useUsers, usePosts, useCreatePost with mutations and cache invalidation. Include query key factory, optimistic updates, and error handling.", 1)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-colors font-medium border border-blue-500/20 shrink-0 cursor-pointer">{copiedPrompt1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copiedPrompt1 ? 'Copied!' : 'Copy Prompt'}</button></div><div className="p-4 sm:p-6 bg-black/20"><p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">"Set up React Query in my React app. Create QueryClient with optimal defaults, custom hooks for useUsers, usePosts, useCreatePost with mutations and cache invalidation. Include query key factory, optimistic updates, and error handling."</p></div></div>
                            <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-purple-400/50"><div className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-purple-400 m-0 flex items-center gap-2"><Code className="w-5 h-5" /> 2. Infinite Scroll + Pagination</h3><p className="text-sm text-slate-400 mt-2 mb-0">Build infinite scroll with React Query.</p></div><button onClick={() => handleCopyPrompt("Build an infinite scroll feed using React Query useInfiniteQuery. Include cursor-based pagination, loading skeleton, intersection observer for auto-loading, pull-to-refresh, and error retry with Tailwind CSS styling.", 2)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-colors font-medium border border-purple-500/20 shrink-0 cursor-pointer">{copiedPrompt2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copiedPrompt2 ? 'Copied!' : 'Copy Prompt'}</button></div><div className="p-4 sm:p-6 bg-black/20"><p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">"Build an infinite scroll feed using React Query useInfiniteQuery. Include cursor-based pagination, loading skeleton, intersection observer for auto-loading, pull-to-refresh, and error retry with Tailwind CSS styling."</p></div></div>
                        </div>
                    </div>
                </article>
            </div>

            <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
                    <div className="w-full lg:w-72 shrink-0"><h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Server State</h3><div className="flex flex-col gap-2">{guideData.map((g) => (<button key={g.id} onClick={() => handleGuideChange(g.id)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-sm font-medium w-full text-left ${activeGuideId === g.id ? 'bg-[#0f1b2d] border-rose-500/30 text-rose-400' : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5'}`}><span className={activeGuideId === g.id ? 'text-rose-400' : 'text-slate-500'}>{g.icon}</span>{g.title}</button>))}</div></div>
                    <div className="w-full flex-1 bg-[#0d121c] rounded-2xl overflow-hidden border border-[#1e293b] flex flex-col min-h-[500px] lg:min-h-[600px]">
                        <div className="bg-[#151b2b] border-b border-[#1e293b] px-4 py-3 flex items-center justify-between shrink-0"><div className="flex items-center gap-6 w-full"><div className="flex gap-2 shrink-0"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div className="w-3 h-3 rounded-full bg-[#27c93f]"></div></div><div className="flex gap-2 overflow-x-auto flex-1">{activeGuide.files.map((f, i) => (<button key={i} onClick={() => setActiveFileIndex(i)} className={`px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap ${activeFileIndex === i ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>{f.name}</button>))}</div></div><button onClick={handleCopy} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] text-slate-400 hover:text-slate-200 hover:bg-[#1e293b] border border-[#1e293b]">{isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{isCopied ? 'Copied' : 'Copy'}</button></div>
                        <div className="flex-1 p-5 sm:p-8 overflow-auto bg-[#0d121c]"><pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#a5b4fc] m-0"><code>{activeGuide.files[activeFileIndex]?.content}</code></pre></div>
                    </div>
                </div>
            </main>
            <div className="container mx-auto max-w-6xl px-4 mt-8 pb-12 flex justify-end"><p className="text-xs text-slate-600 font-medium">React Query Reference</p></div>
        </div>
    );
};

export default ReactQueryGuide;
