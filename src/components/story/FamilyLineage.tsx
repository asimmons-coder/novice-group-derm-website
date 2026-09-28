'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import { images } from '@/lib/images';

// One line, drawn down the page as you scroll: from Dr. Fred, branching to his
// daughters, and joined by the practice's nurse practitioner. Only dates that
// appear in src/lib/site.ts are used here (MD 1983, practice opened 1999).

interface Props {
  className?: string;
}

export function FamilyLineage({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const segment = (from: number, to: number) => ({ progress: scrollYProgress, from, to, reduce });

  return (
    <Section bg="cream" padding="xl" className={className}>
      <Reveal className="mb-16 text-center">
        <SectionLabel align="center">The Family Line</SectionLabel>
        <SignatureHeadline primary="From one doctor" accent="to a family practice." align="center" size="lg" />
      </Reveal>

      <div ref={ref} className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Medallion src={images.providers.fred} alt="Dr. Fred Novice" size="lg" />
        <h3 className="mt-5 font-display text-2xl text-charcoal">Dr. Fred Novice</h3>
        <p className="mt-1 text-sm text-warm-gray">Dermatologist and dermatopathologist</p>

        <Trunk {...segment(0, 0.12)} />
        <Milestone year="1983" text="Earns his MD at the University of Toronto" />
        <Trunk {...segment(0.12, 0.24)} />
        <Milestone year="1999" text="Opens Novice Group Dermatology in Bloomfield Hills" />
        <Trunk {...segment(0.24, 0.32)} />

        <Branch {...segment(0.32, 0.46)} />
        <div className="grid w-full max-w-md grid-cols-2">
          <Person
            src={images.providers.karlee}
            name="Dr. Karlee Novice"
            role="Dermatologist"
            note="Chief Resident at Henry Ford Hospital"
          />
          <Person
            src={images.providers.taylor}
            name="Dr. Taylor Novice"
            role="Dermatologist and dermatopathologist"
            note="Academic Chief Resident at Henry Ford"
          />
        </div>
        <Branch {...segment(0.56, 0.7)} merge />

        <Trunk {...segment(0.7, 0.8)} tone="gold" />
        <Medallion src={images.providers.erin} alt="Erin Koppelman" tone="gold" />
        <h3 className="mt-5 font-display text-xl text-charcoal">Erin Koppelman, NP</h3>
        <p className="mt-1 max-w-xs text-balance text-sm leading-relaxed text-warm-gray">
          Board-certified nurse practitioner, with a background in hospital cardiology and
          intensive care
        </p>
        <Trunk {...segment(0.8, 0.92)} tone="gold" />
        <div aria-hidden className="h-3 w-3 rounded-full bg-sage-deep ring-4 ring-sage-light" />
        <p className="mt-5 text-balance font-accent text-2xl text-charcoal/80">
          Three dermatologists and a nurse practitioner, under one roof.
        </p>
      </div>
    </Section>
  );
}

interface SegmentProps {
  progress: MotionValue<number>;
  from: number;
  to: number;
  reduce: boolean;
  tone?: 'sage' | 'gold';
}

function useDrawn({ progress, from, to, reduce }: SegmentProps) {
  const drawn = useTransform(progress, [from, to], [0, 1]);
  return reduce ? 1 : drawn;
}

const strokeFor = (tone: 'sage' | 'gold' = 'sage') => (tone === 'gold' ? 'var(--color-gold)' : 'var(--color-sage-deep)');

// A straight stretch of line; the viewBox is stretched to the element's height
function Trunk(props: SegmentProps) {
  const pathLength = useDrawn(props);
  return (
    <svg aria-hidden viewBox="0 0 4 100" preserveAspectRatio="none" className="my-3 h-14 w-1 md:h-16">
      <line x1="2" y1="0" x2="2" y2="100" stroke="var(--color-sand)" strokeWidth="1.5" />
      <motion.path d="M2 0 V100" stroke={strokeFor(props.tone)} strokeWidth="1.5" fill="none" style={{ pathLength }} />
    </svg>
  );
}

// The line splits to two medallions (or rejoins from them) at 25% and 75%
function Branch(props: SegmentProps & { merge?: boolean }) {
  const pathLength = useDrawn(props);
  const paths = props.merge
    ? ['M100 0 C 100 40, 200 40, 200 80', 'M300 0 C 300 40, 200 40, 200 80']
    : ['M200 0 C 200 40, 100 40, 100 80', 'M200 0 C 200 40, 300 40, 300 80'];
  return (
    <svg aria-hidden viewBox="0 0 400 80" className="block w-full max-w-md">
      {paths.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-sand)" strokeWidth="1.5" />
          <motion.path d={d} fill="none" stroke={strokeFor(props.tone)} strokeWidth="1.5" strokeLinecap="round" style={{ pathLength }} />
        </g>
      ))}
    </svg>
  );
}

function Milestone({ year, text }: { year: string; text: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="rounded-full border border-sand bg-warm-white px-4 py-1.5 font-display text-lg text-gold-deep">{year}</span>
      <p className="mt-3 max-w-xs text-balance text-sm leading-relaxed text-charcoal/80">{text}</p>
    </div>
  );
}

function Person({ src, name, role, note }: { src: string; name: string; role: string; note: string }) {
  return (
    <div className="flex flex-col items-center px-2">
      <Medallion src={src} alt={name} />
      <h3 className="mt-4 font-display text-lg leading-snug text-charcoal md:text-xl">{name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-warm-gray md:text-sm">{role}</p>
      <p className="mt-2 text-xs leading-relaxed text-sage-deep md:text-sm">{note}</p>
    </div>
  );
}

interface MedallionProps {
  src: string;
  alt: string;
  size?: 'md' | 'lg';
  tone?: 'sage' | 'gold';
}

function Medallion({ src, alt, size = 'md', tone = 'sage' }: MedallionProps) {
  return (
    <motion.div
      className={size === 'lg' ? 'relative h-32 w-32 md:h-36 md:w-36' : 'relative h-24 w-24 md:h-28 md:w-28'}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`absolute -inset-1.5 rounded-full border ${tone === 'gold' ? 'border-gold' : 'border-sage'}`} />
      <div className="relative h-full w-full overflow-hidden rounded-full bg-sand-light shadow-md">
        <Image src={src} alt={alt} fill sizes="144px" className="object-cover object-top" />
      </div>
    </motion.div>
  );
}
