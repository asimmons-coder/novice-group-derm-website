import Image from 'next/image';
import { LinkButton } from '@/components/ui/Button';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';

// Portrait frame from the family shoot: unlike the wide hero-family.jpg it keeps
// all three doctors fully in frame, so a tight crop reads as intentional.
const HERO_IMAGE = '/images/providers-trio.jpg';

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
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl leading-[1.05] tracking-tight text-charcoal mb-6 md:mb-8">
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
        <p className="text-lg md:text-xl text-charcoal/70 mb-8 md:mb-10 leading-relaxed max-w-lg [text-wrap:pretty]">
          A private, <span className="whitespace-nowrap">family-owned</span> practice led by a father and his two
          daughters, all <span className="whitespace-nowrap">board-certified</span> dermatologists. Medical, surgical,
          and cosmetic care in Bloomfield Hills since 1999.
        </p>
      </div>

      <div className="hero-rise" style={{ animationDelay: '300ms' }}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
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
  // Text and photo sit in separate columns: the family photo is 2:1 with all
  // three doctors spread across it, so any overlay puts the headline on a face.
  // Container matches the Navbar so the logo and headline share a left edge.
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 pt-24 pb-14 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-20">
          <div className="relative order-first aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/9] lg:order-last lg:aspect-square xl:aspect-[5/4]">
            <Image
              src={HERO_IMAGE}
              alt="Dr. Fred Novice with his daughters, Dr. Karlee Novice and Dr. Taylor Novice"
              fill
              preload
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[50%_100%] md:object-[50%_80%] lg:object-[50%_100%]"
            />
          </div>
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}
