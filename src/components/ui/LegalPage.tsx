import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  label: string;
  primary: string;
  accent: string;
  description?: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPage({
  label,
  primary,
  accent,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <PageHero label={label} primary={primary} accent={accent} description={description} />

      <Section bg="warm-white" padding="md" size="narrow">
        <p className="text-xs uppercase tracking-[0.2em] text-warm-gray font-semibold mb-12">
          Last updated: {lastUpdated}
        </p>

        <div className="space-y-12">
          {sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-display text-2xl text-charcoal mb-4">{section.heading}</h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">{section.body}</div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
