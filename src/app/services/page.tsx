import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLink } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { services } from '@/lib/site';
import { images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Medical, cosmetic, surgical, and dermatopathology services in Bloomfield Hills, Michigan. Complete skin care under one roof.',
};

const serviceImages: Record<string, string> = {
  'medical-dermatology': images.services.medical,
  'cosmetic-aesthetics': images.services.cosmetic,
  'surgical-dermatology': images.services.surgical,
  dermatopathology: images.services.pathology,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        primary="Complete skin care,"
        accent="under one roof."
        description="Most practices send patients elsewhere for biopsies, surgery, or cosmetic care. We don't. Every step of your dermatology journey happens here, with the doctors you already know."
      />

      <Section bg="cream" padding="lg">
        <div className="space-y-12">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={serviceImages[s.slug]}
                      alt={s.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage mb-3 block">
                    {s.short}
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 group-hover:text-sage transition-colors">
                    {s.name}
                  </h2>
                  <p className="text-lg text-warm-gray leading-relaxed mb-8 max-w-xl">
                    {s.blurb}
                  </p>
                  <ArrowLink href={`/services/${s.slug}`}>Explore</ArrowLink>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
