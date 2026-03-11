import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Loader2, ArrowLeft, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { supabase } from '@/lib/supabase';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { email } = data;
    const { error } = await supabase.functions.invoke('resend-password-reset', {
      body: { email }
    });

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[100dvh] bg-[#070707] flex flex-col items-center justify-center p-4 selection:bg-primary/30 antialiased font-sans relative z-10">
      <div className="w-full max-w-[360px] flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 rounded-full flex items-center justify-center text-white">
          <Atom className="w-10 h-10" strokeWidth={1.5} />
        </div>

        {/* Headings */}
        <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Reset Password</h1>
        <p className="text-sm text-neutral-400 mb-8 font-medium text-center">
          {isSubmitted
            ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div>
              <div className="relative">
                <input
                  type="email"
                  {...register('email')}
                  placeholder="name@example.com"
                  className={`w-full bg-transparent text-[15px] text-white placeholder-[#666] pl-11 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#333] focus:border-[#555]'} focus:outline-none transition-colors`}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative group pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#f8f8f8] hover:bg-white disabled:bg-[#ccc] disabled:cursor-not-allowed text-black text-[15px] font-medium py-3 px-4 rounded-xl transition-all relative z-10"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
              {/* Soft pink/purple shadow glow underneath */}
              <div className="absolute inset-x-2 -bottom-2 h-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 blur-xl opacity-60 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
            </div>
          </form>
        ) : (
          <div className="w-full">
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#1a1a1a] text-white text-[15px] font-medium py-3 px-4 rounded-xl border border-[#222] transition-colors focus:outline-none focus:border-[#444]"
            >
              Return to Sign In
            </Link>
          </div>
        )}

        <div className="mt-8 text-center text-[13px]">
          <Link to="/login" className="text-[#666] hover:text-white flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
