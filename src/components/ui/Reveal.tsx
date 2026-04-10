'use client';

import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { clsx } from '@/lib/clsx';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      className={clsx(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren, delayChildren }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
