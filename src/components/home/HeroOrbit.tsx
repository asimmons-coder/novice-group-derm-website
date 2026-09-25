'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// Two slow orbital rings over the hero photo. Each ring carries a small body
// that circles it, and the whole system leans gently toward the cursor.
export function HeroOrbit() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 40, damping: 20 });
  const xFar = useTransform(x, (v) => v * 0.5);
  const yFar = useTransform(y, (v) => v * 0.5);

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 36);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 36);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <motion.div
        style={{ x, y }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[-10%] top-[16%] w-[26rem] h-[26rem]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
          <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-gold)" strokeOpacity="0.35" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="var(--color-gold)" strokeOpacity="0.25" strokeWidth="0.3" strokeDasharray="0.6 3" />
          <circle cx="100" cy="2" r="2.4" fill="var(--color-gold)" />
          <circle cx="100" cy="2" r="5" fill="var(--color-gold)" fillOpacity="0.15" />
          <circle cx="15" cy="150" r="1.2" fill="var(--color-sage)" />
        </svg>
      </motion.div>

      <motion.div
        style={{ x: xFar, y: yFar }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[6%] bottom-[6%] w-72 h-72"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slower">
          <circle cx="100" cy="100" r="97" fill="none" stroke="var(--color-taupe)" strokeOpacity="0.45" strokeWidth="0.5" />
          <circle cx="197" cy="100" r="3" fill="var(--color-blush)" />
          <circle cx="197" cy="100" r="7" fill="var(--color-blush)" fillOpacity="0.2" />
          <Sparkle cx={32} cy={30} />
        </svg>
      </motion.div>
    </div>
  );
}

function Sparkle({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M${cx} ${cy - 6} Q${cx} ${cy} ${cx + 6} ${cy} Q${cx} ${cy} ${cx} ${cy + 6} Q${cx} ${cy} ${cx - 6} ${cy} Q${cx} ${cy} ${cx} ${cy - 6}Z`}
      fill="var(--color-gold)"
      fillOpacity="0.7"
    />
  );
}
