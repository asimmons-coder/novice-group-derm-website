'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Button';
import { navLinks, booking } from '@/lib/site';
import { clsx } from '@/lib/clsx';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(45,41,38,0.06)]'
          : 'bg-transparent',
      )}
    >
      <nav
        className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex items-center justify-between py-4 md:py-5"
        aria-label="Primary"
      >
        <Logo />

        <ul className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13px] font-medium text-charcoal/80 hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <LinkButton href={booking.url} external={booking.external} variant="primary" size="md">
            Book Online
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-charcoal"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 top-[68px] bg-cream transition-all duration-500 z-40',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex flex-col h-full px-6 pt-12 pb-12">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="border-b border-sand"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-3xl text-charcoal hover:text-sage transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-12">
            <LinkButton href={booking.url} external={booking.external} variant="primary" size="lg" className="w-full">
              Book Online
            </LinkButton>
            <p className="mt-6 text-center text-sm text-warm-gray">
              Or call <a href="tel:+12489323376" className="font-semibold text-charcoal">(248) 932-3376</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
