// propertyStore is now a thin signal layer.
// Actual data lives in Supabase and is fetched by pages via lib/db/properties & lib/db/leads.
// The store only holds the current user's savedPropertyIds and viewedPropertyIds (client-side cache),
// and exposes mutation functions that call the DB layer.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  saveProperty as dbSave,
  unsaveProperty as dbUnsave,
  getSavedPropertyIds,
  recordPropertyView,
  getViewedPropertyIds,
} from '@/lib/db/saved';
import { createLead } from '@/lib/db/leads';
import type { Lead } from '@/data/mockData';

interface PropertyState {
  savedPropertyIds: string[];
  viewedPropertyIds: string[];

  // Load from DB for logged-in user
  loadUserData: (userId: string) => Promise<void>;

  // Save/unsave
  saveProperty: (propertyId: string, userId: string) => Promise<void>;
  unsaveProperty: (propertyId: string, userId: string) => Promise<void>;

  // View tracking
  recordView: (propertyId: string, userId: string, userName: string, userEmail: string, userPhone: string) => Promise<void>;

  // Lead creation (contact form / schedule visit)
  addLead: (lead: Omit<Lead, 'id' | 'timestamp'>) => Promise<void>;

  // Refresh signal (bump to trigger page re-fetch)
  refreshSignal: number;
  triggerRefresh: () => void;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      savedPropertyIds: [],
      viewedPropertyIds: [],
      refreshSignal: 0,

      loadUserData: async (userId) => {
        const [saved, viewed] = await Promise.all([
          getSavedPropertyIds(userId),
          getViewedPropertyIds(userId),
        ]);
        set({ savedPropertyIds: saved, viewedPropertyIds: viewed });
      },

      saveProperty: async (propertyId, userId) => {
        if (!userId) return;
        await dbSave(userId, propertyId);
        set(s => ({ savedPropertyIds: [...new Set([...s.savedPropertyIds, propertyId])] }));
      },

      unsaveProperty: async (propertyId, userId) => {
        if (!userId) return;
        await dbUnsave(userId, propertyId);
        set(s => ({ savedPropertyIds: s.savedPropertyIds.filter(id => id !== propertyId) }));
      },

      recordView: async (propertyId, userId, userName, userEmail, userPhone) => {
        if (!userId) return;
        await recordPropertyView(userId, propertyId);
        set(s => ({
          viewedPropertyIds: [propertyId, ...s.viewedPropertyIds.filter(id => id !== propertyId)].slice(0, 20),
        }));
        // Also create a lead entry
        await createLead({
          userId,
          userName,
          userEmail,
          userPhone,
          propertyId,
          propertyTitle: '',   // caller should pass this; kept minimal here
          propertyLocation: '',
          status: 'New',
          notes: '',
          source: 'Property View',
        });
        get().triggerRefresh();
      },

      addLead: async (lead) => {
        await createLead(lead);
        get().triggerRefresh();
      },

      triggerRefresh: () => set(s => ({ refreshSignal: s.refreshSignal + 1 })),
    }),
    {
      name: 'gs-properties',
      partialize: (state) => ({
        savedPropertyIds: state.savedPropertyIds,
        viewedPropertyIds: state.viewedPropertyIds,
      }),
    }
  )
);
