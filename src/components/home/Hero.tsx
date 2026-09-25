import Image from 'next/image';
import { LinkButton } from '@/components/ui/Button';
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';

const HERO_IMAGE = '/images/hero-family.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="The Novice Group Dermatology team"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent md:via-cream/40"
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative">
        <StaggerGroup className="max-w-2xl">
          <StaggerItem>
            <span className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6">
              Est. 1999, Bloomfield Hills, MI
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-charcoal mb-8">
              Love your skin,
              <br />
              <span className="relative inline-block font-[family-name:var(--font-accent)] font-normal text-warm-gray">
                from generation
                <DrawnUnderline className="-bottom-1 md:-bottom-2 h-3 md:h-4" delay={1.1} />
              </span>
              <br />
              to generation.
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-lg md:text-xl text-charcoal/70 mb-10 leading-relaxed max-w-lg">
              A private, family-owned practice led by a father-daughter trio of
              board-certified dermatologists. World-class medical, surgical,
              and cosmetic care for over 25 years.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton href="/contact" variant="dark" size="lg" withArrow>
                Schedule a Visit
              </LinkButton>
              <LinkButton href="/services" variant="outline" size="lg">
                Explore Services
              </LinkButton>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-charcoal/50 font-semibold">
          Scroll
        </span>
        <span className="relative block h-12 w-px bg-charcoal/10 overflow-hidden">
          <span className="absolute inset-0 bg-charcoal/60 animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
