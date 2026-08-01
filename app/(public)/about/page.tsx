'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Award, Users, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import InitialAvatar from '@/components/ui/InitialAvatar';

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
    name: 'Gopinath', role: 'Founder & Financial Advisor', bio: 'Gopinath founded GS Associates with a mission to make loan access simple and transparent. He personally guides every client through bank and NBFC options to get the best rate.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gopinath',
  },
  {
    name: 'Priya Nair', role: 'Home Loan Specialist', bio: 'Priya has helped 500+ families secure their first home loans. She specialises in PMAY subsidies, co-applicant structuring, and negotiating lower processing fees with banks.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyanair',
  },
  {
    name: 'Suresh Kumar', role: 'Business Loan Advisor', bio: 'Suresh specialises in unsecured business loans and OD facilities. His deep relationships with leading NBFCs mean faster sanctions for SMEs and self-employed clients.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sureshkumar',
  },
];

const milestones = [
  { year: '2012', event: 'GS Associates founded by Gopinath with a vision to simplify loan access for Chennai families' },
  { year: '2015', event: 'Partnered with 5 leading banks and NBFCs — expanded to business loans and OD facilities' },
  { year: '2018', event: 'Crossed 1,000 successful loan sanctions. Added Bridge Loan Financing to our product portfolio' },
  { year: '2020', event: 'Launched digital inquiry platform. Zero-paperwork process introduced for select lenders' },
  { year: '2022', event: 'Crossed 5,000+ loan sanctions. Expanded partnerships to 15+ banks and NBFCs across Chennai' },
  { year: '2024', event: 'GS Associates continues to deliver zero-fee advisory with the fastest approval times in Chennai' },
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
              Chennai's Most Trusted<br />Financial Advisor
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
              GS Associates connects families and businesses with the right lenders — quick processing, minimal paperwork, and expert guidance at every step.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-app -mt-12 md:-mt-16 relative z-20">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 md:py-8 mb-20">
          {[
            { value: 15, suffix: '+', label: 'Bank & NBFC Partners' },
            { value: 5000, suffix: '+', label: 'Loans Sanctioned' },
            { value: 12, suffix: '+', label: 'Years of Excellence' },
            { prefix: '₹', value: 0, label: 'Advisory Fees' },
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
              Making Loan Access Simple, Fast, and Stress-Free
            </h2>
            <p className="text-surface-600 leading-relaxed mb-5 text-sm">
              GS Associates was built on one principle: every client deserves honest, conflict-free financial advice. Gopinath personally guides each client through their options — no hidden fees, no pressure, just the best loan for their situation.
            </p>
            <p className="text-surface-600 leading-relaxed mb-6 text-sm">
              By working with multiple banks and NBFCs rather than just one, we ensure you always get a competitive rate, flexible terms, and a repayment plan that fits your income and lifestyle.
            </p>
            {['Zero advisory fees', 'Loans from all major banks & NBFCs', 'Minimal documentation', 'Fast approvals — avg. 72 hours', 'Personalized EMI planning'].map((item, i) => (
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
                alt="Gopinath - Founder & Financial Advisor"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[105%] w-auto object-contain object-bottom drop-shadow-2xl z-10"
              />

              {/* Sleek Minimalist Nameplate */}
              <div className="absolute -bottom-4 right-8 md:-right-4 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-surface-200 z-20 text-center">
                <p className="font-display font-bold text-navy-900 text-lg mb-0.5">Gopinath</p>
                <p className="text-gold-600 text-[10px] font-bold uppercase tracking-widest">Founder &amp; Financial Advisor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <p className="section-label">Our Journey</p>
            <h2 className="section-heading">Years of Building Trust</h2>
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
                <div className="flex justify-center mb-4">
                  <InitialAvatar name={member.name} size={80} />
                </div>
                <h3 className="font-display font-semibold text-surface-900 mb-0.5">{member.name}</h3>
                <p className="text-xs text-gold-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-surface-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-navy-800 p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-3">Ready to Get Your Loan Approved?</h2>
          <p className="text-white/70 mb-6">Speak directly with Gopinath — free consultation, no pressure, best rates guaranteed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-gold">Browse Properties <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/contact" className="btn-ghost text-white hover:bg-white/10 border border-white/20">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
