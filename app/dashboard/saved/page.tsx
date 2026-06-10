'use client';

import Link from 'next/link';

import { Heart, ArrowRight } from 'lucide-react';
import { usePropertyStore } from '@/src/stores/propertyStore';
import PropertyCard from '@/src/components/property/PropertyCard';

export default function SavedProperties() {
  const { properties, savedPropertyIds } = usePropertyStore();
  const saved = properties.filter(p => savedPropertyIds.includes(p.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Saved Properties</h1>
          <p className="text-surface-500 text-sm mt-1">{saved.length} {saved.length === 1 ? 'property' : 'properties'} saved</p>
        </div>
        <Link href="/properties" className="btn-primary text-sm">
          Browse More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {saved.length === 0 ? (
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
