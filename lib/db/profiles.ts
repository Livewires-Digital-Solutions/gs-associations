import { createClient } from '@/lib/supabase/client';
import type { User } from '@/data/mockData';

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar: string;
  budget?: string;
  location?: string;
  lookingFor?: string;
  isVerified: boolean;
  createdAt: string;
}

function rowToProfile(row: any): Profile {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? '',
    phone: row.phone ?? '',
    role: row.role,
    avatar: row.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.id}`,
    budget: row.budget ?? undefined,
    location: row.location ?? undefined,
    lookingFor: row.looking_for ?? undefined,
    isVerified: row.is_verified,
    createdAt: row.created_at,
  };
}

export async function getProfiles(): Promise<Profile[]> {
  const supabase = createClient();
  // Join with auth.users to get email via the users view
  const { data, error } = await supabase
    .from('profiles')
    .select('*, auth_users:id(email)')
    .order('created_at', { ascending: false });
  if (error) {
    // Fallback without email join
    const { data: plain } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    return (plain ?? []).map(rowToProfile);
  }
  return (data ?? []).map((row: any) => ({
    ...rowToProfile(row),
    email: row.auth_users?.email ?? '',
  }));
}

export async function getProfile(id: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return rowToProfile(data);
}

export async function updateProfile(id: string, updates: Partial<Pick<User, 'name' | 'phone' | 'budget' | 'location' | 'lookingFor' | 'avatar'>>): Promise<void> {
  const supabase = createClient();
  const row: any = {};
  if (updates.name !== undefined)        row.name        = updates.name;
  if (updates.phone !== undefined)       row.phone       = updates.phone;
  if (updates.budget !== undefined)      row.budget      = updates.budget;
  if (updates.location !== undefined)    row.location    = updates.location;
  if (updates.lookingFor !== undefined)  row.looking_for = updates.lookingFor;
  if (updates.avatar !== undefined)      row.avatar      = updates.avatar;
  const { error } = await supabase.from('profiles').update(row).eq('id', id);
  if (error) throw error;
}
