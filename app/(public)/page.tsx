'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Search, ArrowRight, MapPin, Shield, TrendingUp, Award,
  ChevronRight, Star, Building2, Users, CheckCircle2, Sparkles,
  Wallet, Landmark, Home, Briefcase
} from 'lucide-react';
import { usePropertyStore } from '@/stores/propertyStore';
import { useContentStore } from '@/stores/contentStore';
import PropertyCard from '@/components/property/PropertyCard';

// Theme Config Variables
const blogSectionBg = "bg-blue-50";

function JackpotDigit({ value, delay, start }: { value: string, delay: number, start: boolean }) {
  if (isNaN(Number(value))) {
    return <span className="px-[1px]">{value}</span>;
  }

  const num = parseInt(value, 10);
  const spins = 2; // Number of full 0-9 rotations before stopping
  const spinArray = Array.from({ length: spins * 10 + num + 1 }, (_, i) => i % 10);
  const totalItems = spinArray.length;

  return (
    <div className="relative inline-flex flex-col overflow-hidden h-[1em] leading-none align-baseline tabular-nums w-[0.6em] justify-start">
      <motion.div
        initial={{ y: "0%" }}
        animate={start ? { y: `-${((totalItems - 1) / totalItems) * 100}%` } : { y: "0%" }}
        transition={{
          duration: 2 + delay,
          ease: [0.22, 1, 0.36, 1], // Very snappy ease-out
        }}
        className="flex flex-col"
      >
        {spinArray.map((n, i) => (
          <span key={i} className="h-[1em] leading-none flex justify-center items-center">{n}</span>
        ))}
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ value, prefix = '', suffix = '', delay = 0 }: { value: number, prefix?: string, suffix?: string, delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setStart(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, delay]);

  const valueStr = value.toLocaleString('en-IN');
  const digits = valueStr.split('');

  return (
    <span ref={ref} className="inline-flex items-center tabular-nums leading-none">
      {prefix && <span className="mr-[2px]">{prefix}</span>}
      <span className="inline-flex">
        {digits.map((d, i) => (
          <JackpotDigit key={i} value={d} delay={i * 0.15} start={start} />
        ))}
      </span>
      {suffix && <span className="ml-[2px]">{suffix}</span>}
    </span>
  );
}

const stats = [
  { value: 1200, suffix: '+', label: 'Properties Sold' },
  { value: 15000, suffix: '+', label: 'Happy Families' },
  { value: 12, suffix: '+', label: 'Years of Trust' },
  { prefix: '₹', value: 2400, suffix: ' Cr', label: 'Worth Transacted' },
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

function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      <div className="relative h-[350px] w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden">
        {testimonials.map((t, i) => {
          const isCenter = i === activeIndex;
          const isLeft = i === (activeIndex - 1 + testimonials.length) % testimonials.length;
          const isRight = i === (activeIndex + 1) % testimonials.length;

          let x = '0%';
          if (isLeft) x = '-65%';
          if (isRight) x = '65%';

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                x,
                scale: isCenter ? 1 : 0.85,
                opacity: isCenter ? 1 : 0.4,
                zIndex: isCenter ? 30 : 10,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`absolute w-[90%] max-w-[400px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-surface-200 flex flex-col cursor-pointer transition-colors ${!isCenter ? 'hover:bg-surface-50' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-surface-700 text-base md:text-lg leading-relaxed mb-8 italic flex-1">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-surface-200" />
                <div>
                  <p className="font-bold text-surface-900">{t.name}</p>
                  <p className="text-sm text-surface-500 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Carousel Indicators */}
      <div className="flex items-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex 
                ? 'w-8 h-2.5 bg-gold-400' 
                : 'w-2.5 h-2.5 bg-surface-300 hover:bg-surface-400'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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
      <section className="relative min-h-screen flex items-center bg-[url('/assets/bg-image.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
        {/* Dark Fade from Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/60 to-transparent" />

        <div className="container-app w-full relative z-10 pt-32 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl text-left"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <div className="w-2 h-2 rounded-full bg-theme-tertiary animate-pulse" />
                <span className="text-white text-xs font-medium tracking-wide uppercase">
                  Premium Real Estate & Advisory
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 drop-shadow-md"
            >
              Properties &
              <span className="block text-theme-tertiary">Financial Solutions</span>
              Under One Roof
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl drop-shadow"
            >
              Browse 500+ verified properties and explore tailored loan solutions — home loans, business loans, and more.
              Expert guidance for every step of your property and financial journey.
            </motion.p>

            {/* Simple Glassmorphic Search */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSearch}
              className="relative max-w-2xl mb-8"
            >
              <div className="flex items-center w-full h-14 md:h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg overflow-hidden pr-2 pl-6 transition-all hover:bg-white/15">
                <Search className="w-5 h-5 text-white/70 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search location, property, or type..."
                  className="flex-1 h-full bg-transparent text-white placeholder:text-white/60 focus:outline-none text-base font-medium"
                />
                <button type="submit" className="h-10 md:h-12 px-6 bg-white/20 hover:bg-white/30 border border-white/20 text-white text-sm font-semibold rounded-full transition-all flex items-center gap-2 flex-shrink-0">
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
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


        </div>

        {/* Blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
      </section>

      {/* ─── STATS SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-navy-950 relative z-20">
        <div className="container-app">
          {/* Top Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gold-400 mb-2 tabular-nums">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} delay={i * 0.1} />
                </div>
                <div className="text-sm md:text-base text-white/80 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* ─── OUR SERVICES ──────────────────────────────────────────────────── */}
      <section className="section bg-navy-950 relative overflow-visible z-20">
        {/* Soft Offset Glows Bleeding Upwards */}
        <div className="absolute -left-[10%] top-[-10%] w-[500px] h-[500px] bg-theme-primary/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />
        <div className="absolute -right-[10%] top-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />
        <div className="container-app relative z-10">
          <div className="text-center mb-12 relative">

            <div className="relative z-10">
              <p className="section-label text-theme-tertiary">What We Offer</p>
              <h2 className="section-heading text-white">Two Powerful Services,<br />One Trusted Partner</h2>
              <p className="section-subheading max-w-2xl mx-auto text-white/80">
                GS Associations brings together premium property services and comprehensive financial solutions to help you achieve your goals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Property Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-surface-200 flex flex-col group hover:-translate-y-1"
            >
              {/* Massive Asset on Same BG */}
              <div className="w-full h-64 sm:h-72 mb-2 relative flex items-center justify-center">
                <img 
                  src="/assets/property_service.png" 
                  alt="Property Services" 
                  className="w-full h-full object-contain mix-blend-darken opacity-95 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <div className="flex flex-col flex-1 items-start text-left w-full">
                <h3 className="font-display font-bold text-2xl text-navy-950 mb-3">Property Advisory</h3>
                <p className="text-surface-600 text-sm leading-relaxed font-medium mb-6">
                  Explore premium property listings across Hyderabad with our expert advisory and zero-hassle buying support. We handle the complexity.
                </p>
                
                {/* Tightly Packed Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-10 w-full">
                  {['500+ Verified Properties', 'RERA Compliant', 'End-to-End Advisory', 'Dedicated Manager'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-navy-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-theme-primary shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/properties" className="mt-auto inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-navy-950 text-white text-sm font-bold hover:bg-theme-primary transition-all shadow-md group/btn">
                  Explore Properties
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Loan Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-surface-200 flex flex-col group hover:-translate-y-1"
            >
              {/* Massive Asset on Same BG */}
              <div className="w-full h-64 sm:h-72 mb-2 relative flex items-center justify-center">
                <img 
                  src="/assets/loan_service.png" 
                  alt="Loan Services" 
                  className="w-full h-full object-contain mix-blend-darken opacity-95 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <div className="flex flex-col flex-1 items-start text-left w-full">
                <h3 className="font-display font-bold text-2xl text-navy-950 mb-3">Financial Solutions</h3>
                <p className="text-surface-600 text-sm leading-relaxed font-medium mb-6">
                  Compare rates from 15+ leading banking partners. We secure the best financing tailored to your needs with absolute transparency.
                </p>
                
                {/* Tightly Packed Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-10 w-full">
                  {['Home & LAP Loans', '15+ Bank Partners', 'Lowest Rates', 'Zero Cost Consult'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-navy-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/loans" className="mt-auto inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-gold-400 text-navy-950 text-sm font-bold hover:bg-gold-300 transition-all shadow-md group/btn">
                  Explore Loan Options
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ──────────────────────────────────────────── */}
      <section className="section bg-navy-50">
        <div className="container-app">
          <div className="text-center mb-12 flex flex-col items-center">
            <p className="section-label text-gold-600">Handpicked For You</p>
            <h2 className="section-heading text-surface-900">Featured Properties</h2>
            <p className="section-subheading text-surface-500 max-w-lg mx-auto">
              Curated selection of Hyderabad's most sought-after properties — each verified, RERA compliant, and ready for viewing.
            </p>
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

          <div className="text-center mt-12">
            <Link href="/properties" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-navy-950 text-white text-sm font-bold hover:bg-navy-800 transition-all shadow-lg group/btn hover:-translate-y-0.5">
              Explore All Properties
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="section bg-white py-24">
        <div className="container-app">
          <div className="text-center mb-16">
            <p className="section-label">Why GS Associations</p>
            <h2 className="section-heading">Buying Property Should Be<br />Simple & Trustworthy</h2>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            
            {/* The Joined Puzzle Cards */}
            <div className="flex flex-col md:flex-row gap-0 drop-shadow-2xl">
              
              {/* Puzzle Piece 1 - Left */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-1 relative bg-navy-800 text-white p-10 lg:p-12 md:rounded-l-[2.5rem] rounded-t-[2.5rem] md:rounded-tr-none flex flex-col items-center text-center z-30"
              >
                {/* Desktop Tab (Right) */}
                <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-navy-800 rounded-full" />
                {/* Mobile Tab (Bottom) */}
                <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-navy-800 rounded-full" />
                
                <div className="w-20 h-20 bg-navy-900 rounded-2xl flex items-center justify-center text-gold-400 mb-8 hover:scale-110 transition-all duration-500 shadow-sm">
                  {whyUs[0].icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{whyUs[0].title}</h3>
                <p className="text-white/80 leading-relaxed text-lg">{whyUs[0].desc}</p>
              </motion.div>

              {/* Puzzle Piece 2 - Middle */}
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, type: 'spring', bounce: 0.3 }}
                className="flex-1 relative bg-navy-600 text-white p-10 lg:p-12 flex flex-col items-center text-center z-20"
              >
                {/* Desktop Tab (Right) */}
                <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-navy-600 rounded-full" />
                {/* Mobile Tab (Bottom) */}
                <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-navy-600 rounded-full" />

                <div className="w-20 h-20 bg-navy-700 rounded-2xl flex items-center justify-center text-gold-400 mb-8 hover:scale-110 transition-all duration-500 shadow-sm">
                  {whyUs[1].icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{whyUs[1].title}</h3>
                <p className="text-white/80 leading-relaxed text-lg">{whyUs[1].desc}</p>
              </motion.div>

              {/* Puzzle Piece 3 - Right */}
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring', bounce: 0.3 }}
                className="flex-1 relative bg-navy-400 text-white p-10 lg:p-12 md:rounded-r-[2.5rem] rounded-b-[2.5rem] md:rounded-bl-none flex flex-col items-center text-center z-10"
              >
                <div className="w-20 h-20 bg-navy-500 rounded-2xl flex items-center justify-center text-gold-400 mb-8 hover:scale-110 transition-all duration-500 shadow-sm">
                  {whyUs[2].icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{whyUs[2].title}</h3>
                <p className="text-white/80 leading-relaxed text-lg">{whyUs[2].desc}</p>
              </motion.div>
            </div>

            {/* Trust Signals Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 p-6 md:p-8 rounded-[2rem] border border-blue-100 flex flex-wrap gap-6 md:gap-10 justify-center items-center shadow-sm"
            >
              {['Bank Approved Projects', 'Zero Brokerage on Select', 'Legal Team On-Site', 'Price Match Guarantee'].map(t => (
                <div key={t} className="flex items-center gap-3 text-sm md:text-base text-navy-950 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── LOAN SECTION CTA ─────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-navy-950 to-navy-800 relative shadow-2xl">
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">Loan & Financial Services</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Loans for Every Need —<br />Best Rates Guaranteed
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg">
                  Home loans, business loans, loan against property, secured overdraft, and working capital. We partner with 15+ leading banks to get you pre-approved at the lowest rates.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/loans" className="btn-gold">
                    Explore All Loan Products
                  </Link>
                  <Link href="/contact" className="btn-ghost text-white hover:bg-white/10">
                    Talk to an Expert →
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-6 min-w-64">
                {[
                  { label: 'Interest Rate From', value: '8.35%' },
                  { label: 'Max Loan Amount', value: '₹25 Cr' },
                  { label: 'Loan Products', value: '14+' },
                  { label: 'Bank Partners', value: '15+' },
                ].map(item => (
                  <div key={item.label} className="flex flex-col">
                    <div className="text-3xl md:text-4xl font-bold font-display text-gold-400 mb-1">{item.value}</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG SECTION ─────────────────────────────────────────────────── */}
      <section className={`section ${blogSectionBg}`}>
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
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="section bg-gradient-to-r from-navy-950 to-navy-800 relative overflow-hidden">
        
        {/* Background Buildings */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0 opacity-30 mix-blend-screen">
          <img 
            src="/assets/buildings.png" 
            alt="" 
            className="w-full h-auto max-h-[400px] object-cover object-bottom"
          />
        </div>

        <div className="container-app relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">Get Started Today</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
                Your Property & Loan<br />Journey Starts Here
              </h2>
              <p className="text-white/60 text-lg mb-0 max-w-lg mx-auto md:mx-0">
                Register for free to access complete property details, explore loan options, save favorites, and connect with our expert advisors.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
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
