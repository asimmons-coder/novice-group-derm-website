import type { Metadata } from 'next';
import { site } from '@/lib/site';

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

// Next merges metadata shallowly, so a page that sets openGraph at all replaces
// the layout's openGraph wholesale (image included). Every page goes through
// this helper to get its own canonical URL and a complete social card.
export function pageMetadata({ title, description, path, noindex = false }: PageMetaInput): Metadata {
  const socialTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'The dermatologists of Novice Group Dermatology in Bloomfield Hills, Michigan',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/og-image.jpg'],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
