'use client';

import { useRef } from 'react';
import { clsx } from '@/lib/clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

// A soft gold glow that follows the cursor across a dark card. Position lives in
// CSS variables so moving the pointer never triggers a React render.
export function SpotlightCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={handleMove} className={clsx('group relative', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(196_162_101/0.16),transparent_60%)]"
      />
      {children}
    </div>
  );
}
