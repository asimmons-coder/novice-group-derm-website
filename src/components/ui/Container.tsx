import { clsx } from '@/lib/clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
}

const sizeClasses = {
  narrow: 'max-w-4xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
};

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div className={clsx('mx-auto px-6 md:px-10 lg:px-16', sizeClasses[size], className)}>
      {children}
    </div>
  );
}

interface SectionProps extends ContainerProps {
  bg?: 'cream' | 'warm-white' | 'sand-light' | 'deep-brown' | 'sage' | 'gradient-cosmetic';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
  as?: 'section' | 'div';
}

const bgClasses = {
  cream: 'bg-cream',
  'warm-white': 'bg-warm-white',
  'sand-light': 'bg-sand-light',
  'deep-brown': 'bg-deep-brown text-warm-white',
  sage: 'bg-sage text-warm-white',
  'gradient-cosmetic':
    'bg-[linear-gradient(135deg,var(--color-sage-light)_0%,var(--color-blush-light)_50%,var(--color-sand-light)_100%)]',
};

const paddingClasses = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
  xl: 'py-24 md:py-40',
};

export function Section({
  children,
  className,
  size = 'default',
  bg = 'cream',
  padding = 'lg',
  id,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={clsx(bgClasses[bg], paddingClasses[padding], className)}>
      <Container size={size}>{children}</Container>
    </Tag>
  );
}
