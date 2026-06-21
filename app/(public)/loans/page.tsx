'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Calculator, CheckCircle2, Phone, Star, X } from 'lucide-react';

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
import { useContentStore } from '@/stores/contentStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export default function LoansPage() {
  const { loans } = useContentStore();
  const { addLead } = usePropertyStore();
  const { currentUser } = useAuthStore();
  
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

  // EMI State
  const [principal, setPrincipal] = useState('5000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');

  const emi = (() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) / 100) / 12;
    const n = parseFloat(tenure) * 12;
    if (r === 0) return p / n;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  })();

  const totalAmount = emi * parseFloat(tenure) * 12;
  const totalInterest = totalAmount - parseFloat(principal);

  // Expert Form State
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    amount: '',
    loanType: ''
  });

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    
    addLead({
      userId: currentUser?.id || '',
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      propertyId: formData.loanType,
      propertyTitle: formData.loanType || 'General Loan Inquiry',
      propertyLocation: 'GS Loans',
      timestamp: new Date().toISOString(),
      status: 'New',
      notes: `Requested Amount: ₹${formData.amount}`,
      source: 'Loan Inquiry',
    });

    setTimeout(() => {
      setFormSent(true);
      toast.success('Loan inquiry submitted! Our expert will call you within 2 hours.');
      // Auto close after success
      setTimeout(() => {
        setIsExpertModalOpen(false);
        setFormSent(false); // reset
      }, 3000);
    }, 500);
  };

  return (
    <div className="bg-surface-50 min-h-screen pb-32">
      {/* 75vh Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Real Estate Loan and Finance" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/60 mix-blend-multiply" />
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
              Loan & Financial Services
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Comprehensive Loan Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              From home loans to working capital — we partner with 15+ leading banks to get you the best rates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Home-Page Style Stats Section (Light Theme) */}
      <section className="relative z-20 -mt-8 md:-mt-12 mb-16">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 md:py-8">
            {[
              { value: 15, suffix: '+', label: 'Lenders Compared' },
              { value: 0, prefix: '₹', label: 'Advisory Fees' },
              { value: 72, suffix: 'hr', label: 'Avg. Approval' },
              { value: 100, suffix: '%', label: 'Doorstep Service' }
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
        </div>
      </section>

      <div className="container-app">
        <div className="mb-12 flex flex-col items-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-2 text-center">
            Our Loan Products
          </h2>
          <p className="text-surface-500 text-center">
            {loans.length} loan products across home, business, and financial services
          </p>
        </div>

        {/* Loan Programs Grid - Expanded to full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {loans.map((loan, i) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-6 hover:border-navy-200 transition-all duration-200 h-full flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-navy-800">
                      {loan.bankName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-surface-900">{loan.name}</h3>
                    <p className="text-xs text-surface-500">{loan.bankName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {loan.popular && <span className="badge badge-gold text-xs">Most Popular</span>}
                  <span className="badge badge-navy text-xs">{loan.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Interest Rate', value: loan.interestRate },
                  { label: 'Max Amount', value: loan.maxAmount },
                  { label: 'Max Tenure', value: loan.tenure },
                  { label: 'Processing Fee', value: loan.processingFee },
                ].map(item => (
                  <div key={item.label} className="bg-surface-50 rounded-xl p-3">
                    <p className="text-[10px] text-surface-400 uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-surface-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-5 flex-1">
                <p className="text-xs font-semibold text-surface-600 uppercase tracking-wide mb-2">Eligibility</p>
                <p className="text-sm text-surface-600 mb-4">{loan.eligibility}</p>
                
                <p className="text-xs font-semibold text-surface-600 uppercase tracking-wide mb-2">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {loan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-surface-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-surface-100">
                <Link href={`/loans/${loan.id}`} className="btn-primary text-sm flex-1 text-center justify-center">
                  Apply Now
                </Link>
                <Link href={`/loans/${loan.id}`} className="btn-secondary text-sm flex-1 text-center justify-center">
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button 
          onClick={() => setIsEmiModalOpen(true)}
          className="bg-navy-800 hover:bg-navy-900 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform hover:scale-105 group relative"
        >
          <Calculator className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-navy-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Calculate EMI
          </span>
        </button>

        <button 
          onClick={() => setIsExpertModalOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-full p-4 shadow-lg flex items-center justify-center transition-transform hover:scale-105 group relative"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-gold-500 text-navy-900 font-semibold text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
            Talk to Expert
          </span>
        </button>
      </div>

      {/* EMI Calculator Modal */}
      <AnimatePresence>
        {isEmiModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsEmiModalOpen(false)}
              className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-50 bg-white md:rounded-2xl rounded-t-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-700">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-surface-900">EMI Calculator</h3>
                  </div>
                  <button onClick={() => setIsEmiModalOpen(false)} className="p-2 hover:bg-surface-100 rounded-full text-surface-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="label mb-1.5 block">Loan Amount (₹)</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="input" placeholder="50,00,000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label mb-1.5 block">Interest Rate (% p.a.)</label>
                      <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className="input" />
                    </div>
                    <div>
                      <label className="label mb-1.5 block">Tenure (Years)</label>
                      <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="input" />
                    </div>
                  </div>
                </div>

                <div className="bg-navy-800 rounded-xl p-5 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/70 text-sm">Monthly EMI</span>
                    <span className="text-3xl font-display font-bold text-gold-400">
                      ₹{Math.round(emi).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Principal</span>
                      <span>₹{parseFloat(principal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Interest</span>
                      <span>₹{Math.round(totalInterest).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsEmiModalOpen(false);
                      setTimeout(() => setIsExpertModalOpen(true), 300);
                    }} 
                    className="btn-gold w-full mt-6 text-sm py-2.5"
                  >
                    Discuss this EMI with an Expert
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Expert Inquiry Modal */}
      <AnimatePresence>
        {isExpertModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsExpertModalOpen(false)}
              className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-50 bg-white md:rounded-2xl rounded-t-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-surface-900">Talk to an Expert</h3>
                  </div>
                  <button onClick={() => setIsExpertModalOpen(false)} className="p-2 hover:bg-surface-100 rounded-full text-surface-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-surface-500 mb-6 pl-14">Free advisory. No spam. Response within 2 hours.</p>

                {formSent ? (
                  <div className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mb-4">
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                    </motion.div>
                    <p className="font-semibold text-surface-900 text-lg">Request Received!</p>
                    <p className="text-sm text-surface-500 mt-2">Our expert will call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquiry} className="space-y-4">
                    <input type="text" placeholder="Your Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" required />
                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input" required />
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input" required />
                    <input type="number" placeholder="Loan Amount Required (₹)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="input" />
                    <select className="input" value={formData.loanType} onChange={e => setFormData({...formData, loanType: e.target.value})}>
                      <option value="">Select Loan Type</option>
                      {loans.map(l => (
                        <option key={l.id} value={l.name}>{l.name}</option>
                      ))}
                    </select>
                    <button type="submit" className="btn-gold w-full py-3 mt-2">
                      Request Free Consultation
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
