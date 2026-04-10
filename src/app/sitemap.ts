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
    '/blog',
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
