'use client';


import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { usePropertyStore } from '@/stores/propertyStore';

const contactInfo = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Office Address', value: 'Plot 42, Gachibowli Main Road,\nFinancial District, Hyderabad — 500032' },
  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 40 6666 7777\n+91 98765 00001' },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'info@gsassociations.com\nsales@gsassociations.com' },
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addLead } = usePropertyStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Add as contact form lead
      addLead({
        userId: `visitor-${Date.now()}`,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        propertyId: '',
        propertyTitle: formData.type || 'General Inquiry',
        propertyLocation: 'Contact Form',
        timestamp: new Date().toISOString(),
        status: 'New',
        notes: formData.message,
        source: 'Contact Form',
      });
      setSubmitted(true);
      setLoading(false);
      toast.success('Message sent! Our team will get back to you within 24 hours.');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="gradient-hero py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(245,158,11,0.5), transparent 60%)',
        }} />
        <div className="container-app relative z-10 text-center">
          <p className="section-label text-gold-400 mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Whether you're buying your first home or expanding your portfolio, our team is here to help.
          </p>
        </div>
      </div>

      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-surface-900 mb-4">Contact Information</h2>
              <p className="text-surface-500 text-sm leading-relaxed mb-6">
                Our team of expert advisors is available to assist you Monday through Saturday. We typically respond within 2 business hours.
              </p>
            </div>

            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-100 flex items-center justify-center text-navy-700 flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-1">{item.label}</p>
                  <p className="text-sm text-surface-700 whitespace-pre-line">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-52 bg-surface-100 border border-surface-200 relative">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80"
                alt="Office location"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
                  <MapPin className="w-4 h-4 text-navy-700" />
                  <span className="text-sm font-medium text-navy-900">Gachibowli, Hyderabad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-surface-900 mb-2">Message Received!</h3>
                  <p className="text-surface-500 mb-2">Thank you for reaching out, {formData.name}.</p>
                  <p className="text-surface-400 text-sm mb-6">Our team will get back to you at {formData.email} within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', type: '', message: '' }); }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-700">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-xl text-surface-900">Send us a Message</h2>
                      <p className="text-xs text-surface-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="label mb-1.5 block">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          placeholder="Arjun Mehta"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label className="label mb-1.5 block">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+91 99001 12345"
                          className="input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label mb-1.5 block">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="arjun@example.com"
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label className="label mb-1.5 block">Inquiry Type</label>
                      <select
                        value={formData.type}
                        onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                        className="input"
                      >
                        <option value="">Select inquiry type...</option>
                        {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="label mb-1.5 block">Message *</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell us about what you're looking for — property type, budget, location preferences..."
                        className="input h-32 resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>

                    <p className="text-xs text-surface-400 text-center">
                      By submitting, you agree to our privacy policy. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
