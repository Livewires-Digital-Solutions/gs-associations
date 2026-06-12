import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../data/mockData';
import { users, DEMO_CREDENTIALS } from '../data/mockData';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setAuth: (user: any | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        // Simulate network delay
        await new Promise(res => setTimeout(res, 1500));

        // Check admin credentials
        if (email === DEMO_CREDENTIALS.admin.email && password === DEMO_CREDENTIALS.admin.password) {
          const adminUser = users.find(u => u.role === 'admin')!;
          set({ currentUser: adminUser, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        // Check user credentials (any registered user with password = user123)
        const foundUser = users.find(u => u.email === email && u.role === 'user');
        if (foundUser && password === 'user123') {
          set({ currentUser: foundUser, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        // Generic demo: any email/password creates a session
        if (email && password.length >= 6) {
          const demoUser = users[0]; // default to first user
          set({ currentUser: { ...demoUser, email, name: email.split('@')[0] }, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        set({ isLoading: false });
        return { success: false, error: 'Invalid credentials. Try admin@gsassociations.com / admin123' };
      },

      register: async (name, email, phone, password) => {
        set({ isLoading: true });
        await new Promise(res => setTimeout(res, 2000));

        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          phone,
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          joinedDate: new Date().toISOString().split('T')[0],
          savedProperties: [],
          viewedProperties: [],
          isVerified: false,
        };

        set({ currentUser: newUser, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      setAuth: (user) => {
        if (user) {
          const mappedUser: User = {
            id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email,
            phone: user.phone || '',
            role: user.user_metadata?.role || 'user',
            avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
            joinedDate: new Date(user.created_at || Date.now()).toISOString().split('T')[0],
            savedProperties: [],
            viewedProperties: [],
            isVerified: true,
          };
          set({ currentUser: mappedUser, isAuthenticated: true });
        } else {
          set({ currentUser: null, isAuthenticated: false });
        }
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
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
