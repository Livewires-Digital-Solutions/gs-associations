import { createClient } from '@/lib/supabase/client';

export async function getSavedPropertyIds(userId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('saved_properties')
    .select('property_id')
    .eq('user_id', userId);
  if (error) return [];
  return (data ?? []).map((r: any) => r.property_id);
}

export async function saveProperty(userId: string, propertyId: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from('saved_properties')
    .upsert({ user_id: userId, property_id: propertyId }, { onConflict: 'user_id,property_id' });
  // Increment saves count
  const { data } = await supabase.from('properties').select('saves').eq('id', propertyId).single();
  if (data) {
    await supabase.from('properties').update({ saves: (data.saves ?? 0) + 1 }).eq('id', propertyId);
  }
}

export async function unsaveProperty(userId: string, propertyId: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from('saved_properties')
    .delete()
    .eq('user_id', userId)
    .eq('property_id', propertyId);
  // Decrement saves count
  const { data } = await supabase.from('properties').select('saves').eq('id', propertyId).single();
  if (data) {
    await supabase.from('properties').update({ saves: Math.max(0, (data.saves ?? 0) - 1) }).eq('id', propertyId);
  }
}

export async function recordPropertyView(userId: string, propertyId: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from('viewed_properties')
    .insert({ user_id: userId, property_id: propertyId });
  // Increment views count
  const { data } = await supabase.from('properties').select('views').eq('id', propertyId).single();
  if (data) {
    await supabase.from('properties').update({ views: (data.views ?? 0) + 1 }).eq('id', propertyId);
  }
}

export async function getViewedPropertyIds(userId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('viewed_properties')
    .select('property_id')
    .eq('user_id', userId)
    .order('viewed_at', { ascending: false })
    .limit(20);
  if (error) return [];
  // De-duplicate preserving order
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const r of data ?? []) {
    if (!seen.has(r.property_id)) { seen.add(r.property_id); ids.push(r.property_id); }
  }
  return ids;
}
