'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  value: string;
}

// Animates the numeric part of a stat ("30+", "4.8"); other values pass
// through unchanged. The server always renders the real value so
// crawlers and no-JS readers never see a zero. The client only resets to zero
// when the stat mounts off-screen, where the reset cannot be seen.
export function CountUp({ value }: Props) {
  // Up to three digits: small counts animate, a year like "1999" never does.
  const match = value.match(/^(\d{1,3}(?:\.\d+)?)(?!\d)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].split('.')[1]?.length ?? 0;
  const final = target.toFixed(decimals);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(final);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!match || reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    const offScreen = !rect || rect.top > window.innerHeight || rect.bottom < 0;
    if (offScreen) {
      setDisplay((0).toFixed(decimals));
      setArmed(true);
    }
    // Only decide once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [armed, inView, target, decimals]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {display}
      {match[2]}
    </span>
  );
}
