'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Eye, EyeOff, User, Phone, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

const lookingForOptions = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Not sure yet'];
const budgetOptions = ['Under ₹50 Lakhs', '₹50L – ₹1 Crore', '₹1Cr – ₹2 Crore', '₹2Cr – ₹5 Crore', '₹5 Crore+'];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', lookingFor: '', budget: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await register(form.name, form.email, form.phone, form.password);
    if (result.success) {
      toast.success(`Welcome to GS Associations, ${form.name.split(' ')[0]}! 🎉`);
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.6), transparent 60%)',
        }} />
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-navy-700 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-white">GS Associations</span>
            <span className="text-xs text-gold-400">Premium Real Estate</span>
          </div>
        </Link>
        <div className="relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
            Join Hyderabad's<br />Property Community
          </h2>
          <p className="text-white/70 text-sm mb-8">
            Create your free account and unlock full access to 500+ premium properties, expert advisory, and your personal dashboard.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white text-sm font-semibold mb-4">What you get for free:</p>
            {['Full property details & gallery', 'Save up to 50 properties', 'View history tracking', 'EMI calculator & loan guide', 'Expert consultation booking', 'Exclusive new launch alerts'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-white/80 mb-2">
                <div className="w-4 h-4 rounded-full bg-gold-400/40 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-white/40 text-xs">© 2024 GS Associations. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md py-8"
        >
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-navy-900">GS Associations</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-surface-900 mb-2">Create Account</h1>
            <p className="text-surface-500 text-sm">Start your property journey today. It's free forever.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label mb-1.5 block">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
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
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 99001 12345"
                  className="input pl-10"
                  required
                />
              </div>
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400"
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
              I agree to the Terms of Service and Privacy Policy. I consent to receiving property alerts and expert advisory communications.
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
            <Link href="/login" className="text-navy-700 font-semibold hover:text-navy-900">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
