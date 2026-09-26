import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLabel, ArrowLink, LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { booking, providers, site } from '@/lib/site';
import { guides, guidePath } from '@/lib/guides';
import {
  getProvider,
  providerFirstName,
  providerFullName,
  providerImage,
  providerPath,
  providerShortName,
  providerSuffix,
  type Provider,
} from '@/lib/providers';

interface Props {
  params: Promise<{ slug: string }>;
}

// The quotable opening paragraph for each profile. Every fact here comes from
// the provider's record in site.ts; update both together.
const summaries: Record<string, string> = {
  'fred-novice':
    'Dr. Fred M. Novice, MD, is a board-certified dermatologist and dermatopathologist and the founder of Novice Group Dermatology in Bloomfield Hills, Michigan. He trained in dermatology at Henry Ford Hospital, where he was Chief Resident, and in dermatopathology at the University of Oklahoma. He treats skin cancer, reads biopsies, and has more than 30 years of Botox and filler experience.',
  'karlee-novice':
    'Dr. Karlee D. Novice, MD, is a board-certified dermatologist at Novice Group Dermatology in Bloomfield Hills, Michigan, and a Fellow of the American Academy of Dermatology. She trained at Henry Ford Hospital, where she was Chief Resident, and sees patients for medical dermatology, cosmetic care, pediatric skin concerns, and skin cancer.',
  'taylor-novice':
    'Dr. Taylor Novice, MD, MBA, is a board-certified dermatologist and dermatopathologist at Novice Group Dermatology in Bloomfield Hills, Michigan, and the third generation of dermatologists in the Novice family. She trained in dermatology at Henry Ford Hospital, where she was Academic Chief Resident, and in dermatopathology at the University of Michigan. She practices medical and cosmetic dermatology and dermatopathology.',
  'erin-koppelman':
    'Erin Koppelman, MSN, APRN, NP-C, is a board-certified nurse practitioner at Novice Group Dermatology in Bloomfield Hills, Michigan. She earned her nursing degrees at the University of Michigan and Wayne State University and practiced hospital medicine in cardiology and intensive care before specializing in dermatology. She provides general dermatology, skin screenings, and cosmetic treatments.',
};

function summaryFor(provider: Provider) {
  return (
    summaries[provider.slug] ??
    `${provider.name} is a ${provider.role.toLowerCase()} at ${site.name} in ${site.address.city}, Michigan. ${provider.headline}`
  );
}

function professionFor(provider: Provider) {
  return provider.role.includes('Nurse Practitioner') ? 'Nurse Practitioner' : 'Dermatologist';
}

// Splits "BA magna cum laude, Lehigh University" into a term and a detail line.
// Single-word lead-ins like "Fellow" or "AANP" read better unsplit.
function splitCredential(credential: string) {
  const match = credential.match(/^(.+?)(?:, |: )(.+)$/);
  if (!match) return { term: credential };
  const [, term, detail] = match;
  const isDegree = /^(MD|BA|BSN|MSN|MBA)\b/.test(term);
  if (!isDegree && !term.includes(' ')) return { term: credential };
  return { term, detail };
}

// Only the providers in site.ts have profiles; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) return {};
  return pageMetadata({
    title: `${providerShortName(provider)}, ${professionFor(provider)} in Bloomfield Hills, MI`,
    description: `${providerShortName(provider)} is a ${provider.role.toLowerCase()} at ${site.name} in Bloomfield Hills, MI. ${provider.headline}`,
    path: providerPath(provider.slug),
  });
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) notFound();

  const firstName = providerFirstName(provider);
  const colleagues = providers.filter((other) => other.slug !== provider.slug);
  const relatedGuides = guides.filter((guide) => guide.providers.includes(provider.slug));

  return (
    <>
      <PageHero
        label={provider.role}
        primary={providerFullName(provider)}
        accent={providerSuffix(provider)}
        description={summaryFor(provider)}
        image={{ src: providerImage(provider), alt: `Portrait of ${providerShortName(provider)}` }}
      />

      <Section bg="warm-white" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionLabel>About {firstName}</SectionLabel>
            <p className="font-accent text-2xl md:text-3xl text-charcoal/85 leading-snug mb-8 max-w-2xl">
              {provider.headline}
            </p>
            <p className="text-lg text-warm-gray leading-relaxed max-w-2xl">{provider.bio}</p>

            <h2 className="section-label text-sage-deep mt-14 mb-5">Focus Areas</h2>
            <ul className="flex flex-wrap gap-2">
              {provider.specialties.map((specialty) => (
                <li
                  key={specialty}
                  className="px-4 py-2 bg-sage-light text-charcoal text-xs font-semibold rounded-full"
                >
                  {specialty}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="bg-cream border border-sand rounded-3xl p-8 md:p-10">
              <SectionLabel>Book a Visit</SectionLabel>
              <h2 className="font-display text-3xl text-charcoal leading-tight">
                Book with {firstName}
              </h2>
              <p className="mt-4 text-warm-gray leading-relaxed">
                New patients are welcome, and most major insurance is accepted. When you call or
                send a request, mention that you would like to see {firstName}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={booking.url} external={booking.external} withArrow>
                  {booking.label}
                </LinkButton>
                <LinkButton href={`tel:${site.phoneRaw}`} variant="outline">
                  Call {site.phone}
                </LinkButton>
              </div>
              <p className="mt-8 text-sm text-warm-gray leading-relaxed">
                {site.address.full}
                <br />
                {site.hours}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h2 className="section-label text-sage-deep mb-6">Education and Credentials</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-b border-sand">
            {provider.credentials.map((credential) => {
              const { term, detail } = splitCredential(credential);
              return (
                <li key={credential} className="py-4 border-t border-sand">
                  <span className="block text-charcoal font-medium">{term}</span>
                  {detail && <span className="block mt-1 text-sm text-warm-gray">{detail}</span>}
                </li>
              );
            })}
          </ul>
        </Reveal>

        {relatedGuides.length > 0 && (
          <Reveal className="mt-20">
            <h2 className="section-label text-sage-deep mb-6">Related Skin Guides</h2>
            <ul className="flex flex-wrap gap-x-10 gap-y-5">
              {relatedGuides.map((guide) => (
                <li key={guide.slug}>
                  <ArrowLink href={guidePath(guide)}>{guide.name}</ArrowLink>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Section>

      <Section bg="cream" padding="lg">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionLabel>The Team</SectionLabel>
            <SignatureHeadline primary="The other providers" accent="at Novice Group." size="md" />
          </div>
          <ArrowLink href="/our-story">Our story</ArrowLink>
        </Reveal>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {colleagues.map((colleague) => (
            <li key={colleague.slug}>
              <Link
                href={providerPath(colleague.slug)}
                className="group flex h-full flex-col bg-warm-white border border-sand rounded-3xl overflow-hidden hover:border-sage-deep hover:shadow-lg transition-all duration-500"
              >
                <div className="relative aspect-[4/3] bg-sand-light">
                  <Image
                    src={providerImage(colleague)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-charcoal leading-snug">
                    {providerShortName(colleague)}
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-warm-gray">{colleague.role}</p>
                  <ArrowLabel className="mt-auto">View profile</ArrowLabel>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <BookingCTA
        primary="Book a visit"
        accent="in Bloomfield Hills."
        description={`New patients welcome, and most major insurance is accepted. Call ${site.phone} or send a request to see ${firstName}.`}
      />
    </>
  );
}
