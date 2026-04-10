import { Microscope, Wand2, Heart } from 'lucide-react';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';

const features = [
  {
    icon: Microscope,
    accent: 'bg-sage',
    title: 'Diagnosis meets pathology',
    body:
      'Two of our dermatologists are also fellowship-trained dermatopathologists. The doctor who sees your skin reads your biopsy under the microscope. This clinicopathologic correlation is the highest standard of diagnostic accuracy — and almost no private practice offers it.',
  },
  {
    icon: Wand2,
    accent: 'bg-blush',
    title: '30 years of injection artistry',
    body:
      'Dr. Fred Novice has more than three decades of Botox and filler experience. He has trained colleagues across the world in advanced techniques. When subtlety, symmetry, and natural movement matter, experience is the only thing that compounds.',
  },
  {
    icon: Heart,
    accent: 'bg-gold',
    title: 'Family, not a factory',
    body:
      'In an industry where 35+ private equity platforms are buying up practices, the Novice family has chosen to stay independent. Patient care over shareholder returns. Continuity over churn. The same providers, visit after visit, generation after generation.',
  },
];

export function WhyNovice() {
  return (
    <Section bg="deep-brown" padding="xl">
      <Reveal className="text-center mb-16">
        <SectionLabel align="center" tone="gold">
          Why Novice Group
        </SectionLabel>
        <SignatureHeadline
          primary="Your dermatologist"
          accent="sees the whole picture."
          align="center"
          size="lg"
          className="text-warm-white [&_*]:text-warm-white"
        />
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <StaggerItem key={f.title}>
              <div className="relative h-full bg-charcoal/40 border border-warm-white/10 rounded-3xl p-9 backdrop-blur-sm hover:bg-charcoal/60 transition-all duration-500 overflow-hidden group">
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 right-0 h-[3px] ${f.accent}`}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors"
                />
                <div className="relative">
                  <Icon size={28} className="text-gold mb-6" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl text-warm-white mb-4">
                    {f.title}
                  </h3>
                  <p className="text-cream/70 leading-relaxed text-sm">{f.body}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
