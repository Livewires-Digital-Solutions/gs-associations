'use client';


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Star, Eye, Heart, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { usePropertyStore } from '@/stores/propertyStore';
import type { Property } from '@/data/mockData';

type FormMode = 'add' | 'edit' | null;

function PropertyForm({
  property,
  onSave,
  onClose,
}: {
  property?: Property;
  onSave: (data: Partial<Property>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: property?.title || '',
    type: property?.type || 'Apartment',
    status: property?.status || 'Available',
    price: property?.price?.toString() || '',
    priceLabel: property?.priceLabel || '',
    location: property?.location || '',
    city: property?.city || 'Hyderabad',
    area: property?.area?.toString() || '',
    bedrooms: property?.bedrooms?.toString() || '0',
    bathrooms: property?.bathrooms?.toString() || '0',
    parking: property?.parking?.toString() || '0',
    furnishing: property?.furnishing || 'Unfurnished',
    description: property?.description || '',
    agentName: property?.agentName || '',
    agentPhone: property?.agentPhone || '',
    featured: property?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price),
      area: parseFloat(form.area),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
      parking: parseInt(form.parking),
      images: property?.images || ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
      features: property?.features || [],
      lat: property?.lat || 17.44,
      lng: property?.lng || 78.34,
      floor: property?.floor || 1,
      totalFloors: property?.totalFloors || 1,
      age: property?.age || 'New',
      saves: property?.saves || 0,
      rera: property?.rera || `P024000${Date.now()}`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-2xl shadow-card-hover"
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-100">
          <h2 className="font-display font-semibold text-xl text-surface-900">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-100 flex items-center justify-center text-surface-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="label mb-1.5 block">Property Title *</label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label mb-1.5 block">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as Property['type'] }))} className="input text-sm">
                {['Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Penthouse'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Property['status'] }))} className="input text-sm">
                {['Available', 'Under Offer', 'Sold'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label mb-1.5 block">Furnishing</label>
              <select value={form.furnishing} onChange={e => setForm(p => ({ ...p, furnishing: e.target.value as Property['furnishing'] }))} className="input text-sm">
                {['Furnished', 'Semi-Furnished', 'Unfurnished'].map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Price (₹)</label>
              <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="label mb-1.5 block">Price Label</label>
              <input type="text" value={form.priceLabel} onChange={e => setForm(p => ({ ...p, priceLabel: e.target.value }))} placeholder="₹1.5 Crore" className="input" />
            </div>
          </div>
          <div>
            <label className="label mb-1.5 block">Location *</label>
            <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Gachibowli, Hyderabad" className="input" required />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="label mb-1.5 block">Area (sqft)</label>
              <input type="number" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={e => setForm(p => ({ ...p, bedrooms: e.target.value }))} className="input" min="0" />
            </div>
            <div>
              <label className="label mb-1.5 block">Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={e => setForm(p => ({ ...p, bathrooms: e.target.value }))} className="input" min="0" />
            </div>
            <div>
              <label className="label mb-1.5 block">Parking</label>
              <input type="number" value={form.parking} onChange={e => setForm(p => ({ ...p, parking: e.target.value }))} className="input" min="0" />
            </div>
          </div>
          <div>
            <label className="label mb-1.5 block">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="input h-24 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Agent Name</label>
              <input type="text" value={form.agentName} onChange={e => setForm(p => ({ ...p, agentName: e.target.value }))} className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Agent Phone</label>
              <input type="text" value={form.agentPhone} onChange={e => setForm(p => ({ ...p, agentPhone: e.target.value }))} className="input" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
            <span className="text-sm font-medium text-surface-700">Feature this property on homepage</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              <Check className="w-4 h-4" />
              {property ? 'Update Property' : 'Add Property'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminProperties() {
  const { properties, addProperty, updateProperty, deleteProperty, toggleFeatured } = usePropertyStore();
  const [search, setSearch] = useState('');
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();

  const filtered = properties.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Partial<Property>) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, data);
      toast.success('Property updated successfully');
    } else {
      addProperty(data as Omit<Property, 'id' | 'postedDate' | 'views' | 'saves'>);
      toast.success('Property added successfully');
    }
    setFormMode(null);
    setEditingProperty(undefined);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This action cannot be undone.`)) {
      deleteProperty(id);
      toast.success('Property deleted');
    }
  };

  const statusColors: Record<string, string> = {
    Available: 'badge-green',
    'Under Offer': 'badge-gold',
    Sold: 'badge-red',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Properties Management</h1>
          <p className="text-surface-500 text-sm">{properties.length} total properties</p>
        </div>
        <button onClick={() => { setFormMode('add'); setEditingProperty(undefined); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search properties..." className="input pl-10 max-w-md" />
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Property</th>
              <th className="table-header-cell">Type</th>
              <th className="table-header-cell">Price</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Views</th>
              <th className="table-header-cell">Saves</th>
              <th className="table-header-cell">Featured</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(property => (
              <tr key={property.id} className="table-row">
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <img src={property.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-surface-900 truncate max-w-48">{property.title}</p>
                      <p className="text-xs text-surface-400 truncate">{property.location}</p>
                    </div>
                  </div>
                </td>
                <td className="table-cell"><span className="badge badge-navy text-[10px]">{property.type}</span></td>
                <td className="table-cell font-semibold text-surface-900">{property.priceLabel}</td>
                <td className="table-cell"><span className={`badge ${statusColors[property.status]} text-[10px]`}>{property.status}</span></td>
                <td className="table-cell">
                  <div className="flex items-center gap-1 text-surface-600"><Eye className="w-3 h-3" />{property.views.toLocaleString()}</div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-1 text-surface-600"><Heart className="w-3 h-3" />{property.saves}</div>
                </td>
                <td className="table-cell">
                  <button onClick={() => toggleFeatured(property.id)} className={`w-8 h-4 rounded-full transition-colors ${property.featured ? 'bg-gold-500' : 'bg-surface-300'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full mx-auto transition-none`} />
                  </button>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingProperty(property); setFormMode('edit'); }}
                      className="w-7 h-7 rounded-lg hover:bg-navy-50 flex items-center justify-center text-navy-600 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id, property.title)}
                      className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {formMode && (
          <PropertyForm
            property={editingProperty}
            onSave={handleSave}
            onClose={() => { setFormMode(null); setEditingProperty(undefined); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
