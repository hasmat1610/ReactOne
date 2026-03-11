import { zodResolver } from '@hookform/resolvers/zod'
import { Atom, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function Signup() {
  const navigate = useNavigate()
  const { login: setAuthContext } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('token', token)
      navigate('/dashboard')
      window.location.reload()
    }
  }, [navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleGoogleLogin = async () => {
    setErrorMessage(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    })
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase Google OAuth failed:', error)
      setErrorMessage(error.message || 'Google sign-up failed. Please try again.')
    }
  }

  const onSubmit = async (data: SignupFormValues) => {
    setErrorMessage(null)
    setIsSubmitting(true)
    const { name, email, password } = data

    const { data: result, error: invokeError } = await supabase.functions.invoke('resend-signup', {
      body: { email, password, name },
    })

    if (invokeError || result?.error) {
      console.error('Signup failed:', invokeError || result?.error)
      setErrorMessage(invokeError?.message || result?.error || 'Failed to sign up. Please try again.')
      setIsSubmitting(false)
      return
    }

    // Since we're using a custom flow, we don't get an automatic session.
    // We should tell the user to check their email.
    setErrorMessage(null)
    setIsSubmitting(false)
    
    // Create a temporary success state or navigate to a special page
    const resendLink = async () => {
      await supabase.functions.invoke('send-verification-email', {
        body: { 
          email, 
          name, 
          verificationUrl: window.location.origin + '/login' // Simplified for this example
        }
      });
      alert('Verification link resent!');
    };

    alert('Signup successful! Please check your email to verify your account.');
    navigate('/login')
  }

  return (
    <div className="min-h-[100dvh] bg-[#070707] flex flex-col items-center justify-center p-4 selection:bg-primary/30 antialiased font-sans relative z-10">
      <div className="w-full max-w-[360px] flex flex-col items-center">
        <div className="mb-6 rounded-full flex items-center justify-center text-white">
          <Atom className="w-10 h-10" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-neutral-400 mb-8 font-medium">
          Sign up to access your components
        </p>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-[#111111] hover:bg-[#1a1a1a] text-white text-[15px] font-medium py-3 px-4 rounded-xl border border-[#222] transition-colors focus:outline-none focus:border-[#444]"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Continue with Google
        </button>

        <div className="w-full flex items-center my-6" aria-hidden="true">
          <div className="flex-grow border-t border-[#333]" />
          <span className="px-3 text-[11px] text-[#666] font-semibold tracking-widest">OR</span>
          <div className="flex-grow border-t border-[#333]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Full Name"
              aria-invalid={errors.name ? 'true' : 'false'}
              className={`w-full bg-transparent text-[15px] text-white placeholder-[#666] px-4 py-3 rounded-xl border ${
                errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#333] focus:border-[#555]'
              } focus:outline-none transition-colors`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="name@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`w-full bg-transparent text-[15px] text-white placeholder-[#666] px-4 py-3 rounded-xl border ${
                errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#333] focus:border-[#555]'
              } focus:outline-none transition-colors`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Password (min 8 chars)"
              aria-invalid={errors.password ? 'true' : 'false'}
              className={`w-full bg-transparent text-[15px] text-white placeholder-[#666] px-4 py-3 rounded-xl border ${
                errors.password
                  ? 'border-red-500/50 focus:border-red-500'
                  : 'border-[#333] focus:border-[#555]'
              } focus:outline-none transition-colors`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <div className="relative group pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#f8f8f8] hover:bg-white disabled:bg-[#ccc] disabled:cursor-not-allowed text-black text-[15px] font-medium py-3 px-4 rounded-xl transition-all relative z-10"
              >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up with Email'
              )}
            </button>
            <div className="absolute inset-x-2 -bottom-2 h-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 blur-xl opacity-60 group-hover:opacity-100 transition duration-300 pointer-events-none" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white/40 via-white/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition duration-500 z-0 rounded-2xl pointer-events-none" />
          </div>
        </form>

        <div className="mt-8 text-center text-[13px] text-[#666]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-white hover:underline decoration-white/30 underline-offset-4 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

