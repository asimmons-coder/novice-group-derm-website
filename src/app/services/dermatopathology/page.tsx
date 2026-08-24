import type { Metadata } from 'next';
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
    'Dermatopathology in Bloomfield Hills. A lab processes the slides. Dr. Fred or Dr. Taylor Novice, fellowship-trained dermatopathologists, read them.',
  alternates: {
    canonical: '/services/dermatopathology',
  },
};

const steps = [
  {
    title: 'Biopsy',
    body: 'Performed in our office during your visit, with care to minimize discomfort and scarring.',
  },
  {
    title: 'Lab Processing',
    body: 'Slides are processed by a laboratory. We do not run a pathology lab in the office.',
  },
  {
    title: 'Your Doctor Reads Them',
    body: 'Dr. Fred or Dr. Taylor reads the slides. The dermatologist who saw your skin is part of the diagnosis under the microscope.',
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
        image={{
          src: images.lab,
          alt: 'Microscope used for dermatopathology slide review at Novice Group Dermatology',
        }}
      />

      <Section bg="cream" padding="xl" size="narrow">
        <Reveal>
          <SectionLabel>Our Advantage</SectionLabel>
          <SignatureHeadline
            primary="The same doctor"
            accent="from skin to slide."
            size="lg"
          />
          <div className="mt-8 space-y-5 text-warm-gray text-lg leading-relaxed">
            <p>
              Most dermatology practices send biopsies to a laboratory. The
              dermatologist who saw the lesion never sees the slide. They get a
              report from a pathologist who never saw the patient. That works
              most of the time. Sometimes it doesn&rsquo;t.
            </p>
            <p>
              When a doctor sees both the patient and the slide, the diagnosis
              is grounded in everything that happened in the exam room.
              Dermatologists call that clinicopathologic correlation. It is
              uncommon in a private office.
            </p>
            <p>
              At Novice Group, both Dr. Fred and Dr. Taylor are fellowship-trained
              dermatopathologists. A lab processes the slides. They read them.
            </p>
          </div>
        </Reveal>
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
