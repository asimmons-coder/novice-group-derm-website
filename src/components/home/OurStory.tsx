import Image from 'next/image';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { ArrowLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { providers } from '@/lib/site';
import { images } from '@/lib/images';

const providerImages = [
  images.providers.fred,
  images.providers.karlee,
  images.providers.taylor,
  images.providers.erin,
];

export function OurStory() {
  return (
    <Section bg="cream" padding="xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* 2x2 photo grid */}
        <Reveal className="lg:col-span-6 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-5 max-w-lg mx-auto">
            {providers.map((p, i) => (
              <div
                key={p.slug}
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ${
                  i % 2 === 1 ? 'mt-8' : ''
                }`}
              >
                <Image
                  src={providerImages[i]}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1024px) 40vw, 240px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-warm-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="font-display text-sm text-charcoal leading-tight">
                    {p.name.replace('Dr. ', '').split(',')[0]}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-warm-gray font-semibold mt-0.5">
                    {p.role.split('·')[0].trim()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Text */}
        <Reveal className="lg:col-span-6 order-1 lg:order-2">
          <SectionLabel>Our Story</SectionLabel>
          <SignatureHeadline
            primary="Three generations."
            accent="One standard of care."
            size="lg"
            className="mb-8"
          />
          <div className="space-y-6 text-lg text-warm-gray leading-relaxed max-w-xl">
            <p>
              Dr. Fred Novice founded the practice in 1999 after building one of
              the most respected dermatology and dermatopathology careers in
              Michigan. Twenty-five years later, his daughters Dr. Karlee and
              Dr. Taylor have joined him — all three trained at Henry Ford
              Hospital, all three board-certified.
            </p>
            <p>
              Continuity of care isn&rsquo;t a marketing line here. It&rsquo;s how the
              practice operates: the same family of doctors who saw you for
              your first acne visit can still be there for your child&rsquo;s.
            </p>
          </div>
          <div className="mt-10">
            <ArrowLink href="/our-story">Meet the Team</ArrowLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
