'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';

const stations = [
  {
    title: 'The exam room',
    line: 'Your dermatologist examines the spot and, if needed, takes a small biopsy during your visit.',
    Art: ExamArt,
  },
  {
    title: 'Under the microscope',
    line: 'A lab prepares the slide. Dr. Fred or Dr. Taylor, both fellowship-trained dermatopathologists, reads it.',
    Art: SlideArt,
  },
  {
    title: 'Your diagnosis',
    line: 'We call you with the result and walk you through the next steps.',
    Art: ReportArt,
  },
];

// Three stations joined by one line that draws itself as the section scrolls
// through the viewport. Horizontal from md up, a vertical rail on phones.
export function BiopsyJourney() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 75%'] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = reduce ? 1 : drawn;

  return (
    <Section bg="warm-white" padding="xl">
      <Reveal className="text-center mb-16">
        <SectionLabel align="center">The Process</SectionLabel>
        <SignatureHeadline primary="From biopsy" accent="to answer." align="center" size="lg" />
      </Reveal>

      <ol ref={ref} className="relative mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {/* Desktop: a gentle wave through the three station centres */}
        <svg
          aria-hidden
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 w-full md:block"
        >
          <path d="M200 80 C 330 20, 470 140, 600 80 S 870 20, 1000 80" fill="none" stroke="var(--color-taupe)" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
          <motion.path
            d="M200 80 C 330 20, 470 140, 600 80 S 870 20, 1000 80"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
        {stations.map(({ title, line, Art }, idx) => (
          <li key={title} className="relative flex items-start gap-6 md:flex-col md:items-center md:gap-0 md:text-center">
            {idx < stations.length - 1 && (
              <RailSegment progress={scrollYProgress} from={idx / 2} reduce={reduce} />
            )}
            <Station progress={scrollYProgress} at={idx / 2} reduce={reduce}>
              <Art />
            </Station>
            <div className="pt-3 md:pt-8">
              <span className="section-label block text-gold-deep">Step {idx + 1}</span>
              <h3 className="mt-2 font-display text-2xl text-charcoal">{title}</h3>
              <p className="mt-3 leading-relaxed text-warm-gray md:mx-auto md:max-w-[17rem]">{line}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

interface RailSegmentProps {
  progress: MotionValue<number>;
  from: number;
  reduce: boolean;
}

// Phone layout: each station draws its own stretch of rail down to the next
// station's centre (48px into the next item, past the 40px gap).
function RailSegment({ progress, from, reduce }: RailSegmentProps) {
  const drawn = useTransform(progress, [from, from + 0.5], [0, 1]);
  const d = 'M10 0 C 18 30, 2 70, 10 100';
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-[38px] top-12 h-[calc(100%+2.5rem)] w-5 md:hidden"
    >
      <path d={d} fill="none" stroke="var(--color-taupe)" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
      <motion.path d={d} fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: reduce ? 1 : drawn }} />
    </svg>
  );
}

interface StationProps {
  progress: MotionValue<number>;
  at: number;
  reduce: boolean;
  children: React.ReactNode;
}

// The ring turns gold as the line arrives at each station
function Station({ progress, at, reduce, children }: StationProps) {
  const arrived = useTransform(progress, [Math.max(0, at - 0.08), at + 0.02], [0, 1]);
  return (
    <div className="relative h-24 w-24 shrink-0 md:h-40 md:w-40">
      <div className="absolute inset-0 rounded-full border border-sand bg-cream shadow-sm" />
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-full border-2 border-gold"
        style={{ opacity: reduce ? 1 : arrived }}
      />
      <div className="absolute inset-0 overflow-hidden rounded-full">{children}</div>
    </div>
  );
}

const line = {
  fill: 'none',
  stroke: 'var(--color-charcoal)',
  strokeOpacity: 0.7,
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// A dermatoscope held over a spot on the skin, its light ring lit in gold
function ExamArt() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      {[46, 62, 78, 94, 110, 126].map((y) => (
        <path key={y} d={`M0 ${y} C 50 ${y - 8}, 110 ${y + 8}, 160 ${y - 2}`} fill="none" stroke="var(--color-taupe)" strokeOpacity="0.22" />
      ))}
      <g transform="rotate(38 104 104)">
        <rect x="96" y="94" width="16" height="58" rx="6" {...line} fill="var(--color-warm-white)" />
        <line x1="100" y1="112" x2="108" y2="112" {...line} strokeOpacity={0.35} />
      </g>
      <circle cx="72" cy="72" r="34" fill="var(--color-warm-white)" />
      <circle cx="72" cy="72" r="34" {...line} />
      <circle cx="72" cy="72" r="27" fill="var(--color-sage-light)" />
      <path d="M62 66 C 66 58, 80 60, 82 68 C 85 76, 78 84, 70 82 C 62 81, 59 73, 62 66 Z" fill="var(--color-sage-deep)" fillOpacity="0.8" />
      <circle cx="75" cy="70" r="3" fill="var(--color-charcoal)" fillOpacity="0.45" />
      {Array.from({ length: 12 }, (_, idx) => {
        const angle = (idx / 12) * Math.PI * 2;
        return (
          <circle
            key={idx}
            cx={Math.round((72 + Math.cos(angle) * 30.5) * 10) / 10}
            cy={Math.round((72 + Math.sin(angle) * 30.5) * 10) / 10}
            r="1.4"
            fill="var(--color-gold)"
          />
        );
      })}
    </svg>
  );
}

// A glass slide with its tissue section, and the magnified field above it
function SlideArt() {
  const cells = Array.from({ length: 22 }, (_, idx) => {
    const angle = idx * 2.399963;
    const radius = 6.5 * Math.sqrt(idx + 1);
    return {
      cx: Math.round((80 + radius * Math.cos(angle)) * 10) / 10,
      cy: Math.round((64 + radius * Math.sin(angle)) * 10) / 10,
      tone: idx % 4 === 0 ? 'var(--color-gold)' : 'var(--color-sage)',
    };
  });
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      <rect x="22" y="112" width="116" height="30" rx="4" fill="var(--color-sage-light)" stroke="var(--color-taupe)" strokeOpacity="0.8" />
      <rect x="26" y="116" width="24" height="22" rx="2" fill="var(--color-gold-light)" />
      <path d="M78 122 C 88 116, 104 118, 110 126 C 114 132, 100 136, 88 134 C 78 132, 72 128, 78 122 Z" fill="var(--color-sage)" fillOpacity="0.55" />
      <line x1="92" y1="98" x2="92" y2="118" stroke="var(--color-gold)" strokeWidth="1.2" strokeDasharray="2 3" />
      <circle cx="80" cy="64" r="36" fill="var(--color-warm-white)" />
      <clipPath id="journey-field">
        <circle cx="80" cy="64" r="32" />
      </clipPath>
      <g clipPath="url(#journey-field)">
        <rect x="44" y="28" width="72" height="72" fill="var(--color-sage-light)" />
        <g className="animate-scan">
          <path d="M30 50 C 60 30, 90 90, 130 56" fill="none" stroke="var(--color-sage-muted)" strokeOpacity="0.5" strokeWidth="10" />
          {cells.map((cell) => (
            <g key={`${cell.cx}-${cell.cy}`}>
              <ellipse cx={cell.cx} cy={cell.cy} rx="4.5" ry="3.4" fill={cell.tone} fillOpacity="0.4" />
              <circle cx={cell.cx} cy={cell.cy} r="1.3" fill="var(--color-charcoal)" fillOpacity="0.5" />
            </g>
          ))}
        </g>
        <line x1="80" y1="32" x2="80" y2="96" stroke="var(--color-charcoal)" strokeOpacity="0.3" strokeWidth="0.6" />
        <line x1="48" y1="64" x2="112" y2="64" stroke="var(--color-charcoal)" strokeOpacity="0.3" strokeWidth="0.6" />
      </g>
      <circle cx="80" cy="64" r="34" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
    </svg>
  );
}

// A written report with the slide thumbnail, signed off by the same doctor
function ReportArt() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="h-full w-full">
      <rect x="44" y="28" width="72" height="100" rx="6" {...line} fill="var(--color-warm-white)" />
      <circle cx="98" cy="46" r="9" fill="var(--color-sage-light)" stroke="var(--color-gold)" strokeWidth="1.2" />
      <circle cx="96" cy="45" r="2" fill="var(--color-sage)" />
      <circle cx="100" cy="48" r="1.6" fill="var(--color-sage)" />
      {[
        [54, 44, 30],
        [54, 54, 26],
        [54, 70, 52],
        [54, 80, 46],
        [54, 90, 50],
      ].map(([x, y, width]) => (
        <line key={y} x1={x} y1={y} x2={x + width} y2={y} stroke="var(--color-sage-muted)" strokeWidth="3" strokeLinecap="round" />
      ))}
      <motion.path
        d="M56 112 C 60 100, 66 116, 70 106 S 78 104, 80 110 C 82 114, 88 102, 92 108 L 104 106"
        fill="none"
        stroke="var(--color-gold-deep)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
