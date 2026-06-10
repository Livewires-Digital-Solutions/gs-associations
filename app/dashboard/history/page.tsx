'use client';

import Link from 'next/link';

import { Clock, ArrowRight } from 'lucide-react';
import { usePropertyStore } from '@/src/stores/propertyStore';
import PropertyCard from '@/src/components/property/PropertyCard';

export default function RecentlyViewed() {
  const { properties, viewedPropertyIds } = usePropertyStore();
  const viewed = viewedPropertyIds
    .map(id => properties.find(p => p.id === id))
    .filter(Boolean) as typeof properties;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Recently Viewed</h1>
          <p className="text-surface-500 text-sm mt-1">{viewed.length} {viewed.length === 1 ? 'property' : 'properties'} in your history</p>
        </div>
        <Link href="/properties" className="btn-primary text-sm">
          Explore More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {viewed.length === 0 ? (
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
