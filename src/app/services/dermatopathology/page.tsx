import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { images } from '@/lib/images';
import { BiopsyJourney } from '@/components/services/BiopsyJourney';

export const metadata: Metadata = pageMetadata({
  title: 'In-House Dermatopathology in Bloomfield Hills, MI',
  description:
    'At Novice Group Dermatology, the dermatologist who examines your skin also reads your biopsy under the microscope, in our own lab in Bloomfield Hills, Michigan.',
  path: '/services/dermatopathology',
});

export default function DermatopathologyPage() {
  return (
    <>
      <PageHero
        label="Dermatopathology"
        primary="Diagnosis,"
        accent="under the microscope."
        description="Dermatopathology is the medical specialty that diagnoses skin disease by examining tissue under the microscope. Two of our dermatologists are also fellowship-trained dermatopathologists, so the doctor who examines your skin can also read your biopsy."
        image={{
          src: images.lab,
          alt: 'The in-house dermatopathology lab at Novice Group Dermatology',
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
              Most dermatology practices send biopsies to outside labs. The
              dermatologist who saw the lesion never sees the slide; they get a
              report from a pathologist who never saw the patient. It works most
              of the time. Sometimes it doesn&rsquo;t.
            </p>
            <p>
              When a single doctor sees both the patient and the slide, the
              diagnosis is grounded in everything that happened in the exam room.
              Dermatologists call this clinicopathologic correlation: the
              clinical exam and the microscope read by the same trained eye. It
              is uncommon in private practice.
            </p>
            <p>
              At Novice Group, both Dr. Fred and Dr. Taylor are fellowship-trained
              dermatopathologists. Your biopsy doesn&rsquo;t leave the building.
            </p>
          </div>
        </Reveal>
      </Section>

      <BiopsyJourney />

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

      <BookingCTA
        primary="See the doctor"
        accent="who reads the slide."
        description="New patients welcome. Call or send a request to schedule an exam with one of our dermatologists."
      />
    </>
  );
}
