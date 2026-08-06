'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';
import logo from '@/assets/logo.png';
import PhoneInput from '@/components/ui/PhoneInput';

const lookingForOptions = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Not sure yet'];
const budgetOptions = ['Under ₹50 Lakhs', '₹50L – ₹1 Crore', '₹1Cr – ₹2 Crore', '₹2Cr – ₹5 Crore', '₹5 Crore+'];

export default function RegisterModal() {
  const { isRegisterModalOpen, closeRegisterModal, openLoginModal, register, isLoading } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', lookingFor: '', budget: '' });
  const [phoneValid, setPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Prevent background scrolling and update URL to look like a dedicated page
  useEffect(() => {
    if (isRegisterModalOpen) {
      document.body.style.overflow = 'hidden';
      if (window.location.pathname !== '/register') {
        window.history.pushState(null, '', '/register');
      }
    } else {
      document.body.style.overflow = 'unset';
      if (window.location.pathname === '/register') {
        window.history.pushState(null, '', '/');
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isRegisterModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      toast.error('Please enter a valid name');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!phoneValid) {
      toast.error('Please enter a valid phone number for the selected country');
      return;
    }

    const result = await register(form.name.trim(), form.email.trim(), form.phone.trim(), form.password);
    if (result.success) {
      toast.success(`Welcome to GS Associations, ${form.name.split(' ')[0]}!`);
      closeRegisterModal();
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  const handleSwitchToLogin = () => {
    closeRegisterModal();
    openLoginModal();
  };

  if (!isRegisterModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeRegisterModal}
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
            onClick={closeRegisterModal}
            className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-surface-500 hover:text-surface-900 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 px-8 py-6 sm:px-12 sm:py-8 overflow-y-auto">
            <div className="flex flex-col items-center text-center mb-6">
              <Image src={logo} alt="GS Associations Logo" height={64} className="h-16 w-auto object-contain mb-4" />
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900 mb-2">Create Account</h1>
              <p className="text-surface-500 text-sm">Start your property journey today. It's free forever.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="label mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value.replace(/[0-9]/g, '') }))}
                    placeholder="Arjun Mehta"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label mb-1.5 block">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="arjun@example.com"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label mb-1.5 block">Phone Number *</label>
                <PhoneInput
                  value={form.phone}
                  onChange={(val, valid) => {
                    setForm(p => ({ ...p, phone: val }));
                    setPhoneValid(valid);
                  }}
                  required
                />
                <p className="text-xs text-surface-400 mt-1">Required for property inquiries</p>
              </div>

              <div>
                <label className="label mb-1.5 block">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Minimum 6 characters"
                    className="input pl-10 pr-10"
                    minLength={6}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label mb-1.5 block">Looking For</label>
                  <select
                    value={form.lookingFor}
                    onChange={e => setForm(p => ({ ...p, lookingFor: e.target.value }))}
                    className="input text-sm"
                  >
                    <option value="">Select type...</option>
                    {lookingForOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label mb-1.5 block">Budget Range</label>
                  <select
                    value={form.budget}
                    onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                    className="input text-sm"
                  >
                    <option value="">Select budget...</option>
                    {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-2 text-xs text-surface-500 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded flex-shrink-0" required />
                I agree to the Terms of Service and Privacy Policy. I consent to receiving property alerts.
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating your account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create My Account
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-surface-500 mt-6">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={handleSwitchToLogin}
                className="text-navy-700 font-semibold hover:text-navy-900"
              >
                Sign in here
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
