import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Dermatopathology',
  description:
    'In-house dermatopathology in Bloomfield Hills. The same dermatologist who examines your skin reads your biopsy under the microscope.',
};

const steps = [
  {
    title: 'Biopsy',
    body: 'Performed in our office during your visit, with care to minimize discomfort and scarring.',
  },
  {
    title: 'In-House Analysis',
    body: 'Slides are processed and read on-site by Dr. Fred or Dr. Taylor — both fellowship-trained dermatopathologists.',
  },
  {
    title: 'Same-Doctor Diagnosis',
    body: 'The dermatologist who saw your skin sees your slides. The diagnosis is grounded in clinical context — and ready in days, not weeks.',
  },
];

export default function DermatopathologyPage() {
  return (
    <>
      <PageHero
        label="Dermatopathology"
        primary="Diagnosis,"
        accent="under the microscope."
        description="Dermatopathology is the medical specialty that diagnoses skin disease by examining tissue under the microscope. Two of our dermatologists are also fellowship-trained pathologists — meaning the doctor who examines your skin is also the one who reads your biopsy."
      />

      <Section bg="cream" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl max-w-md mx-auto">
              <Image
                src={images.services.pathology}
                alt="Dermatopathology slides under microscope"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-warm-white/90 backdrop-blur-sm px-5 py-2 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal">
                  In-House Lab
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6 order-1 lg:order-2">
            <SectionLabel>Our Advantage</SectionLabel>
            <SignatureHeadline
              primary="The same doctor"
              accent="from skin to slide."
              size="lg"
            />
            <div className="mt-8 space-y-5 text-warm-gray text-lg leading-relaxed">
              <p>
                Most dermatology practices send biopsies to outside labs. The
                dermatologist who saw the lesion never sees the slide; they get a
                report from a pathologist who never saw the patient. It works most
                of the time. Sometimes it doesn&rsquo;t.
              </p>
              <p>
                When a single doctor sees both the patient AND the slide, the
                diagnosis is grounded in everything that happened in the exam room.
                That continuity — what dermatologists call clinicopathologic
                correlation — is the highest standard of diagnostic accuracy. And
                it&rsquo;s almost unheard of in private practice.
              </p>
              <p>
                At Novice Group, both Dr. Fred and Dr. Taylor are fellowship-trained
                dermatopathologists. Your biopsy doesn&rsquo;t leave the building.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bg="warm-white" padding="xl">
        <Reveal className="text-center mb-16">
          <SectionLabel align="center">The Process</SectionLabel>
          <SignatureHeadline
            primary="From biopsy"
            accent="to answer."
            align="center"
            size="lg"
          />
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="text-center md:text-left bg-cream rounded-3xl p-10 h-full border border-sand">
                <div className="font-display text-6xl text-gold leading-none mb-6 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl text-charcoal mb-4">{step.title}</h3>
                <p className="text-warm-gray leading-relaxed">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section bg="deep-brown" padding="lg" size="narrow">
        <Reveal className="text-center">
          <SectionLabel align="center" tone="gold">
            For Referring Physicians
          </SectionLabel>
          <SignatureHeadline
            primary="Consults welcome."
            accent="Slides too."
            align="center"
            size="md"
            className="[&_*]:text-warm-white"
          />
          <p className="mt-8 text-cream/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Dr. Fred and Dr. Taylor accept dermatopathology consults from
            colleagues. If you have a difficult case or a slide you would like a
            second opinion on, we are happy to take a look.
          </p>
          <div className="mt-10">
            <LinkButton href="/contact" variant="white" size="lg" withArrow>
              Send Us a Consult
            </LinkButton>
          </div>
        </Reveal>
      </Section>

      <BookingCTA />
    </>
  );
}
