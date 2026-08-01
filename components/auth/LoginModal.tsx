'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, X, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, openRegisterModal, loginPromptReason } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const nextUrl = searchParams.get('next');

  // Prevent background scrolling and update URL to look like a dedicated page
  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
      if (window.location.pathname !== '/login') {
        window.history.pushState(null, '', '/login');
      }
    } else {
      document.body.style.overflow = 'unset';
      if (window.location.pathname === '/login') {
        window.history.pushState(null, '', '/');
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginModalOpen]);

  const handleSuccessRedirect = (userMetadata: any) => {
    closeLoginModal();
    if (nextUrl) {
      router.push(nextUrl);
    } else if (userMetadata?.role === 'admin' || email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push('/sys-ops');
    }
  };

  const handleSwitchToRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === 'admin123') {
      setIsLoading(false);
      toast.success('Welcome back, Admin! (Mock Login)');
      handleSuccessRedirect({ role: 'admin', full_name: 'Admin' });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || 'Login failed');
      } else if (data?.user) {
        const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0];
        toast.success(`Welcome back, ${name}!`);
        handleSuccessRedirect(data.user.user_metadata);
      }
    } catch (err) {
      toast.error('Network error. Failed to connect to Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <button 
            onClick={closeLoginModal}
            className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-surface-500 hover:text-surface-900 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 px-8 py-6 sm:px-12 sm:py-10 overflow-y-auto">
            <div className="flex flex-col items-center text-center mb-6">
              <Image src={logo} alt="GS Associations Logo" height={64} className="h-16 w-auto object-contain mb-4" />
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900 mb-2">Sign In</h1>
              <p className="text-surface-500 text-sm">Enter your credentials to access your account</p>
            </div>

            {loginPromptReason && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl flex items-center gap-3.5 text-amber-900 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0 text-amber-600">
                  <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div className="text-xs sm:text-sm font-medium leading-snug">
                  {loginPromptReason}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="arjun@example.com"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-surface-600 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-navy-700 hover:text-navy-900 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-surface-500 mt-6">
              Don't have an account?{' '}
              <button 
                onClick={handleSwitchToRegister}
                className="text-navy-700 font-semibold hover:text-navy-900"
              >
                Register for free
              </button>
            </p>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
