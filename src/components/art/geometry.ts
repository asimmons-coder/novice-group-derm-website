// Shared helpers for the hand-built illustrations. Everything is computed at
// module load from fixed seeds and rounded, so server and client HTML match.

export const round = (n: number) => Math.round(n * 10) / 10;

/** Deterministic pseudo-random source (mulberry32), same algorithm as SkinLayers. */
export function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Smooth closed blob through points sampled from a polar radius function.
 * Every call with the same `samples` count yields the same command structure,
 * which lets framer interpolate between two blobs.
 */
export function blobPath(radiusAt: (theta: number) => number, cx: number, cy: number, samples = 24) {
  const points = Array.from({ length: samples }, (_, idx) => {
    const theta = (idx / samples) * Math.PI * 2;
    const radius = radiusAt(theta);
    return [cx + Math.cos(theta) * radius, cy + Math.sin(theta) * radius];
  });
  // Catmull-Rom to cubic Bezier, closed
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;
  for (let idx = 0; idx < samples; idx++) {
    const p0 = points[(idx - 1 + samples) % samples];
    const p1 = points[idx];
    const p2 = points[(idx + 1) % samples];
    const p3 = points[(idx + 2) % samples];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2[0])} ${round(p2[1])}`;
  }
  return `${d} Z`;
}
