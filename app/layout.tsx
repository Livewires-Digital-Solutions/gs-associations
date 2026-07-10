import type { Metadata } from 'next';
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
  title: 'GS Associations',
  description: 'Premium Real Estate in Hyderabad',
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
        <LoginModal />
        <RegisterModal />
      </body>
    </html>
  );
}
