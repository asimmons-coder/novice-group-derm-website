import Image from 'next/image';
import { LinkButton } from '@/components/ui/Button';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';

const HERO_IMAGE =
  'https://novicegroupderm.com/wp-content/uploads/2025/12/Homepage_Desktop-scaled.jpg';

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
              <span className="font-[family-name:var(--font-accent)] italic font-normal text-warm-gray">
                from generation
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

      <Reveal
        delay={0.4}
        aria-hidden
        className="absolute right-[-10%] top-[18%] hidden lg:block w-96 h-96 rounded-full border border-gold/25 pointer-events-none"
      >
        <span className="sr-only">decoration</span>
      </Reveal>
      <Reveal
        delay={0.6}
        aria-hidden
        className="absolute right-[6%] bottom-[8%] hidden lg:block w-64 h-64 rounded-full border border-taupe/30 pointer-events-none"
      >
        <span className="sr-only">decoration</span>
      </Reveal>
    </section>
  );
}
