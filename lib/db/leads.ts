import { createClient } from '@/lib/supabase/client';
import type { Lead, LeadStatus } from '@/data/mockData';

function rowToLead(row: any): Lead {
  return {
    id: row.id,
    userId: row.user_id ?? '',
    userName: row.user_name,
    userEmail: row.user_email,
    userPhone: row.user_phone,
    propertyId: row.property_id ?? '',
    propertyTitle: row.property_title,
    propertyLocation: row.property_location,
    timestamp: row.created_at,
    status: row.status,
    notes: row.notes ?? '',
    source: row.source,
  };
}

export async function getLeads(): Promise<Lead[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToLead);
}

export async function createLead(lead: Omit<Lead, 'id' | 'timestamp'>): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('leads').insert({
    user_id: lead.userId || null,
    user_name: lead.userName,
    user_email: lead.userEmail,
    user_phone: lead.userPhone,
    property_id: lead.propertyId || null,
    property_title: lead.propertyTitle,
    property_location: lead.propertyLocation,
    status: lead.status,
    notes: lead.notes,
    source: lead.source,
  });
  if (error) throw error;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}

export async function updateLeadNotes(id: string, notes: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('leads')
    .update({ notes })
    .eq('id', id);
  if (error) throw error;
}
