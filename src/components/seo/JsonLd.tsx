import { site, providers } from '@/lib/site';

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalBusiness',
        '@id': `${site.url}#business`,
        name: site.name,
        legalName: site.legal,
        description:
          'Three generations of board-certified dermatologists offering medical, cosmetic, surgical, and in-house dermatopathology services in Bloomfield Hills, Michigan.',
        url: site.url,
        telephone: site.phone,
        email: site.email,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: 'US',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '17:00',
          },
        ],
        areaServed: {
          '@type': 'City',
          name: 'Bloomfield Hills, Michigan',
        },
      },
      ...providers
        .filter((p) => p.name.startsWith('Dr.'))
        .map((p) => ({
          '@type': 'Physician',
          '@id': `${site.url}/our-story#${p.slug}`,
          name: p.name,
          medicalSpecialty: 'Dermatology',
          worksFor: { '@id': `${site.url}#business` },
          description: p.headline,
        })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
