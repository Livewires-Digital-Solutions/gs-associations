import React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-950 text-surface-400">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-navy-700 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-white leading-none">GS Associations</span>
                <span className="text-xs font-medium text-gold-500">Premium Real Estate & Loans</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Hyderabad's trusted real estate and financial services partner since 2012. We help families find their dream homes, explore loan options, and investors build wealth through property.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(s => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-navy-700 flex items-center justify-center transition-colors">
                  <span className="text-xs capitalize text-white">{s[0].toUpperCase()}</span>
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
                <p>Plot 42, Gachibowli Main Road,<br />Financial District,<br />Hyderabad — 500032</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Phone</p>
                <a href="tel:+914066667777" className="hover:text-white transition-colors">+91 40 6666 7777</a>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Email</p>
                <a href="mailto:info@gsassociations.com" className="hover:text-white transition-colors">info@gsassociations.com</a>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Hours</p>
                <p>Mon-Sat: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2024 GS Associations. All rights reserved. RERA Registration: P024000RERA</p>
          <p className="text-surface-600">Designed and built with ❤️ for Hyderabad</p>
        </div>
      </div>
    </footer>
  );
}
