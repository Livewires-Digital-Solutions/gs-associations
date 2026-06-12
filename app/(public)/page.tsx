'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, ArrowRight, MapPin, Shield, TrendingUp, Award,
  ChevronRight, Star, Building2, Users, CheckCircle2, Sparkles
} from 'lucide-react';
import { usePropertyStore } from '@/stores/propertyStore';
import { useContentStore } from '@/stores/contentStore';
import PropertyCard from '@/components/property/PropertyCard';

const stats = [
  { value: '1,200+', label: 'Properties Sold' },
  { value: '15,000+', label: 'Happy Families' },
  { value: '12+', label: 'Years of Trust' },
  { value: '₹2,400 Cr', label: 'Worth Transacted' },
];

const whyUs = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'RERA Verified',
    desc: 'Every property on our platform is RERA registered and legally verified.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Market Intelligence',
    desc: 'Data-driven insights on price trends, rental yields, and appreciation.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Advisory',
    desc: 'Dedicated relationship managers with 10+ years of market experience.',
  },
];

const testimonials = [
  {
    name: 'Vikram Iyer',
    role: 'Software Engineer, Google',
    text: 'GS Associations made buying my first home completely stress-free. Their team guided me through every step.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vik',
  },
  {
    name: 'Anjali Sharma',
    role: 'Doctor, Apollo Hospitals',
    text: 'The property tracking feature helped me shortlist from 50 properties down to 3. Bought the perfect villa.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anj',
  },
  {
    name: 'Raj Malhotra',
    role: 'Entrepreneur',
    text: 'Invested in 3 commercial properties through GS. The ROI analysis they provided was spot on.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { properties } = usePropertyStore();
  const { blogs } = useContentStore();
  const router = useRouter();

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
  const latestBlogs = blogs.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(245, 158, 11, 0.4) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(58, 95, 244, 0.4) 0%, transparent 50%)',
          }} />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div className="container-app relative z-10 pt-24 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                <Sparkles className="w-3 h-3" />
                Hyderabad's #1 Premium Real Estate Platform
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              Find Your
              <span className="block gradient-gold-text">Dream Property</span>
              in Hyderabad
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
            >
              From cozy apartments in Kondapur to luxury villas in Jubilee Hills —
              discover 500+ verified properties with real-time market insights and expert guidance.
            </motion.p>

            {/* Search bar */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-8"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property name, or type..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm shadow-lg"
                />
              </div>
              <button type="submit" className="btn-gold h-14 px-8 text-sm font-semibold whitespace-nowrap">
                Search
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </motion.form>

            {/* Quick links */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {['Gachibowli', 'Jubilee Hills', 'Kondapur', 'Banjara Hills', 'Kokapet', 'Narsingi'].map(loc => (
                <button
                  key={loc}
                  onClick={() => router.push(`/properties?location=${loc}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-xs font-medium transition-all"
                >
                  <MapPin className="w-3 h-3" />
                  {loc}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero bottom wave */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1440 40 1200 80 720 40C240 0 0 40 0 40L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ──────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Handpicked For You</p>
              <h2 className="section-heading">Featured Properties</h2>
              <p className="section-subheading max-w-lg">
                Curated selection of Hyderabad's most sought-after properties — each verified, RERA compliant, and ready for viewing.
              </p>
            </div>
            <Link href="/properties" className="hidden md:flex items-center gap-2 text-navy-700 font-semibold text-sm hover:text-navy-900 transition-colors">
              View All Properties
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProperties.map(property => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/properties" className="btn-primary">
              Explore All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="section bg-surface-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <p className="section-label">Why GS Associations</p>
            <h2 className="section-heading">Buying Property Should Be<br />Simple & Trustworthy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8 text-center group hover:border-navy-200 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy-50 group-hover:bg-navy-800 flex items-center justify-center mx-auto mb-5 transition-all duration-300 text-navy-700 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-surface-900 mb-3">{item.title}</h3>
                <p className="text-surface-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust signals */}
          <div className="mt-16 p-8 rounded-2xl bg-navy-800 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-7 h-7 text-gold-400" />
              </div>
              <div>
                <p className="font-display font-bold text-xl">RERA Registered Platform</p>
                <p className="text-white/60 text-sm">All properties RERA verified for your protection</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {['Bank Approved Projects', 'Zero Brokerage on Select', 'Legal Team On-Site', 'Price Match Guarantee'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOAN SECTION CTA ─────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-surface-900 to-navy-950 relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.5), transparent 60%)',
            }} />
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">Home Loan Advisory</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Get Home Loans at the<br />Best Available Rates
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg">
                  We partner with 15+ leading banks and HFCs to get you pre-approved at the lowest interest rates. PMAY subsidies, balance transfers, and NRI loans — all under one roof.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/loans" className="btn-gold">
                    Explore Loan Programs
                  </Link>
                  <Link href="/contact" className="btn-ghost text-white hover:bg-white/10">
                    Talk to an Expert →
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4 min-w-64">
                {[
                  { label: 'Interest Rate From', value: '8.35%' },
                  { label: 'Max Loan Amount', value: '₹10 Cr' },
                  { label: 'Processing Time', value: '24 Hrs' },
                  { label: 'Bank Partners', value: '15+' },
                ].map(item => (
                  <div key={item.label} className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                    <div className="text-2xl font-bold font-display text-white mb-1">{item.value}</div>
                    <div className="text-[11px] text-white/50">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG SECTION ─────────────────────────────────────────────────── */}
      <section className="section bg-surface-50">
        <div className="container-app">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Knowledge Hub</p>
              <h2 className="section-heading">Insights from Our Experts</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-navy-700 font-semibold text-sm hover:text-navy-900 transition-colors">
              All Articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${blog.slug}`} className="card card-hover block group overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="badge badge-navy text-[10px] mb-3">{blog.category}</span>
                    <h3 className="font-display font-semibold text-surface-900 text-base leading-snug mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-surface-500 line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-surface-400">
                      <span>{blog.author}</span>
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <p className="section-label">Client Stories</p>
            <h2 className="section-heading">Trusted by Thousands of Families</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-surface-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-surface-200" />
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{t.name}</p>
                    <p className="text-xs text-surface-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="section gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(245,158,11,0.6), transparent 60%)',
        }} />
        <div className="container-app relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">Get Started Today</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Your Dream Property<br />Is One Click Away
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
              Register for free and get access to complete property details, save favorites, and connect with our expert advisors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-gold text-base px-8 py-4">
                Register for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-ghost text-white hover:bg-white/10 border border-white/20 text-base px-8 py-4">
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
