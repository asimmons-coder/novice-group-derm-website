import Image from 'next/image';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/lib/images';

const tags = ['Botox', 'Dysport', 'Fillers', 'Kybella', 'Microneedling', 'Peels', 'Lasers'];

export function CosmeticCTA() {
  return (
    <Section bg="gradient-cosmetic" padding="xl">
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
                className="px-5 py-2.5 bg-warm-white/60 backdrop-blur-sm border border-warm-white rounded-full text-xs font-semibold text-charcoal/80 hover:bg-warm-white hover:scale-105 transition-all cursor-default"
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

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={images.cosmetic.botox}
                alt="Cosmetic dermatology treatment — before"
                fill
                sizes="(max-width: 1024px) 45vw, 280px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-warm-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal">
                  Before
                </span>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl mt-12">
              <Image
                src={images.cosmetic.fillers}
                alt="Cosmetic dermatology result — after"
                fill
                sizes="(max-width: 1024px) 45vw, 280px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-warm-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal">
                  After
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
