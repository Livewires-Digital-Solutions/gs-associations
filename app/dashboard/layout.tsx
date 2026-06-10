'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Building2, LayoutDashboard, Heart, Clock,
  Settings, LogOut, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/src/stores/authStore';

const navItems = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Heart className="w-4 h-4" />, label: 'Saved Properties', href: '/dashboard/saved' },
  { icon: <Clock className="w-4 h-4" />, label: 'Recently Viewed', href: '/dashboard/history' },
  { icon: <Settings className="w-4 h-4" />, label: 'Profile Settings', href: '/dashboard/profile' },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-surface-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-navy-900 text-base">GS Associations</span>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-surface-100">
          <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-full bg-surface-200"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-surface-900 truncate">{currentUser?.name}</p>
              <p className="text-xs text-surface-500 truncate">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-surface-100 space-y-2">
          <Link
            href="/properties"
            className="flex items-center justify-between gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-navy-700 bg-navy-50 hover:bg-navy-100 transition-colors"
          >
            <span>Browse Properties</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-1 flex flex-col">
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
