import { site, providers, services } from '@/lib/site';
import { images } from '@/lib/images';

const businessId = `${site.url}#business`;

const providerImages: Record<string, string> = {
  'fred-novice': images.providers.fred,
  'karlee-novice': images.providers.karlee,
  'taylor-novice': images.providers.taylor,
  'erin-koppelman': images.providers.erin,
};

// Cities the practice draws from, used for areaServed.
const areaServed = [
  'Bloomfield Hills',
  'Bloomfield Township',
  'Birmingham',
  'West Bloomfield',
  'Troy',
  'Royal Oak',
].map((name) => ({ '@type': 'City', name: `${name}, Michigan` }));

// Site-wide graph. FAQPage is deliberately not here: each page that shows an
// FAQ list emits its own, so no page carries two FAQPage blocks.
export function JsonLd() {
  const people = providers.map((p) => {
    const profileUrl = `${site.url}/providers/${p.slug}`;
    return {
      // schema.org has no Nurse type; non-physicians are a Person with a jobTitle.
      '@type': p.schemaType === 'Physician' ? 'Physician' : 'Person',
      '@id': profileUrl,
      name: p.name,
      jobTitle: p.role,
      image: `${site.url}${providerImages[p.slug]}`,
      url: profileUrl,
      worksFor: { '@id': businessId },
      description: p.bio,
      knowsAbout: p.specialties,
      hasCredential: p.credentials.map((credential) => ({
        '@type': 'EducationalOccupationalCredential',
        name: credential,
      })),
      ...(p.schemaType === 'Physician' ? { medicalSpecialty: 'Dermatology' } : {}),
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
        '@type': 'MedicalBusiness',
        '@id': businessId,
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
        medicalSpecialty: ['Dermatology', 'Pathology'],
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
        areaServed,
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
