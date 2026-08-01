import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Manrope } from 'next/font/google';
import Providers from '../components/Providers';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'GS Associates | Financial Consulting & Loan Advisory, Chennai',
  description: 'GS Associates — Chennai\'s trusted loan advisory. Home Loans, Business Loans, Secured OD & Bridge Financing from 15+ leading banks. Zero fees. Call Gopinath: +91 90031 67674.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${manrope.variable}`} suppressHydrationWarning>
      <body className={`antialiased font-sans ${manrope.className}`} suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Suspense fallback={null}>
          <LoginModal />
        </Suspense>
        <Suspense fallback={null}>
          <RegisterModal />
        </Suspense>
      </body>
    </html>
  );
}
