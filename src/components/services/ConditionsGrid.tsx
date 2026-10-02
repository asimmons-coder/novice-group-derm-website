import Link from 'next/link';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { ArrowLabel } from '@/components/ui/Button';

interface Condition {
  name: string;
  description: string;
  // Links the card to a patient guide when one exists.
  href?: string;
}

export function ConditionsGrid({
  label,
  primary,
  accent,
  conditions,
}: {
  label: string;
  primary: string;
  accent: string;
  conditions: Condition[];
}) {
  return (
    <Section bg="cream" padding="xl">
      <Reveal className="text-center mb-14">
        <SectionLabel align="center">{label}</SectionLabel>
        <SignatureHeadline primary={primary} accent={accent} align="center" size="lg" />
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {conditions.map((c) => {
          const cardClass =
            'h-full bg-warm-white border border-sand rounded-2xl p-7 hover:bg-sage-light hover:border-sage-deep hover:-translate-y-1 hover:shadow-lg transition-all duration-500';
          const content = (
            <>
              <h3 className="font-display text-lg text-charcoal mb-2">{c.name}</h3>
              <p className="text-sm text-warm-gray leading-relaxed">{c.description}</p>
            </>
          );
          return (
            <StaggerItem key={c.name}>
              {c.href ? (
                <Link href={c.href} className={`group flex flex-col ${cardClass}`}>
                  {content}
                  <ArrowLabel className="mt-5">Read the guide</ArrowLabel>
                </Link>
              ) : (
                <div className={cardClass}>{content}</div>
              )}
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}

export function ProcessSteps({
  steps,
}: {
  steps: Array<{ title: string; body: string }>;
}) {
  return (
    <Section bg="warm-white" padding="xl">
      <Reveal className="text-center mb-16">
        <SectionLabel align="center">What to Expect</SectionLabel>
        <SignatureHeadline
          primary="The process,"
          accent="step by step."
          align="center"
          size="lg"
        />
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <StaggerItem key={i}>
            <div className="text-center md:text-left">
              <div className="font-display text-7xl text-sand leading-none mb-4 select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-2xl text-charcoal mb-4">{step.title}</h3>
              <p className="text-warm-gray leading-relaxed">{step.body}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
