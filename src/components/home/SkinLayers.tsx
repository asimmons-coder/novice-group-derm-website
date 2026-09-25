'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { clsx } from '@/lib/clsx';

type Layer = 'epidermis' | 'dermis' | 'subcutis';

interface Focus {
  key: string;
  tab: string;
  title: string;
  body: string;
  href: string;
  layers: Layer[];
  markers: { x: number; y: number }[];
  color: string;
  overlay?: 'biopsy' | 'excision';
}

const focuses: Focus[] = [
  {
    key: 'medical',
    tab: 'Medical',
    title: 'Where most skin concerns begin',
    body:
      'Acne, eczema, psoriasis, and rosacea play out in the outer layers of the skin. A skin cancer screening starts here too, with a careful look at every spot and mole.',
    href: '/services/medical-dermatology',
    layers: ['epidermis', 'dermis'],
    markers: [
      { x: 250, y: 118 },
      { x: 470, y: 150 },
      { x: 660, y: 215 },
    ],
    color: 'var(--color-sage)',
  },
  {
    key: 'cosmetic',
    tab: 'Cosmetic',
    title: 'Refreshing texture and volume',
    body:
      'Fillers, peels, microneedling, and lasers work within the dermis, where collagen gives skin its structure. The aim is a rested version of you, placed with a light hand.',
    href: '/services/cosmetic-aesthetics',
    layers: ['dermis'],
    markers: [
      { x: 170, y: 250 },
      { x: 400, y: 230 },
      { x: 700, y: 275 },
    ],
    color: 'var(--color-blush)',
  },
  {
    key: 'surgical',
    tab: 'Surgical',
    title: 'Removing what should not stay',
    body:
      'When a mole, cyst, or skin cancer needs to come out, it is removed through every layer it reaches and closed with attention to how the scar will heal.',
    href: '/services/surgical-dermatology',
    layers: ['epidermis', 'dermis', 'subcutis'],
    markers: [{ x: 330, y: 200 }],
    color: 'var(--color-charcoal)',
    overlay: 'excision',
  },
  {
    key: 'pathology',
    tab: 'Pathology',
    title: 'Read by the doctor who saw you',
    body:
      'A biopsy captures a small core of skin through its layers. Dr. Fred and Dr. Taylor read those slides themselves in our in-house lab, with your exam fresh in mind.',
    href: '/services/dermatopathology',
    layers: ['epidermis', 'dermis', 'subcutis'],
    markers: [{ x: 520, y: 70 }],
    color: 'var(--color-gold)',
    overlay: 'biopsy',
  },
];

// Geometry for an 800 x 520 cross-section. Built once at module load.
const WIDTH = 800;
const surfaceY = (x: number) => 80 + 6 * Math.sin(x / 60);
const junctionY = (x: number) => 175 + 12 * Math.sin(x / 26);
const DERMIS_BOTTOM = 360;

function wavePath(fn: (x: number) => number) {
  let d = `M0 ${fn(0).toFixed(1)}`;
  for (let x = 10; x <= WIDTH; x += 10) d += ` L${x} ${fn(x).toFixed(1)}`;
  return d;
}

const surfacePath = wavePath(surfaceY);
const junctionPath = wavePath(junctionY);
const epidermisArea = (() => {
  let d = surfacePath;
  for (let x = WIDTH; x >= 0; x -= 10) d += ` L${x} ${junctionY(x).toFixed(1)}`;
  return `${d} Z`;
})();

const epidermisCells = (() => {
  const cells: { cx: number; cy: number; rx: number; ry: number }[] = [];
  for (let row = 0; row < 4; row++) {
    for (let x = (row % 2) * 17; x < WIDTH + 20; x += 34) {
      const top = surfaceY(x) + 14 + row * 21;
      if (top > junctionY(x) - 8) continue;
      cells.push({ cx: x, cy: top, rx: row === 0 ? 16 : 13, ry: row === 0 ? 5 : 8 });
    }
  }
  return cells;
})();

const fatLobules = (() => {
  const lobules: { cx: number; cy: number; r: number }[] = [];
  for (let row = 0; row < 4; row++) {
    for (let x = (row % 2) * 30 + 10; x < WIDTH + 30; x += 60) {
      lobules.push({ cx: x, cy: DERMIS_BOTTOM + 30 + row * 42, r: 24 + ((x + row * 7) % 5) });
    }
  }
  return lobules;
})();

const collagenFibers = [210, 245, 280, 320].map(
  (base, idx) =>
    `M-20 ${base} C 120 ${base - 18}, 220 ${base + 22}, 360 ${base} S 600 ${base - 20}, 820 ${base + 6 - idx * 4}`,
);

const vesselPath = 'M-20 300 C 140 250, 250 350, 400 300 S 650 255, 820 312';

export function SkinLayers() {
  const [activeKey, setActiveKey] = useState(focuses[0].key);
  const reduceMotion = useReducedMotion();
  const active = focuses.find((f) => f.key === activeKey) ?? focuses[0];
  const dim = (layer: Layer) => (active.layers.includes(layer) ? 1 : 0.22);

  return (
    <Section bg="cream" padding="xl">
      <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <SectionLabel>Inside the Skin</SectionLabel>
          <SignatureHeadline
            primary="Every layer of skin."
            accent="One team of doctors."
            size="md"
            className="mb-6"
          />
          <p className="text-warm-gray text-lg leading-relaxed mb-8 max-w-md">
            Skin is three layers deep, and so is our care. Choose a service to
            see where it works.
          </p>

          <div role="tablist" aria-label="Services by skin layer" className="flex flex-wrap gap-2 mb-8">
            {focuses.map((focus) => {
              const selected = focus.key === activeKey;
              return (
                <button
                  key={focus.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="skin-layers-panel"
                  onClick={() => setActiveKey(focus.key)}
                  className={clsx(
                    'relative px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300',
                    selected ? 'text-warm-white' : 'text-charcoal/70 hover:text-charcoal bg-sand-light',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="skin-tab-pill"
                      className="absolute inset-0 rounded-full bg-charcoal"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{focus.tab}</span>
                </button>
              );
            })}
          </div>

          <div id="skin-layers-panel" role="tabpanel" aria-live="polite" className="min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-display text-2xl text-charcoal mb-3">{active.title}</h3>
                <p className="text-warm-gray leading-relaxed mb-6 max-w-md">{active.body}</p>
                <Link
                  href={active.href}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-sage transition-colors"
                >
                  Explore {active.tab.toLowerCase()} care
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="relative rounded-[2rem] overflow-hidden border border-sand bg-warm-white shadow-xl">
            <svg
              viewBox="0 0 800 520"
              role="img"
              aria-label={`Cross-section of skin highlighting the ${active.layers.join(', ')}`}
              className="block w-full h-auto"
            >
              <defs>
                <clipPath id="skin-clip">
                  <rect width="800" height="520" />
                </clipPath>
                <linearGradient id="skin-air" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-warm-white)" />
                  <stop offset="1" stopColor="var(--color-cream)" />
                </linearGradient>
              </defs>

              <g clipPath="url(#skin-clip)">
                <rect width="800" height="520" fill="url(#skin-air)" />

                {/* Subcutis: soft fat lobules */}
                <motion.g animate={{ opacity: dim('subcutis') }} transition={{ duration: 0.5 }}>
                  <rect y={DERMIS_BOTTOM} width="800" height={520 - DERMIS_BOTTOM} fill="var(--color-gold-light)" fillOpacity="0.7" />
                  {fatLobules.map((lobule) => (
                    <circle
                      key={`${lobule.cx}-${lobule.cy}`}
                      cx={lobule.cx}
                      cy={lobule.cy}
                      r={lobule.r}
                      fill="var(--color-warm-white)"
                      fillOpacity="0.7"
                      stroke="var(--color-gold)"
                      strokeOpacity="0.6"
                    />
                  ))}
                </motion.g>

                {/* Dermis: collagen, a blood vessel, follicles */}
                <motion.g animate={{ opacity: dim('dermis') }} transition={{ duration: 0.5 }}>
                  <path d={`${junctionPath} L800 ${DERMIS_BOTTOM} L0 ${DERMIS_BOTTOM} Z`} fill="var(--color-sand)" fillOpacity="0.7" />
                  {collagenFibers.map((d, idx) => (
                    <path
                      key={d}
                      d={d}
                      fill="none"
                      stroke="var(--color-taupe)"
                      strokeOpacity="0.8"
                      strokeWidth="1.4"
                      strokeDasharray="14 10"
                    >
                      {!reduceMotion && (
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to={idx % 2 ? '96' : '-96'}
                          dur={`${9 + idx * 2}s`}
                          repeatCount="indefinite"
                        />
                      )}
                    </path>
                  ))}

                  <path d={vesselPath} fill="none" stroke="var(--color-blush)" strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round" />
                  <path d={vesselPath} fill="none" stroke="var(--color-blush-light)" strokeWidth="3" strokeLinecap="round" />
                  {!reduceMotion &&
                    [0, 1.6, 3.2, 4.8].map((begin) => (
                      <circle key={begin} r="3" fill="var(--color-blush)">
                        <animateMotion dur="6.4s" begin={`${begin}s`} repeatCount="indefinite" path={vesselPath} />
                      </circle>
                    ))}

                  <Follicle x={560} depth={335} />
                  <Follicle x={150} depth={300} small />
                </motion.g>

                {/* Epidermis: stacked cells under a gently waving surface */}
                <motion.g animate={{ opacity: dim('epidermis') }} transition={{ duration: 0.5 }}>
                  <path d={epidermisArea} fill="var(--color-blush-light)" />
                  {epidermisCells.map((cell) => (
                    <ellipse
                      key={`${cell.cx}-${cell.cy}`}
                      cx={cell.cx}
                      cy={cell.cy}
                      rx={cell.rx}
                      ry={cell.ry}
                      fill="var(--color-warm-white)"
                      fillOpacity="0.7"
                      stroke="var(--color-blush)"
                      strokeOpacity="0.75"
                    />
                  ))}
                  <path d={surfacePath} fill="none" stroke="var(--color-blush)" strokeWidth="2" />
                </motion.g>

                {/* Hair shafts sit above every layer */}
                <path d="M560 -10 C 556 30, 566 60, 561 90" stroke="var(--color-charcoal)" strokeOpacity="0.7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M150 20 C 147 45, 154 65, 151 85" stroke="var(--color-charcoal)" strokeOpacity="0.6" strokeWidth="2" fill="none" strokeLinecap="round" />

                <AnimatePresence>
                  {active.overlay === 'biopsy' && (
                    <motion.g
                      key="biopsy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.rect
                        x="498"
                        y="60"
                        width="44"
                        height="360"
                        rx="22"
                        fill="var(--color-gold)"
                        fillOpacity="0.1"
                        stroke="var(--color-gold)"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        initial={{ y: 40 }}
                        animate={{ y: reduceMotion ? 0 : [0, -26, 0] }}
                        transition={{ duration: 3.6, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                      />
                    </motion.g>
                  )}
                  {active.overlay === 'excision' && (
                    <motion.path
                      key="excision"
                      d="M230 200 C 270 110, 390 110, 430 200 C 390 400, 270 400, 230 200 Z"
                      fill="var(--color-charcoal)"
                      fillOpacity="0.05"
                      stroke="var(--color-charcoal)"
                      strokeWidth="2"
                      strokeDasharray="7 7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {active.markers.map((marker, idx) => (
                    <motion.g
                      key={`${active.key}-${marker.x}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 0.15 + idx * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      <circle cx={marker.x} cy={marker.y} r="22" fill={active.color} fillOpacity="0.25">
                        {!reduceMotion && (
                          <animate attributeName="r" values="14;28;14" dur="2.6s" repeatCount="indefinite" />
                        )}
                      </circle>
                      <circle cx={marker.x} cy={marker.y} r="8" fill={active.color} stroke="var(--color-warm-white)" strokeWidth="2.5" />
                    </motion.g>
                  ))}
                </AnimatePresence>
              </g>
            </svg>

            <LayerLabel top="22%" label="Epidermis" active={active.layers.includes('epidermis')} />
            <LayerLabel top="50%" label="Dermis" active={active.layers.includes('dermis')} />
            <LayerLabel top="84%" label="Subcutis" active={active.layers.includes('subcutis')} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function LayerLabel({ top, label, active }: { top: string; label: string; active: boolean }) {
  return (
    <span
      aria-hidden
      style={{ top }}
      className={clsx(
        'absolute right-3 md:right-5 -translate-y-1/2 rounded-full px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-500',
        active ? 'bg-charcoal text-warm-white' : 'bg-warm-white/80 text-warm-gray',
      )}
    >
      {label}
    </span>
  );
}

function Follicle({ x, depth, small = false }: { x: number; depth: number; small?: boolean }) {
  const half = small ? 8 : 11;
  const top = surfaceY(x);
  return (
    <g>
      <path
        d={`M${x - half} ${top} C ${x - half - 2} ${top + 80}, ${x - half - 4} ${depth - 40}, ${x - half - 6} ${depth - 10}
            Q ${x} ${depth + 18}, ${x + half + 6} ${depth - 10}
            C ${x + half + 4} ${depth - 40}, ${x + half + 2} ${top + 80}, ${x + half} ${top}`}
        fill="var(--color-blush-light)"
        stroke="var(--color-blush)"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d={`M${x + 1} ${top + 10} C ${x - 3} ${top + 90}, ${x + 3} ${depth - 60}, ${x} ${depth - 6}`}
        stroke="var(--color-charcoal)"
        strokeOpacity="0.55"
        strokeWidth={small ? 2 : 2.5}
        fill="none"
      />
      {!small && (
        <ellipse
          cx={x + 32}
          cy={top + 135}
          rx="20"
          ry="14"
          fill="var(--color-gold-light)"
          stroke="var(--color-gold)"
          strokeOpacity="0.5"
        />
      )}
    </g>
  );
}
