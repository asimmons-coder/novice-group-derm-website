import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';

export const metadata: Metadata = {
  title: 'Surgical Dermatology',
  description:
    'Skin cancer surgery, Mohs coordination, mole removal, and dermatologic surgery in Bloomfield Hills, Michigan.',
};

const procedures = [
  {
    name: 'Skin Cancer Surgery',
    description:
      'Excision of basal cell, squamous cell, and melanoma in situ — performed in office with attention to cosmetic result.',
  },
  {
    name: 'Mohs Surgery Coordination',
    description:
      'For complex skin cancers in cosmetically sensitive areas, we coordinate Mohs micrographic surgery with our trusted partners and reconstruct as needed.',
  },
  {
    name: 'Mole Removal',
    description:
      'Both medically necessary and cosmetic mole removal — shave or excisional, all sent for in-house pathology.',
  },
  {
    name: 'Cyst & Lipoma Removal',
    description:
      'In-office surgical removal of epidermal inclusion cysts, pilar cysts, and lipomas under local anesthetic.',
  },
  {
    name: 'Earlobe Repair',
    description:
      'Surgical repair of split, torn, or stretched earlobes with attention to cosmetic outcome.',
  },
  {
    name: 'Nail Surgery',
    description:
      'Surgical management of ingrown toenails, nail biopsies, and other nail unit conditions.',
  },
];

const faqs = [
  {
    question: 'Will I have a scar?',
    answer:
      'Any incision creates a scar, but we use careful planning, fine sutures, and tension-reducing techniques to make scars as inconspicuous as possible. Many patients are surprised at how subtle the result is once fully healed.',
  },
  {
    question: 'Is the procedure done in your office?',
    answer:
      'Yes — most surgical procedures are performed in our office under local anesthesia. You can usually drive home the same day.',
  },
  {
    question: 'When will I get my pathology results?',
    answer:
      'Because we read our own slides in-house, results are typically available in days, not weeks. The doctor who performed your biopsy is the same one who reads it.',
  },
  {
    question: 'What is Mohs surgery and do you do it here?',
    answer:
      'Mohs micrographic surgery is a specialized technique for skin cancer in cosmetically sensitive areas (like the face). We coordinate Mohs procedures with trusted surgical partners and handle the diagnosis, planning, and any reconstruction or follow-up care.',
  },
];

export default function SurgicalPage() {
  return (
    <>
      <PageHero
        label="Surgical Dermatology"
        primary="Precise hands."
        accent="Cosmetic outcomes."
        description="When something needs to come off, the goal isn&rsquo;t just removal — it&rsquo;s removal with the smallest possible mark left behind. Decades of surgical experience focused on the aesthetic detail that matters."
      />

      <Section bg="cream" padding="xl">
        <Reveal className="text-center mb-14">
          <SectionLabel align="center">Procedures</SectionLabel>
          <SignatureHeadline
            primary="What we do,"
            accent="how we do it."
            align="center"
            size="lg"
          />
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedures.map((p) => (
            <StaggerItem key={p.name}>
              <div className="h-full bg-warm-white border border-sand rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
                <h3 className="font-display text-xl text-charcoal mb-3">{p.name}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{p.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section bg="sand-light" padding="lg" size="narrow">
        <Reveal className="text-center">
          <SectionLabel align="center" tone="gold">
            Skin Cancer Screening
          </SectionLabel>
          <SignatureHeadline
            primary="When in doubt,"
            accent="get it checked."
            align="center"
            size="md"
          />
          <p className="mt-8 text-lg text-warm-gray leading-relaxed max-w-2xl mx-auto">
            Skin cancer is the most common cancer in the United States, and the
            outcome is overwhelmingly determined by how early it&rsquo;s caught. A full
            body exam takes 15 minutes. If you haven&rsquo;t had one in the past year,
            now is the time.
          </p>
          <div className="mt-10">
            <LinkButton href="/contact" variant="primary" size="lg" withArrow>
              Schedule a Skin Check
            </LinkButton>
          </div>
        </Reveal>
      </Section>

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

      <BookingCTA />
    </>
  );
}
