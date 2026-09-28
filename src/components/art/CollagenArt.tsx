import { round, seeded } from '@/components/art/geometry';

// A close-up of the homepage cross-section: the surface with two fine lines,
// and the dermis beneath. On a slow loop the collagen bundles fill out and the
// lines at the surface soften, then ease back. Motion lives in CSS
// (globals.css, ".co-*"); the resting frame is the softened state.
const WIDTH = 400;
const HEIGHT = 500;
const surfaceY = (x: number) => 128 + 5 * Math.sin(x / 55);
const junctionY = (x: number) => 196 + 8 * Math.sin(x / 24);

function wave(fn: (x: number) => number, from = -10, to = WIDTH + 10, step = 8) {
  let d = `M${from} ${round(fn(from))}`;
  for (let x = from + step; x <= to; x += step) d += ` L${x} ${round(fn(x))}`;
  if ((to - from) % step !== 0) d += ` L${to} ${round(fn(to))}`;
  return d;
}

const creases = [
  { x: 146, half: 14, depth: 34 },
  { x: 266, half: 10, depth: 22 },
];

// Surface drawn in pieces so each crease can deepen or soften on its own
const surfaceSegments = (() => {
  const edges = [-10, ...creases.flatMap((c) => [c.x - c.half, c.x + c.half]), WIDTH + 10];
  const segments: string[] = [];
  for (let idx = 0; idx < edges.length; idx += 2) segments.push(wave(surfaceY, edges[idx], edges[idx + 1], 6));
  return segments;
})();

const epidermisArea = (() => {
  let d = wave(surfaceY);
  for (let x = WIDTH + 10; x >= -10; x -= 8) d += ` L${x} ${round(junctionY(x))}`;
  return `${d} Z`;
})();

const creaseShapes = creases.map(({ x, half, depth }) => {
  const left = { x: x - half, y: round(surfaceY(x - half)) };
  const right = { x: x + half, y: round(surfaceY(x + half)) };
  const bottom = round(surfaceY(x) + depth);
  const walls = `M${left.x} ${left.y} C ${round(x - half * 0.45)} ${left.y + 2}, ${x - 2} ${bottom - 4}, ${x} ${bottom} C ${x + 2} ${bottom - 4}, ${round(x + half * 0.45)} ${right.y + 2}, ${right.x} ${right.y}`;
  return { key: x, walls, fill: `${walls} Z` };
});

const cells = (() => {
  const rand = seeded(17);
  const list: { cx: number; cy: number; rx: number; ry: number; rotate: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let x = (row % 2) * 14 - 8; x < WIDTH + 20; x += 28 + rand() * 4) {
      const cy = surfaceY(x) + 18 + row * 17 + (rand() - 0.5) * 3;
      if (cy > junctionY(x) - 14) continue;
      list.push({
        cx: round(x + (rand() - 0.5) * 4),
        cy: round(cy),
        rx: round(11 + rand() * 3),
        ry: round(6.5 + rand() * 2),
        rotate: round((rand() - 0.5) * 24),
      });
    }
  }
  return list;
})();

const basalCells = Array.from({ length: 36 }, (_, idx) => {
  const x = -4 + idx * 12;
  return { cx: x, cy: round(junctionY(x) - 6) };
});

const bundles = (() => {
  const rand = seeded(41);
  return [236, 270, 304, 338, 372, 406, 440, 474].map((base, idx) => {
    const phase = rand() * 6;
    const amplitude = 5 + rand() * 4;
    const period = 34 + rand() * 16;
    return {
      base,
      delay: round(-idx * 0.35),
      strands: [0, 4, 8].map((offset, strand) => ({
        d: wave((x) => base + offset + amplitude * Math.sin(x / period + phase + strand * 0.25)),
        width: round(1.6 + rand() * 1.4),
        tone: strand === 1 ? 'var(--color-gold)' : 'var(--color-taupe)',
        opacity: round(0.45 + rand() * 0.25),
      })),
    };
  });
})();

const droplets = (() => {
  const rand = seeded(63);
  return Array.from({ length: 10 }, (_, idx) => ({
    cx: round(24 + idx * 39 + (rand() - 0.5) * 16),
    cy: round(250 + rand() * 220),
    r: round(5 + rand() * 5),
    delay: round(-rand() * 1.2),
  }));
})();

const fibroblasts = (() => {
  const rand = seeded(77);
  return Array.from({ length: 14 }, () => ({
    cx: round(16 + rand() * 368),
    cy: round(222 + rand() * 260),
    rotate: round((rand() - 0.5) * 20),
  }));
})();

export function CollagenArt() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Illustration of collagen in the dermis filling out beneath fine lines in the skin"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="co-air" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-blush-light)" />
          <stop offset="1" stopColor="var(--color-warm-white)" />
        </linearGradient>
        <linearGradient id="co-epi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-blush-light)" stopOpacity="0.8" />
          <stop offset="1" stopColor="var(--color-blush)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="co-derm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-sand-light)" />
          <stop offset="1" stopColor="var(--color-gold-light)" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="co-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--color-gold-light)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-gold-light)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="co-drop" cx="38%" cy="35%" r="65%">
          <stop offset="0" stopColor="var(--color-warm-white)" />
          <stop offset="1" stopColor="var(--color-gold-light)" />
        </radialGradient>
      </defs>

      <rect width={WIDTH} height="150" fill="url(#co-air)" />
      <rect y="140" width={WIDTH} height={HEIGHT - 140} fill="url(#co-derm)" />
      <ellipse cx="200" cy="320" rx="200" ry="150" fill="url(#co-glow)" className="animate-breathe art-box-center" />

      {fibroblasts.map((cell) => (
        <ellipse
          key={`${cell.cx}-${cell.cy}`}
          cx={cell.cx}
          cy={cell.cy}
          rx="6"
          ry="1.8"
          transform={`rotate(${cell.rotate} ${cell.cx} ${cell.cy})`}
          fill="var(--color-warm-gray)"
          fillOpacity="0.4"
        />
      ))}
      {bundles.map((bundle) => (
        <g key={bundle.base} className="co-plump art-box-center" style={{ animationDelay: `${bundle.delay}s` }}>
          {bundle.strands.map((strand) => (
            <path
              key={strand.d}
              d={strand.d}
              fill="none"
              stroke={strand.tone}
              strokeOpacity={strand.opacity}
              strokeWidth={strand.width}
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}
      {droplets.map((drop) => (
        <circle
          key={`${drop.cx}-${drop.cy}`}
          cx={drop.cx}
          cy={drop.cy}
          r={drop.r}
          fill="url(#co-drop)"
          stroke="var(--color-gold)"
          strokeOpacity="0.6"
          className="co-droplet art-box-center"
          style={{ animationDelay: `${drop.delay}s` }}
        />
      ))}

      {/* Epidermis */}
      <path d={epidermisArea} fill="url(#co-epi)" />
      {cells.map((cell) => (
        <g key={`${cell.cx}-${cell.cy}`} transform={`rotate(${cell.rotate} ${cell.cx} ${cell.cy})`}>
          <ellipse cx={cell.cx} cy={cell.cy} rx={cell.rx} ry={cell.ry} fill="var(--color-warm-white)" fillOpacity="0.6" stroke="var(--color-blush)" strokeOpacity="0.55" />
          <circle cx={cell.cx} cy={cell.cy} r="2" fill="var(--color-warm-gray)" fillOpacity="0.5" />
        </g>
      ))}
      {basalCells.map((cell) => (
        <circle key={cell.cx} cx={cell.cx} cy={cell.cy} r="5.5" fill="var(--color-blush)" fillOpacity="0.4" />
      ))}
      <path d={wave(junctionY)} fill="none" stroke="var(--color-blush)" strokeOpacity="0.7" strokeWidth="1.2" />

      {/* Fine lines at the surface */}
      {creaseShapes.map((crease) => (
        <g key={crease.key} className="co-crease art-box-top">
          <path d={crease.fill} fill="var(--color-warm-white)" />
          <path d={crease.walls} fill="none" stroke="var(--color-blush)" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      ))}
      {surfaceSegments.map((d) => (
        <path key={d} d={d} fill="none" stroke="var(--color-blush)" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}
