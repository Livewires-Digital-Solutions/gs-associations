'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Building2, LayoutDashboard, Home, Eye, Users,
  FileText, CreditCard, BarChart3, Settings, LogOut,
  TrendingUp
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

const navItems = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', href: '/sys-ops' },
  { icon: <Home className="w-4 h-4" />, label: 'Properties', href: '/sys-ops/properties' },
  { icon: <Eye className="w-4 h-4" />, label: 'View Tracking', href: '/sys-ops/tracking' },
  { icon: <TrendingUp className="w-4 h-4" />, label: 'Leads', href: '/sys-ops/leads' },
  { icon: <Users className="w-4 h-4" />, label: 'Users', href: '/sys-ops/users' },
  { icon: <FileText className="w-4 h-4" />, label: 'Blog', href: '/sys-ops/blog' },
  { icon: <CreditCard className="w-4 h-4" />, label: 'Loans', href: '/sys-ops/loans' },
  { icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics', href: '/sys-ops/analytics' },
  { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/sys-ops/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (currentUser?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || currentUser?.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-surface-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-sm">GS Associations</span>
              <span className="text-xs text-gold-500 font-medium">Admin Console</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-widest text-surface-600">Navigation</p>
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Admin user */}
        <div className="p-4 border-t border-surface-800">
          <div className="flex items-center gap-3 mb-3 px-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full bg-surface-700 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-surface-500 truncate">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-surface-400 hover:bg-surface-800 hover:text-white transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="admin-main flex-1">
        {/* Top bar */}
        <div className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm text-surface-500">
            <span>Admin</span>
            <span>/</span>
            <span className="text-surface-900 font-medium capitalize">
              {pathname?.split('/sys-ops/')[1] || 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/properties" className="btn-secondary text-xs px-4 py-2">
              View Site →
            </Link>
            <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
              <span className="text-xs font-bold text-navy-800">
                {currentUser?.name?.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
