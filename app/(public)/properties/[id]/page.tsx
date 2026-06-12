'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart, Share2, MapPin, BedDouble, Bath, Maximize2, Car,
  Calendar, Layers, Shield, Phone, ChevronLeft, ChevronRight,
  CheckCircle2, Eye, Building2, Tag, Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAuthStore } from '@/stores/authStore';
import PropertyCard from '@/components/property/PropertyCard';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { properties, savedPropertyIds, saveProperty, unsaveProperty, recordView } = usePropertyStore();
  const { isAuthenticated, currentUser } = useAuthStore();
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const property = properties.find(p => p.id === id);
  const isSaved = savedPropertyIds.includes(id || '');
  const similar = properties.filter(p => p.id !== id && p.type === property?.type).slice(0, 3);

  // Record view when authenticated user visits
  useEffect(() => {
    if (property && isAuthenticated && currentUser) {
      recordView(property.id, currentUser.id, currentUser.name, currentUser.email, currentUser.phone);
    }
  }, [property?.id, isAuthenticated]);

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center container-app">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">Property not found</h2>
        <Link href="/properties" className="btn-primary">Browse Properties</Link>
      </div>
    );
  }

  const handleSave = () => {
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

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setContactSent(true);
      toast.success('Your enquiry has been sent! Our team will contact you shortly.');
    }, 1000);
  };

  const specs = [
    { icon: <BedDouble className="w-4 h-4" />, label: 'Bedrooms', value: property.bedrooms > 0 ? `${property.bedrooms} Bed` : 'N/A' },
    { icon: <Bath className="w-4 h-4" />, label: 'Bathrooms', value: property.bathrooms > 0 ? `${property.bathrooms} Bath` : 'N/A' },
    { icon: <Maximize2 className="w-4 h-4" />, label: 'Area', value: `${property.area.toLocaleString()} sqft` },
    { icon: <Car className="w-4 h-4" />, label: 'Parking', value: property.parking > 0 ? `${property.parking} Covered` : 'N/A' },
    { icon: <Layers className="w-4 h-4" />, label: 'Floor', value: property.floor > 0 ? `${property.floor} of ${property.totalFloors}` : 'Ground' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Age', value: property.age },
    { icon: <Tag className="w-4 h-4" />, label: 'Furnishing', value: property.furnishing },
    { icon: <Building2 className="w-4 h-4" />, label: 'Type', value: property.type },
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-50">
      {/* Breadcrumb */}
      <div className="container-app mb-6">
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Link href="/" className="hover:text-surface-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/properties" className="hover:text-surface-900 transition-colors">Properties</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-surface-900 truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT: Details ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="card overflow-hidden">
              <div className="relative h-[420px] bg-surface-200">
                <img
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {/* Nav arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage(prev => (prev - 1 + property.images.length) % property.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage(prev => (prev + 1) % property.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                {/* Status */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`badge ${property.status === 'Available' ? 'badge-green' : property.status === 'Sold' ? 'badge-red' : 'badge-gold'}`}>
                    {property.status}
                  </span>
                  {property.featured && <span className="badge bg-gold-500 text-navy-950">Featured</span>}
                </div>
                {/* View count */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full">
                  <Eye className="w-3 h-3" />
                  {property.views.toLocaleString()} views
                </div>
              </div>
              {/* Thumbnail row */}
              {property.images.length > 1 && (
                <div className="flex gap-2 p-3">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeImage ? 'border-navy-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-surface-900 leading-snug mb-2">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-sm text-surface-500">
                    <MapPin className="w-4 h-4 text-navy-600" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-display font-bold text-navy-800">{property.priceLabel}</p>
                  {property.bedrooms > 0 && (
                    <p className="text-sm text-surface-400">₹{Math.round(property.price / property.area).toLocaleString()}/sqft</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={handleSave} className={`btn-secondary gap-2 text-sm py-2 px-4 ${isSaved ? 'text-red-600 border-red-200 bg-red-50' : ''}`}>
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Property'}
                </button>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}
                  className="btn-secondary gap-2 text-sm py-2 px-4"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                {property.rera && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium">
                    <Shield className="w-3.5 h-3.5" />
                    RERA: {property.rera}
                  </div>
                )}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="card p-6">
              <h2 className="font-display font-semibold text-lg text-surface-900 mb-5">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map((spec, i) => (
                  <div key={i} className="bg-surface-50 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-2 text-navy-600">{spec.icon}</div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-surface-400 mb-1">{spec.label}</p>
                    <p className="text-sm font-semibold text-surface-800">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description — gated for non-auth */}
            <div className="card p-6">
              <h2 className="font-display font-semibold text-lg text-surface-900 mb-4">About This Property</h2>
              {isAuthenticated ? (
                <p className="text-surface-600 leading-relaxed text-sm">{property.description}</p>
              ) : (
                <div className="relative">
                  <p className="text-surface-600 leading-relaxed text-sm line-clamp-3">{property.description}</p>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white flex items-end justify-center pb-4">
                    <div className="text-center bg-white pt-4">
                      <div className="flex items-center gap-2 text-surface-500 text-sm mb-3">
                        <Lock className="w-4 h-4" />
                        <span>Sign in to read full description and all details</span>
                      </div>
                      <Link href="/register" className="btn-primary text-sm">
                        Register Free for Full Access
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            {isAuthenticated && (
              <div className="card p-6">
                <h2 className="font-display font-semibold text-lg text-surface-900 mb-5">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-surface-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Contact & Similar ── */}
          <div className="space-y-6">
            {/* Agent Contact Card */}
            <div className="card p-6 sticky top-28">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-surface-100">
                <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-navy-800">
                    {property.agentName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-surface-900">{property.agentName}</p>
                  <p className="text-xs text-surface-500">Property Advisor</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                    ))}
                  </div>
                </div>
              </div>

              {isAuthenticated ? (
                contactSent ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <p className="font-semibold text-surface-900 mb-1">Enquiry Sent!</p>
                    <p className="text-sm text-surface-500">Our agent will contact you within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-3">
                    <h3 className="font-semibold text-surface-900 mb-3">Schedule a Visit</h3>
                    <input type="text" defaultValue={currentUser?.name} placeholder="Your Name" className="input text-sm" required />
                    <input type="tel" defaultValue={currentUser?.phone} placeholder="Phone Number" className="input text-sm" required />
                    <textarea
                      placeholder="I'm interested in this property. Please get in touch."
                      className="input text-sm h-20 resize-none"
                      rows={3}
                    />
                    <button type="submit" className="btn-primary w-full">
                      Send Enquiry
                    </button>
                    <a href={`tel:${property.agentPhone}`} className="btn-secondary w-full gap-2">
                      <Phone className="w-4 h-4" />
                      {property.agentPhone}
                    </a>
                  </form>
                )
              ) : (
                <div className="text-center">
                  <p className="text-sm text-surface-600 mb-4">
                    Sign in to contact the agent and unlock complete property details
                  </p>
                  <Link href="/register" className="btn-primary w-full mb-2">
                    Register Free
                  </Link>
                  <Link href="/login" className="btn-secondary w-full">
                    Already have an account?
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-surface-900 mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
