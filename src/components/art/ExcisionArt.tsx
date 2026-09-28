import { round, seeded } from '@/components/art/geometry';

// Top-down view of skin, zoomed in from the homepage cross-section. A marked
// ellipse is excised along the skin's tension lines, drawn closed with fine
// sutures, and settles into a faint line. The loop runs in CSS (globals.css,
// ".ex-*"), so the server frame is already complete.
const WIDTH = 400;
const HEIGHT = 500;
const CENTER = { x: 200, y: 262 };
const ANGLE = -22;
const HALF_LENGTH = 116;
const HALF_WIDTH = 38;

// Relaxed skin tension lines: long, shallow curves running with the incision
const tensionLines = (() => {
  const rand = seeded(11);
  return Array.from({ length: 17 }, (_, idx) => {
    const offset = -270 + idx * 34 + (rand() - 0.5) * 10;
    const bow = 10 + rand() * 14;
    const tilt = (rand() - 0.5) * 8;
    return {
      d: `M-260 ${round(offset)} C -90 ${round(offset - bow + tilt)}, 90 ${round(offset + bow)}, 260 ${round(offset + tilt)}`,
      opacity: round(0.1 + rand() * 0.12),
    };
  });
})();

// Pores and fine texture, kept sparse so the field reads as skin at rest
const pores = (() => {
  const rand = seeded(29);
  return Array.from({ length: 70 }, () => ({
    cx: round(12 + rand() * (WIDTH - 24)),
    cy: round(12 + rand() * (HEIGHT - 24)),
    r: round(0.6 + rand() * 0.9),
  })).filter((pore) => Math.hypot(pore.cx - CENTER.x, pore.cy - CENTER.y) > 90);
})();

const lensPath = `M${-HALF_LENGTH} 0 C ${-HALF_LENGTH / 2} ${-HALF_WIDTH * 1.3}, ${HALF_LENGTH / 2} ${-HALF_WIDTH * 1.3}, ${HALF_LENGTH} 0 C ${HALF_LENGTH / 2} ${HALF_WIDTH * 1.3}, ${-HALF_LENGTH / 2} ${HALF_WIDTH * 1.3}, ${-HALF_LENGTH} 0 Z`;
const markPath = `M${-HALF_LENGTH - 8} 0 C ${-HALF_LENGTH / 2} ${-HALF_WIDTH * 1.42}, ${HALF_LENGTH / 2} ${-HALF_WIDTH * 1.42}, ${HALF_LENGTH + 8} 0 C ${HALF_LENGTH / 2} ${HALF_WIDTH * 1.42}, ${-HALF_LENGTH / 2} ${HALF_WIDTH * 1.42}, ${-HALF_LENGTH - 8} 0 Z`;

// Simple interrupted sutures, evenly spaced along the closed line, drawn in
// sequence as one path so they appear one after another. Each has a slight
// curve through the skin, a knot on one side, and two short trimmed tails.
const stitchXs = [-81, -54, -27, 0, 27, 54, 81];
const suturePath = stitchXs
  .map((x) => `M${x + 1.5} 8.5 Q ${x + 1.2} 0, ${x - 1.5} -8.5 M${x - 1.5} -8.5 l -5 -2.5 M${x - 1.5} -8.5 l 1.5 -5.5`)
  .join(' ');

const seamPath = `M${-HALF_LENGTH} 0 L${HALF_LENGTH} 0`;
const scarPath = `M${-HALF_LENGTH + 6} 0.4 C ${-40} -1, ${40} 1.4, ${HALF_LENGTH - 6} -0.2`;

// Irregular pigmented lesion at the centre of the planned excision
const lesionPath = (() => {
  const rand = seeded(5);
  const points = Array.from({ length: 14 }, (_, idx) => {
    const theta = (idx / 14) * Math.PI * 2;
    const radius = 15 + (rand() - 0.5) * 5;
    return [round(Math.cos(theta) * radius * 1.15), round(Math.sin(theta) * radius)];
  });
  return `M${points.map(([x, y]) => `${x} ${y}`).join(' L')} Z`;
})();

const ticks = Array.from({ length: 11 }, (_, idx) => ({ x: 120 + idx * 16, major: idx % 5 === 0 }));

export function ExcisionArt() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Illustration of an elliptical excision on the skin closed with fine sutures"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="ex-field" cx="50%" cy="48%" r="70%">
          <stop offset="0" stopColor="var(--color-warm-white)" />
          <stop offset="0.65" stopColor="var(--color-sand-light)" />
          <stop offset="1" stopColor="var(--color-sand)" />
        </radialGradient>
        <radialGradient id="ex-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--color-sage-light)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-sage-light)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ex-wound-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-taupe)" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="var(--color-sand)" />
          <stop offset="1" stopColor="var(--color-taupe)" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill="url(#ex-field)" />
      <ellipse cx={CENTER.x} cy={CENTER.y} rx="170" ry="150" fill="url(#ex-halo)" />

      <g transform={`translate(${CENTER.x} ${CENTER.y}) rotate(${ANGLE})`}>
        {tensionLines.map((line) => (
          <path key={line.d} d={line.d} fill="none" stroke="var(--color-taupe)" strokeOpacity={line.opacity} strokeWidth="1" />
        ))}
      </g>
      {pores.map((pore) => (
        <circle key={`${pore.cx}-${pore.cy}`} cx={pore.cx} cy={pore.cy} r={pore.r} fill="var(--color-taupe)" fillOpacity="0.35" />
      ))}

      <g transform={`translate(${CENTER.x} ${CENTER.y}) rotate(${ANGLE})`}>
        {/* Surgical marking: dashed ellipse and a dotted margin around the lesion */}
        <g className="ex-mark">
          <path d={markPath} fill="none" stroke="var(--color-sage-deep)" strokeWidth="1.6" strokeDasharray="5 6" strokeLinecap="round" />
          <circle r="27" fill="none" stroke="var(--color-sage-deep)" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="1.5 4" strokeLinecap="round" />
        </g>
        <g className="ex-lesion">
          <path d={lesionPath} fill="var(--color-warm-gray)" fillOpacity="0.75" />
          <path d={lesionPath} transform="scale(0.55) translate(3 -2)" fill="var(--color-charcoal)" fillOpacity="0.45" />
        </g>

        {/* The ellipse opens, then closes to a line */}
        <g className="ex-lens art-box-center">
          <path d={lensPath} className="ex-wound" fill="url(#ex-wound-fill)" />
          <path
            d={lensPath}
            pathLength={1}
            className="ex-cut art-draw"
            fill="none"
            stroke="var(--color-charcoal)"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>

        <path d={seamPath} className="ex-seam" fill="none" stroke="var(--color-charcoal)" strokeOpacity="0.75" strokeWidth="1.2" strokeLinecap="round" />
        <path
          d={suturePath}
          pathLength={1}
          className="ex-suture art-draw"
          fill="none"
          stroke="var(--color-charcoal)"
          strokeOpacity="0.85"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={scarPath} className="ex-scar" fill="none" stroke="var(--color-sage-deep)" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Scale rule: a quiet nod to planning and precision */}
      <g stroke="var(--color-charcoal)" strokeOpacity="0.35" strokeLinecap="round">
        <line x1="120" y1="440" x2="280" y2="440" strokeWidth="1" />
        {ticks.map((tick) => (
          <line key={tick.x} x1={tick.x} y1="440" x2={tick.x} y2={tick.major ? 430 : 435} strokeWidth="1" />
        ))}
      </g>
      <g fill="none" stroke="var(--color-charcoal)" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round">
        <path d="M28 44 V28 H44" />
        <path d="M356 28 H372 V44" />
        <path d="M28 456 V472 H44" />
        <path d="M356 472 H372 V456" />
      </g>
    </svg>
  );
}
