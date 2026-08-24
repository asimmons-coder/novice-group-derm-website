import { site, providers, services, faqs } from '@/lib/site';
import { images } from '@/lib/images';

const providerImages: Record<string, string> = {
  'fred-novice': images.providers.fred,
  'karlee-novice': images.providers.karlee,
  'taylor-novice': images.providers.taylor,
  'erin-koppelman': images.providers.erin,
};

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalBusiness',
        '@id': `${site.url}#business`,
        name: site.name,
        alternateName: [site.alternateName, site.legal],
        legalName: site.legal,
        description:
          'Two generations of board-certified dermatologists offering medical, cosmetic, surgical, and dermatopathology services in Bloomfield Hills, Michigan. Slides are processed by a lab; Dr. Fred Novice and Dr. Taylor Novice read them.',
        url: site.url,
        telephone: site.phoneRaw,
        faxNumber: site.fax,
        email: site.email,
        image: `${site.url}/og-image.jpg`,
        foundingDate: site.founded,
        priceRange: '$$$',
        sameAs: [site.social.facebook, site.social.instagram],
        hasMap: site.googleMaps,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 42.5836,
          longitude: -83.2453,
          name: 'Approximate Bloomfield Hills, Michigan',
          description: 'Approximate city-level coordinates for Bloomfield Hills; not a street-level pin.',
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
        availableService: services.map((s) => ({
          '@type': 'MedicalProcedure',
          name: s.name,
          description: s.blurb,
          url: `${site.url}/services/${s.slug}`,
        })),
        acceptedInsurance: site.insurance.map((name) => ({
          '@type': 'HealthInsurancePlan',
          name,
        })),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: site.phoneRaw,
            email: site.email,
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: 'English',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
      ...providers.map((p) => ({
        '@type': p.schemaType,
        '@id': `${site.url}/our-story#${p.slug}`,
        name: p.name,
        jobTitle: p.role,
        image: `${site.url}${providerImages[p.slug]}`,
        url: `${site.url}/our-story#${p.slug}`,
        worksFor: { '@id': `${site.url}#business` },
        description: p.bio,
        ...(p.schemaType === 'Physician' ? { medicalSpecialty: 'Dermatology' } : {}),
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
