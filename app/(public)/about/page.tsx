'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Award, Users, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';

function JackpotDigit({ value, delay, start }: { value: string, delay: number, start: boolean }) {
  if (isNaN(Number(value))) return <span className="px-[1px]">{value}</span>;
  const num = parseInt(value, 10);
  const spins = 2;
  const spinArray = Array.from({ length: spins * 10 + num + 1 }, (_, i) => i % 10);
  const totalItems = spinArray.length;
  return (
    <div className="relative inline-flex flex-col overflow-hidden h-[1em] leading-none align-baseline tabular-nums w-[0.6em] justify-start">
      <motion.div
        initial={{ y: "0%" }}
        animate={start ? { y: `-${((totalItems - 1) / totalItems) * 100}%` } : { y: "0%" }}
        transition={{ duration: 2 + delay, ease: [0.22, 1, 0.36, 1] }}
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
      const timeout = setTimeout(() => setStart(true), delay * 1000);
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

const team = [
  {
    name: 'Rajesh Gupta', role: 'Founder & CEO', bio: 'With 20 years in Hyderabad real estate, Rajesh founded GS Associations with a mission to make property buying transparent and trustworthy.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
  },
  {
    name: 'Priya Nair', role: 'Head of Sales', bio: 'Priya has closed over ₹500 Crore in residential transactions and is renowned for her deep knowledge of Hyderabad\'s premium markets.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
  },
  {
    name: 'Suresh Reddy', role: 'Head of Investments', bio: 'Suresh specializes in commercial and investment properties. His data-driven approach has helped 300+ investors build profitable portfolios.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
  },
  {
    name: 'Ravi Shankar', role: 'Head of Operations', bio: 'Ravi ensures every client experience is seamless — from first enquiry to property registration. His process obsession sets GS apart.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
  },
  {
    name: 'Meena Krishnamurthy', role: 'Legal Head', bio: 'Meena leads our in-house legal team ensuring every property transaction is watertight. RERA compliance expert.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meena',
  },
  {
    name: 'Arun Sharma', role: 'Loan Advisory Head', bio: 'Arun\'s team has helped secure home loans for 5,000+ families at rates 0.5-1% below market average through bank partnerships.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arun',
  },
];

const milestones = [
  { year: '2012', event: 'GS Associations founded in Hyderabad with a team of 5 advisors' },
  { year: '2015', event: 'Expanded to 3 offices across Hyderabad. Crossed ₹100 Crore in transactions' },
  { year: '2018', event: 'Launched GS Loan Advisory — partnered with 10 leading banks' },
  { year: '2020', event: 'Digital transformation. First real estate portal in Hyderabad with live tracking' },
  { year: '2022', event: 'Crossed 1,000 successfully closed transactions. Team grew to 80+ professionals' },
  { year: '2024', event: 'Launched GS Associations 2.0 — AI-powered property matching and lead tracking' },
];

export default function AboutPage() {
  return (
    <div className="bg-surface-50 min-h-screen pb-20">
      {/* 75vh Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="GS Associations Team Collaborating" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-50 via-surface-50/10 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="container-app relative z-10 text-center -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-gold-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
              Hyderabad's Most Trusted<br />Real Estate Partner
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
              Since 2012, GS Associations has helped over 15,000 families and investors navigate Hyderabad's dynamic property market with honesty, data, and expertise.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-app -mt-12 md:-mt-16 relative z-20">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 md:py-8 mb-20">
          {[
            { value: 1200, suffix: '+', label: 'Properties Sold' },
            { value: 15000, suffix: '+', label: 'Happy Families' },
            { value: 2400, prefix: '₹', suffix: ' Cr', label: 'Worth Transacted' },
            { value: 12, suffix: '+', label: 'Years of Excellence' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-navy-800 mb-2 tabular-nums">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} delay={i * 0.1} />
              </div>
              <div className="text-sm md:text-base text-surface-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="section-label mb-3">Our Mission</p>
            <h2 className="font-display text-3xl font-bold text-surface-900 mb-5">
              Making Real Estate Buying Honest, Simple, and Rewarding
            </h2>
            <p className="text-surface-600 leading-relaxed mb-5 text-sm">
              In a market often plagued by opacity, GS Associations was built on a radical idea: what if real estate advisors truly worked for buyers, not just commissions? That principle drives everything we do.
            </p>
            <p className="text-surface-600 leading-relaxed mb-6 text-sm">
              We invest in technology, training, and data to ensure every client gets accurate information, fair pricing, and a partner who's with them long after the keys are handed over.
            </p>
            {['RERA compliance expertise', 'In-house legal verification', 'Zero hidden charges', 'Lifetime advisory support', 'Bank-approved properties only'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-surface-700 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="relative mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-[400px] md:h-[450px]">
              {/* Soft background pedestal - Light blue uneven rectangle with subtle blobs */}
              <div 
                className="absolute bottom-0 inset-x-4 md:inset-x-0 h-[75%] bg-navy-900 overflow-hidden -z-10 border border-navy-800 shadow-2xl"
                style={{ borderRadius: '40px 80px 30px 60px' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/50 rounded-full blur-3xl mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/40 rounded-full blur-3xl mix-blend-screen"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl mix-blend-screen"></div>
              </div>
              
              <img
                src="/assets/ceo.png"
                alt="Rajesh Gupta - Founder & CEO"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[105%] w-auto object-contain object-bottom drop-shadow-2xl z-10"
              />

              {/* Sleek Minimalist Nameplate */}
              <div className="absolute -bottom-4 right-8 md:-right-4 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-surface-200 z-20 text-center">
                <p className="font-display font-bold text-navy-900 text-lg mb-0.5">Rajesh Gupta</p>
                <p className="text-gold-600 text-[10px] font-bold uppercase tracking-widest">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <p className="section-label">Our Journey</p>
            <h2 className="section-heading">12 Years of Building Trust</h2>
          </div>
          <div className="max-w-4xl mx-auto relative px-4 sm:px-6">
            {/* Main vertical line */}
            <div className="absolute left-8 md:left-1/2 top-2 bottom-2 w-px bg-surface-200 transform md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block w-5/12" />
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 top-2 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-surface-300 group-hover:bg-gold-500 transition-colors duration-300 ring-4 ring-surface-50" />
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full pl-16 md:pl-0 md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-2">
                      {m.year}
                    </h3>
                    <p className="text-surface-600 leading-relaxed text-base md:text-lg">
                      {m.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="section-label">Our Team</p>
            <h2 className="section-heading">Meet the Experts Behind GS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center group hover:border-navy-200"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full bg-surface-200 mx-auto mb-4"
                />
                <h3 className="font-display font-semibold text-surface-900 mb-0.5">{member.name}</h3>
                <p className="text-xs text-gold-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-surface-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-navy-800 p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-3">Ready to Work with Hyderabad's Best?</h2>
          <p className="text-white/70 mb-6">Join 15,000+ families who've found their dream property with GS Associations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-gold">Browse Properties <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/contact" className="btn-ghost text-white hover:bg-white/10 border border-white/20">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
