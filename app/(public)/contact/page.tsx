'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { createLead } from '@/lib/db/leads';
import PhoneInput from '@/components/ui/PhoneInput';

const contactInfo = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Office Address', value: 'No. 42, Anna Salai,\nGuindy, Chennai — 600032' },
  { icon: <Phone className="w-5 h-5" />, label: 'Phone — Gopinath', value: '+91 90031 67674' },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'gopi.thamba@gmail.com' },
  { icon: <Clock className="w-5 h-5" />, label: 'Working Hours', value: 'Monday – Saturday: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 4:00 PM (by appointment)' },
];

const inquiryTypes = [
  'Property Purchase Inquiry',
  'Property Investment Consultation',
  'Home Loan Advisory',
  'Schedule a Site Visit',
  'Legal Assistance',
  'NRI Property Services',
  'General Inquiry',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' });
  const [phoneValid, setPhoneValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim().length < 2) {
      toast.error('Please enter your full name (letters only)');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!phoneValid) {
      toast.error('Please enter a valid phone number for the selected country');
      return;
    }
    setLoading(true);
    try {
      await createLead({
        userId: '',
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        propertyId: '',
        propertyTitle: formData.type || 'General Inquiry',
        propertyLocation: 'Contact Form',
        status: 'New',
        notes: formData.message,
        source: 'Contact Form',
      });
      setSubmitted(true);
      toast.success('Message sent! Our team will get back to you within 24 hours.');
    } catch (e) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/premium_contact_bg.png" 
            alt="Office Contact" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-50 via-surface-50/10 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="container-app relative z-10 text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-gold-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              Contact Us
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
              Let's Start a Conversation
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
              Whether you're buying your first home or expanding your portfolio, our experts are ready to guide you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-app -mt-16 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-navy-900/5 border border-surface-100"
            >
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-3">Get in Touch</h2>
              <p className="text-surface-500 text-sm leading-relaxed mb-10">
                Reach out to our team of expert advisors. We typically respond within 2 business hours during working days.
              </p>

              <div className="space-y-8">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-surface-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-50 group-hover:scale-110 transition-all duration-300 shadow-sm border border-surface-100 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-1.5">{item.label}</p>
                      <p className="text-sm text-navy-800 font-medium whitespace-pre-line leading-relaxed">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interactive Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl overflow-hidden h-72 bg-surface-100 border border-surface-200 relative shadow-xl group"
            >
              <iframe 
                src="https://maps.google.com/maps?q=Guindy,+Chennai,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-navy-900/10 border border-surface-100 relative overflow-hidden h-full">
              {/* Decorative blob */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 relative z-10"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-navy-900 mb-3">Message Received!</h3>
                  <p className="text-surface-600 mb-2 text-lg">Thank you for reaching out, <span className="font-semibold text-navy-800">{formData.name}</span>.</p>
                  <p className="text-surface-500 text-sm mb-10">Our team will get back to you at {formData.email} within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', type: '', message: '' }); }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-800 shadow-inner">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-3xl text-navy-900">Send a Message</h2>
                      <p className="text-sm text-surface-500 mt-1">We typically reply within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 block">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value.replace(/[^a-zA-Z\s'.\-]/g, '') }))}
                          placeholder="Arjun Mehta"
                          className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 block">Phone Number *</label>
                        <PhoneInput
                          value={formData.phone}
                          onChange={(val, valid) => {
                            setFormData(p => ({ ...p, phone: val }));
                            setPhoneValid(valid);
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 block">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="arjun@example.com"
                        className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 block">Inquiry Type</label>
                      <select
                        value={formData.type}
                        onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                        className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all outline-none appearance-none cursor-pointer"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                      >
                        <option value="">Select inquiry type...</option>
                        {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 block">Message *</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell us about what you're looking for..."
                        className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all outline-none h-32 resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full py-4 text-sm tracking-wide shadow-lg shadow-gold-500/20 mt-4"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending Message...
                        </span>
                      ) : 'Send Message'}
                    </button>

                    <p className="text-xs text-surface-400 text-center mt-6">
                      By submitting, you agree to our privacy policy. Your information is secure.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
