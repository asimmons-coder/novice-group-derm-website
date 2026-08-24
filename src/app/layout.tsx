import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { Analytics } from '@/components/seo/Analytics';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://novicegroupderm.com'),
  title: {
    default:
      'Dermatologist in Bloomfield Hills, MI | Medical, Cosmetic & Dermatopathology Care - Novice Group Dermatology',
    template: '%s | Novice Group Dermatology',
  },
  description:
    'Multiple generations of board-certified dermatologists in Bloomfield Hills, Michigan. Medical, cosmetic, surgical, and in-house dermatopathology under one roof.',
  keywords: [
    'dermatologist Bloomfield Hills',
    'Novice Group Dermatology',
    'cosmetic dermatology Michigan',
    'Botox Bloomfield Hills',
    'dermatopathology',
    'Mohs coordination Michigan',
    'skin cancer screening',
  ],
  authors: [{ name: 'Novice Group Dermatology' }],
  openGraph: {
    title: 'Novice Group Dermatology | Skin Health, Elevated',
    description:
      'Multiple generations of board-certified dermatologists. Medical, cosmetic, surgical, and in-house dermatopathology in Bloomfield Hills, Michigan.',
    url: 'https://novicegroupderm.com',
    siteName: 'Novice Group Dermatology',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The dermatologists of Novice Group Dermatology in Bloomfield Hills, Michigan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novice Group Dermatology',
    description: 'Skin health, elevated. Multiple generations. One standard of care.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-warm-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <JsonLd />
        <Analytics />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
