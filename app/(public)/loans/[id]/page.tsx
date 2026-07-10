'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  CheckCircle2, ChevronRight, FileText, ArrowRight, Phone,
  Percent, Clock, ShieldCheck, FileSignature, Wallet
} from 'lucide-react';
import { getLoanProgram } from '@/lib/db/loans';
import { createLead } from '@/lib/db/leads';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import type { LoanProgram } from '@/data/mockData';

export default function LoanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const [loan, setLoan] = useState<LoanProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoanProgram(id).then(l => { setLoan(l); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);
  
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    amount: '',
  });

  if (loading) return <div className="pt-32 text-center"><div className="w-12 h-12 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto" /></div>;

  if (!loan) {
    return (
      <div className="pt-32 pb-20 text-center container-app">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">Loan Program Not Found</h2>
        <Link href="/loans" className="btn-primary">Browse All Loans</Link>
      </div>
    );
  }

  // Fallbacks for data if not provided in mockData
  const overview = loan.overview || `The ${loan.name} from ${loan.bankName} is designed to help you achieve your financial goals with ease. Offering competitive interest rates starting from ${loan.interestRate} and flexible repayment options up to ${loan.tenure}, this product ensures that funding is never a hurdle.`;
  
  const benefits = loan.benefits || [
    'Quick approval and disbursal process',
    'Transparent processing with no hidden charges',
    'Customized repayment options tailored to your income',
    'High loan-to-value ratio for maximum funding',
    'Dedicated relationship manager for personalized service'
  ];

  const documents = loan.documents || [
    'Completed Application Form with Passport Size Photographs',
    'Identity Proof (PAN Card, Aadhaar Card, Passport)',
    'Address Proof (Aadhaar Card, Utility Bill, Rent Agreement)',
    'Income Proof (Last 3-6 months Salary Slips or IT Returns)',
    'Bank Statements for the last 6 months',
    'Property Documents (if applicable)'
  ];

  const process = loan.process || [
    { title: 'Application', desc: 'Submit your application form along with the required documents.' },
    { title: 'Verification', desc: 'Our team will verify your documents and assess your eligibility.' },
    { title: 'Sanction', desc: 'Upon successful verification, your loan will be sanctioned and an offer letter will be provided.' },
    { title: 'Disbursal', desc: 'Once you accept the offer and complete any final formalities, the loan amount will be disbursed.' }
  ];

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead({
        userId: currentUser?.id || '',
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        propertyId: '',
        propertyTitle: loan.name,
        propertyLocation: loan.bankName,
        status: 'New',
        notes: `Requested Amount: ₹${formData.amount}`,
        source: 'Loan Inquiry',
      });
      setFormSent(true);
      toast.success('Loan inquiry submitted! Our expert will call you within 2 hours.');
    } catch {
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-surface-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="container-app mb-6">
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Link href="/" className="hover:text-surface-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/loans" className="hover:text-surface-900 transition-colors">Loans</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-surface-900 font-medium truncate max-w-xs">{loan.name}</span>
        </div>
      </div>

      <div className="container-app">
        {/* Header Section */}
        <div className="card p-8 mb-8 bg-white border-none shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Wallet className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="badge badge-navy">{loan.type}</span>
                {loan.popular && <span className="badge badge-gold">Most Popular</span>}
                <span className="text-sm font-medium text-surface-500">{loan.bankName}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-2">{loan.name}</h1>
              <p className="text-surface-600 max-w-2xl">{overview}</p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-navy-50 rounded-2xl p-5 border border-navy-100 text-center min-w-[200px]">
                <p className="text-xs text-navy-600 font-semibold uppercase tracking-wider mb-1">Interest Rate</p>
                <p className="text-2xl font-bold text-navy-900">{loan.interestRate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card p-4 text-center">
                <Percent className="w-5 h-5 text-gold-500 mx-auto mb-2" />
                <p className="text-[10px] text-surface-400 uppercase tracking-wide">Interest Rate</p>
                <p className="text-sm font-semibold text-surface-900 mt-1">{loan.interestRate}</p>
              </div>
              <div className="card p-4 text-center">
                <Wallet className="w-5 h-5 text-gold-500 mx-auto mb-2" />
                <p className="text-[10px] text-surface-400 uppercase tracking-wide">Max Amount</p>
                <p className="text-sm font-semibold text-surface-900 mt-1">{loan.maxAmount}</p>
              </div>
              <div className="card p-4 text-center">
                <Clock className="w-5 h-5 text-gold-500 mx-auto mb-2" />
                <p className="text-[10px] text-surface-400 uppercase tracking-wide">Max Tenure</p>
                <p className="text-sm font-semibold text-surface-900 mt-1">{loan.tenure}</p>
              </div>
              <div className="card p-4 text-center">
                <FileSignature className="w-5 h-5 text-gold-500 mx-auto mb-2" />
                <p className="text-[10px] text-surface-400 uppercase tracking-wide">Processing Fee</p>
                <p className="text-sm font-semibold text-surface-900 mt-1">{loan.processingFee}</p>
              </div>
            </div>

            {/* Eligibility & Features */}
            <div className="card p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-navy-600" />
                Eligibility & Key Features
              </h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-3">Eligibility Criteria</h3>
                <p className="text-surface-600 text-sm leading-relaxed bg-surface-50 p-4 rounded-xl">
                  {loan.eligibility}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {loan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-surface-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits & Documents */}
            <div className="card p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-navy-600" />
                Documentation & Benefits
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">Required Documents</h3>
                  <ul className="space-y-3">
                    {documents.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-surface-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-navy-400 mt-1.5 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">Loan Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-surface-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="card p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-surface-900 mb-6">Application Process</h2>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-px bg-surface-200" />
                <div className="space-y-6">
                  {process.map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-2.5 -ml-1 w-3 h-3 rounded-full bg-navy-600 border-4 border-white" />
                      <h3 className="font-semibold text-surface-900 mb-1">{i + 1}. {step.title}</h3>
                      <p className="text-sm text-surface-600">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 sticky top-28 border-navy-100 shadow-md">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-surface-100">
                <Phone className="w-5 h-5 text-navy-600" />
                <h3 className="font-display font-semibold text-lg text-surface-900">Enquire Now</h3>
              </div>
              
              <p className="text-sm text-surface-600 mb-5">
                Interested in the <strong className="text-navy-900">{loan.name}</strong>? Fill out the form below and our loan expert will contact you shortly.
              </p>

              {formSent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="font-semibold text-surface-900">Request Received!</p>
                  <p className="text-sm text-surface-500 mt-1">Our expert will call you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div>
                    <label className="label text-xs mb-1.5 block">Full Name *</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input text-sm bg-surface-50" required />
                  </div>
                  <div>
                    <label className="label text-xs mb-1.5 block">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input text-sm bg-surface-50" required />
                  </div>
                  <div>
                    <label className="label text-xs mb-1.5 block">Email Address *</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input text-sm bg-surface-50" required />
                  </div>
                  <div>
                    <label className="label text-xs mb-1.5 block">Loan Amount Needed (₹)</label>
                    <input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="e.g. 5000000" className="input text-sm bg-surface-50" />
                  </div>
                  <button type="submit" className="btn-primary w-full mt-2">
                    Submit Enquiry
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </form>
              )}
            </div>
            
            <div className="card p-5 bg-gold-50 border-gold-100 text-center">
              <h4 className="font-semibold text-gold-900 mb-2 text-sm">Need immediate assistance?</h4>
              <p className="text-xs text-gold-800 mb-4">Our loan advisors are available Monday to Saturday, 9 AM to 7 PM.</p>
              <a href="tel:+914066667777" className="btn-gold w-full text-sm">Call +91 40 6666 7777</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
