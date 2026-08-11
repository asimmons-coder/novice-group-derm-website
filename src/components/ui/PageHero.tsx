import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { clsx } from '@/lib/clsx';

interface PageHeroProps {
  label: string;
  primary: string;
  accent: string;
  description?: string;
  bg?: 'cream' | 'sand-light' | 'gradient-cosmetic';
  align?: 'left' | 'center';
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}

const bgClasses = {
  cream: 'bg-cream',
  'sand-light': 'bg-sand-light',
  'gradient-cosmetic':
    'bg-[linear-gradient(135deg,var(--color-sage-light)_0%,var(--color-blush-light)_50%,var(--color-sand-light)_100%)]',
};

export function PageHero({
  label,
  primary,
  accent,
  description,
  bg = 'cream',
  align = 'left',
  image,
  children,
}: PageHeroProps) {
  const content = (
    <>
      <SectionLabel align={align}>{label}</SectionLabel>
      <SignatureHeadline as="h1" primary={primary} accent={accent} size="xl" align={align} />
      {description && (
        <p className="mt-8 text-lg text-warm-gray leading-relaxed max-w-2xl">{description}</p>
      )}
      {children}
    </>
  );

  return (
    <section className={clsx('relative pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden', bgClasses[bg])}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 12% 18%, rgba(143,166,143,0.08) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(212,166,154,0.08) 0%, transparent 45%)',
        }}
      />

      <Container size="wide">
        {image ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className={clsx('lg:col-span-7', align === 'center' && 'text-center')}>
              {content}
            </Reveal>
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        ) : (
          <Reveal className={clsx(align === 'center' && 'text-center', 'max-w-3xl', align === 'center' && 'mx-auto')}>
            {content}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
