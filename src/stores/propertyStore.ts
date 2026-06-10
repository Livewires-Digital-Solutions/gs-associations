import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Property, Lead, LeadStatus } from '../data/mockData';
import { properties as initialProperties, leads as initialLeads } from '../data/mockData';

interface PropertyState {
  properties: Property[];
  leads: Lead[];
  savedPropertyIds: string[];
  viewedPropertyIds: string[];

  // Property actions
  addProperty: (property: Omit<Property, 'id' | 'postedDate' | 'views' | 'saves'>) => void;
  updateProperty: (id: string, data: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFeatured: (id: string) => void;

  // User interactions
  saveProperty: (propertyId: string) => void;
  unsaveProperty: (propertyId: string) => void;
  recordView: (propertyId: string, userId: string, userName: string, userEmail: string, userPhone: string) => void;

  // Lead actions
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  updateLeadNotes: (leadId: string, notes: string) => void;
  addLead: (lead: Omit<Lead, 'id'>) => void;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      properties: initialProperties,
      leads: initialLeads,
      savedPropertyIds: [],
      viewedPropertyIds: [],

      addProperty: (propertyData) => {
        const newProperty: Property = {
          ...propertyData,
          id: `prop-${Date.now()}`,
          postedDate: new Date().toISOString().split('T')[0],
          views: 0,
          saves: 0,
        } as Property;
        set(state => ({ properties: [newProperty, ...state.properties] }));
      },

      updateProperty: (id, data) => {
        set(state => ({
          properties: state.properties.map(p => p.id === id ? { ...p, ...data } : p),
        }));
      },

      deleteProperty: (id) => {
        set(state => ({
          properties: state.properties.filter(p => p.id !== id),
        }));
      },

      toggleFeatured: (id) => {
        set(state => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, featured: !p.featured } : p
          ),
        }));
      },

      saveProperty: (propertyId) => {
        set(state => {
          if (state.savedPropertyIds.includes(propertyId)) return state;
          return {
            savedPropertyIds: [...state.savedPropertyIds, propertyId],
            properties: state.properties.map(p =>
              p.id === propertyId ? { ...p, saves: p.saves + 1 } : p
            ),
          };
        });
      },

      unsaveProperty: (propertyId) => {
        set(state => ({
          savedPropertyIds: state.savedPropertyIds.filter(id => id !== propertyId),
          properties: state.properties.map(p =>
            p.id === propertyId ? { ...p, saves: Math.max(0, p.saves - 1) } : p
          ),
        }));
      },

      recordView: (propertyId, userId, userName, userEmail, userPhone) => {
        const state = get();
        const property = state.properties.find(p => p.id === propertyId);
        if (!property) return;

        // Add to viewed list
        if (!state.viewedPropertyIds.includes(propertyId)) {
          set(state => ({
            viewedPropertyIds: [propertyId, ...state.viewedPropertyIds.slice(0, 19)],
          }));
        }

        // Increment view count
        set(state => ({
          properties: state.properties.map(p =>
            p.id === propertyId ? { ...p, views: p.views + 1 } : p
          ),
        }));

        // Create lead entry
        const newLead: Lead = {
          id: `lead-${Date.now()}`,
          userId,
          userName,
          userEmail,
          userPhone,
          propertyId,
          propertyTitle: property.title,
          propertyLocation: property.location,
          timestamp: new Date().toISOString(),
          status: 'New',
          notes: '',
          source: 'Property View',
        };

        set(state => ({ leads: [newLead, ...state.leads] }));
      },

      updateLeadStatus: (leadId, status) => {
        set(state => ({
          leads: state.leads.map(l => l.id === leadId ? { ...l, status } : l),
        }));
      },

      updateLeadNotes: (leadId, notes) => {
        set(state => ({
          leads: state.leads.map(l => l.id === leadId ? { ...l, notes } : l),
        }));
      },

      addLead: (leadData) => {
        const newLead: Lead = { ...leadData, id: `lead-${Date.now()}` };
        set(state => ({ leads: [newLead, ...state.leads] }));
      },
    }),
    {
      name: 'gs-properties',
      partialize: (state) => ({
        properties: state.properties,
        leads: state.leads,
        savedPropertyIds: state.savedPropertyIds,
        viewedPropertyIds: state.viewedPropertyIds,
      }),
    }
  )
);
