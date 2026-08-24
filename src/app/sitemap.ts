import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/our-story',
    '/services',
    '/services/medical-dermatology',
    '/services/cosmetic-aesthetics',
    '/services/surgical-dermatology',
    '/services/dermatopathology',
    '/skin-shop',
    '/patient-resources',
    '/contact',
  ];

  const legalRoutes = ['/privacy', '/terms', '/accessibility'];

  return [...routes, ...legalRoutes].map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : legalRoutes.includes(route) ? 0.3 : 0.8,
  }));
}
