'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Eye, EyeOff, Lock, Mail, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, openRegisterModal } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const nextUrl = searchParams.get('next');

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginModalOpen]);

  const handleSuccessRedirect = (userMetadata: any) => {
    closeLoginModal();
    if (nextUrl) {
      router.push(nextUrl);
    } else if (userMetadata?.role === 'admin') {
      router.push('/admin');
    }
    // If just standard login from same page, just close modal (already done)
  };

  const handleSwitchToRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message || 'Login failed');
    } else if (data.user) {
      const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0];
      toast.success(`Welcome back, ${name}! 👋`);
      handleSuccessRedirect(data.user.user_metadata);
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button 
            onClick={closeLoginModal}
            className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-surface-500 hover:text-surface-900 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>



          {/* Form */}
          <div className="flex-1 px-8 py-6 sm:px-12 sm:py-10 overflow-y-auto">
            {/* Header & Logo */}
            <div className="flex flex-col items-center text-center mb-6">
              <Image src={logo} alt="GS Associations Logo" height={64} className="h-16 w-auto object-contain mb-4" />
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900 mb-2">Sign In</h1>
              <p className="text-surface-500 text-sm">Enter your credentials to access your account</p>
            </div>


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
