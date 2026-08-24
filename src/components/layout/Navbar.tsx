'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Button';
import { navLinks, booking, services } from '@/lib/site';
import { clsx } from '@/lib/clsx';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
          {navLinks.map((link) => {
            if (link.href !== '/services') {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-charcoal/80 hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setServicesOpen(false);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setServicesOpen(false);
                    event.currentTarget.querySelector<HTMLAnchorElement>('a')?.focus();
                  }
                }}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-charcoal/80 hover:text-charcoal transition-colors"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    aria-hidden
                    className={clsx(
                      'transition-transform duration-300',
                      servicesOpen && 'rotate-180',
                    )}
                  />
                </Link>

                <div
                  className={clsx(
                    'absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 transition-all duration-300',
                    servicesOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-2 opacity-0',
                  )}
                >
                  <div className="overflow-hidden rounded-2xl border border-sand bg-warm-white p-2 shadow-xl">
                    <ul aria-label="Services">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block rounded-xl px-4 py-3 text-[13px] font-medium text-charcoal/80 transition-colors duration-300 hover:bg-sage-light hover:text-charcoal focus-visible:bg-sage-light focus-visible:text-charcoal"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-1 border-t border-sand pt-1">
                      <Link
                        href="/services"
                        className="block rounded-xl px-4 py-3 text-[13px] font-medium text-sage transition-colors duration-300 hover:bg-sage-light hover:text-charcoal focus-visible:bg-sage-light focus-visible:text-charcoal"
                      >
                        All Services
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
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
                {link.href === '/services' && (
                  <ul className="pb-4 pl-5 space-y-1">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-sm font-medium text-warm-gray transition-colors hover:text-sage"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-12">
            <LinkButton href={booking.url} external={booking.external} variant="primary" size="lg" className="w-full">
              Book Online
            </LinkButton>
            <p className="mt-6 text-center text-sm text-warm-gray">
              Or call <a href="tel:+12488262536" className="font-semibold text-charcoal">(248) 826-2536</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
