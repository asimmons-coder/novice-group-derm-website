import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const tags = ['Botox', 'Dysport', 'Fillers', 'Kybella', 'Microneedling', 'Peels', 'Lasers'];

export function CosmeticCTA() {
  return (
    <Section bg="gradient-cosmetic" padding="xl" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <SectionLabel>The Cosmetic Practice</SectionLabel>
          <SignatureHeadline
            primary="Subtle refinement."
            accent="Not reinvention."
            size="lg"
          />
          <p className="mt-8 text-lg text-charcoal/75 leading-relaxed max-w-xl">
            Cosmetic dermatology done right is invisible. You should look like
            yourself, rested. Symmetrical, not stretched. With more than three
            decades of injection experience, Dr. Fred Novice approaches every
            face with the eye of an artist and the precision of a surgeon.
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <li
                key={tag}
                className="px-5 py-2.5 bg-warm-white/60 backdrop-blur-sm border border-warm-white rounded-full text-xs font-semibold text-charcoal/80 hover:bg-warm-white transition-colors cursor-default"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <LinkButton
              href="/services/cosmetic-aesthetics"
              variant="dark"
              size="lg"
              withArrow
            >
              Schedule a Cosmetic Consultation
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 md:-inset-10 animate-morph bg-[linear-gradient(135deg,var(--color-blush)_0%,var(--color-blush-light)_55%,var(--color-sage-light)_100%)] opacity-60 blur-2xl"
          />
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="absolute -top-8 -right-4 w-20 h-20 animate-float text-gold"
          >
            <path d="M50 8 Q50 50 92 50 Q50 50 50 92 Q50 50 8 50 Q50 50 50 8Z" fill="currentColor" fillOpacity="0.8" />
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="absolute bottom-10 -left-6 w-10 h-10 animate-float [animation-delay:-3s] text-blush"
          >
            <path d="M50 8 Q50 50 92 50 Q50 50 50 92 Q50 50 8 50 Q50 50 50 8Z" fill="currentColor" />
          </svg>
          <div className="relative bg-warm-white/40 backdrop-blur-sm border border-warm-white/60 rounded-3xl p-10 md:p-14">
            <p className="font-display text-5xl text-sand leading-none mb-6 select-none" aria-hidden>
              &ldquo;
            </p>
            <p className="font-accent text-xl md:text-2xl text-charcoal/85 leading-relaxed mb-8">
              The goal is never to change your face. It&rsquo;s to restore
              what time has shifted. Symmetry, volume, movement. When it&rsquo;s
              done well, people notice you, not the work.
            </p>
            <p className="text-sm font-bold text-charcoal">Dr. Fred M. Novice</p>
            <p className="text-xs text-warm-gray mt-1">30+ years of injection experience</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
