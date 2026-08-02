import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../data/mockData';
import { createClient } from '@/lib/supabase/client';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => void;
  setAuth: (user: any | null) => void;
  isLoginModalOpen: boolean;
  loginPromptReason: string | null;
  openLoginModal: (reason?: string | any) => void;
  closeLoginModal: () => void;
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      isLoginModalOpen: false,
      loginPromptReason: null,
      isRegisterModalOpen: false,

      openLoginModal: (reason?: any) => set({ isLoginModalOpen: true, loginPromptReason: typeof reason === 'string' ? reason : null }),
      closeLoginModal: () => set({ isLoginModalOpen: false, loginPromptReason: null }),
      openRegisterModal: () => set({ isRegisterModalOpen: true }),
      closeRegisterModal: () => set({ isRegisterModalOpen: false }),

      login: async (email, password) => {
        set({ isLoading: true });
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
        // Profile will be loaded by setAuth via auth listener
        set({ isLoading: false });
        return { success: true };
      },

      register: async (name, email, phone, password) => {
        set({ isLoading: true });
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, phone } },
        });
        if (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
        set({ isLoading: false });
        return { success: true };
      },

      setAuth: (user) => {
        if (user) {
          // Load profile from DB to get role
          const supabase = createClient();
          supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
            const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',').map(e => e.trim()) || [];
            const isAdminEmail = user.email ? adminEmails.includes(user.email) : false;
            const mappedUser: User = {
              id: user.id,
              name: data?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              email: user.email,
              phone: data?.phone || user.user_metadata?.phone || '',
              role: isAdminEmail ? 'admin' : (data?.role || 'user'),
              avatar: data?.avatar || user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
              joinedDate: new Date(user.created_at || Date.now()).toISOString().split('T')[0],
              savedProperties: [],
              viewedProperties: [],
              isVerified: data?.is_verified || true,
            };
            set({ currentUser: mappedUser, isAuthenticated: true });
          });
        } else {
          set({ currentUser: null, isAuthenticated: false });
        }
      },

      logout: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ currentUser: null, isAuthenticated: false, isLoginModalOpen: false });
      },

      deleteAccount: async () => {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          return { success: false, error: 'Not authenticated' };
        }
        const res = await fetch('/api/delete-account', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const json = await res.json();
        if (!res.ok) {
          return { success: false, error: json.error || 'Failed to delete account' };
        }
        await supabase.auth.signOut();
        set({ currentUser: null, isAuthenticated: false, isLoginModalOpen: false });
        return { success: true };
      },

      updateProfile: (data) => {
        const current = get().currentUser;
        if (current) {
          set({ currentUser: { ...current, ...data } });
        }
      },
    }),
    {
      name: 'gs-auth',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
