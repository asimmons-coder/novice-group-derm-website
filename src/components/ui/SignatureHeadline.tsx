import { clsx } from '@/lib/clsx';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const sizeStyles: Record<Size, { display: string; accent: string }> = {
  sm: { display: 'text-3xl md:text-4xl', accent: 'text-3xl md:text-4xl' },
  md: { display: 'text-4xl md:text-5xl', accent: 'text-4xl md:text-5xl' },
  lg: { display: 'text-5xl md:text-6xl', accent: 'text-5xl md:text-6xl' },
  xl: { display: 'text-5xl md:text-7xl', accent: 'text-5xl md:text-7xl' },
};

interface SignatureHeadlineProps {
  primary: string;
  accent: string;
  size?: Size;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function SignatureHeadline({
  primary,
  accent,
  size = 'md',
  align = 'left',
  as: Tag = 'h2',
  className,
}: SignatureHeadlineProps) {
  const styles = sizeStyles[size];
  return (
    <Tag
      className={clsx(
        'headline-display',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <span className={clsx('block', styles.display)}>{primary}</span>
      <span
        className={clsx('headline-accent block mt-1 md:mt-2', styles.accent)}
      >
        {accent}
      </span>
    </Tag>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'sage' | 'gold' | 'cream';
  className?: string;
}

export function SectionLabel({
  children,
  align = 'left',
  tone = 'sage',
  className,
}: SectionLabelProps) {
  const toneClass = {
    sage: 'text-sage',
    gold: 'text-gold',
    cream: 'text-cream/80',
  }[tone];
  return (
    <span
      className={clsx(
        'section-label block mb-4',
        align === 'center' && 'text-center',
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
