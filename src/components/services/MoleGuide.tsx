'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { blobPath, seeded } from '@/components/art/geometry';
import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import { booking } from '@/lib/site';

// Each sign starts as an ordinary, even mole and morphs into the warning sign
// once in view. Hovering a card shows the ordinary mole again for comparison.
// Every blob uses the same sample count so framer can interpolate the paths.
const C = 60;
const SAMPLES = 28;

const jitter = (seed: number, amount: number) => {
  const rand = seeded(seed);
  const offsets = Array.from({ length: SAMPLES }, () => (rand() - 0.5) * amount);
  return (theta: number) => offsets[Math.round((theta / (Math.PI * 2)) * SAMPLES) % SAMPLES];
};

const ordinary = (radius: number, seed = 3) => {
  const wobble = jitter(seed, 1.2);
  return blobPath((theta) => radius + wobble(theta), C, C, SAMPLES);
};

const asymmetric = (() => {
  const wobble = jitter(8, 1.5);
  return blobPath(
    (theta) => {
      const lobe = (center: number, width: number) => {
        const delta = Math.atan2(Math.sin(theta - center), Math.cos(theta - center));
        return Math.exp(-(delta * delta) / width);
      };
      return 20 + 13 * lobe(0.35, 0.5) + 5 * lobe(-1.6, 0.3) + wobble(theta);
    },
    C - 5,
    C,
    SAMPLES,
  );
})();

const irregularBorder = (() => {
  const wobble = jitter(13, 5);
  return blobPath((theta) => 24 + 3 * Math.sin(5 * theta) + 2 * Math.sin(9 * theta + 1) + wobble(theta), C, C, SAMPLES);
})();

const evolvingShapes = [
  ordinary(18, 21),
  blobPath((theta) => 21 + 3 * Math.sin(2 * theta + 0.6) + 1.5 * Math.sin(5 * theta), C, C, SAMPLES),
  blobPath((theta) => 25 + 5 * Math.sin(2 * theta + 0.6) + 3 * Math.sin(4 * theta + 2) + 2 * Math.sin(7 * theta), C, C, SAMPLES),
];

// Patches of uneven pigment for C, clipped to the spot
const colorPatches = [
  { d: ordinary(11, 31), transform: 'translate(-9 -6)', fill: 'var(--color-charcoal)', opacity: 0.85 },
  { d: ordinary(9, 37), transform: 'translate(10 8)', fill: 'var(--color-sage-deep)', opacity: 0.9 },
  { d: ordinary(7, 41), transform: 'translate(12 -12)', fill: 'var(--color-sage-muted)', opacity: 0.95 },
];

type SignKey = 'A' | 'B' | 'C' | 'D' | 'E';

interface Sign {
  key: SignKey;
  title: string;
  line: string;
  from: string;
  to: string;
}

const signs: Sign[] = [
  {
    key: 'A',
    title: 'Asymmetry',
    line: 'One half of the spot does not match the other half.',
    from: ordinary(24),
    to: asymmetric,
  },
  {
    key: 'B',
    title: 'Border',
    line: 'The edge is irregular, scalloped, or poorly defined.',
    from: ordinary(24, 5),
    to: irregularBorder,
  },
  {
    key: 'C',
    title: 'Color',
    line: 'The color varies from one area to another, with shades of tan, brown, or black.',
    from: ordinary(24, 7),
    to: ordinary(25, 7),
  },
  {
    key: 'D',
    title: 'Diameter',
    line: 'Melanomas are usually larger than 6 millimeters, about the size of a pencil eraser, though they can be smaller.',
    from: ordinary(11, 9),
    to: ordinary(24, 9),
  },
  {
    key: 'E',
    title: 'Evolving',
    line: 'The spot looks different from your other moles, or it is changing in size, shape, or color.',
    from: evolvingShapes[0],
    to: evolvingShapes[2],
  },
];

const ease = [0.65, 0, 0.35, 1] as const;

function SpotArt({ sign, showSign, reduce }: { sign: Sign; showSign: boolean; reduce: boolean }) {
  const duration = reduce ? 0 : 1.4;
  const clipId = `mole-clip-${sign.key}`;
  const spotD = showSign ? sign.to : sign.from;

  return (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full">
      <circle cx={C} cy={C} r="56" fill="var(--color-sage-light)" />

      {sign.key === 'E' && (
        <g fill="none" stroke="var(--color-charcoal)" strokeLinecap="round">
          <motion.path d={evolvingShapes[0]} strokeOpacity={0.3} strokeDasharray="2 4" initial={{ opacity: 0 }} animate={{ opacity: showSign ? 1 : 0 }} transition={{ duration }} />
          <motion.path d={evolvingShapes[1]} strokeOpacity={0.4} strokeDasharray="2 4" initial={{ opacity: 0 }} animate={{ opacity: showSign ? 1 : 0 }} transition={{ duration, delay: reduce ? 0 : 0.4 }} />
        </g>
      )}

      <defs>
        <clipPath id={clipId}>
          <motion.path initial={{ d: sign.from }} animate={{ d: spotD }} transition={{ duration, ease }} />
        </clipPath>
      </defs>
      <motion.path
        initial={{ d: sign.from }}
        animate={{ d: spotD }}
        transition={{ duration, ease }}
        fill="var(--color-charcoal)"
        fillOpacity={sign.key === 'C' ? 0.45 : 0.72}
      />
      {sign.key === 'C' && (
        <g clipPath={`url(#${clipId})`}>
          {colorPatches.map((patch, idx) => (
            <motion.path
              key={patch.fill}
              d={patch.d}
              transform={patch.transform}
              fill={patch.fill}
              initial={{ opacity: 0 }}
              animate={{ opacity: showSign ? patch.opacity : 0 }}
              transition={{ duration, delay: reduce ? 0 : idx * 0.25 }}
            />
          ))}
        </g>
      )}

      {sign.key === 'A' && (
        // Fold line: the two halves no longer mirror each other
        <motion.line
          x1={C}
          y1="22"
          x2={C}
          y2="98"
          stroke="var(--color-sage-deep)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSign ? 1 : 0 }}
          transition={{ duration }}
        />
      )}
      {sign.key === 'D' && (
        // A 6 mm reference span, drawn to the same scale as the ordinary mole
        <g stroke="var(--color-sage-deep)" strokeWidth="1.2" strokeLinecap="round">
          <line x1="47" y1="101" x2="73" y2="101" />
          <line x1="47" y1="97" x2="47" y2="105" />
          <line x1="73" y1="97" x2="73" y2="105" />
        </g>
      )}
    </svg>
  );
}

function SignCard({ sign, active, reduce, index }: { sign: Sign; active: boolean; reduce: boolean; index: number }) {
  const [comparing, setComparing] = useState(false);
  return (
    <motion.li
      className="flex items-center gap-5 rounded-3xl border border-sand bg-warm-white p-5 lg:flex-col lg:items-start lg:gap-6 lg:p-7"
      onHoverStart={() => setComparing(true)}
      onHoverEnd={() => setComparing(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: reduce ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-24 w-24 shrink-0 lg:h-32 lg:w-32">
        <SpotArt sign={sign} showSign={active && !comparing} reduce={reduce} />
      </div>
      <div>
        <h3 className="flex items-baseline gap-3 text-charcoal">
          <span className="font-display text-3xl leading-none text-sage-deep">{sign.key}</span>
          <span className="font-display text-xl">{sign.title}</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-warm-gray">{sign.line}</p>
      </div>
    </motion.li>
  );
}

export function MoleGuide() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.3 });
  const reduce = usePrefersReducedMotion();

  return (
    <Section bg="warm-white" padding="xl">
      <Reveal className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel>Checking Your Moles</SectionLabel>
          <SignatureHeadline primary="The ABCDEs" accent="of melanoma." size="lg" />
        </div>
        <div className="lg:col-span-5">
          <p className="text-lg leading-relaxed text-warm-gray">
            Most moles are harmless. Dermatologists use five warning signs to spot one
            that could be melanoma. If you notice any of them, or a spot that is new,
            itchy, or bleeding, have it checked.
          </p>
        </div>
      </Reveal>

      <ol ref={listRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {signs.map((sign, idx) => (
          <SignCard key={sign.key} sign={sign} active={inView} reduce={reduce} index={idx} />
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-warm-gray">
          A guide helps you know what to watch for. Only an exam can tell what a spot is,
          so bring any concern to your visit.
        </p>
        <LinkButton href={booking.url} external={booking.external} size="lg" withArrow>
          Book a skin check
        </LinkButton>
      </div>
    </Section>
  );
}
