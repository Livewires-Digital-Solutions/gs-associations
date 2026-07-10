'use client';

import { useRouter } from 'next/navigation';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, BedDouble, Bath, Maximize2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import type { Property } from '@/data/mockData';
import { useAuthStore } from '@/stores/authStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { generatePropertySlug } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'horizontal';
}

const statusColors: Record<string, string> = {
  Available: 'badge-green',
  'Under Offer': 'badge-gold',
  Sold: 'badge-red',
};

export default function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const router = useRouter();
  const { isAuthenticated, currentUser } = useAuthStore();
  const { savedPropertyIds, saveProperty, unsaveProperty } = usePropertyStore();
  const isSaved = savedPropertyIds.includes(property.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please sign in to save properties');
      router.push('/login');
      return;
    }
    if (isSaved) {
      unsaveProperty(property.id);
      toast.success('Removed from saved properties');
    } else {
      saveProperty(property.id);
      toast.success('Added to saved properties ✓');
    }
  };

  const handleClick = () => {
    router.push(`/properties/${generatePropertySlug(property.title, property.id)}`);
  };

  if (variant === 'horizontal') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        onClick={handleClick}
        className="property-card flex overflow-hidden"
      >
        <div className="relative w-48 flex-shrink-0 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute top-3 left-3 badge ${statusColors[property.status] || 'badge-gray'}`}>
            {property.status}
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <span className="badge badge-navy text-[10px] mb-2">{property.type}</span>
            <h3 className="font-display font-semibold text-surface-900 text-sm leading-snug mb-1 line-clamp-2">{property.title}</h3>
            <div className="flex items-center gap-1 text-xs text-surface-500 mb-3">
              <MapPin className="w-3 h-3" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-navy-800">{property.priceLabel}</span>
            <div className="flex items-center gap-3 text-xs text-surface-500">
              {property.bedrooms > 0 && <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" />{property.bedrooms}</span>}
              {property.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.bathrooms}</span>}
              <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" />{property.area} sqft</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="property-card group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={property.images[0]}
          alt={property.title}
          className="property-card-img"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`badge ${statusColors[property.status] || 'badge-gray'} text-xs`}>{property.status}</span>
          {property.featured && (
            <span className="badge bg-gold-500 text-navy-950 text-xs">Featured</span>
          )}
        </div>
        {/* Save button */}
        <button
          onClick={handleSave}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isSaved ? 'bg-red-500 text-white' : 'bg-white/90 text-surface-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
        {/* Type badge */}
        <div className="absolute bottom-3 left-3">
          <span className="badge bg-black/50 text-white backdrop-blur-sm text-[10px]">{property.type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-surface-900 text-sm leading-snug line-clamp-2 flex-1">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-surface-500 mb-4">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Specs */}
        {property.bedrooms > 0 ? (
          <div className="flex items-center gap-4 text-xs text-surface-600 mb-4 pb-4 border-b border-surface-100">
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-surface-400" />
              {property.bedrooms} Bed
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-surface-400" />
              {property.bathrooms} Bath
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-surface-400" />
              {property.area.toLocaleString()} sqft
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-xs text-surface-600 mb-4 pb-4 border-b border-surface-100">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-surface-400" />
              {property.area.toLocaleString()} sqft
            </span>
          </div>
        )}

        {/* Price + Views */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-navy-800">{property.priceLabel}</p>
            {property.bedrooms > 0 && (
              <p className="text-[11px] text-surface-400">
                ₹{Math.round(property.price / property.area).toLocaleString()}/sqft
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-surface-400">
            <Eye className="w-3 h-3" />
            {property.views.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
