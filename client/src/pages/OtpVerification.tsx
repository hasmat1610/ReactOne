import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Atom, Loader2, KeyRound } from 'lucide-react';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow pasting multiple digits
    if (value.length > 1) {
      const pastedData = value.substring(0, 6).split('');
      for (let i = 0; i < pastedData.length; i++) {
        if (index + i < 6) {
          newOtp[index + i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex(val => val === '');
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to previous input on backspace if current is empty
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length < 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Navigate to some authenticated state or a success page
      // For now, let's send them to login or home
      navigate('/');
    } catch {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#070707] flex flex-col items-center justify-center p-4 selection:bg-primary/30 antialiased font-sans relative z-10">
      <div className="w-full max-w-[360px] flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 rounded-full flex items-center justify-center text-white">
          <KeyRound className="w-10 h-10" strokeWidth={1.5} />
        </div>

        {/* Headings */}
        <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Verify Email</h1>
        <p className="text-sm text-neutral-400 mb-8 font-medium text-center">
          We've sent a verification code to your email. Enter the 6-digit code below to finish setting up your account.
        </p>

        <form onSubmit={verifyOtp} className="w-full space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6} // Hack to allow pasting in the first cell
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center bg-transparent text-xl font-bold text-white placeholder-[#666] rounded-xl border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-[#333] focus:border-primary'} focus:outline-none transition-colors`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <div className="relative group pt-2">
            <button
              type="submit"
              disabled={isSubmitting || otp.join('').length < 6}
              className="w-full flex items-center justify-center gap-2 bg-[#f8f8f8] hover:bg-white disabled:bg-[#ccc] disabled:cursor-not-allowed text-black text-[15px] font-medium py-3 px-4 rounded-xl transition-all relative z-10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </button>
            {/* Soft pink/purple shadow glow underneath */}
            <div className="absolute inset-x-2 -bottom-2 h-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 blur-xl opacity-60 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
          </div>
        </form>

        <div className="mt-8 text-center text-[13px] text-[#666]">
          Didn't receive the code?{' '}
          <button 
            type="button" 
            className="text-white hover:underline decoration-white/30 underline-offset-4 transition-all"
            onClick={() => {
              // Simulate resend
              console.log('Resending code...');
            }}
          >
            Resend it
          </button>
        </div>

      </div>
    </div>
  );
};

export default OtpVerification;
