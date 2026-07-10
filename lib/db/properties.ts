import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/data/mockData';

// Map Supabase snake_case row → app camelCase Property
function rowToProperty(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    status: row.status,
    price: row.price,
    priceLabel: row.price_label,
    location: row.location,
    city: row.city,
    area: row.area,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    floor: row.floor,
    totalFloors: row.total_floors,
    age: row.age,
    furnishing: row.furnishing,
    description: row.description,
    features: row.features ?? [],
    images: row.images ?? [],
    lat: row.lat ?? 17.44,
    lng: row.lng ?? 78.34,
    featured: row.featured,
    postedDate: row.created_at?.split('T')[0] ?? '',
    views: row.views,
    saves: row.saves,
    agentName: row.agent_name,
    agentPhone: row.agent_phone,
    rera: row.rera ?? undefined,
  };
}

// Map app camelCase Property → Supabase snake_case insert/update object
function propertyToRow(p: Partial<Property>) {
  const row: any = {};
  if (p.title !== undefined)       row.title         = p.title;
  if (p.type !== undefined)        row.type          = p.type;
  if (p.status !== undefined)      row.status        = p.status;
  if (p.price !== undefined)       row.price         = p.price;
  if (p.priceLabel !== undefined)  row.price_label   = p.priceLabel;
  if (p.location !== undefined)    row.location      = p.location;
  if (p.city !== undefined)        row.city          = p.city;
  if (p.area !== undefined)        row.area          = p.area;
  if (p.bedrooms !== undefined)    row.bedrooms      = p.bedrooms;
  if (p.bathrooms !== undefined)   row.bathrooms     = p.bathrooms;
  if (p.parking !== undefined)     row.parking       = p.parking;
  if (p.floor !== undefined)       row.floor         = p.floor;
  if (p.totalFloors !== undefined) row.total_floors  = p.totalFloors;
  if (p.age !== undefined)         row.age           = p.age;
  if (p.furnishing !== undefined)  row.furnishing    = p.furnishing;
  if (p.description !== undefined) row.description   = p.description;
  if (p.features !== undefined)    row.features      = p.features;
  if (p.images !== undefined)      row.images        = p.images;
  if (p.lat !== undefined)         row.lat           = p.lat;
  if (p.lng !== undefined)         row.lng           = p.lng;
  if (p.featured !== undefined)    row.featured      = p.featured;
  if (p.agentName !== undefined)   row.agent_name    = p.agentName;
  if (p.agentPhone !== undefined)  row.agent_phone   = p.agentPhone;
  if (p.rera !== undefined)        row.rera          = p.rera;
  return row;
}

export async function getProperties(): Promise<Property[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToProperty);
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(rowToProperty);
}

export async function getProperty(id: string): Promise<Property | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return rowToProperty(data);
}

export async function createProperty(p: Omit<Property, 'id' | 'postedDate' | 'views' | 'saves'>): Promise<Property> {
  const supabase = createClient();
  const row = propertyToRow({ ...p, views: 0, saves: 0 });
  const { data, error } = await supabase
    .from('properties')
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return rowToProperty(data);
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<void> {
  const supabase = createClient();
  const row = propertyToRow(updates);
  const { error } = await supabase
    .from('properties')
    .update(row)
    .eq('id', id);
  if (error) throw error;
}

export async function deleteProperty(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function incrementPropertyView(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.rpc('increment_property_view', { property_id: id });
}
