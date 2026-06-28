import { Hero } from '@/components/home/Hero';
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <DifferentiatorStrip />
      <OurStory />
      <ServicesGrid />
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
