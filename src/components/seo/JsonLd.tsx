import { site, providers, services } from '@/lib/site';

const businessId = `${site.url}#business`;

// Cities the practice draws from, used for areaServed.
const areaServed = [
  'Bloomfield Hills',
  'Bloomfield Township',
  'Birmingham',
  'West Bloomfield',
  'Troy',
  'Royal Oak',
].map((name) => ({ '@type': 'City', name: `${name}, Michigan` }));

export function JsonLd() {
  const people = providers.map((p) => {
    const isPhysician = p.name.startsWith('Dr.');
    const firstName = p.slug.split('-')[0];
    return {
      '@type': 'Person',
      '@id': `${site.url}/providers/${p.slug}`,
      name: p.name.replace(/^Dr\.\s+/, '').split(',')[0],
      honorificPrefix: isPhysician ? 'Dr.' : undefined,
      honorificSuffix: p.name.split(',').slice(1).join(',').trim() || undefined,
      jobTitle: p.role,
      description: p.bio,
      image: `${site.url}/images/providers/${firstName}.jpg`,
      url: `${site.url}/providers/${p.slug}`,
      worksFor: { '@id': businessId },
      knowsAbout: p.specialties,
      hasCredential: p.credentials.map((credential) => ({
        '@type': 'EducationalOccupationalCredential',
        name: credential,
      })),
    };
  });

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': businessId },
        inLanguage: 'en-US',
      },
      {
        '@type': 'MedicalClinic',
        '@id': businessId,
        name: site.name,
        legalName: site.legal,
        description:
          'A private, family-owned dermatology practice offering medical, cosmetic, and surgical dermatology plus in-house dermatopathology in Bloomfield Hills, Michigan.',
        url: site.url,
        image: `${site.url}/og-image.jpg`,
        telephone: site.phone,
        faxNumber: site.fax,
        email: site.email,
        medicalSpecialty: ['Dermatology', 'Pathology'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: 'US',
        },
        hasMap: site.googleMaps,
        sameAs: [site.social.facebook, site.social.instagram, site.googleMaps],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        areaServed,
        availableService: services.map((service) => ({
          '@type': 'MedicalProcedure',
          name: service.name,
          description: service.blurb,
          url: `${site.url}/services/${service.slug}`,
        })),
        employee: people.map((person) => ({ '@id': person['@id'] })),
      },
      ...people,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
