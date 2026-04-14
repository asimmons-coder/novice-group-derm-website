import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';

export const metadata: Metadata = {
  title: 'Blog & Education',
  description:
    'Skin health education from board-certified dermatologists. Articles on conditions, cosmetics, sun protection, and skincare products.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Blog & Education"
        primary="Skin notes,"
        accent="from your dermatologists."
        description="Practical, evidence-based skincare guidance from the doctors who actually see patients all day. No hot takes, no influencer routines."
      />

      <Section bg="cream" padding="xl">
        <Reveal>
          <div className="text-center max-w-xl mx-auto py-16">
            <p className="font-display text-3xl text-charcoal mb-4">Coming soon</p>
            <p className="text-warm-gray leading-relaxed">
              Our dermatologists are putting together articles on skin health,
              cosmetic treatments, and product recommendations. Check back soon,
              or follow us on{' '}
              <a
                href="https://www.instagram.com/novicegroupderm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-charcoal transition-colors font-semibold"
              >
                Instagram
              </a>{' '}
              for updates.
            </p>
          </div>
        </Reveal>
      </Section>

      <BookingCTA />
    </>
  );
}
