'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  value: string;
}

// Animates the numeric part of a stat ("30+", "4.8") and passes non-numeric
// values ("In-House") through untouched.
export function CountUp({ value }: Props) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes('.') ? match[1].split('.')[1].length : 0;
  const [display, setDisplay] = useState(match ? (0).toFixed(decimals) : value);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduceMotion) {
      setDisplay(target.toFixed(decimals));
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
    // match is derived from value; target and decimals cover it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, target, decimals]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {display}
        {match[2]}
      </span>
    </span>
  );
}
