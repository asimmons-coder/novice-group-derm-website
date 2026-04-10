import Link from 'next/link';
import { clsx } from '@/lib/clsx';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-charcoal' : 'text-warm-white';
  const subColor = variant === 'dark' ? 'text-warm-gray' : 'text-cream/70';
  return (
    <Link
      href="/"
      aria-label="Novice Group Dermatology — Home"
      className={clsx('inline-flex items-center gap-3', className)}
    >
      <span
        aria-hidden
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-warm-white font-display text-lg font-bold"
        style={{
          background:
            'linear-gradient(135deg, #8FA68F 0%, #D4A69A 100%)',
        }}
      >
        N
      </span>
      <span className="flex flex-col leading-none">
        <span className={clsx('font-display text-xl font-semibold tracking-tight', textColor)}>
          Novice Group
        </span>
        <span
          className={clsx(
            'mt-1 text-[10px] font-semibold uppercase tracking-[0.25em]',
            subColor,
          )}
        >
          Dermatology
        </span>
      </span>
    </Link>
  );
}
