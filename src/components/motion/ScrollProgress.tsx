'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

// The brand bar gradient (sage to blush to gold) doubles as a reading-progress line.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-[linear-gradient(90deg,var(--color-sage),var(--color-blush),var(--color-gold))]"
    />
  );
}
