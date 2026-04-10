import Link from 'next/link';
import { clsx } from '@/lib/clsx';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'outline' | 'dark' | 'ghost' | 'white' | 'white-outline';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-sage text-warm-white hover:bg-sage/90 border border-sage shadow-sm',
  outline:
    'bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal hover:bg-charcoal hover:text-warm-white',
  dark: 'bg-charcoal text-warm-white hover:bg-deep-brown border border-charcoal',
  ghost: 'text-charcoal hover:bg-sand-light',
  white: 'bg-warm-white text-charcoal hover:bg-cream border border-warm-white',
  'white-outline':
    'bg-transparent text-warm-white border border-warm-white/40 hover:bg-warm-white hover:text-charcoal',
};

interface BaseProps {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
}

interface ButtonProps extends BaseProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const sizeStyles = {
  sm: 'px-5 py-2.5 text-xs tracking-widest',
  md: 'px-7 py-3.5 text-xs tracking-widest',
  lg: 'px-9 py-4 text-xs tracking-widest',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-semibold uppercase rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  external,
}: LinkButtonProps) {
  const cls = clsx(baseStyles, sizeStyles[size], variantStyles[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {withArrow && <ArrowRight size={14} strokeWidth={2} />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {withArrow && <ArrowRight size={14} strokeWidth={2} />}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        disabled && 'opacity-60 cursor-not-allowed',
        className,
      )}
    >
      {children}
      {withArrow && <ArrowRight size={14} strokeWidth={2} />}
    </button>
  );
}

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'group inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-charcoal',
        className,
      )}
    >
      <span>{children}</span>
      <span className="block w-10 h-px bg-charcoal/30 group-hover:w-16 group-hover:bg-sage transition-all duration-300" />
      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-sage" />
    </Link>
  );
}
