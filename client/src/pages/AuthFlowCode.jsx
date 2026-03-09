import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Copy, CheckCircle2, Lock, Mail, KeyRound, UserPlus } from 'lucide-react';

const AuthFlowCode = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    setActiveFileIndex(0);
  }, [activeTab]);

  // Define the code snippets
  const snippets = {
    signup: {
      icon: UserPlus,
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
        },
        {
          filename: "useSignupForm.ts",
          code: `import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormValues } from '@/schemas/auth.schema';
import { signupURL } from '@/shared/services/reqUrl.service';

export function useSignupForm() {
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await signupURL(data);
      setStatus({ type: 'success', message: 'Registration successful! Please login.' });
    } catch (error: any) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Registration failed' 
      });
    }
  };

  return { register, handleSubmit, errors, isSubmitting, status, onSubmit };
}`
        },
        {
          filename: "auth.schema.ts",
          code: `import * as z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignupFormValues = z.infer<typeof signupSchema>;`
        },
        {
          filename: "reqUrl.service.ts",
          code: `import reqUrl from './reqUrl';

export const signupURL = async (data: any) => {
  return await reqUrl.post('/api/auth/register', data);
};

export const loginURL = async (data: any) => {
  return await reqUrl.post('/api/auth/login', data);
};`
        },
        {
          filename: ".env",
          code: `VITE_API_URL=http://localhost:5000`
        }
      ]
    },
    signin: {
      icon: Lock,
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
        },
        {
          filename: "useLoginForm.ts",
          code: `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormValues } from '@/schemas/auth.schema';
import { loginURL } from '@/shared/services/reqUrl.service';

export function useLoginForm() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema)
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      const response = await loginURL(data);
      
      // Store token securely (localStorage or HttpOnly cookie)
      localStorage.setItem('token', response.data.token);
      
      // Update global auth state here (e.g., Context, Redux)
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return { register, handleSubmit, errors, isSubmitting, error, onSubmit };
}`
        },
        {
          filename: "auth.schema.ts",
          code: `import * as z from 'zod';

export const signinSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninFormValues = z.infer<typeof signinSchema>;`
        },
        {
          filename: "reqUrl.service.ts",
          code: `import reqUrl from './reqUrl';

export const loginURL = async (data: any) => {
  return await reqUrl.post('/api/auth/login', data);
};`
        },
        {
          filename: ".env",
          code: `VITE_API_URL=http://localhost:5000`
        }
      ]
    },
    forgot: {
      icon: KeyRound,
      title: "Forgot / Reset Password",
      files: [
        {
          filename: "ForgotPassword.tsx",
          code: `import React from 'react';
import { useForgotPasswordForm } from '@/hooks/useForgotPasswordForm';

const ForgotPassword = () => {
  const { register, handleSubmit, errors, isSubmitting, status, onSubmit } = useForgotPasswordForm();

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <p>Enter your email address and we'll send you a link to reset your password.</p>
      
      {status?.type && <div className={\`alert \${status.type}\`}>{status.message}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            {...register('email')}
          />
          {errors.email && <span className="error-text text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
        </div>
        
        <button type="submit" disabled={isSubmitting || status?.type === 'loading'}>
          {isSubmitting || status?.type === 'loading' ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;`
        },
        {
          filename: "useForgotPasswordForm.ts",
          code: `import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/schemas/auth.schema';
import { forgotPasswordURL } from '@/shared/services/reqUrl.service';

export function useForgotPasswordForm() {
  const [status, setStatus] = useState<{type: 'loading' | 'success' | 'error', message: string} | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setStatus({ type: 'loading', message: 'Sending reset link...' });
    
    try {
      // Endpoint generates a secure token and emails the link
      await forgotPasswordURL(data);
      setStatus({ 
        type: 'success', 
        message: 'If an account exists, a reset link has been sent.' 
      });
    } catch (err) {
      // Standard security practice: Don't reveal if email exists
      setStatus({ type: 'success', message: 'If an account exists, a reset link has been sent.' });
    }
  };

  return { register, handleSubmit, errors, isSubmitting, status, onSubmit };
}`
        },
        {
          filename: "auth.schema.ts",
          code: `import * as z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;`
        },
        {
          filename: "reqUrl.service.ts",
          code: `import reqUrl from './reqUrl';

export const forgotPasswordURL = async (data: any) => {
  return await reqUrl.post('/api/auth/forgot-password', data);
};`
        },
        {
          filename: ".env",
          code: `VITE_API_URL=http://localhost:5000`
        }
      ]
    },
    otp: {
      icon: Mail,
      title: "OTP Verification",
      files: [
        {
          filename: "VerifyOTP.tsx",
          code: `import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { useVerifyOTPForm } from '@/hooks/useVerifyOTPForm';

const VerifyOTP = ({ email }: { email: string }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  
  const { 
    control, 
    handleSubmit, 
    errors, 
    isSubmitting, 
    error, 
    otpArray, 
    handleChange, 
    handleKeyDown, 
    onSubmit 
  } = useVerifyOTPForm(email, inputRefs);

  return (
    <div className="otp-container">
      <h2>Verify Your Identity</h2>
      <p>We've sent a 6-digit code to {email}</p>
      
      {error && <div className="error-alert">{error}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="otpCode"
          control={control}
          render={() => (
            <div className="otp-inputs flex gap-2 justify-center mb-2">
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-xl font-bold bg-[#1f2937] border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              ))}
            </div>
          )}
        />
        {errors.otpCode && <div className="text-red-500 text-sm text-center mb-4">{errors.otpCode.message}</div>}
        
        <button type="submit" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;`
        },
        {
          filename: "useVerifyOTPForm.ts",
          code: `import { useState, MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, type OTPFormValues } from '@/schemas/auth.schema';
import { verifyOTPURL } from '@/shared/services/reqUrl.service';

export function useVerifyOTPForm(email: string, inputRefs: MutableRefObject<Array<HTMLInputElement | null>>) {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { 
    control, 
    handleSubmit, 
    setValue, 
    formState: { errors, isSubmitting } 
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otpCode: '' }
  });

  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);
    
    setValue('otpCode', newOtpArray.join(''), { shouldValidate: true });

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OTPFormValues) => {
    try {
      const response = await verifyOTPURL({ email, code: data.otpCode });
      if (response.data.success) {
         navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  return { 
    control, handleSubmit, errors, isSubmitting, error, 
    otpArray, handleChange, handleKeyDown, onSubmit 
  };
}`
        },
        {
          filename: "auth.schema.ts",
          code: `import * as z from 'zod';

export const otpSchema = z.object({
  otpCode: z.string().length(6, 'Please enter all 6 digits.'),
});

export type OTPFormValues = z.infer<typeof otpSchema>;`
        },
        {
          filename: "reqUrl.service.ts",
          code: `import reqUrl from './reqUrl';

export const verifyOTPURL = async (data: any) => {
  return await reqUrl.post('/api/auth/verify-otp', data);
};`
        },
        {
          filename: ".env",
          code: `VITE_API_URL=http://localhost:5000`
        }
      ]
    }
  };

  const handleCopy = () => {
    const activeData = snippets[activeTab];
    const codeToCopy = activeData.files && activeData.files[activeFileIndex]
      ? activeData.files[activeFileIndex].code
      : activeData.code;
    navigator.clipboard.writeText(codeToCopy || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans pb-24 selection:bg-sky-500/30">

      {/* Navigation Bar */}


      {/* Article Content */}
      <main className="container mx-auto px-4 max-w-3xl pt-32 pb-16">

        {/* Banner Image Prototype */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-900 via-sky-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
            background: `radial-gradient(circle at 50% 120%, rgba(59, 130, 246, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.3), transparent 30%)`
          }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[120%] h-[120%] animate-spin-slow opacity-20" style={{
              background: `conic-gradient(from 0deg, transparent 0 340deg, white 360deg)`,
              maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
            }}></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl z-10 tracking-widest relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Auth Flow</span>
          </h1>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-6 font-medium text-sm">
            <Code className="w-4 h-4" />
            <span>Implementation Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">Authentication Flow Code Snippets</h1>

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

          <p className="text-slate-300 leading-relaxed mb-8 text-lg">
            Building a complete authentication flow involves several moving pieces—from initial registration to securely handling JWT tokens and integrating optional security layers like OTP verification.
          </p>

          <p className="text-slate-300 leading-relaxed mb-8 text-lg">
            To accelerate your development, we've curated robust, production-ready React components that cover the standard identity management flows. These snippets are designed to be easily dropped into any React application connected to a backend REST API using Axios.
          </p>

          <h3 className="text-2xl font-bold text-white mb-4">Navigating the Flows</h3>
          <p className="text-slate-300 leading-relaxed text-lg mb-8">
            Below is an interactive explorer. Select the flow you want to implement from the sidebar to view the corresponding React code. Each snippet handles common edge cases like error states and loading feedback.
          </p>

        </article>
      </main>

      {/* Interactive Tools Section - Outside defining standard article width */}
      <div className="container mx-auto px-4 max-w-6xl mt-4 border-t border-white/10 pt-16">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Auth Flows</h3>

              {Object.entries(snippets).map(([key, data]) => {
                const Icon = data.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${isActive
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                    {data.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="lg:w-3/4">
            <div className="bg-[#0f172a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
              {/* <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full z-10 hidden sm:flex items-center gap-2 font-mono">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 Interactive Viewer
              </div> */}

              {/* Fake Terminal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 border-b border-white/5 bg-[#1e293b]">
                <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto hide-scrollbar">
                  <div className="flex gap-2 sticky left-0 bg-[#1e293b] py-2 pr-2 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex gap-1 items-end pt-1">
                    {snippets[activeTab].files ? (
                      snippets[activeTab].files.map((file, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveFileIndex(idx)}
                          className={`px-4 py-1.5 text-xs font-mono rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${activeFileIndex === idx
                            ? 'bg-[#0f172a] text-sky-400 border-sky-400'
                            : 'text-slate-500 hover:text-slate-300 border-transparent hover:bg-white/5'
                            }`}
                        >
                          {file.filename}
                        </button>
                      ))
                    ) : (
                      <div className="text-xs font-mono text-slate-400 flex items-center justify-center flex-1 gap-2 px-4 py-1.5">
                        <span className="text-slate-500 hidden sm:inline">src/components/auth/</span>
                        <span className="text-sky-400">{snippets[activeTab].filename}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors border border-white/5 flex-shrink-0 mt-2 sm:mt-0 self-end sm:self-auto"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy</>
                  )}
                </button>
              </div>

              {/* The Code */}
              <div className="p-6 md:p-8 overflow-x-auto min-h-[500px]">
                <pre className="text-sm font-mono text-slate-300 leading-relaxed m-0">
                  <code className="language-jsx">
                    {snippets[activeTab].files
                      ? snippets[activeTab].files[activeFileIndex]?.code
                      : snippets[activeTab].code}
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AuthFlowCode;
