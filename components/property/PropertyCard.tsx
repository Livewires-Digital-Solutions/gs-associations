'use client';

import { useRouter } from 'next/navigation';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
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
  const { isAuthenticated, currentUser, openLoginModal } = useAuthStore();
  const { savedPropertyIds, saveProperty, unsaveProperty } = usePropertyStore();
  const isSaved = savedPropertyIds.includes(property.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info('Please sign in to save properties to your collection');
      openLoginModal('Please sign in to save properties to your favorites and access your portfolio.');
      return;
    }
    if (isSaved) {
      unsaveProperty(property.id, currentUser?.id ?? '');
      toast.success('Removed from saved properties');
    } else {
      saveProperty(property.id, currentUser?.id ?? '');
      toast.success('Added to saved properties');
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
        className="property-card flex overflow-hidden cursor-pointer group"
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
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge badge-navy text-[10px]">{property.type}</span>
              {property.bedrooms > 0 && (
                <span className="badge bg-surface-100 text-surface-700 text-[10px]">{property.bedrooms} BHK</span>
              )}
            </div>
            <h3 className="font-display font-semibold text-surface-900 text-sm leading-snug mb-1 line-clamp-2">{property.title}</h3>
            <div className="flex items-center gap-1 text-xs text-surface-500 mb-3">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-surface-100">
            <span className="font-bold text-navy-800 text-base">{property.priceLabel}</span>
            <span className="text-xs font-semibold text-navy-700 group-hover:text-theme-primary flex items-center gap-1">
              View Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="property-card group cursor-pointer flex flex-col h-full"
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
        {/* Type & BHK badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="badge bg-black/60 text-white backdrop-blur-sm text-[10px]">{property.type}</span>
          {property.bedrooms > 0 && (
            <span className="badge bg-black/60 text-white backdrop-blur-sm text-[10px]">{property.bedrooms} BHK</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display font-semibold text-surface-900 text-base leading-snug line-clamp-2 mb-1.5">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-surface-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-navy-600 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        {/* Minimal Price & Action */}
        <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-surface-400 font-medium">Guide Price</p>
            <p className="text-lg font-bold text-navy-900">{property.priceLabel}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-navy-800 group-hover:text-theme-primary transition-colors">
            View Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
