'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Share2, MapPin, BedDouble, Bath, Car,
  Shield, Phone, ChevronLeft, ChevronRight,
  CheckCircle2, Eye, Lock, X, LayoutGrid, Ruler, Building2
} from 'lucide-react';
import { toast } from 'sonner';
import { getProperty, getProperties, incrementPropertyView } from '@/lib/db/properties';
import { saveProperty, unsaveProperty, getSavedPropertyIds, recordPropertyView } from '@/lib/db/saved';
import { createLead } from '@/lib/db/leads';
import { useAuthStore } from '@/stores/authStore';
import { extractPropertyId } from '@/lib/utils';
import PropertyCard from '@/components/property/PropertyCard';
import type { Property } from '@/data/mockData';

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const id = extractPropertyId(params.id);
  const router = useRouter();
  const { isAuthenticated, currentUser, openLoginModal, openRegisterModal } = useAuthStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Gallery Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Contact Form State
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState("I am interested in this property and would like to arrange a viewing.");

  useEffect(() => {
    setLoading(true);
    getProperty(id).then(async (p) => {
      if (p) {
        setProperty({ ...p, views: (p.views || 0) + 1 });
        incrementPropertyView(p.id).catch(() => {});
        const all = await getProperties();
        setSimilar(all.filter(x => x.id !== id && x.type === p.type).slice(0, 3));
        if (isAuthenticated && currentUser) {
          const saved = await getSavedPropertyIds(currentUser.id);
          setIsSaved(saved.includes(id));
          await recordPropertyView(currentUser.id, id);
        }
      } else {
        setProperty(null);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (currentUser) {
      setFormName(currentUser.name || '');
      setFormPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center container-app min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-surface-200 border-t-navy-900 rounded-full animate-spin mb-4" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center container-app min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">Property Unavailable</h2>
        <Link href="/properties" className="btn-primary">Return to Collection</Link>
      </div>
    );
  }

  const handleSave = async () => {
    if (!isAuthenticated || !currentUser) {
      toast.info('Please sign in to save properties to your collection');
      openLoginModal('Please sign in to save properties to your favorites and access your portfolio.');
      return;
    }
    try {
      if (isSaved) {
        await unsaveProperty(currentUser.id, property.id);
        setIsSaved(false);
        toast.success('Removed from collection');
      } else {
        await saveProperty(currentUser.id, property.id);
        setIsSaved(true);
        toast.success('Added to collection');
      }
    } catch {
      toast.error('Something went wrong.');
    }
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await createLead({
        userId: currentUser?.id || '',
        userName: formName || currentUser?.name || 'Visitor',
        userEmail: currentUser?.email || '',
        userPhone: formPhone || currentUser?.phone || '',
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        status: 'New',
        notes: formMessage,
        source: 'Contact Form',
      });

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'property',
          userName: formName || currentUser?.name || 'Visitor',
          userPhone: formPhone || currentUser?.phone || '',
          userEmail: currentUser?.email || '',
          message: formMessage,
          propertyTitle: property.title,
          propertyLocation: property.location,
          agentName: property.agentName,
          agentEmail: property.agentEmail,
        }),
      });

      if (!res.ok) throw new Error('Email failed');

      setContactSent(true);
      toast.success('Enquiry sent successfully');
    } catch {
      toast.error('Failed to send enquiry. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen relative">
      
      {/* 1. Page Content with Anti-DevTools Security & Full Blur if unauthenticated */}
      <div className={!isAuthenticated ? "filter blur-xl pointer-events-none select-none max-h-screen overflow-hidden opacity-30 transition-all duration-300" : "transition-all duration-300"}>
        {/* Cinematic Full-Bleed Hero */}
        <section className="relative w-full h-[60vh] bg-surface-900">
          <img 
            src={property.images[0]} 
            alt={isAuthenticated ? property.title : "Luxury Property Chennai"} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Floating View Gallery Button */}
          <button 
            onClick={() => isAuthenticated && setLightboxOpen(true)}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all"
          >
            <LayoutGrid className="w-5 h-5" />
            Show all photos
          </button>
        </section>

        {/* Main Content Container */}
        <main className="container-app py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-medium text-surface-500 mb-8">
              <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/properties" className="hover:text-navy-900 transition-colors">Properties</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-surface-900">{isAuthenticated ? property.title : "Exclusive Property"}</span>
            </div>

            {/* Header Row (Title + Price + Actions) */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-surface-100 text-surface-600'}`}>
                    {property.status}
                  </span>
                  <span className="text-sm text-surface-500 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> {property.views.toLocaleString()} views
                  </span>
                </div>
                
                <h1 className="font-display text-3xl md:text-5xl font-bold text-surface-900 leading-tight mb-3">
                  {isAuthenticated ? property.title : "Exclusive Verified Property"}
                </h1>
                
                <div className="flex items-center gap-2 text-lg text-surface-600">
                  <MapPin className="w-5 h-5 text-navy-600" />
                  {isAuthenticated ? property.location : "Chennai Prime District"}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                <p className="font-display text-4xl font-bold text-navy-900 mb-1">
                  {property.priceLabel}
                </p>
                {property.bedrooms > 0 && isAuthenticated && (
                  <p className="text-surface-500 font-medium mb-4">
                    ₹{Math.round(property.price / property.area).toLocaleString()} / sq.ft
                  </p>
                )}
                
                <div className="flex gap-3 w-full md:w-auto">
                  <button onClick={handleSave} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all font-semibold ${isSaved ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-surface-700 border-surface-200 hover:border-navy-300 hover:text-navy-900'}`}>
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied'); }} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 bg-white text-surface-700 border-surface-200 hover:border-navy-300 hover:text-navy-900 transition-all font-semibold">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-surface-200 mb-10" />

            {/* Quick Specs Row */}
            <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center text-navy-800">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-500">Bedrooms</p>
                  <p className="font-bold text-xl text-surface-900">{isAuthenticated ? (property.bedrooms > 0 ? property.bedrooms : '-') : '●● BHK'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center text-navy-800">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-500">Bathrooms</p>
                  <p className="font-bold text-xl text-surface-900">{isAuthenticated ? (property.bathrooms > 0 ? property.bathrooms : '-') : '●●'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center text-navy-800">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-500">Area</p>
                  <p className="font-bold text-xl text-surface-900">{isAuthenticated ? `${property.area.toLocaleString()} sqft` : '●●●● sqft'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center text-navy-800">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-500">Parking</p>
                  <p className="font-bold text-xl text-surface-900">{isAuthenticated ? (property.parking > 0 ? property.parking : '-') : '●●'}</p>
                </div>
              </div>
            </div>

            <hr className="border-surface-200 mb-10" />

            {/* Description Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-surface-900 mb-6">About this property</h2>
              {isAuthenticated ? (
                <div className="text-surface-600 leading-relaxed text-lg">
                  <p>{property.description}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="h-4 bg-surface-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-surface-200 rounded w-11/12 animate-pulse" />
                  <div className="h-4 bg-surface-200 rounded w-4/5 animate-pulse" />
                  <div className="h-4 bg-surface-200 rounded w-3/4 animate-pulse" />
                </div>
              )}
            </section>

            {/* Detailed Property Info Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-surface-900 mb-6">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex justify-between items-center border-b border-surface-100 pb-3">
                  <span className="text-surface-500 font-medium">Property Type</span>
                  <span className="font-semibold text-surface-900">{property.type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-100 pb-3">
                  <span className="text-surface-500 font-medium">Furnishing</span>
                  <span className="font-semibold text-surface-900">{isAuthenticated ? property.furnishing : '●●●●●●●●'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-100 pb-3">
                  <span className="text-surface-500 font-medium">Age of Property</span>
                  <span className="font-semibold text-surface-900">{isAuthenticated ? property.age : '●●●●●●●●'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-100 pb-3">
                  <span className="text-surface-500 font-medium">Floor Level</span>
                  <span className="font-semibold text-surface-900">{isAuthenticated ? (property.floor > 0 ? `${property.floor} of ${property.totalFloors}` : 'Ground') : '●●●●●●●●'}</span>
                </div>
                {property.rera && (
                  <div className="flex justify-between items-center border-b border-surface-100 pb-3 md:col-span-2">
                    <span className="text-surface-500 font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      RERA Registration
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">{isAuthenticated ? property.rera : 'TN/RERA/●●●●●●●●'}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Amenities */}
            {isAuthenticated && property.features.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-surface-900 mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-surface-50 rounded-xl border border-surface-100">
                      <CheckCircle2 className="w-5 h-5 text-navy-600 flex-shrink-0" />
                      <span className="font-medium text-surface-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Clean Contact Block */}
            {isAuthenticated && (
              <section className="bg-surface-50 rounded-3xl p-8 md:p-12 border border-surface-200">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  
                  {/* Agent Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-surface-900 mb-4">Contact Agent</h2>
                    <p className="text-surface-600 mb-8 max-w-sm mx-auto md:mx-0">
                      Get in touch with our property advisor to schedule a visit or ask any questions.
                    </p>
                    
                    <div className="flex items-center gap-5 justify-center md:justify-start">
                      <div className="w-16 h-16 rounded-full bg-navy-100 flex items-center justify-center text-navy-800 font-bold text-2xl">
                        {property.agentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-xl text-surface-900">{property.agentName}</p>
                        <p className="text-surface-500 font-medium mt-1">Property Advisor</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Area */}
                  <div className="w-full md:w-[400px] bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-surface-100">
                    {contactSent ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-xl font-bold text-surface-900 mb-2">Message Sent!</p>
                        <p className="text-surface-500">The agent will contact you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContact} className="space-y-4">
                        <input
                          type="text"
                          value={formName}
                          onChange={e => setFormName(e.target.value.replace(/[0-9]/g, ''))}
                          placeholder="Your Name"
                          className="input"
                          required
                        />
                        <input
                          type="tel"
                          value={formPhone}
                          onChange={e => setFormPhone(e.target.value.replace(/[^0-9+\s-]/g, ''))}
                          placeholder="Phone Number"
                          className="input"
                          required
                        />
                        <textarea
                          value={formMessage}
                          onChange={e => setFormMessage(e.target.value)}
                          className="input h-24 resize-none"
                          required
                        />
                        <button type="submit" disabled={contactLoading} className="btn-primary w-full">
                          {contactLoading ? 'Sending...' : 'Send Enquiry'}
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </section>
            )}

          </div>
        </main>

        {/* Similar Properties */}
        {similar.length > 0 && isAuthenticated && (
          <section className="bg-surface-50 py-16 border-t border-surface-200">
            <div className="container-app">
              <h2 className="text-2xl font-bold text-surface-900 mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 2. Fixed VIP Lock Overlay & Sign-In Modal (Unhackable) */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-7 md:p-9 max-w-lg w-full shadow-2xl border border-surface-200 text-center relative"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-4 text-gold-600 shadow-sm">
              <Lock className="w-8 h-8 text-gold-600" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-bold tracking-wider uppercase mb-3">
              Member Exclusive Access
            </span>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-surface-900 mb-2">
              Unlock Full Property Portfolio
            </h2>

            <p className="text-surface-600 text-sm mb-6 leading-relaxed">
              Sign in or create a free account to view verified pricing, architectural floor plans, legal verification (RERA), and direct contact with verified property advisors.
            </p>
            
            <div className="bg-surface-50 rounded-2xl p-4 mb-6 text-left space-y-2.5 border border-surface-100">
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-surface-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Complete Floor Plans & Dimension Breakdown
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-surface-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Verified RERA Documentation & Approvals
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-surface-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Direct Advisor WhatsApp & Phone Contact
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-surface-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Schedule Free In-Person Site Viewing
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => openLoginModal('Please sign in to unlock full property details, floor plans, and verified agent contact.')}
                className="btn-primary w-full py-3.5 text-base justify-center font-bold shadow-lg"
              >
                Sign In to Unlock
              </button>
              <button
                onClick={() => openRegisterModal()}
                className="btn-secondary w-full py-3 text-sm justify-center font-semibold"
              >
                Register Free Account
              </button>
              <div className="pt-2">
                <Link href="/properties" className="text-xs font-semibold text-surface-500 hover:text-navy-900 transition-colors">
                  Return to Property Listings
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lightbox Gallery Overlay (Authenticated only) */}
      <AnimatePresence>
        {lightboxOpen && isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-sm font-medium">
                {activeImage + 1} / {property.images.length}
              </span>
              <button 
                onClick={() => setLightboxOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Slider */}
            <div className="flex-1 relative flex items-center justify-center p-4">
              <img 
                src={property.images[activeImage]} 
                alt={`${property.title} - Photo ${activeImage + 1}`} 
                className="max-h-full max-w-full object-contain"
              />

              {property.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="p-4 flex justify-center gap-2 overflow-x-auto bg-gradient-to-t from-black/80 to-transparent">
                {property.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-opacity border-2 ${activeImage === i ? 'border-gold-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
