import Image from 'next/image';
import { LinkButton } from '@/components/ui/Button';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';

const HERO_IMAGE = '/images/hero-family.jpg';

// Entrance runs in CSS (hero-rise), not framer, so it starts before hydration.
// The headline only rises and never starts transparent: it is the largest paint.
function HeroCopy() {
  return (
    <div className="max-w-xl">
      <div className="hero-rise" style={{ animationDelay: '0ms' }}>
        <span className="inline-block text-gold-deep uppercase tracking-[0.4em] text-xs font-semibold mb-6">
          Est. 1999, Bloomfield Hills, MI
        </span>
      </div>

      <div className="hero-rise-headline" style={{ animationDelay: '80ms' }}>
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
      </div>

      <div className="hero-rise" style={{ animationDelay: '200ms' }}>
        <p className="text-lg md:text-xl text-charcoal/70 mb-10 leading-relaxed max-w-lg">
          A private, family-owned practice led by a father-daughter trio of
          board-certified dermatologists. World-class medical, surgical,
          and cosmetic care since 1999.
        </p>
      </div>

      <div className="hero-rise" style={{ animationDelay: '300ms' }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <LinkButton href="/contact" variant="dark" size="lg" withArrow>
            Schedule a Visit
          </LinkButton>
          <LinkButton href="/services" variant="outline" size="lg">
            Explore Services
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Mobile: portrait band, then copy. Avoids min-h-screen + cream overlay hiding faces. */}
      <div className="flex flex-col md:min-h-screen md:flex-row md:items-center">
        <div className="relative h-[62vh] min-h-[340px] w-full md:absolute md:inset-0 md:h-auto md:min-h-0">
          <Image
            src={HERO_IMAGE}
            alt="The Novice Group Dermatology team"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[center_20%] md:object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/85 to-transparent md:block"
          />
        </div>

        <div className="relative w-full bg-cream px-6 py-12 md:bg-transparent md:px-12 md:py-0 md:pt-32">
          <div className="mx-auto w-full max-w-7xl">
            <HeroCopy />
          </div>
        </div>
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
