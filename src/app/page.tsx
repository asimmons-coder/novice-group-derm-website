import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { SkinLayers } from '@/components/home/SkinLayers';
import { DifferentiatorStrip } from '@/components/home/DifferentiatorStrip';
import { OurStory } from '@/components/home/OurStory';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyNovice } from '@/components/home/WhyNovice';
import { LabStory } from '@/components/home/LabStory';
import { Testimonials } from '@/components/home/Testimonials';
import { CosmeticCTA } from '@/components/home/CosmeticCTA';
import { SkinShopTeaser } from '@/components/home/SkinShopTeaser';
import { FAQ } from '@/components/home/FAQ';
import { BookingCTA } from '@/components/home/BookingCTA';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <DifferentiatorStrip />
      <Marquee />
      <OurStory />
      <ServicesGrid />
      <SkinLayers />
      <WhyNovice />
      <LabStory />
      <Testimonials />
      <CosmeticCTA />
      <SkinShopTeaser />
      <FAQ />
      <BookingCTA />
    </>
  );
}
