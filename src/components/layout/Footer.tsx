import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { site, services } from '@/lib/site';

const practiceLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Providers', href: '/our-story#providers' },
  { label: 'Patient Resources', href: '/patient-resources' },
  { label: 'Insurance', href: '/patient-resources#insurance' },
  { label: 'Forms', href: '/patient-resources#forms' },
  { label: 'Pay Online', href: 'https://novicegroupderm.ema.md/ema/pay/onlinepay' },
];

const connectLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/novicegroupderm/', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/Novice-Group-Dermatology-105346554710060/', icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="bg-deep-brown text-warm-white">
      <Container size="wide" className="py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-xs font-accent italic text-cream/70 text-lg">
              {site.tagline}
              <br />
              {site.supportingLine}
            </p>

            <ul className="mt-8 space-y-3 text-sm text-cream/70">
              <li className="flex gap-3">
                <MapPin size={16} className="text-sage shrink-0 mt-0.5" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-sage shrink-0 mt-0.5" />
                <span>
                  <a href={`tel:${site.phoneRaw}`} className="hover:text-warm-white transition">
                    P. {site.phone}
                  </a>
                  <br />
                  <span className="text-cream/50">F. {site.fax}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-sage shrink-0 mt-0.5" />
                <a href={`mailto:${site.email}`} className="hover:text-warm-white transition">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-warm-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/skin-shop" className="hover:text-warm-white transition-colors">
                  Skin Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage mb-5">
              Practice
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-warm-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="hover:text-warm-white transition-colors">
                  Blog & Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage mb-5">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              {connectLinks.map((l) => {
                const Icon = l.icon;
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-flex items-center gap-3 hover:text-warm-white transition-colors"
                      aria-label={l.label}
                    >
                      <Icon size={14} className="text-sage" />
                      {l.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="https://goo.gl/maps/CQcnFPqJiwpAJLcm9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-warm-white transition-colors"
                >
                  Google Reviews
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-cream/50">{site.hours}</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-cream/50">
          <p>
            © {new Date().getFullYear()} {site.legal}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-warm-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-warm-white transition">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-warm-white transition">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
