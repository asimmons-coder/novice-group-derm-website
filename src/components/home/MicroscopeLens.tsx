import { clsx } from '@/lib/clsx';

// Deterministic "stained tissue" field so server and client render identically.
const cells = Array.from({ length: 34 }, (_, idx) => {
  const angle = idx * 2.399963;
  const radius = 9 * Math.sqrt(idx + 1);
  return {
    cx: 100 + radius * Math.cos(angle),
    cy: 100 + radius * Math.sin(angle),
    rx: 5 + (idx % 4),
    ry: 4 + (idx % 3),
    rotate: (idx * 37) % 180,
    tone: idx % 5 === 0 ? 'var(--color-taupe)' : 'var(--color-blush)',
  };
});

interface Props {
  className?: string;
}

// A slide under the lens: tissue drifts slowly past a fixed reticle, while the
// lab's name circles the rim.
export function MicroscopeLens({ className }: Props) {
  return (
    <div aria-hidden className={clsx('relative w-44 h-44 md:w-52 md:h-52', className)}>
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full animate-spin-slow">
        <defs>
          <path id="lens-ring" d="M120 120 m-104 0 a104 104 0 1 1 208 0 a104 104 0 1 1 -208 0" />
        </defs>
        <text className="fill-charcoal" style={{ fontSize: 11, fontWeight: 600 }}>
          <textPath href="#lens-ring" textLength="648" lengthAdjust="spacing">
            DERMATOPATHOLOGY · SLIDES READ BY YOUR DOCTOR ·
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-[14%] rounded-full overflow-hidden bg-warm-white shadow-2xl ring-4 ring-warm-white">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="lens-vignette" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="var(--color-charcoal)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--color-charcoal)" stopOpacity="0.35" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="var(--color-blush-light)" />
          <g className="animate-scan">
            <path
              d="M-20 70 C 40 40, 90 110, 220 60"
              fill="none"
              stroke="var(--color-blush)"
              strokeOpacity="0.4"
              strokeWidth="14"
            />
            {cells.map((cell) => (
              <g key={`${cell.cx.toFixed(1)}-${cell.cy.toFixed(1)}`} transform={`rotate(${cell.rotate} ${cell.cx.toFixed(2)} ${cell.cy.toFixed(2)})`}>
                <ellipse
                  cx={cell.cx.toFixed(2)}
                  cy={cell.cy.toFixed(2)}
                  rx={cell.rx}
                  ry={cell.ry}
                  fill={cell.tone}
                  fillOpacity="0.35"
                />
                <circle cx={cell.cx.toFixed(2)} cy={cell.cy.toFixed(2)} r="1.8" fill="var(--color-charcoal)" fillOpacity="0.55" />
              </g>
            ))}
          </g>
          <line x1="100" y1="20" x2="100" y2="180" stroke="var(--color-charcoal)" strokeOpacity="0.35" strokeWidth="0.6" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="var(--color-charcoal)" strokeOpacity="0.35" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="22" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" className="animate-breathe origin-center [transform-box:fill-box]" />
          <rect width="200" height="200" fill="url(#lens-vignette)" />
        </svg>
      </div>
    </div>
  );
}
