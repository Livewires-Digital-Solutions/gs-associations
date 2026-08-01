import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import logoWhite from '@/assets/logowhite.png';

export default function Footer() {
  return (
    <footer className="bg-surface-950 text-surface-400">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Image
                src={logoWhite}
                alt="GS Associations Logo"
                height={56}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Chennai's trusted financial consulting partner. We connect you with leading banks and NBFCs for home loans, business loans, secured overdraft, and bridge financing.
            </p>
            <div className="flex gap-3">
              {[
                { name: 'facebook', icon: Facebook },
                { name: 'twitter', icon: Twitter },
                { name: 'instagram', icon: Instagram },
                { name: 'linkedin', icon: Linkedin }
              ].map(s => (
                <a key={s.name} href="#" className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-navy-700 flex items-center justify-center transition-colors">
                  <s.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Properties</h4>
            <ul className="space-y-3 text-sm">
              {['Apartments', 'Villas', 'Plots', 'Commercial', 'Row Houses', 'Penthouses'].map(t => (
                <li key={t}><Link href={`/properties?type=${t}`} className="hover:text-white transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Loan Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Loan Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home Loans', href: '/loans' },
                { label: 'Business Loans', href: '/loans' },
                { label: 'Loan Against Property', href: '/loans' },
                { label: 'Secured Overdraft', href: '/loans' },
                { label: 'Working Capital', href: '/loans' },
                { label: 'All Loan Products', href: '/loans' },
              ].map(item => (
                <li key={item.label}><Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
              ].map(item => (
                <li key={item.label}><Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white font-medium mb-1">Office Address</p>
                <p>No. 42, Anna Salai,<br />Guindy,<br />Chennai — 600032</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Contact — Gopinath</p>
                <a href="tel:+919003167674" className="hover:text-white transition-colors">+91 90031 67674</a>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Email</p>
                <a href="mailto:gopi.thamba@gmail.com" className="hover:text-white transition-colors">gopi.thamba@gmail.com</a>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Hours</p>
                <p>Mon-Sat: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 GS Associations. All rights reserved. RERA Registration: P024000RERA</p>
          <p className="text-surface-600 flex items-center gap-1 flex-wrap justify-center md:justify-end">
            Built with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline-block" /> by <a href="https://livewiresdigitalsolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Livewires Digital Solutions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
