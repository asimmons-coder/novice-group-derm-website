import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';
import { providers } from '@/lib/site';
import { images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Our Story & Providers',
  description:
    'Three generations of board-certified dermatologists in Bloomfield Hills. Meet Dr. Fred, Dr. Karlee, and Dr. Taylor Novice — all trained at Henry Ford Hospital.',
};

const providerImages: Record<string, string> = {
  'fred-novice': images.providers.fred,
  'karlee-novice': images.providers.karlee,
  'taylor-novice': images.providers.taylor,
  'erin-koppelman': images.providers.erin,
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        label="Our Story"
        primary="A family practice,"
        accent="three generations deep."
        description="Twenty-five years ago, Dr. Fred Novice opened Novice Group Dermatology with a simple commitment: deliver the kind of care a family doctor used to deliver — personal, continuous, and uncompromising. His daughters Dr. Karlee and Dr. Taylor have since joined him. All three trained at Henry Ford Hospital. All three are board-certified."
      />

      {/* Practice History Narrative */}
      <Section bg="warm-white" padding="lg" size="narrow">
        <Reveal className="text-charcoal/85 text-lg leading-relaxed space-y-6 max-w-3xl mx-auto">
          <p>
            Dr. Fred Novice completed his dermatology residency at Henry Ford Hospital
            as Chief Resident, then a dermatopathology fellowship at the University of
            Oklahoma — a rare dual specialization that would shape the practice he
            opened in Bloomfield Hills in 1999. From the beginning, he insisted on
            reading his own slides under the microscope, trusting no one else with
            that step in the diagnosis. Two and a half decades later, that&rsquo;s still
            how the practice operates.
          </p>
          <p>
            Patients who walked in during the early years for acne or eczema have
            since brought their children — and now their grandchildren. The continuity
            isn&rsquo;t a marketing slogan; it&rsquo;s a model of care that has become rare in
            modern dermatology. As private equity has bought up dermatology practices
            across the country, the Novice family has chosen, deliberately, to remain
            independent.
          </p>
          <p className="font-accent italic text-2xl text-charcoal/80">
            &ldquo;We didn&rsquo;t want our patients to be a metric. We wanted them to be
            our patients.&rdquo;
          </p>
        </Reveal>
      </Section>

      {/* Providers */}
      <Section bg="cream" padding="xl" id="providers">
        <Reveal className="text-center mb-20">
          <SectionLabel align="center">The Providers</SectionLabel>
          <SignatureHeadline
            primary="Three dermatologists,"
            accent="one family."
            align="center"
            size="lg"
          />
        </Reveal>

        <div className="space-y-24">
          {providers.map((p, i) => (
            <Reveal key={p.slug}>
              <div
                id={p.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-sand-light">
                    <Image
                      src={providerImages[p.slug]}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 480px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6 inline-flex items-center gap-3 bg-warm-white border border-sand rounded-full px-5 py-2.5 shadow-sm">
                    <span className="font-display text-gold text-xl">{p.yearsExperience}</span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-warm-gray font-semibold">
                      Years of Experience
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <SectionLabel>{p.role}</SectionLabel>
                  <h3 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                    {p.name}
                  </h3>
                  <p className="font-accent italic text-2xl text-charcoal/80 mb-8 max-w-xl">
                    {p.headline}
                  </p>
                  <p className="text-lg text-warm-gray leading-relaxed mb-10 max-w-2xl">
                    {p.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 mb-10 max-w-2xl">
                    {p.credentials.map((c) => (
                      <div
                        key={c}
                        className="flex items-start gap-3 py-2 border-b border-sand text-sm text-charcoal/75"
                      >
                        <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-gold shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-4 py-2 bg-sage-light text-charcoal text-xs font-semibold rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Our Approach */}
      <Section bg="deep-brown" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionLabel tone="gold">Our Approach</SectionLabel>
            <SignatureHeadline
              primary="Continuity is"
              accent="the whole point."
              size="lg"
              className="[&_*]:text-warm-white"
            />
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-6 text-cream/80 text-lg leading-relaxed">
            <p>
              Most dermatology in America has become an in-and-out experience. A
              quick visit, a referral elsewhere for the biopsy, another referral for
              the surgery, another for the cosmetic work. By the time the chart comes
              back, you might have seen four different providers across three
              practices.
            </p>
            <p>
              We do it differently. Medical, cosmetic, surgical, and pathology all
              happen here, with the dermatologists you already know. The doctor who
              examined the lesion is the same one who reads your biopsy and the same
              one who follows up the next time you come in. It&rsquo;s the way medicine
              is supposed to work.
            </p>
          </Reveal>
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
