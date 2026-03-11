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
        id: 'setup',
        title: 'Setup & Installation',
        icon: <Download className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'Terminal',
                content: `npm install @tanstack/react-query`
            },
            {
                name: 'Why TanStack Query?.txt',
                content: `// TanStack Query provides powerful data synchronization for React:
// 1. Automatic background refetching
// 2. Built-in caching & stale-while-revalidate
// 3. Parallel & dependent queries
// 4. Optimistic updates & mutations
// 5. Pagination & infinite scroll support
// 6. DevTools for debugging`
            }
        ]
    },
    {
        id: 'basic-query',
        title: 'Basic Query',
        icon: <Zap className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'useTodos.js',
                content: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};`
            },
            {
                name: 'TodoList.jsx',
                content: `import { useTodos } from './useTodos';

const TodoList = () => {
  const { data: todos, isLoading, isError, error } = useTodos();

  if (isLoading) return <div className="spinner">Loading...</div>;
  if (isError) return <div className="error">{error.message}</div>;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'done' : ''}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;`
            }
        ]
    },
    {
        id: 'mutations',
        title: 'Mutations',
        icon: <Server className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'useCreateTodo.js',
                content: `import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo) =>
      axios.post('https://jsonplaceholder.typicode.com/todos', newTodo),

    // When mutation is successful, invalidate the todos cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },

    // Optimistic update example
    onMutate: async (newTodo) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update the cache
      queryClient.setQueryData(['todos'], (old) => [
        ...old,
        { id: Date.now(), ...newTodo },
      ]);

      return { previousTodos };
    },

    // If the mutation fails, rollback
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
  });
};`
            }
        ]
    },
    {
        id: 'provider',
        title: 'Provider Setup',
        icon: <Settings className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'main.jsx',
                content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);`
            }
        ]
    },
    {
        id: 'best-practices',
        title: 'Best Practices',
        icon: <ShieldCheck className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'useUserProfile.js',
                content: `// Best Practice: Create custom hooks for each query
// This encapsulates the query logic and makes it reusable

import { useQuery } from '@tanstack/react-query';
import api from './api'; // Your axios instance

export const useUserProfile = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await api.get(\`/users/\${userId}\`);
      return data;
    },
    enabled: !!userId, // Only run if userId exists
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    placeholderData: { name: 'Loading...', email: '' },
  });
};

// Usage in component:
// const { data: user, isLoading } = useUserProfile(userId);`
            },
            {
                name: 'queryKeys.js',
                content: `// Best Practice: Centralize query keys for consistency
// This prevents typos and makes invalidation easier

export const queryKeys = {
  todos: {
    all: ['todos'],
    detail: (id) => ['todos', id],
    list: (filters) => ['todos', 'list', filters],
  },
  users: {
    all: ['users'],
    detail: (id) => ['users', id],
    profile: (id) => ['users', id, 'profile'],
  },
};

// Usage:
// useQuery({ queryKey: queryKeys.todos.detail(todoId), ... })
// queryClient.invalidateQueries({ queryKey: queryKeys.todos.all })`
            }
        ]
    }
];

const TanStackQuery = () => {
    const [activeGuideId, setActiveGuideId] = useState(guideData[0]?.id || 'setup');
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedPrompt1, setCopiedPrompt1] = useState(false);
    const [copiedPrompt2, setCopiedPrompt2] = useState(false);

    const activeGuide = guideData.find(g => g.id === activeGuideId);

    if (!activeGuide) return null;

    const handleGuideChange = (id: string) => {
        setActiveGuideId(id);
        setActiveFileIndex(0);
        setIsCopied(false);
    };

    const handleCopyPrompt = (text: string, promptNum: number) => {
        navigator.clipboard.writeText(text);
        if (promptNum === 1) {
            setCopiedPrompt1(true);
            setTimeout(() => setCopiedPrompt1(false), 2000);
        } else {
            setCopiedPrompt2(true);
            setTimeout(() => setCopiedPrompt2(false), 2000);
        }
    };

    const handleCopy = () => {
        const file = activeGuide.files[activeFileIndex];
        if (file) {
            navigator.clipboard.writeText(file.content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#060913] text-slate-200 font-sans pb-24 selection:bg-blue-500/30">
            

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
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">TanStack Query</span>
           </h1>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Deep Dive: TanStack Query for React</h1>
          
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
          The missing data-fetching library for React — automatic caching, background updates, and stale data handling out of the box.
          </p>

                    <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                        TanStack Query (formerly React Query) is a powerful asynchronous state management library for React. It makes fetching, caching, synchronizing and updating server state in your applications a breeze. Instead of writing complex useEffect + useState combinations, TanStack Query gives you declarative hooks that handle loading states, error handling, caching, and background refetching automatically.
                    </p>

                    <h2 className="text-3xl font-bold text-white mb-6">TanStack Query vs Manual Fetching</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                        Here's why you should use TanStack Query instead of manual <code>useEffect</code> + <code>fetch</code> patterns:
                    </p>
                    <div className="overflow-x-auto mb-10 not-prose">
                        <table className="w-full text-left border-collapse text-sm text-slate-300">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="py-3 px-4 font-semibold text-white">Feature</th>
                                    <th className="py-3 px-4 font-semibold text-white">TanStack Query</th>
                                    <th className="py-3 px-4 font-semibold text-white">useEffect + fetch</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4">Caching</td>
                                    <td className="py-3 px-4 text-green-400">Automatic with configurable stale time</td>
                                    <td className="py-3 px-4">Manual implementation required</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4">Background Refetch</td>
                                    <td className="py-3 px-4 text-green-400">Built-in on window focus, interval, reconnect</td>
                                    <td className="py-3 px-4 text-slate-500">Requires custom logic</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4">Loading/Error States</td>
                                    <td className="py-3 px-4 text-green-400">Declarative (isLoading, isError, isSuccess)</td>
                                    <td className="py-3 px-4">Manual useState management</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4">Optimistic Updates</td>
                                    <td className="py-3 px-4 text-green-400">Built-in with onMutate/onError rollback</td>
                                    <td className="py-3 px-4 text-slate-500">Complex manual implementation</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4">DevTools</td>
                                    <td className="py-3 px-4 text-green-400">Official React Query DevTools</td>
                                    <td className="py-3 px-4 text-slate-500">None</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-6">Why TanStack Query?</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                        TanStack Query treats server state as a first-class citizen. It provides tools for <strong>caching</strong>, <strong>deduplication</strong>, <strong>background updates</strong>, and <strong>stale data management</strong> — things that are incredibly hard to get right manually.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
                            <RefreshCw className="w-8 h-8 text-yellow-400 mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">Smart Caching</h3>
                            <p className="text-sm text-slate-400">Automatic caching with stale-while-revalidate strategy. Data is served instantly from cache while refetching in the background.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
                            <Database className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">Mutations & Sync</h3>
                            <p className="text-sm text-slate-400">Built-in mutation hooks with optimistic updates, automatic cache invalidation, and rollback on failure.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Installation & Provider Setup
                    </h2>
                    <p className="mb-4 text-slate-300">Install TanStack Query and wrap your app with the QueryClientProvider:</p>

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
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install @tanstack/react-query @tanstack/react-query-devtools</code></pre>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Your First Query
                    </h2>
                    <p className="mb-6 text-slate-300">
                        Create a custom hook using <code>useQuery</code>. The hook manages loading, error, and success states automatically.
                    </p>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">useTodos.js</div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get('/api/todos');
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// In your component:
// const { data, isLoading, isError } = useTodos();`}</code></pre>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                        Mutations (Create, Update, Delete)
                    </h2>
                    <p className="mb-6 text-slate-300">
                        Use <code>useMutation</code> for any operation that modifies server data. Combine with <code>invalidateQueries</code> to keep your UI in sync.
                    </p>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">useCreateTodo.js</div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo) => axios.post('/api/todos', newTodo),
    onSuccess: () => {
      // Refetch the todos list after creation
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Usage:
// const mutation = useCreateTodo();
// mutation.mutate({ title: 'Learn TanStack Query' });`}</code></pre>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                        Optimistic Updates
                    </h2>
                    <p className="mb-6 text-slate-300">
                        Optimistic updates make your UI feel instant by updating the cache before the server confirms. If the mutation fails, the cache is rolled back.
                    </p>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">OptimisticMutation.js</div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`const useOptimisticTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo) => axios.post('/api/todos', newTodo),

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) => [
        ...old,
        { id: Date.now(), ...newTodo },
      ]);

      return { previous }; // context for rollback
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};`}</code></pre>
                        </div>
                    </div>

                    <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-8 not-prose relative overflow-hidden mt-12 mb-12">
                        <h3 className="text-sky-400 font-bold mb-4 text-xl">Best Practice Tip</h3>
                        <p className="text-slate-300 leading-relaxed m-0 text-base relative z-10">
                            Always create <strong>custom hooks</strong> for your queries (e.g., <code>useTodos</code>, <code>useUserProfile</code>). This keeps your components clean and makes queries reusable across your entire application. Pair with a <strong>centralized query keys factory</strong> for consistent cache management.
                        </p>
                    </div>

                    <div className="border border-white/10 rounded-xl p-8 bg-white/5 mb-8 hover:bg-white/10 transition-colors">
                        <h2 className="text-2xl font-bold text-white mb-6 mt-0">Key Takeaways</h2>
                        <ul className="list-disc list-outside ml-5 space-y-4 text-slate-300 m-0">
                            <li>TanStack Query <strong className="text-white">eliminates boilerplate</strong> — no more manual useEffect + useState patterns for data fetching.</li>
                            <li>Use <strong className="text-white">useQuery</strong> for reads and <strong className="text-white">useMutation</strong> for writes to keep your data layer organized.</li>
                            <li>Configure <strong className="text-white">staleTime</strong> and <strong className="text-white">gcTime</strong> to fine-tune caching behavior for your use case.</li>
                            <li>Leverage <strong className="text-white">query key factories</strong> to keep cache invalidation predictable and maintainable.</li>
                        </ul>
                    </div>

                    {/* AI Master Prompts */}
                    <div className="mt-16 mb-8 border-t border-white/10 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                            <span className="bg-gradient-to-br from-purple-500 to-blue-500 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Settings className="w-6 h-6" />
                            </span>
                            AI Master Prompts
                        </h2>
                        <p className="mb-8 text-lg text-slate-300 leading-relaxed max-w-3xl">
                            Copy these optimized prompts into your AI coding assistant to instantly generate TanStack Query integration code.
                        </p>

                        <div className="grid gap-8">
                            <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl overflow-hidden shadow-xl relative flex flex-col transition-all hover:border-blue-400/50 hover:shadow-blue-500/10 hover:shadow-2xl">
                                <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-400 m-0 flex items-center gap-2">
                                            <Zap className="w-5 h-5" /> 1. Add TanStack Query to Existing App
                                        </h3>
                                        <p className="text-sm text-slate-400 mt-2 mb-0">Use when you want to replace manual useEffect data fetching with TanStack Query.</p>
                                    </div>
                                    <button
                                        onClick={() => handleCopyPrompt("I have an existing React application that uses useEffect + useState for data fetching. I need you to refactor all data fetching to use TanStack Query (React Query v5). Please: 1) Set up QueryClientProvider in my main entry file with sensible defaults for staleTime (5 min), retry (2), and refetchOnWindowFocus (false). 2) Create custom hooks for each data-fetching operation using useQuery. 3) Replace all mutation operations with useMutation hooks that invalidate related queries on success. 4) Add React Query DevTools for development. 5) Create a centralized queryKeys factory file for consistent cache key management.", 1)}
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-colors font-medium border border-blue-500/20 shrink-0 cursor-pointer"
                                    >
                                        {copiedPrompt1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                        {copiedPrompt1 ? 'Copied Prompt!' : 'Copy Master Prompt'}
                                    </button>
                                </div>
                                <div className="p-4 sm:p-6 flex-1 flex flex-col bg-black/20">
                                    <p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">
                                        "I have an existing React application that uses useEffect + useState for data fetching. I need you to refactor all data fetching to use TanStack Query (React Query v5). Please: 1) Set up QueryClientProvider in my main entry file with sensible defaults for staleTime (5 min), retry (2), and refetchOnWindowFocus (false). 2) Create custom hooks for each data-fetching operation using useQuery. 3) Replace all mutation operations with useMutation hooks that invalidate related queries on success. 4) Add React Query DevTools for development. 5) Create a centralized queryKeys factory file for consistent cache key management."
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl relative flex flex-col transition-all hover:border-purple-400/50 hover:shadow-purple-500/10 hover:shadow-2xl">
                                <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-purple-400 m-0 flex items-center gap-2">
                                            <Code className="w-5 h-5" /> 2. Build CRUD with Optimistic Updates
                                        </h3>
                                        <p className="text-sm text-slate-400 mt-2 mb-0">Use when you want instant UI feedback with automatic rollback on failure.</p>
                                    </div>
                                    <button
                                        onClick={() => handleCopyPrompt("Build a complete CRUD task manager in React using TanStack Query v5. Requirements: 1) useQuery for fetching tasks with loading/error states. 2) useMutation for create/update/delete with optimistic updates that instantly update the UI. 3) Automatic rollback using onError context if mutation fails. 4) Cache invalidation via onSettled. 5) A query keys factory for all task-related queries. 6) Modern UI with Tailwind CSS. The app should feel instant — no loading spinners for mutations.", 2)}
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-colors font-medium border border-purple-500/20 shrink-0 cursor-pointer"
                                    >
                                        {copiedPrompt2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                        {copiedPrompt2 ? 'Copied Prompt!' : 'Copy Master Prompt'}
                                    </button>
                                </div>
                                <div className="p-4 sm:p-6 flex-1 flex flex-col bg-black/20">
                                    <p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">
                                        "Build a complete CRUD task manager in React using TanStack Query v5. Requirements: 1) useQuery for fetching tasks with loading/error states. 2) useMutation for create/update/delete with optimistic updates that instantly update the UI. 3) Automatic rollback using onError context if mutation fails. 4) Cache invalidation via onSettled. 5) A query keys factory for all task-related queries. 6) Modern UI with Tailwind CSS. The app should feel instant — no loading spinners for mutations."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            {/* Code Explorer */}
            <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
                    <div className="w-full lg:w-72 shrink-0">
                        <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Server State</h3>
                        <div className="flex flex-col gap-2">
                            {guideData.map((guide) => (
                                <button
                                    key={guide.id}
                                    onClick={() => handleGuideChange(guide.id)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm font-medium w-full text-left
                    ${activeGuideId === guide.id
                                            ? 'bg-[#0f1b2d] border-blue-500/30 text-blue-400 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)]'
                                            : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:border-white/10'
                                        }`}
                                >
                                    <span className={`${activeGuideId === guide.id ? 'text-blue-400' : 'text-slate-500'}`}>{guide.icon}</span>
                                    {guide.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex-1 bg-[#0d121c] rounded-2xl overflow-hidden border border-[#1e293b] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col min-h-[500px] lg:min-h-[600px] relative">
                        <div className="bg-[#151b2b] border-b border-[#1e293b] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 relative z-10">
                            <div className="flex items-center gap-6 overflow-hidden w-full">
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="flex gap-2 overflow-x-auto custom-scrollbar flex-1 pb-1 sm:pb-0">
                                    {activeGuide.files.map((file, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveFileIndex(idx)}
                                            className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap
                        ${activeFileIndex === idx ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                                        >
                                            {file.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleCopy} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-[#1e293b] border border-[#1e293b] transition-all shrink-0">
                                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <div className="flex-1 p-5 sm:p-8 overflow-auto relative custom-scrollbar bg-[#0d121c]">
                            <pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#a5b4fc] m-0">
                                <code>{activeGuide.files[activeFileIndex]?.content}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </main>

            <div className="container mx-auto max-w-6xl px-4 mt-8 pb-12 flex justify-end">
                <p className="text-xs text-slate-600 font-medium">TanStack Query v5 Reference</p>
            </div>
        </div>
    );
};

export default TanStackQuery;
