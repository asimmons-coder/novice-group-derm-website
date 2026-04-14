import type { Metadata } from 'next';
import { CheckCircle2, FileDown, ListChecks, Shield } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Patient Resources',
  description:
    'New patient forms, accepted insurance, and what to expect at your first visit to Novice Group Dermatology in Bloomfield Hills, Michigan.',
};

const insurance = [
  'Aetna', 'Humana', 'United Healthcare', 'Blue Cross Blue Shield',
  'Cigna', 'Medicare', 'Medicaid', 'Priority Health',
  'Meridian', 'Molina', 'HAP', 'McLaren Health Plan',
];

const firstVisitItems = [
  'Photo ID and insurance card',
  'List of current medications and dosages',
  'Records or photos of previous skin conditions, if relevant',
  'A list of any specific concerns or questions',
  'For minors: a parent or legal guardian',
];

const faqs = [
  {
    question: 'How do I become a new patient?',
    answer:
      'Call us at (248) 932-3376 or use our online booking form. We accept new patients of all ages, and most appointments can be scheduled within a few weeks.',
  },
  {
    question: 'Will the same doctor see me each visit?',
    answer:
      'Yes. We do not rotate patients through providers. You can request the dermatologist you have seen before, and we will do our best to keep you with the same provider for continuity of care.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer:
      'We ask for at least 24 hours notice if possible, so we can offer your appointment to another patient. Call us anytime during office hours.',
  },
  {
    question: 'Do you offer telemedicine?',
    answer:
      'For certain established patients and conditions, virtual follow-ups are available. New patients should be seen in person for an initial visit and full skin examination.',
  },
  {
    question: 'How are biopsy results communicated?',
    answer:
      'Because we read our own biopsies in-house, results are typically available in days. We will reach out by phone or through the patient portal with results and next steps.',
  },
];

export default function PatientResourcesPage() {
  return (
    <>
      <PageHero
        label="Patient Resources"
        primary="Everything you need"
        accent="before your first visit."
        description="Forms, insurance, FAQs, and what to expect. If you can&rsquo;t find what you&rsquo;re looking for, give us a call — we&rsquo;re happy to help."
      />

      {/* Insurance */}
      <Section bg="cream" padding="lg" id="insurance">
        <Reveal>
          <div className="flex items-start gap-4 mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-light text-sage shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <SectionLabel>Insurance</SectionLabel>
              <SignatureHeadline
                primary="34+ plans accepted,"
                accent="including Medicaid."
                size="md"
              />
            </div>
          </div>
          <p className="text-warm-gray text-lg max-w-3xl mb-10">
            We accept most major commercial insurers, Medicare, and Medicaid. If
            your plan isn&rsquo;t listed below, give us a call and we&rsquo;ll verify
            coverage for you before your visit.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl">
            {insurance.map((plan) => (
              <div
                key={plan}
                className="flex items-center gap-2 bg-warm-white border border-sand rounded-xl px-4 py-3"
              >
                <CheckCircle2 size={14} className="text-sage shrink-0" />
                <span className="text-sm text-charcoal">{plan}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Forms */}
      <Section bg="warm-white" padding="lg" id="forms">
        <Reveal>
          <div className="flex items-start gap-4 mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-gold shrink-0">
              <FileDown size={20} />
            </div>
            <div>
              <SectionLabel>New Patient Forms</SectionLabel>
              <SignatureHeadline
                primary="Save time"
                accent="at check-in."
                size="md"
              />
            </div>
          </div>
          <p className="text-warm-gray text-lg max-w-3xl mb-10">
            Download and complete these forms before your visit, or arrive 15
            minutes early to fill them out in the office.
          </p>
          <div className="bg-cream border border-sand rounded-2xl px-6 py-5 max-w-3xl">
            <p className="font-display text-base text-charcoal">
              Patient forms are provided at your first visit or can be requested by calling the office.
            </p>
            <p className="text-sm text-warm-gray mt-2">
              Call <a href="tel:+12489323376" className="text-sage hover:text-charcoal transition-colors font-semibold">(248) 932-3376</a> or email{' '}
              <a href="mailto:Skin@novicegroupderm.com" className="text-sage hover:text-charcoal transition-colors font-semibold">Skin@novicegroupderm.com</a> to request forms in advance.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* What to Bring */}
      <Section bg="sand-light" padding="lg">
        <Reveal>
          <div className="flex items-start gap-4 mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blush-light text-blush shrink-0">
              <ListChecks size={20} />
            </div>
            <div>
              <SectionLabel>Your First Visit</SectionLabel>
              <SignatureHeadline
                primary="What to bring,"
                accent="what to expect."
                size="md"
              />
            </div>
          </div>
          <ul className="space-y-4 max-w-2xl">
            {firstVisitItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-charcoal/80">
                <CheckCircle2 size={18} className="text-sage shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-warm-gray text-lg max-w-2xl">
            Plan to spend 30 to 45 minutes at your first visit. We&rsquo;ll review
            your history, listen to your concerns, examine your skin, and develop
            a clear plan together.
          </p>
        </Reveal>
      </Section>

      {/* FAQs */}
      <Section bg="cream" padding="xl" size="narrow">
        <Reveal className="text-center mb-12">
          <SectionLabel align="center">Frequently Asked</SectionLabel>
          <SignatureHeadline
            primary="Common"
            accent="questions."
            align="center"
            size="md"
          />
        </Reveal>
        <Accordion items={faqs} />

        <div className="mt-16 text-center">
          <p className="text-warm-gray mb-6">Still have questions?</p>
          <LinkButton href={`tel:${site.phoneRaw}`} variant="primary" size="lg">
            Call {site.phone}
          </LinkButton>
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
