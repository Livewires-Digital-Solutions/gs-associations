'use client';

import Link from 'next/link';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Phone, Star } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

function EMICalculator() {
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

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-700">
          <Calculator className="w-5 h-5" />
        </div>
        <h3 className="font-display font-semibold text-lg text-surface-900">EMI Calculator</h3>
      </div>
      <div className="space-y-4 mb-6">
        <div>
          <label className="label mb-1.5 block">Loan Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={e => setPrincipal(e.target.value)}
            className="input"
            placeholder="50,00,000"
          />
        </div>
        <div>
          <label className="label mb-1.5 block">Interest Rate (% p.a.)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={e => setRate(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label mb-1.5 block">Tenure (Years)</label>
          <input
            type="range"
            min={5}
            max={30}
            value={tenure}
            onChange={e => setTenure(e.target.value)}
            className="w-full accent-navy-700"
          />
          <div className="flex justify-between text-xs text-surface-500 mt-1">
            <span>5 yrs</span>
            <span className="font-semibold text-navy-700">{tenure} yrs</span>
            <span>30 yrs</span>
          </div>
        </div>
      </div>
      <div className="bg-navy-800 rounded-xl p-5 text-white space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-sm">Monthly EMI</span>
          <span className="text-2xl font-display font-bold text-gold-400">
            ₹{Math.round(emi).toLocaleString()}
          </span>
        </div>
        <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">Principal Amount</span>
            <span>₹{parseFloat(principal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Total Interest</span>
            <span>₹{Math.round(totalInterest).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-white/80">Total Amount Payable</span>
            <span>₹{Math.round(totalAmount).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <Link href="/contact" className="btn-gold w-full mt-4">
        Talk to a Loan Expert
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function LoansPage() {
  const { loans } = useContentStore();
  const { addLead } = usePropertyStore();
  const { currentUser } = useAuthStore();
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
    }, 500);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="gradient-hero py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(245,158,11,0.5), transparent 60%)',
        }} />
        <div className="container-app relative z-10 text-center">
          <p className="section-label text-gold-400 mb-4">Home Loan Advisory</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Find the Perfect Home Loan
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We partner with 15+ leading banks to offer you the best rates, PMAY subsidies, and personalized loan guidance at no extra cost.
          </p>
        </div>
      </div>

      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loan Programs */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-surface-900 mb-2">
                Our Loan Programs
              </h2>
              <p className="text-surface-500 text-sm">
                {loans.length} loan programs from trusted banking partners
              </p>
            </div>

            {loans.map((loan, i) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card p-6 hover:border-navy-200 transition-all duration-200"
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
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

                <div className="mb-5">
                  <p className="text-xs font-semibold text-surface-600 uppercase tracking-wide mb-2">Eligibility</p>
                  <p className="text-sm text-surface-600">{loan.eligibility}</p>
                </div>

                <div className="mb-5">
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

                <div className="flex gap-3">
                  <Link href={`/loans/${loan.id}`} className="btn-primary text-sm">
                    Apply Now
                  </Link>
                  <Link href={`/loans/${loan.id}`} className="btn-secondary text-sm">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar: EMI Calc + Contact */}
          <div className="space-y-6">
            <EMICalculator />

            {/* Loan Inquiry Form */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-navy-600" />
                <h3 className="font-display font-semibold text-surface-900">Talk to a Loan Expert</h3>
              </div>
              <p className="text-xs text-surface-500 mb-4">Free advisory. No spam. Response within 2 hours.</p>

              {formSent ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <p className="font-semibold text-surface-900 text-sm">Request Received!</p>
                  <p className="text-xs text-surface-500 mt-1">Our expert will call you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <input type="text" placeholder="Your Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input text-sm" required />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input text-sm" required />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input text-sm" required />
                  <input type="number" placeholder="Loan Amount Required (₹)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="input text-sm" />
                  <select className="input text-sm" value={formData.loanType} onChange={e => setFormData({...formData, loanType: e.target.value})}>
                    <option value="">Select Loan Type</option>
                    {loans.map(l => (
                      <option key={l.id} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                  <button type="submit" className="btn-gold w-full text-sm">
                    Request Free Consultation
                  </button>
                </form>
              )}
            </div>

            {/* Why GS Loans */}
            <div className="card p-5 bg-navy-50 border-navy-100">
              <h4 className="font-semibold text-navy-900 mb-3 text-sm">Why Apply Through Us?</h4>
              {[
                'Compare 15+ lenders simultaneously',
                'Zero advisory fees',
                'Faster approval (72hr average)',
                'PMAY subsidy guidance',
                'Dedicated relationship manager',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-navy-800 mb-2">
                  <Star className="w-3 h-3 text-gold-500 fill-gold-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
