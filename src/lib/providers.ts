import { providers } from '@/lib/site';
import { images } from '@/lib/images';

export type Provider = (typeof providers)[number];

type ImageKey = keyof typeof images.providers;

// Display helpers derived from the canonical provider records in site.ts, so
// profile pages, guides, and llms.txt all name people the same way.
export function providerPath(slug: string) {
  return `/providers/${slug}`;
}

export function providerImage(provider: Provider) {
  return images.providers[provider.slug.split('-')[0] as ImageKey];
}

// "Dr. Fred M. Novice, MD" -> "Dr. Fred M. Novice"
export function providerFullName(provider: Provider) {
  return provider.name.split(',')[0];
}

// "Dr. Fred M. Novice, MD" -> "MD"
export function providerSuffix(provider: Provider) {
  return provider.name.split(',').slice(1).join(',').trim();
}

// "Dr. Fred Novice" or "Erin Koppelman": first and last name, no middle initial.
export function providerShortName(provider: Provider) {
  const parts = providerFullName(provider).split(' ').filter((part) => !/^[A-Z]\.$/.test(part));
  return parts.join(' ');
}

// How patients address each provider: "Dr. Fred" or "Erin".
export function providerFirstName(provider: Provider) {
  const [first, second] = providerFullName(provider).split(' ');
  return first === 'Dr.' ? `Dr. ${second}` : first;
}

export function getProvider(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}
