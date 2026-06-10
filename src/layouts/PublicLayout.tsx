import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Building2, ChevronDown, User, Heart, Clock,
  Settings, LogOut, LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const navLinks = [
  { label: 'Properties', to: '/properties' },
  { label: 'Loans', to: '/loans' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── NAVBAR ── */}
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
            <Link to="/" className="flex items-center gap-2.5 group">
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
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? scrolled ? 'text-navy-800 bg-navy-50' : 'text-white bg-white/15'
                        : scrolled ? 'text-surface-600 hover:text-navy-800 hover:bg-surface-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
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
                          <MenuItem icon={<LayoutDashboard className="w-4 h-4" />} label="Admin Dashboard" to="/admin" onClick={() => setUserMenuOpen(false)} />
                        ) : (
                          <>
                            <MenuItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" to="/dashboard" onClick={() => setUserMenuOpen(false)} />
                            <MenuItem icon={<Heart className="w-4 h-4" />} label="Saved Properties" to="/dashboard/saved" onClick={() => setUserMenuOpen(false)} />
                            <MenuItem icon={<Clock className="w-4 h-4" />} label="Recently Viewed" to="/dashboard/history" onClick={() => setUserMenuOpen(false)} />
                            <MenuItem icon={<Settings className="w-4 h-4" />} label="Profile Settings" to="/dashboard/profile" onClick={() => setUserMenuOpen(false)} />
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
                    to="/login"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      scrolled ? 'text-surface-700 hover:bg-surface-100' : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
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
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-navy-50 text-navy-800' : 'text-surface-700 hover:bg-surface-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="border-t border-surface-100 mt-2 pt-2 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <Link to={currentUser?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileOpen(false)} className="btn-secondary w-full justify-center">
                        Dashboard
                      </Link>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn-ghost w-full justify-center text-red-600">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full justify-center">Sign In</Link>
                      <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-gold w-full justify-center">Register Free</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── CONTENT ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-surface-950 text-surface-400">
        <div className="container-app py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-navy-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display font-bold text-lg text-white leading-none">GS Associations</span>
                  <span className="text-xs font-medium text-gold-500">Premium Real Estate</span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed mb-6">
                Hyderabad's trusted real estate partner since 2012. We help families find their dream homes and investors build wealth through property.
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(s => (
                  <a key={s} href="#" className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-navy-700 flex items-center justify-center transition-colors">
                    <span className="text-xs capitalize text-white">{s[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Properties */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Properties</h4>
              <ul className="space-y-3 text-sm">
                {['Apartments', 'Villas', 'Plots', 'Commercial', 'Row Houses', 'Penthouses'].map(t => (
                  <li key={t}><Link to={`/properties?type=${t}`} className="hover:text-white transition-colors">{t}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Company</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'About Us', to: '/about' },
                  { label: 'Blog', to: '/blog' },
                  { label: 'Loan Programs', to: '/loans' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Privacy Policy', to: '#' },
                  { label: 'Terms of Service', to: '#' },
                ].map(item => (
                  <li key={item.label}><Link to={item.to} className="hover:text-white transition-colors">{item.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Get in Touch</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Office Address</p>
                  <p>Plot 42, Gachibowli Main Road,<br />Financial District,<br />Hyderabad — 500032</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Phone</p>
                  <a href="tel:+914066667777" className="hover:text-white transition-colors">+91 40 6666 7777</a>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a href="mailto:info@gsassociations.com" className="hover:text-white transition-colors">info@gsassociations.com</a>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Hours</p>
                  <p>Mon-Sat: 9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2024 GS Associations. All rights reserved. RERA Registration: P024000RERA</p>
            <p className="text-surface-600">Designed and built with ❤️ for Hyderabad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuItem({ icon, label, to, onClick }: { icon: React.ReactNode; label: string; to: string; onClick: () => void }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => { navigate(to); onClick(); }}
      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
    >
      <span className="text-surface-400">{icon}</span>
      {label}
    </button>
  );
}
