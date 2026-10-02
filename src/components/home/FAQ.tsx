import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { faqs } from '@/lib/site';

// The homepage FAQ emits its own FAQPage schema (the site-wide graph does not),
// so pages with their own FAQ lists never carry two FAQPage blocks.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export function FAQ() {
  return (
    <Section bg="cream" padding="lg" size="narrow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <SectionLabel align="center">Common Questions</SectionLabel>
        <SignatureHeadline
          as="h2"
          primary="Common questions"
          accent="about your visit."
          align="center"
          size="lg"
        />
      </Reveal>
      <Reveal className="divide-y divide-sand border-t border-sand">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none font-display text-lg md:text-xl text-charcoal">
              <span>{f.q}</span>
              <span
                aria-hidden
                className="mt-1 text-2xl leading-none text-sage-deep transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-warm-gray leading-relaxed">{f.a}</p>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}
