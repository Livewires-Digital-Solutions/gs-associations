'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { getViewedPropertyIds } from '@/lib/db/saved';
import { getProperty } from '@/lib/db/properties';
import PropertyCard from '@/components/property/PropertyCard';
import type { Property } from '@/data/mockData';

export default function RecentlyViewed() {
  const { currentUser } = useAuthStore();
  const [viewed, setViewed] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) { setLoading(false); return; }
    getViewedPropertyIds(currentUser.id).then(async (ids) => {
      const props = await Promise.all(ids.map(id => getProperty(id)));
      setViewed(props.filter(Boolean) as Property[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [currentUser?.id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Recently Viewed</h1>
          <p className="text-surface-500 text-sm mt-1">{loading ? 'Loading...' : `${viewed.length} ${viewed.length === 1 ? 'property' : 'properties'} in your history`}</p>
        </div>
        <Link href="/properties" className="btn-primary text-sm">
          Explore More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />)}
        </div>
      ) : viewed.length === 0 ? (
        <div className="card p-16 text-center">
          <Clock className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <h3 className="font-display font-semibold text-surface-700 text-xl mb-2">No viewing history yet</h3>
          <p className="text-surface-400 text-sm mb-6">Properties you view will appear here</p>
          <Link href="/properties" className="btn-primary">Browse Properties</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewed.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
