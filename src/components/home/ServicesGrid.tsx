import Link from 'next/link';
import { Stethoscope, Sparkles, Scissors, Microscope, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';

const cards = [
  {
    slug: 'medical-dermatology',
    icon: Stethoscope,
    title: 'Medical Dermatology',
    description:
      'Acne, eczema, psoriasis, rosacea, skin cancer screening, mole monitoring. The clinical foundation of every healthy skin journey.',
    accent: 'bg-sage',
    iconBg: 'bg-sage-light text-sage',
  },
  {
    slug: 'dermatopathology',
    icon: Microscope,
    title: 'Dermatopathology',
    description:
      'In-house biopsy diagnosis. The same dermatologist who examines your skin reads your slides under the microscope.',
    accent: 'bg-gold',
    iconBg: 'bg-gold-light text-gold',
  },
  {
    slug: 'cosmetic-aesthetics',
    icon: Sparkles,
    title: 'Cosmetic & Aesthetics',
    description:
      'Botox, fillers, microneedling, lasers, peels. Three decades of injection artistry focused on subtle, natural results.',
    accent: 'bg-blush',
    iconBg: 'bg-blush-light text-blush',
  },
  {
    slug: 'surgical-dermatology',
    icon: Scissors,
    title: 'Surgical Procedures',
    description:
      'Skin cancer surgery, Mohs coordination, mole and cyst removal — performed with precision and a focus on cosmetic outcomes.',
    accent: 'bg-charcoal',
    iconBg: 'bg-sand text-charcoal',
  },
];

export function ServicesGrid() {
  return (
    <Section bg="warm-white" padding="xl" id="services">
      <Reveal className="text-center mb-16">
        <SectionLabel align="center">What We Do</SectionLabel>
        <SignatureHeadline
          primary="Complete skin care,"
          accent="under one roof."
          align="center"
          size="lg"
        />
        <p className="mt-6 max-w-2xl mx-auto text-warm-gray text-lg">
          Most practices send patients across town for biopsies, surgery, or
          cosmetic care. We don&rsquo;t. Every step happens here, with the doctors
          you already know.
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <StaggerItem key={card.slug}>
              <Link
                href={`/services/${card.slug}`}
                className="group relative block h-full bg-warm-white border border-sand rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-charcoal/10 overflow-hidden"
              >
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 right-0 h-[3px] ${card.accent}`}
                />
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} mb-6`}>
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed mb-8">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal/80 group-hover:text-sage transition-colors">
                  Learn More
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
