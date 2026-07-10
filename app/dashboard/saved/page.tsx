'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { getSavedPropertyIds } from '@/lib/db/saved';
import { getProperty } from '@/lib/db/properties';
import PropertyCard from '@/components/property/PropertyCard';
import type { Property } from '@/data/mockData';

export default function SavedProperties() {
  const { currentUser } = useAuthStore();
  const [saved, setSaved] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) { setLoading(false); return; }
    getSavedPropertyIds(currentUser.id).then(async (ids) => {
      const props = await Promise.all(ids.map(id => getProperty(id)));
      setSaved(props.filter(Boolean) as Property[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [currentUser?.id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Saved Properties</h1>
          <p className="text-surface-500 text-sm mt-1">{loading ? 'Loading...' : `${saved.length} ${saved.length === 1 ? 'property' : 'properties'} saved`}</p>
        </div>
        <Link href="/properties" className="btn-primary text-sm">
          Browse More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />)}
        </div>
      ) : saved.length === 0 ? (
        <div className="card p-16 text-center">
          <Heart className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <h3 className="font-display font-semibold text-surface-700 text-xl mb-2">No saved properties yet</h3>
          <p className="text-surface-400 text-sm mb-6">Browse properties and click the heart icon to save your favorites</p>
          <Link href="/properties" className="btn-primary">Browse Properties</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
