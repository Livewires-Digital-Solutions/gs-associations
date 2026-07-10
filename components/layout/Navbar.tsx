'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, User, Heart, Clock,
  Settings, LogOut, LayoutDashboard
} from 'lucide-react';
import logo from '@/assets/logo.png';
import logoWhite from '@/assets/logowhite.png';
import { useAuthStore } from '@/stores/authStore';
import { createClient } from '@/lib/supabase/client';

const navLinks = [
  { label: 'Home', href: '/' },
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
  const { isAuthenticated, currentUser, logout, openLoginModal, openRegisterModal } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  
  const isLightTop = ['/login', '/register'].some(path => pathname === path || pathname?.startsWith(path + '/'));
  const useDarkText = scrolled || isLightTop;

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? 'pt-4 px-4' : 'pt-6 px-0'
      }`}
    >
      <div className={`w-full max-w-7xl transition-all duration-500 ${
        scrolled
          ? 'bg-white/60 backdrop-blur-xl shadow-2xl rounded-full px-6 sm:px-8'
          : 'bg-transparent px-4 sm:px-6 lg:px-8'
      }`}>
        <div className="flex items-center justify-between h-16 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={useDarkText ? logo : logoWhite}
              alt="GS Associations Logo"
              height={48}
              className={`h-12 w-auto object-contain transition-all duration-300 origin-left ${scrolled ? 'scale-100' : 'scale-125'}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? useDarkText ? 'text-navy-800' : 'text-white'
                      : useDarkText ? 'text-surface-600 hover:text-navy-800' : 'text-white hover:text-blue-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${useDarkText ? 'bg-navy-800' : 'bg-white'}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
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
                    useDarkText
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
                <button
                  onClick={() => openLoginModal()}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    useDarkText ? 'text-surface-700 hover:bg-surface-100' : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => openRegisterModal()}
                  className="btn-gold text-sm px-6 py-2.5 !rounded-full"
                >
                  Register Free
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${useDarkText ? 'text-surface-700 hover:bg-surface-100' : 'text-white hover:bg-white/10'}`}
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
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-surface-200 overflow-hidden shadow-2xl"
          >
            <div className="container-app py-4 flex flex-col gap-1">
              {navLinks.map(link => {
                const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname?.startsWith(link.href + '/');
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
                    <button onClick={() => { setMobileOpen(false); openLoginModal(); }} className="btn-secondary w-full justify-center">Sign In</button>
                    <button onClick={() => { setMobileOpen(false); openRegisterModal(); }} className="btn-gold w-full justify-center !rounded-full">Register Free</button>
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
