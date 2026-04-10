import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Cosmetic & Aesthetics',
  description:
    'Botox, fillers, microneedling, lasers, and chemical peels in Bloomfield Hills. Three decades of injection artistry from Dr. Fred Novice.',
};

const treatments = [
  {
    name: 'Botox & Dysport',
    description:
      'Precision neuromodulators for fine lines, brow lift, masseter shaping, and hyperhidrosis. Subtle, expressive, never frozen.',
    image: images.cosmetic.botox,
  },
  {
    name: 'Dermal Fillers',
    description:
      'Juvederm and Restylane lines for lips, cheeks, jawline, temples, and hands. Restoring volume with the eye of an artist.',
    image: images.cosmetic.fillers,
  },
  {
    name: 'Kybella',
    description:
      'Non-surgical reduction of submental fullness. A few sessions, lasting results — no surgery required.',
    image: images.cosmetic.laser,
  },
  {
    name: 'Microneedling with PRP',
    description:
      'Stimulates collagen and elastin for firmer texture, reduced scarring, and an unmistakable glow.',
    image: images.cosmetic.microneedling,
  },
  {
    name: 'Chemical Peels',
    description:
      'Medical-grade peels customized to your skin: brighter tone, smoother surface, refined pores.',
    image: images.cosmetic.peels,
  },
  {
    name: 'Laser & Light',
    description:
      'Pigmentation, redness, scars, sun damage. Targeted laser and light therapies tuned to your skin.',
    image: images.cosmetic.laser,
  },
];

const faqs = [
  {
    question: 'Will I look natural?',
    answer:
      'That is the entire philosophy of the practice. With more than 30 years of injection experience, Dr. Fred Novice approaches each face individually — symmetry, movement, and expression are preserved. Our goal is for friends to say you look rested, not "done."',
  },
  {
    question: 'Is there downtime?',
    answer:
      'Botox and most filler appointments have minimal downtime — many patients return to work the same day. Lasers, peels, and microneedling have varying recovery from a few days of redness to a week of peeling, depending on intensity.',
  },
  {
    question: 'How much does Botox cost?',
    answer:
      'Botox is priced per unit. We will discuss the right number of units for your goals during a consultation and quote you transparently before any treatment.',
  },
  {
    question: 'How long do fillers last?',
    answer:
      'Filler longevity depends on the product and the area — typically 9 to 24 months. We will recommend the right product and discuss what to expect for your specific treatment.',
  },
  {
    question: 'Do you offer consultations?',
    answer:
      'Yes. Cosmetic consultations are available with our team to discuss your goals, walk through options, and create a tailored plan. There is no obligation to treat at the consultation.',
  },
];

export default function CosmeticPage() {
  return (
    <>
      <PageHero
        label="Cosmetic & Aesthetics"
        primary="Subtle refinement."
        accent="Not reinvention."
        description="Cosmetic dermatology done right is invisible — symmetrical, not stretched. With more than 30 years of injection experience, Dr. Fred Novice has trained colleagues across the world in the techniques that make natural results possible."
        bg="gradient-cosmetic"
      />

      <Section bg="cream" padding="xl">
        <Reveal className="text-center mb-14">
          <SectionLabel align="center">Treatments</SectionLabel>
          <SignatureHeadline
            primary="An artist&rsquo;s hand,"
            accent="a clinician&rsquo;s precision."
            align="center"
            size="lg"
          />
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <StaggerItem key={t.name}>
              <div className="group h-full bg-warm-white rounded-3xl overflow-hidden border border-sand hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blush" />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl text-charcoal mb-3">{t.name}</h3>
                  <p className="text-sm text-warm-gray leading-relaxed">{t.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Dr. Fred feature */}
      <Section bg="deep-brown" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto">
              <Image
                src={images.providers.fred}
                alt="Dr. Fred Novice"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <SectionLabel tone="gold">A Note on Experience</SectionLabel>
            <SignatureHeadline
              primary="Three decades of"
              accent="injection artistry."
              size="lg"
              className="[&_*]:text-warm-white"
            />
            <div className="mt-8 space-y-5 text-cream/80 text-lg leading-relaxed">
              <p>
                Dr. Fred Novice has been performing Botox and filler treatments since
                long before they became commonplace. He has trained colleagues from
                around the world in advanced injection techniques and is regarded as
                one of the most experienced cosmetic injectors in private practice.
              </p>
              <p>
                Experience matters more in injectables than almost any other field.
                Each face is different. Each muscle pattern, each fat pad, each
                vessel runs in slightly different places. After thirty years and
                tens of thousands of treatments, the difference shows.
              </p>
            </div>
            <div className="mt-10">
              <LinkButton href="/contact" variant="white" size="lg" withArrow>
                Book a Cosmetic Consultation
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bg="cream" padding="xl" size="narrow">
        <Reveal className="text-center mb-12">
          <SectionLabel align="center">Frequently Asked</SectionLabel>
          <SignatureHeadline
            primary="What patients"
            accent="want to know."
            align="center"
            size="md"
          />
        </Reveal>
        <Accordion items={faqs} />
      </Section>

      <BookingCTA />
    </>
  );
}
