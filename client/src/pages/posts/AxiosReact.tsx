import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Zap, Settings, ShieldCheck, Download, Copy, CheckCircle2, Code } from 'lucide-react';
import HeroBanner from '../../components/blog/HeroBanner';

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
        content: `npm install axios`
      },
      {
        name: 'Why Axios?.txt',
        content: `// Axios provides several advantages over native fetch:
// 1. Automatic JSON data transformation
// 2. Built-in XSRF protection
// 3. Request/Response interceptors
// 4. Easy cancellation & timeout handling
// 5. Broad browser support`
      }
    ]
  },
  {
    id: 'get',
    title: 'GET Requests',
    icon: <Zap className="w-[18px] h-[18px]" />,
    files: [
      {
        name: 'UserList.jsx',
        content: `import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data); // data is already parsed!
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="loading-spinner">Loading users...</div>;

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-item">
          {user.name}
        </li>
      ))}
    </ul>
  );
};

export default UserList;`
      }
    ]
  },
  {
    id: 'post',
    title: 'POST Requests',
    icon: <Server className="w-[18px] h-[18px]" />,
    files: [
      {
        name: 'CreateUser.jsx',
        content: `import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [status, setStatus] = useState('');

  const handleCreate = async (userData) => {
    try {
      setStatus('Sending...');
      
      // Axios automatically sets Content-Type to application/json
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users', 
        userData
      );
      
      setStatus(\`Created! ID: \${response.data.id}\`);
      
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        setStatus(\`Error: \${error.response.status}\`);
      } else {
        setStatus('Network Error');
      }
    }
  };

  return (
    <div className="create-user-form">
      {/* ... form implementation ... */}
    </div>
  );
};

export default CreateUser;`
      }
    ]
  },
  {
    id: 'interceptors',
    title: 'Interceptors',
    icon: <Settings className="w-[18px] h-[18px]" />,
    files: [
      {
        name: 'api.js',
        content: `import axios from 'axios';

// 1. Create a custom instance
const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
});

// 2. Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
       console.log('Unauthorized! Redirecting to login...');
       // Handle token refresh or logout logic
    }
    return Promise.reject(error);
  }
);

export default api;`
      },
      {
        name: 'Usage.jsx',
        content: `import api from './api';

const fetchProfile = async () => {
  try {
    // The request will automatically use the baseURL
    // and inject the Authorization token via the interceptor!
    const response = await api.get('/me');
    return response.data;
  } catch (err) {
    console.error("Failed to load profile", err);
  }
};`
      }
    ]
  },
  {
    id: 'react-query',
    title: 'Best Practices',
    icon: <ShieldCheck className="w-[18px] h-[18px]" />,
    files: [
      {
        name: 'useUsersQuery.js',
        content: `// Best Practice: Pair Axios with React Query (TanStack Query)
// React Query handles caching, refetching, and loading states automatically!

import { useQuery } from '@tanstack/react-query';
import api from './api'; // Your custom axios instance

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // We only use Axios for the actual fetching mechanism
      const { data } = await api.get('/users');
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};`
      },
      {
        name: 'UserListOptimized.jsx',
        content: `import { useUsersQuery } from './useUsersQuery';

const UserListOptimized = () => {
  // No more useEffect or manual loading states!
  const { data: users, isLoading, isError } = useUsersQuery();

  if (isLoading) return <div className="spinner">Loading super fast...</div>;
  if (isError) return <div className="error">Failed to load payload.</div>;

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-item">
          {user.name}
        </li>
      ))}
    </ul>
  );
};

export default UserListOptimized;`
      }
    ]
  }
];

const AxiosReact = () => {
  const [activeGuideId, setActiveGuideId] = useState(guideData[0]?.id || 'setup');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedPrompt1, setCopiedPrompt1] = useState(false);
  const [copiedPrompt2, setCopiedPrompt2] = useState(false);

  const activeGuide = guideData.find(g => g.id === activeGuideId);

  if (!activeGuide) return null;

  const handleGuideChange = (id: string) => {
    setActiveGuideId(id);
    setActiveFileIndex(0); // Reset to first file when switching guides
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

      {/* Navigation Bar */}
      



      {/* ── Hero Banner ── */}
      <HeroBanner
        badgeText="Implementation Ready"
        badgeIcon={Code}
        title="Axios Deep Dive"
        subtitle="Using Axios with React"
        date="Mar 06, 2026"
        gradientContainer="from-slate-900 via-sky-900 to-[#0a0f18]"
        radialBackground="radial-gradient(circle at 50% 120%, rgba(90, 41, 228, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(65, 30, 180, 0.3), transparent 30%)"
        badgeContainerStyles="border border-sky-500/30 bg-sky-500/10"
        badgeTextStyles="text-sky-400"
        titleGradient="from-white to-white/60"
        subtitleColor="text-sky-300/70"
        avatarRing="from-indigo-400 to-sky-600"
        dateColor="text-slate-400"
      />

      {/* Deep Dive Article Content */}
      <div className="container mx-auto px-4 max-w-4xl pb-16">

        <article className="prose prose-invert prose-lg max-w-none">

          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mb-12">
          A comprehensive explanation of API requests in React applications using Axios.
          </p>

          <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            In modern React applications, communicating with backend APIs is a fundamental requirement. Whether you are fetching a list of products, submitting a user registration form, or uploading a deeply nested JSON object, you need a reliable HTTP client. Axios has emerged as one of the most popular choices in the React ecosystem due to its simplicity, extensive feature set, and consistent behavior across browsers. This guide explores everything you need to know to master Axios in React.
          </p>

          <h2 className="text-3xl font-bold text-white mb-6">Axios vs Fetch: Quick Comparison</h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            You might wonder why you should use a third-party library when the browser natively supports the \`fetch\` API. Here is a high-level feature-by-feature comparison:
          </p>
          <div className="overflow-x-auto mb-10 not-prose">
            <table className="w-full text-left border-collapse text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-3 px-4 font-semibold text-white">Feature</th>
                  <th className="py-3 px-4 font-semibold text-white">Axios</th>
                  <th className="py-3 px-4 font-semibold text-white">Fetch API</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">JSON Data</td>
                  <td className="py-3 px-4 text-green-400">Automatic stringification and parsing</td>
                  <td className="py-3 px-4">Requires manual \`JSON.parse()\` and \`.json()\`</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">Error Handling</td>
                  <td className="py-3 px-4 text-green-400">Rejects promise on HTTP error status (4xx, 5xx)</td>
                  <td className="py-3 px-4">Only rejects on network failure</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">Interceptors</td>
                  <td className="py-3 px-4 text-green-400">Built-in request/response interceptors</td>
                  <td className="py-3 px-4 text-slate-500">Requires manual wrapping/custom logic</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">Timeout</td>
                  <td className="py-3 px-4 text-green-400">Simple \`timeout\` config option</td>
                  <td className="py-3 px-4 text-slate-500">Requires AbortController setup</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">Why Axios?</h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            While the native `fetch` API is great, <strong>Axios</strong> provides a more robust set of features for handling HTTP requests in React applications. It automatically transforms JSON data, provides built-in XSRF protection, and has a much cleaner API for intercepting requests and handling errors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Automatic JSON</h3>
              <p className="text-sm text-slate-400">No more calling `.json()` on your responses. Axios parses JSON data automatically.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
              <Code className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Interceptors</h3>
              <p className="text-sm text-slate-400">Easily inject auth tokens into requests or globally handle 401 unauthorized errors.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Installation
          </h2>
          <p className="mb-4 text-slate-300">First, add Axios to your React project:</p>

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
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install axios</code></pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Making a GET Request
          </h2>
          <p className="mb-6 text-slate-300">
            Let's fetch some data when a component mounts using `useEffect`. We use `async/await` for cleaner syntax.
          </p>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">UserList.jsx</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data); // data is already parsed!
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};`}</code></pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
            Making a POST Request
          </h2>
          <p className="mb-6 text-slate-300">
            Sending data is just as easy. Axios automatically sets the `Content-Type` to `application/json`.
          </p>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">CreateUser.jsx</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`const createUser = async (userData) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
    console.log("Created user:", response.data);
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside of the 2xx range
      console.error(error.response.data);
    }
  }
};`}</code></pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
            How to Handle Errors with Axios in React
          </h2>
          <p className="mb-6 text-slate-300">
            One of Axios's best features is its error handling. Unlike `fetch`, which only throws an error on network failure, Axios automatically throws an error for HTTP statuses outside the `2xx` range. Axios error objects provide a structured `error.response` property.
          </p>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">ErrorHandling.jsx</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`try {
  const res = await axios.get('/protected-route');
} catch (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request
    console.log('Error', error.message);
  }
}`}</code></pre>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Quick Reference: Status → Message Mapping</h3>
          <ul className="space-y-4 mb-12 text-slate-300">
            <li className="flex gap-4"><span className="text-red-400 font-mono text-lg font-bold w-12 shrink-0">400</span> <span><strong>Bad Request:</strong> Invalid syntax or missing parameters. You should validate form data before sending.</span></li>
            <li className="flex gap-4"><span className="text-orange-400 font-mono text-lg font-bold w-12 shrink-0">401</span> <span><strong>Unauthorized:</strong> Authentication token is missing or invalid. Use an interceptor to refresh the token or redirect to login.</span></li>
            <li className="flex gap-4"><span className="text-yellow-400 font-mono text-lg font-bold w-12 shrink-0">403</span> <span><strong>Forbidden:</strong> You do not have permission to access this resource, even though you are logged in.</span></li>
            <li className="flex gap-4"><span className="text-slate-400 font-mono text-lg font-bold w-12 shrink-0">404</span> <span><strong>Not Found:</strong> The requested endpoint does not exist. Check your REST API paths.</span></li>
            <li className="flex gap-4"><span className="text-red-500 font-mono text-lg font-bold w-12 shrink-0">500</span> <span><strong>Internal Server Error:</strong> The backend crashed or encountered an unexpected condition.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
            Global Configuration & Interceptors
          </h2>
          <p className="mb-6 text-slate-300">
            For production apps, you should create an Axios instance. This allows you to set a base URL, default headers, and intercept requests to inject tokens automatically.
          </p>

          <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
            <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
              <div className="flex gap-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">api.js</div>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0 leading-relaxed"><code>{`import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;`}</code></pre>
            </div>
          </div>

          <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-8 not-prose relative overflow-hidden mt-12 mb-12">
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
              <Server className="w-32 h-32 text-blue-500" />
            </div>
            <h3 className="text-sky-400 font-bold mb-4 text-xl">
              Best Practice Tip
            </h3>
            <p className="text-slate-300 leading-relaxed m-0 text-base relative z-10">
              When dealing with highly unpredicable networks or larger enterprise applications, pairing <strong>Axios</strong> with a fetching library like <strong>React Query (TanStack Query)</strong> or <strong>SWR</strong> is highly recommended. You use Axios for the actual fetching mechanism (the `queryFn`), while React Query handles caching, refetching, and loading states!
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-8 bg-white/5 mb-8 hover:bg-white/10 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 mt-0">Key Takeaways</h2>
            <ul className="list-disc list-outside ml-5 space-y-4 text-slate-300 m-0">
              <li>Use <strong className="text-white">Axios</strong> when you want out-of-the-box JSON parsing and streamlined error handling compared to the native <code>fetch</code> API.</li>
              <li>Always use <strong className="text-white">try/catch</strong> blocks inside <code>async/await</code> functions to handle HTTP errors gracefully on the client side.</li>
              <li>Leverage <strong className="text-white">Interceptors</strong> to centrally manage Authentication headers (like JWTs) and global error redirects (e.g., logging out a user on a 401 response).</li>
              <li>Combine Axios with state-management tools like <strong className="text-white">TanStack Query</strong> to manage loading metrics and data caching without writing boilerplate <code>useEffect</code>s.</li>
            </ul>
          </div>

          {/* AI Master Prompts Section */}
          <div className="mt-16 mb-8 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
              <span className="bg-gradient-to-br from-purple-500 to-blue-500 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Settings className="w-6 h-6" />
              </span>
              AI Master Prompts
            </h2>
            <p className="mb-8 text-lg text-slate-300 leading-relaxed max-w-3xl">
              Want to speed up your development process? Copy these optimized "master prompts", paste them into your favorite AI coding assistant (like Cursor, GitHub Copilot, or ChatGPT), and watch it instantly generate your Axios integration.
            </p>

            <div className="grid gap-8">
              {/* Prompt 1 */}
              <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl overflow-hidden shadow-xl relative flex flex-col transition-all hover:border-blue-400/50 hover:shadow-blue-500/10 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 m-0 flex items-center gap-2">
                      <Zap className="w-5 h-5" /> 1. Integrate into Existing UI
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 mb-0">Use when you already have the frontend built and just need to wire up the API calls.</p>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt("I have a fully designed React application. I need you to implement Axios to handle all API communications across my current system. Please create a centralized `api.js` file with an Axios instance, including a base URL, request interceptors (to attach a JWT token from localStorage), and response interceptors (to handle 401 unauthenticated errors by logging the user out). Then, review my existing components and replace all mock data or native `fetch` calls with this new Axios instance. Ensure proper `try/catch` blocks are added for error handling and UI state updates (loading/error states) are maintained.", 1)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-colors font-medium border border-blue-500/20 shrink-0 cursor-pointer"
                  >
                    {copiedPrompt1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedPrompt1 ? 'Copied Prompt!' : 'Copy Master Prompt'}
                  </button>
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col bg-black/20">
                  <p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">
                    "I have a fully designed React application. I need you to implement Axios to handle all API communications across my current system. Please create a centralized `api.js` file with an Axios instance, including a base URL, request interceptors (to attach a JWT token from localStorage), and response interceptors (to handle 401 unauthenticated errors by logging the user out). Then, review my existing components and replace all mock data or native `fetch` calls with this new Axios instance. Ensure proper `try/catch` blocks are added for error handling and UI state updates (loading/error states) are maintained."
                  </p>
                  {/* Mobile Copy Button */}
                  <button
                    onClick={() => handleCopyPrompt("I have a fully designed React application. I need you to implement Axios to handle all API communications across my current system. Please create a centralized `api.js` file with an Axios instance, including a base URL, request interceptors (to attach a JWT token from localStorage), and response interceptors (to handle 401 unauthenticated errors by logging the user out). Then, review my existing components and replace all mock data or native `fetch` calls with this new Axios instance. Ensure proper `try/catch` blocks are added for error handling and UI state updates (loading/error states) are maintained.", 1)}
                    className="mt-6 sm:hidden w-full flex justify-center items-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-300 rounded-lg transition-colors font-medium border border-blue-500/20 cursor-pointer"
                  >
                    {copiedPrompt1 ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    {copiedPrompt1 ? 'Copied!' : 'Copy Prompt'}
                  </button>
                </div>
              </div>

              {/* Prompt 2 */}
              <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl relative flex flex-col transition-all hover:border-purple-400/50 hover:shadow-purple-500/10 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/20 px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 m-0 flex items-center gap-2">
                      <Code className="w-5 h-5" /> 2. Build Dynamic CRUD from Scratch
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 mb-0">Use when you want the AI to generate a full working feature (design + logic) from scratch.</p>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt("Create a complete, dynamic Todo application component from scratch in React using Tailwind CSS for modern, premium styling. It must use Axios to interact with a REST API for all CRUD operations. Please implement the following features: 1) Fetch and display a list of todos on load. 2) A form to add a new todo (POST). 3) A button to edit/mark a todo as completed (PUT/PATCH). 4) A button to delete a todo (DELETE). Ensure the UI is highly responsive, manage loading and error states for every request seamlessly, and use an optimistic UI update approach where applicable. The component should be a single drop-in file.", 2)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-colors font-medium border border-purple-500/20 shrink-0 cursor-pointer"
                  >
                    {copiedPrompt2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedPrompt2 ? 'Copied Custom Prompt' : 'Copy Master Prompt'}
                  </button>
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col bg-black/20">
                  <p className="font-mono text-[14px] sm:text-[15px] text-slate-300 leading-relaxed m-0 whitespace-pre-wrap select-all">
                    "Create a complete, dynamic Todo application component from scratch in React using Tailwind CSS for modern, premium styling. It must use Axios to interact with a REST API for all CRUD operations. Please implement the following features: 1) Fetch and display a list of todos on load. 2) A form to add a new todo (POST). 3) A button to edit/mark a todo as completed (PUT/PATCH). 4) A button to delete a todo (DELETE). Ensure the UI is highly responsive, manage loading and error states for every request seamlessly, and use an optimistic UI update approach where applicable. The component should be a single drop-in file."
                  </p>
                  {/* Mobile Copy Button */}
                  <button
                    onClick={() => handleCopyPrompt("Create a complete, dynamic Todo application component from scratch in React using Tailwind CSS for modern, premium styling. It must use Axios to interact with a REST API for all CRUD operations. Please implement the following features: 1) Fetch and display a list of todos on load. 2) A form to add a new todo (POST). 3) A button to edit/mark a todo as completed (PUT/PATCH). 4) A button to delete a todo (DELETE). Ensure the UI is highly responsive, manage loading and error states for every request seamlessly, and use an optimistic UI update approach where applicable. The component should be a single drop-in file.", 2)}
                    className="mt-6 sm:hidden w-full flex justify-center items-center gap-2 px-4 py-3 bg-purple-500/10 text-purple-300 rounded-lg transition-colors font-medium border border-purple-500/20 cursor-pointer"
                  >
                    {copiedPrompt2 ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    {copiedPrompt2 ? 'Copied!' : 'Copy Prompt'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </article>
      </div>

      {/* Main Layout Container */}
      <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">

          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 shrink-0">
            <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Data Fetching</h3>
            <div className="flex flex-col gap-2">
              {guideData.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => handleGuideChange(guide.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm font-medium w-full text-left
                                ${activeGuideId === guide.id
                      ? 'bg-[#0f1b2d] border-blue-500/30 text-blue-400 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)]'
                      : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:border-white/10'
                    }
                            `}
                >
                  <span className={`${activeGuideId === guide.id ? 'text-blue-400' : 'text-slate-500'}`}>
                    {guide.icon}
                  </span>
                  {guide.title}
                </button>
              ))}
            </div>
          </div>

          {/* Code Window */}
          <div className="w-full flex-1 bg-[#0d121c] rounded-2xl overflow-hidden border border-[#1e293b] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col min-h-[500px] lg:min-h-[600px] relative">

            {/* Window Header */}
            <div className="bg-[#151b2b] border-b border-[#1e293b] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 relative z-10">

              {/* Left: Mac OS Dots & File Tabs Container */}
              <div className="flex items-center gap-6 overflow-hidden w-full">
                {/* Dots */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto custom-scrollbar flex-1 pb-1 sm:pb-0">
                  {activeGuide.files.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFileIndex(idx)}
                      className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap
                                        ${activeFileIndex === idx
                          ? 'bg-[#1e293b] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }
                                    `}
                    >
                      {file.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Copy Button */}
              <button
                onClick={handleCopy}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-[#1e293b] border border-[#1e293b] transition-all shrink-0"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Mobile Copy Button - Absolute positioned for space saving */}
            <button
              onClick={handleCopy}
              className="sm:hidden absolute top-16 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-md bg-[#1e293b]/80 backdrop-blur border border-white/10 text-slate-300"
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Code Content */}
            <div className="flex-1 p-5 sm:p-8 overflow-auto relative custom-scrollbar bg-[#0d121c]">
              <pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#a5b4fc] m-0">
                <code>
                  {activeGuide.files[activeFileIndex]?.content}
                </code>
              </pre>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Note */}
      <div className="container mx-auto max-w-6xl px-4 mt-8 pb-12 flex justify-end">
        <p className="text-xs text-slate-600 font-medium">DigitalOcean Implementation Reference</p>
      </div>

    </div>
  );
};

export default AxiosReact;

