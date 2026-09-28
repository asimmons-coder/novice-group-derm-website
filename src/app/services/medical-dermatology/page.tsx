import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { ConditionsGrid, ProcessSteps } from '@/components/services/ConditionsGrid';
import { BookingCTA } from '@/components/home/BookingCTA';
import { MoleGuide } from '@/components/services/MoleGuide';
import { images } from '@/lib/images';

export const metadata: Metadata = pageMetadata({
  title: 'Medical Dermatology in Bloomfield Hills, MI',
  description:
    'Acne, eczema, psoriasis, rosacea, and skin cancer screenings with dermatologists in Bloomfield Hills, Michigan, serving Birmingham, Troy, and Metro Detroit.',
  path: '/services/medical-dermatology',
});

const conditions = [
  { name: 'Acne', href: '/conditions/acne', description: 'Personalized treatment for teens and adults, with topical, oral, and procedural options.' },
  { name: 'Eczema & Atopic Dermatitis', href: '/conditions/eczema', description: 'From mild flares to severe disease, including the latest biologics.' },
  { name: 'Psoriasis', href: '/conditions/psoriasis', description: 'Topical, light therapy, oral, and biologic management for plaque, guttate, and inverse forms.' },
  { name: 'Rosacea', href: '/conditions/rosacea', description: 'Calming flares, addressing visible vessels, and protecting sensitive skin long-term.' },
  { name: 'Skin Cancer Screening', href: '/conditions/skin-cancer-screening', description: 'Full-body exams with dermoscopy and same-day biopsies when needed.' },
  { name: 'Mole Evaluation', href: '/conditions/moles', description: 'Photographic monitoring of atypical nevi and routine surveillance.' },
  { name: 'Hair Loss & Alopecia', description: 'Workup and treatment for androgenetic, alopecia areata, and scarring forms.' },
  { name: 'Nail Conditions', description: 'Fungal infections, psoriasis, ingrown nails, and trauma-related changes.' },
  { name: 'Hyperhidrosis', description: 'Topicals, oral medications, and Botox injections for excessive sweating.' },
  { name: 'Pediatric Dermatology', description: 'Gentle, evidence-based care for infants, kids, and teens.' },
  { name: 'Warts & Molluscum', description: 'In-office cryotherapy, immunotherapy, and other targeted treatments.' },
  { name: 'Contact Dermatitis', description: 'Patch testing and identification of allergic and irritant triggers.' },
];

const faqs = [
  {
    question: 'Do I need a referral?',
    answer:
      'No referral is required. We accept most major insurance plans and welcome new patients of all ages.',
  },
  {
    question: 'How long is a typical visit?',
    answer:
      'New patient visits are typically 30 to 45 minutes to ensure we have time to listen, examine, and explain. Follow-ups are usually 15 to 30 minutes.',
  },
  {
    question: 'What insurance do you accept?',
    answer:
      'We accept most major plans, including Aetna, BCBS, Cigna, Humana, United Healthcare, Medicare, and Medicaid. Call us if you don\u2019t see yours and we\u2019ll verify.',
  },
  {
    question: 'Will I see a doctor or a midlevel?',
    answer:
      'You will be seen by one of our board-certified dermatologists or our experienced nurse practitioner, whichever you prefer. We do not rotate patients through providers visit-to-visit.',
  },
  {
    question: 'How quickly can I be seen for a suspicious mole?',
    answer:
      'Suspicious lesions are prioritized. If you call about something concerning, we will work to get you in within a few days.',
  },
];

export default function MedicalDermatologyPage() {
  return (
    <>
      <PageHero
        label="Medical Dermatology"
        primary="The clinical foundation"
        accent="of healthy skin."
        description="From a kid&rsquo;s first acne flare to an adult&rsquo;s annual skin cancer screening, the medical side of dermatology is the heart of the practice. Three dermatologists and a nurse practitioner take the time to listen, examine carefully, and explain the plan."
        image={{
          src: images.providersTrio,
          alt: 'Drs. Fred, Karlee, and Taylor Novice in the office',
        }}
      />

      <MoleGuide />

      <ConditionsGrid
        label="Conditions We Treat"
        primary="A broad scope,"
        accent="treated with depth."
        conditions={conditions}
      />

      <ProcessSteps
        steps={[
          {
            title: 'Listen',
            body: 'Every visit starts with a conversation. What changed, what hurts, what worries you. We take our time because we have the time.',
          },
          {
            title: 'Diagnose',
            body: 'A careful exam, dermoscopy when needed, and an in-house biopsy if it\u2019s warranted. The same doctor reads it under the microscope.',
          },
          {
            title: 'Treat',
            body: 'A clear plan, with options. We will explain what to expect, what to watch for, and when to come back.',
          },
        ]}
      />

      <Section bg="cream" padding="xl" size="narrow">
        <Reveal className="text-center mb-12">
          <SectionLabel align="center">Frequently Asked</SectionLabel>
          <SignatureHeadline
            primary="The questions"
            accent="patients ask."
            align="center"
            size="md"
          />
        </Reveal>
        <Accordion items={faqs} />
      </Section>

      <BookingCTA
        primary="Book a skin check"
        accent="with a dermatologist."
        description="New patients welcome, and most major insurance is accepted. Call or send a request for a medical visit or full-body skin exam."
      />
    </>
  );
}
