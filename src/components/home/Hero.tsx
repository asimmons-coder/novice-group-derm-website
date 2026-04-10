import Image from 'next/image';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { LinkButton } from '@/components/ui/Button';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { Container } from '@/components/ui/Container';
import { images } from '@/lib/images';

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
      {/* Decorative ambient layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 12% 18%, rgba(143,166,143,0.10) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(212,166,154,0.12) 0%, transparent 45%)',
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full border border-sand/60 -z-10"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-0 w-[520px] h-[520px] rounded-full border border-sand/40 -z-10"
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <StaggerGroup className="lg:col-span-6 max-w-xl">
            <StaggerItem>
              <SectionLabel>Three Generations of Expertise</SectionLabel>
            </StaggerItem>
            <StaggerItem>
              <SignatureHeadline
                as="h1"
                primary="Skin health,"
                accent="elevated."
                size="xl"
                className="mb-8"
              />
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-warm-gray leading-relaxed mb-10 max-w-md">
                A family-owned dermatology practice in Bloomfield Hills offering
                medical, cosmetic, surgical, and in-house pathology care under
                one roof. Three board-certified dermatologists. One uncompromising
                standard.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-wrap gap-4">
                <LinkButton href="/contact" variant="primary" size="lg" withArrow>
                  Book a Consultation
                </LinkButton>
                <LinkButton href="/our-story" variant="outline" size="lg">
                  Meet Our Team
                </LinkButton>
              </div>
            </StaggerItem>
          </StaggerGroup>

          {/* Image */}
          <Reveal delay={0.2} className="lg:col-span-6">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full max-w-[560px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src={images.hero.portrait}
                  alt="Editorial portrait representing the Novice Group Dermatology team"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-charcoal/20"
                />
              </div>

              {/* Floating badge */}
              <Reveal
                delay={0.6}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-warm-white shadow-xl rounded-2xl px-6 py-5 border border-sand"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-px bg-gold" />
                  <div>
                    <p className="font-display text-3xl text-charcoal leading-none">
                      25<span className="text-gold">+</span>
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-warm-gray font-semibold">
                      Years of Excellence
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal
                delay={0.8}
                className="hidden md:block absolute -top-4 -right-6 bg-cream/80 backdrop-blur-md border border-sand rounded-full px-5 py-2.5 shadow-md"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal">
                  Bloomfield Hills, MI
                </p>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
