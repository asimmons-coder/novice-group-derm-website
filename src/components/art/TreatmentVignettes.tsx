import { clsx } from '@/lib/clsx';

// Small line drawings for the cosmetic treatment cards. One hand for all six:
// a soft disc, fine charcoal lines, one blush fill, and gold for the detail
// that shows what the treatment does. Hover responses ride on the card's
// `group` class and are CSS only.
export type TreatmentKey = 'neuromodulators' | 'fillers' | 'kybella' | 'microneedling' | 'peels' | 'laser';

const line = {
  fill: 'none',
  stroke: 'var(--color-charcoal)',
  strokeOpacity: 0.72,
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ease = 'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]';

function Neuromodulators() {
  return (
    <>
      {/* Forehead lines relax on hover */}
      <g className={clsx(ease, 'group-hover:opacity-30')}>
        {[
          'M86 44 C 104 39, 136 39, 154 44',
          'M80 56 C 102 50, 138 50, 160 56',
          'M84 68 C 104 62, 136 62, 156 68',
        ].map((d) => (
          <path key={d} d={d} {...line} stroke="var(--color-taupe)" strokeOpacity={1} />
        ))}
      </g>
      {[100, 120, 140].map((x) => (
        <circle key={x} cx={x} cy={x === 120 ? 49 : 50} r="2.4" fill="var(--color-gold)" />
      ))}
      <path d="M72 94 C 92 80, 142 76, 172 90" {...line} strokeWidth={2.4} />
      <path d="M86 118 C 102 104, 140 104, 156 118 C 140 128, 102 128, 86 118 Z" {...line} fill="var(--color-warm-white)" />
      <circle cx="121" cy="116" r="9" fill="var(--color-blush)" fillOpacity="0.55" />
      <circle cx="121" cy="116" r="3.4" fill="var(--color-charcoal)" fillOpacity="0.8" />
      <path d="M92 128 C 106 136, 136 136, 150 128" {...line} strokeOpacity={0.3} />
    </>
  );
}

function Fillers() {
  const upper = 'M70 104 C 84 94, 100 82, 112 88 Q 120 92, 128 88 C 140 82, 156 94, 170 104';
  return (
    <>
      <path d="M150 42 C 156 52, 160 58, 160 63 A 10 10 0 0 1 140 63 C 140 58, 144 52, 150 42 Z" fill="var(--color-gold-light)" stroke="var(--color-gold)" strokeWidth="1.3" />
      <g className={clsx(ease, 'origin-[120px_104px] group-hover:scale-[1.06]')}>
        <path d={`${upper} C 150 106, 90 106, 70 104 Z`} fill="var(--color-blush)" fillOpacity="0.45" />
        <path d="M70 104 C 90 106, 150 106, 170 104 C 158 128, 134 136, 120 136 C 106 136, 82 128, 70 104 Z" fill="var(--color-blush)" fillOpacity="0.35" />
        <path d={upper} {...line} />
        <path d="M70 104 C 90 108, 150 108, 170 104" {...line} />
        <path d="M70 104 C 82 128, 106 136, 120 136 C 134 136, 158 128, 170 104" {...line} />
        <path d="M104 124 C 112 128, 128 128, 136 124" {...line} stroke="var(--color-warm-white)" strokeOpacity={0.9} />
      </g>
    </>
  );
}

function Kybella() {
  return (
    <>
      {/* Profile facing right. The dashed contour is the fullness before treatment;
          gold marks the grid of small injection points beneath the chin. */}
      <g transform="translate(26 -24)">
      <path
        d="M84 22 C 88 36, 92 48, 94 58 C 104 68, 122 78, 128 84 C 126 90, 116 92, 108 92 C 114 95, 116 99, 112 102 C 108 104, 108 106, 110 108 C 116 110, 114 116, 106 120 C 110 124, 118 128, 116 136 C 112 144, 96 146, 84 150 C 78 154, 74 162, 74 172"
        {...line}
      />
      <path
        d="M116 136 C 116 152, 100 160, 86 160 C 80 162, 76 166, 75 172"
        {...line}
        stroke="var(--color-taupe)"
        strokeOpacity={1}
        strokeDasharray="3 5"
        className={clsx(ease, 'group-hover:opacity-0')}
      />
      {[
        [94, 151],
        [102, 150],
        [110, 147],
        [98, 156],
        [106, 155],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="var(--color-gold)" />
      ))}
      </g>
    </>
  );
}

function Microneedling() {
  const needles = [96, 106, 116, 126, 136, 146];
  return (
    <>
      <g className={clsx(ease, 'group-hover:translate-y-[5px]')}>
        <rect x="86" y="36" width="70" height="16" rx="8" {...line} fill="var(--color-warm-white)" />
        {needles.map((x) => (
          <line key={x} x1={x} y1="52" x2={x} y2="84" stroke="var(--color-gold)" strokeWidth="1.3" strokeLinecap="round" />
        ))}
      </g>
      <path d="M58 92 C 90 86, 150 98, 182 90 L 182 170 L 58 170 Z" fill="var(--color-blush)" fillOpacity="0.28" />
      <path d="M58 92 C 90 86, 150 98, 182 90" {...line} />
      {needles.map((x) => (
        <line key={x} x1={x} y1="96" x2={x} y2="104" stroke="var(--color-blush)" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      {['M62 118 C 88 112, 110 124, 136 118 S 170 114, 178 118', 'M62 132 C 84 126, 112 138, 138 132 S 168 128, 178 132'].map((d) => (
        <path key={d} d={d} {...line} stroke="var(--color-gold)" strokeOpacity={0.8} strokeWidth={1.2} />
      ))}
    </>
  );
}

function Peels() {
  return (
    <>
      <path d="M58 104 C 92 98, 148 110, 182 102 L 182 170 L 58 170 Z" fill="var(--color-blush)" fillOpacity="0.28" />
      <path d="M58 104 C 92 98, 148 110, 182 102" {...line} />
      {[
        [138, 94],
        [152, 88],
        [164, 96],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" fill="var(--color-gold)" />
      ))}
      {/* The outer sheet lifts away from the fresh surface */}
      <g className={clsx(ease, 'origin-[60px_96px] group-hover:-rotate-6')}>
        <path
          d="M52 96 C 88 92, 110 97, 126 95 C 142 93, 152 82, 152 70 C 152 62, 146 60, 142 64 C 146 64, 148 70, 147 76 C 145 88, 136 98, 126 100 C 110 102, 88 98, 52 101 Z"
          {...line}
          fill="var(--color-warm-white)"
        />
      </g>
    </>
  );
}

function Laser() {
  return (
    <>
      <g transform="rotate(-28 92 50)">
        <rect x="70" y="34" width="46" height="22" rx="7" {...line} fill="var(--color-warm-white)" />
        <line x1="116" y1="40" x2="116" y2="50" {...line} strokeWidth={2.4} />
      </g>
      <path d="M116 64 L 146 104 L 136 108 Z" fill="var(--color-gold)" fillOpacity="0.35" />
      <line x1="117" y1="64" x2="141" y2="106" stroke="var(--color-gold)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M58 110 C 92 104, 148 116, 182 108 L 182 170 L 58 170 Z" fill="var(--color-blush)" fillOpacity="0.28" />
      <path d="M58 110 C 92 104, 148 116, 182 108" {...line} />
      <ellipse cx="141" cy="114" rx="9" ry="3.6" fill="var(--color-taupe)" className={clsx(ease, 'group-hover:opacity-25')} />
      <ellipse cx="141" cy="110" rx="18" ry="6" fill="none" stroke="var(--color-gold)" strokeOpacity="0.55" />
      <ellipse cx="141" cy="110" rx="28" ry="9" fill="none" stroke="var(--color-gold)" strokeOpacity="0.25" />
    </>
  );
}

const drawings: Record<TreatmentKey, () => React.ReactNode> = {
  neuromodulators: Neuromodulators,
  fillers: Fillers,
  kybella: Kybella,
  microneedling: Microneedling,
  peels: Peels,
  laser: Laser,
};

interface Props {
  treatment: TreatmentKey;
}

export function TreatmentVignette({ treatment }: Props) {
  const Drawing = drawings[treatment];
  return (
    <svg viewBox="0 0 240 180" aria-hidden className="absolute inset-0 h-full w-full">
      <defs>
        <clipPath id={`vignette-${treatment}`}>
          <circle cx="120" cy="92" r="72" />
        </clipPath>
      </defs>
      <circle cx="120" cy="92" r="72" fill="var(--color-warm-white)" fillOpacity="0.75" />
      <g clipPath={`url(#vignette-${treatment})`}>
        <Drawing />
      </g>
      <circle cx="120" cy="92" r="72" fill="none" stroke="var(--color-gold)" strokeOpacity="0.25" />
    </svg>
  );
}
