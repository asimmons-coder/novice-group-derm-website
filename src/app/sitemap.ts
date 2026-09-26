import type { MetadataRoute } from 'next';
import { site, providers } from '@/lib/site';
import { guides, guidePath } from '@/lib/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/our-story',
    '/services',
    '/services/medical-dermatology',
    '/services/cosmetic-aesthetics',
    '/services/surgical-dermatology',
    '/services/dermatopathology',
    ...providers.map((provider) => `/providers/${provider.slug}`),
    '/conditions',
    ...guides.map(guidePath),
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
