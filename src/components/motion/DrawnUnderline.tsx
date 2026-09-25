'use client';

import { motion } from 'framer-motion';
import { clsx } from '@/lib/clsx';

interface Props {
  className?: string;
  color?: string;
  delay?: number;
}

// A single hand-drawn brush stroke that writes itself under a phrase.
export function DrawnUnderline({ className, color = 'var(--color-sage)', delay = 1 }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={clsx('pointer-events-none absolute left-0 w-full', className)}
    >
      <motion.path
        d="M4 13 C 60 5, 120 4, 170 9 S 260 16, 296 7"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
