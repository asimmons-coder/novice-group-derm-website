import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { ArrowLabel } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { guides, guidePath, type Guide } from '@/lib/guides';

export const metadata: Metadata = pageMetadata({
  title: 'Skin Guides: Conditions and Treatments',
  description:
    'Plain-language guides to skin cancer screening, moles, acne, eczema, psoriasis, rosacea, and Botox from the dermatologists at Novice Group Dermatology in Bloomfield Hills, MI.',
  path: '/conditions',
});

const groups: Array<{ label: string; primary: string; accent: string; kind: Guide['kind'] }> = [
  { label: 'Conditions', primary: 'Skin conditions', accent: 'and skin checks.', kind: 'condition' },
  { label: 'Treatments', primary: 'Cosmetic', accent: 'treatments.', kind: 'treatment' },
];

export default function SkinGuidesPage() {
  return (
    <>
      <PageHero
        label="Skin Guides"
        primary="Answers to common"
        accent="skin questions."
        description="These guides explain common skin conditions and treatments in plain language: what causes them, how they are treated, and when it is time to see a dermatologist. Each one links to the providers at Novice Group Dermatology in Bloomfield Hills who treat it."
      />

      {groups.map((group, index) => (
        <Section key={group.kind} bg={index % 2 === 0 ? 'warm-white' : 'cream'} padding="lg">
          <Reveal className="mb-12">
            <SectionLabel>{group.label}</SectionLabel>
            <SignatureHeadline primary={group.primary} accent={group.accent} size="md" />
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides
              .filter((guide) => guide.kind === group.kind)
              .map((guide) => (
                <StaggerItem key={guide.slug}>
                  <Link
                    href={guidePath(guide)}
                    className="group flex h-full flex-col bg-cream border border-sand rounded-2xl p-7 hover:bg-sage-light hover:border-sage-deep hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
                  >
                    <h2 className="font-display text-2xl text-charcoal mb-3">{guide.name}</h2>
                    <p className="text-warm-gray leading-relaxed mb-6">{guide.summary}</p>
                    <ArrowLabel className="mt-auto">Read the guide</ArrowLabel>
                  </Link>
                </StaggerItem>
              ))}
          </StaggerGroup>
        </Section>
      ))}

      <BookingCTA
        primary="Questions about"
        accent="your own skin?"
        description="New patients welcome, and most major insurance is accepted. Call or send a request to see one of our dermatologists."
      />
    </>
  );
}
