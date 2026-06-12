'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Building2, ChevronDown, User, Heart, Clock,
  Settings, LogOut, LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { createClient } from '@/lib/supabase/client';

const navLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'Loans', href: '/loans' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Setup Supabase Auth listener
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      useAuthStore.getState().setAuth(session?.user || null);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.getState().setAuth(session?.user || null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-surface-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-app">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center shadow-sm group-hover:bg-navy-700 transition-colors">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-display font-bold text-lg leading-none transition-colors ${scrolled ? 'text-navy-900' : 'text-white'}`}>
                GS Associations
              </span>
              <span className={`text-xs font-medium transition-colors ${scrolled ? 'text-gold-600' : 'text-gold-400'}`}>
                Premium Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? scrolled ? 'text-navy-800 bg-navy-50' : 'text-white bg-white/15'
                      : scrolled ? 'text-surface-600 hover:text-navy-800 hover:bg-surface-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    scrolled
                      ? 'text-surface-700 hover:bg-surface-100 border border-surface-200'
                      : 'text-white hover:bg-white/10 border border-white/20'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full bg-surface-200"
                  />
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-surface-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-surface-100">
                        <p className="text-sm font-semibold text-surface-900">{currentUser.name}</p>
                        <p className="text-xs text-surface-500 mt-0.5">{currentUser.email}</p>
                      </div>
                      {currentUser.role === 'admin' ? (
                        <MenuItem icon={<LayoutDashboard className="w-4 h-4" />} label="Admin Dashboard" href="/admin" onClick={() => setUserMenuOpen(false)} />
                      ) : (
                        <>
                          <MenuItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" href="/dashboard" onClick={() => setUserMenuOpen(false)} />
                          <MenuItem icon={<Heart className="w-4 h-4" />} label="Saved Properties" href="/dashboard/saved" onClick={() => setUserMenuOpen(false)} />
                          <MenuItem icon={<Clock className="w-4 h-4" />} label="Recently Viewed" href="/dashboard/history" onClick={() => setUserMenuOpen(false)} />
                          <MenuItem icon={<Settings className="w-4 h-4" />} label="Profile Settings" href="/dashboard/profile" onClick={() => setUserMenuOpen(false)} />
                        </>
                      )}
                      <div className="border-t border-surface-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    scrolled ? 'text-surface-700 hover:bg-surface-100' : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="btn-gold text-sm px-5 py-2.5"
                >
                  Register Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-surface-700 hover:bg-surface-100' : 'text-white hover:bg-white/10'}`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-surface-200 overflow-hidden"
          >
            <div className="container-app py-4 flex flex-col gap-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-navy-50 text-navy-800' : 'text-surface-700 hover:bg-surface-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-surface-100 mt-2 pt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link href={currentUser?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileOpen(false)} className="btn-secondary w-full justify-center">
                      Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn-ghost w-full justify-center text-red-600">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full justify-center">Sign In</Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-gold w-full justify-center">Register Free</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuItem({ icon, label, href, onClick }: { icon: React.ReactNode; label: string; href: string; onClick: () => void }) {
  const router = useRouter();
  return (
    <button
      onClick={() => { router.push(href); onClick(); }}
      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
    >
      <span className="text-surface-400">{icon}</span>
      {label}
    </button>
  );
}
