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
    markers: [{ x: 330, y: 230 }],
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

// Geometry for an 800 x 520 cross-section, built once at module load. A seeded
// random source gives the tissue organic variation while keeping server and
// client output identical.
const WIDTH = 800;
const HEIGHT = 520;
const DERMIS_BOTTOM = 360;
const surfaceY = (x: number) => 80 + 6 * Math.sin(x / 60);
const junctionY = (x: number) => 175 + 12 * Math.sin(x / 26);
const round = (n: number) => Math.round(n * 10) / 10;

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wavePath(fn: (x: number) => number, step = 10) {
  let d = `M-10 ${round(fn(-10))}`;
  for (let x = 0; x <= WIDTH + 10; x += step) d += ` L${x} ${round(fn(x))}`;
  return d;
}

const surfacePath = wavePath(surfaceY);
const junctionPath = wavePath(junctionY);
const epidermisArea = (() => {
  let d = surfacePath;
  for (let x = WIDTH + 10; x >= -10; x -= 10) d += ` L${x} ${round(junctionY(x))}`;
  return `${d} Z`;
})();
const dermisArea = `${junctionPath} L${WIDTH + 10} ${DERMIS_BOTTOM} L-10 ${DERMIS_BOTTOM} Z`;

// Flattened outer layers just under the surface
const corneumLines = [5, 9, 13].map((offset) => wavePath((x) => surfaceY(x) + offset + Math.sin(x / 17) * 0.8));

// Spinous cells: irregular, gently rotated, each with a nucleus
const spinousCells = (() => {
  const rand = seeded(7);
  const cells: { cx: number; cy: number; rx: number; ry: number; rotate: number }[] = [];
  for (let row = 0; row < 5; row++) {
    for (let x = (row % 2) * 12 - 6; x < WIDTH + 20; x += 24 + rand() * 4) {
      const cy = surfaceY(x) + 24 + row * 15 + (rand() - 0.5) * 4;
      if (cy > junctionY(x) - 18) continue;
      cells.push({
        cx: round(x + (rand() - 0.5) * 5),
        cy: round(cy),
        rx: round(9 + rand() * 4 - row * 0.4),
        ry: round(6 + rand() * 2.5),
        rotate: round((rand() - 0.5) * 30),
      });
    }
  }
  return cells;
})();

// Basal layer: small, tightly packed cells tracing the dermal junction
const basalCells = (() => {
  const cells: { cx: number; cy: number }[] = [];
  for (let x = -4; x < WIDTH + 10; x += 10) cells.push({ cx: x, cy: round(junctionY(x) - 6) });
  return cells;
})();

const collagenBundles = (() => {
  const rand = seeded(21);
  return [218, 246, 272, 300, 326, 348].flatMap((base, bundle) => {
    const phase = rand() * 6;
    const amplitude = 6 + rand() * 6;
    const period = 38 + rand() * 20;
    return [0, 3.5, 7].map((offset, strand) => ({
      d: wavePath((x) => base + offset + amplitude * Math.sin(x / period + phase + strand * 0.2), 8),
      width: round(1 + rand() * 1.2),
      opacity: round(0.25 + rand() * 0.25 - bundle * 0.01),
    }));
  });
})();

const fibroblasts = (() => {
  const rand = seeded(33);
  return Array.from({ length: 16 }, () => ({
    cx: round(20 + rand() * 760),
    cy: round(220 + rand() * 125),
    rotate: round((rand() - 0.5) * 24),
  }));
})();

const elastinFibers = [
  'M40 232 c 14 -8, 22 8, 36 0 s 22 8, 36 0',
  'M300 262 c 12 -7, 20 7, 32 0 s 20 7, 32 0 s 20 7, 32 0',
  'M640 244 c 14 -8, 22 8, 36 0 s 22 8, 36 0',
  'M420 336 c 12 -7, 20 7, 32 0 s 20 7, 32 0',
];

// Fat lobules: jittered hex packing with varied sizes, so it reads as tissue
const fatLobules = (() => {
  const rand = seeded(55);
  const lobules: { cx: number; cy: number; r: number }[] = [];
  for (let row = 0; row < 5; row++) {
    for (let x = (row % 2) * 23 - 10; x < WIDTH + 30; x += 46) {
      lobules.push({
        cx: round(x + (rand() - 0.5) * 12),
        cy: round(DERMIS_BOTTOM + 22 + row * 38 + (rand() - 0.5) * 10),
        r: round(15 + rand() * 9),
      });
    }
  }
  return lobules;
})();

const vesselPath = 'M-20 300 C 140 250, 250 350, 400 300 S 650 255, 820 312';
const deepVesselPath = 'M-20 440 C 180 420, 320 470, 520 438 S 720 430, 820 452';

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
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-sage-deep transition-colors"
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
                  <rect width={WIDTH} height={HEIGHT} />
                </clipPath>
                <linearGradient id="skin-air" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-warm-white)" />
                  <stop offset="1" stopColor="var(--color-cream)" />
                </linearGradient>
                <linearGradient id="skin-epi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-blush-light)" stopOpacity="0.7" />
                  <stop offset="0.6" stopColor="var(--color-blush-light)" />
                  <stop offset="1" stopColor="var(--color-blush)" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="skin-derm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-sand-light)" />
                  <stop offset="1" stopColor="var(--color-sand)" />
                </linearGradient>
                <linearGradient id="skin-sub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-sand)" />
                  <stop offset="1" stopColor="var(--color-gold-light)" />
                </linearGradient>
                <radialGradient id="skin-fat" cx="40%" cy="35%" r="70%">
                  <stop offset="0" stopColor="var(--color-warm-white)" />
                  <stop offset="0.7" stopColor="var(--color-cream)" />
                  <stop offset="1" stopColor="var(--color-gold-light)" />
                </radialGradient>
              </defs>

              <g clipPath="url(#skin-clip)">
                <rect width={WIDTH} height={HEIGHT} fill="url(#skin-air)" />

                {/* Subcutis: fat lobules separated by fine septa, one deep vessel */}
                <motion.g animate={{ opacity: dim('subcutis') }} transition={{ duration: 0.5 }}>
                  <rect y={DERMIS_BOTTOM} width={WIDTH} height={HEIGHT - DERMIS_BOTTOM} fill="url(#skin-sub)" />
                  {fatLobules.map((lobule) => (
                    <circle
                      key={`${lobule.cx}-${lobule.cy}`}
                      cx={lobule.cx}
                      cy={lobule.cy}
                      r={lobule.r}
                      fill="url(#skin-fat)"
                      stroke="var(--color-gold)"
                      strokeOpacity="0.45"
                      strokeWidth="1"
                    />
                  ))}
                  <path d={deepVesselPath} fill="none" stroke="var(--color-blush)" strokeOpacity="0.6" strokeWidth="11" strokeLinecap="round" />
                  <path d={deepVesselPath} fill="none" stroke="var(--color-blush-light)" strokeWidth="5" strokeLinecap="round" />
                </motion.g>

                {/* Dermis: collagen bundles, elastin, fibroblasts, a vessel, follicles */}
                <motion.g animate={{ opacity: dim('dermis') }} transition={{ duration: 0.5 }}>
                  <path d={dermisArea} fill="url(#skin-derm)" />
                  {collagenBundles.map((strand) => (
                    <path
                      key={strand.d}
                      d={strand.d}
                      fill="none"
                      stroke="var(--color-taupe)"
                      strokeOpacity={strand.opacity}
                      strokeWidth={strand.width}
                      strokeLinecap="round"
                    />
                  ))}
                  {elastinFibers.map((d) => (
                    <path key={d} d={d} fill="none" stroke="var(--color-blush)" strokeOpacity="0.55" strokeWidth="1" />
                  ))}
                  {fibroblasts.map((cell) => (
                    <ellipse
                      key={`${cell.cx}-${cell.cy}`}
                      cx={cell.cx}
                      cy={cell.cy}
                      rx="5"
                      ry="1.6"
                      transform={`rotate(${cell.rotate} ${cell.cx} ${cell.cy})`}
                      fill="var(--color-warm-gray)"
                      fillOpacity="0.45"
                    />
                  ))}

                  <path d={vesselPath} fill="none" stroke="var(--color-blush)" strokeOpacity="0.75" strokeWidth="10" strokeLinecap="round" />
                  <path d={vesselPath} fill="none" stroke="var(--color-blush-light)" strokeWidth="5" strokeLinecap="round" />
                  {!reduceMotion &&
                    [0, 1.3, 2.6, 3.9, 5.2].map((begin) => (
                      <ellipse key={begin} rx="3" ry="2" fill="var(--color-blush)">
                        <animateMotion dur="6.5s" begin={`${begin}s`} repeatCount="indefinite" rotate="auto" path={vesselPath} />
                      </ellipse>
                    ))}

                  <Follicle x={560} depth={335} />
                  <Follicle x={150} depth={300} small />
                </motion.g>

                {/* Epidermis: flattened outer layers, irregular cells, a defined basal row */}
                <motion.g animate={{ opacity: dim('epidermis') }} transition={{ duration: 0.5 }}>
                  <path d={epidermisArea} fill="url(#skin-epi)" />
                  {spinousCells.map((cell) => (
                    <g key={`${cell.cx}-${cell.cy}`} transform={`rotate(${cell.rotate} ${cell.cx} ${cell.cy})`}>
                      <ellipse
                        cx={cell.cx}
                        cy={cell.cy}
                        rx={cell.rx}
                        ry={cell.ry}
                        fill="var(--color-warm-white)"
                        fillOpacity="0.6"
                        stroke="var(--color-blush)"
                        strokeOpacity="0.6"
                      />
                      <circle cx={cell.cx} cy={cell.cy} r="1.8" fill="var(--color-warm-gray)" fillOpacity="0.55" />
                    </g>
                  ))}
                  {basalCells.map((cell) => (
                    <g key={cell.cx}>
                      <circle cx={cell.cx} cy={cell.cy} r="5" fill="var(--color-blush)" fillOpacity="0.45" />
                      <circle cx={cell.cx} cy={cell.cy} r="1.8" fill="var(--color-charcoal)" fillOpacity="0.35" />
                    </g>
                  ))}
                  <path d={junctionPath} fill="none" stroke="var(--color-blush)" strokeOpacity="0.7" strokeWidth="1.2" />
                  {corneumLines.map((d) => (
                    <path key={d} d={d} fill="none" stroke="var(--color-blush)" strokeOpacity="0.45" strokeWidth="1" />
                  ))}
                  <path d={surfacePath} fill="none" stroke="var(--color-blush)" strokeWidth="2.5" />
                  <path
                    d={wavePath((x) => surfaceY(x) - 2)}
                    fill="none"
                    stroke="var(--color-warm-white)"
                    strokeWidth="1.5"
                  />
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
                      d="M225 84 C 235 250, 280 392, 330 394 C 380 392, 425 250, 435 84"
                      fill="var(--color-charcoal)"
                      fillOpacity="0.06"
                      stroke="var(--color-charcoal)"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
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
      {!small &&
        [
          [30, 128, 11],
          [42, 140, 10],
          [28, 146, 9],
        ].map(([dx, dy, r]) => (
          <circle
            key={`${dx}-${dy}`}
            cx={x + dx}
            cy={top + dy}
            r={r}
            fill="var(--color-gold-light)"
            stroke="var(--color-gold)"
            strokeOpacity="0.55"
          />
        ))}
    </g>
  );
}
