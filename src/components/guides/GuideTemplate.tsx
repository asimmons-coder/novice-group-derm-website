import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { ArrowLabel, ArrowLink } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { services } from '@/lib/site';
import { guideDisclaimer, type Guide } from '@/lib/guides';
import {
  getProvider,
  providerImage,
  providerPath,
  providerShortName,
  type Provider,
} from '@/lib/providers';

interface GuideTemplateProps {
  guide: Guide;
}

export function GuideTemplate({ guide }: GuideTemplateProps) {
  const relatedServices = services.filter((service) => guide.services.includes(service.slug));
  const relatedProviders = guide.providers
    .map((slug) => getProvider(slug))
    .filter((provider): provider is Provider => Boolean(provider));

  return (
    <>
      <PageHero
        label={guide.label}
        primary={guide.primary}
        accent={guide.accent}
        description={guide.answer}
      />

      <Section bg="warm-white" padding="lg" size="narrow">
        <div className="space-y-16 md:space-y-20">
          {guide.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal leading-tight mb-6">
                {section.heading}
              </h2>
              <div className="space-y-5 text-lg text-warm-gray leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.list && (
                <dl className="mt-8 border-b border-sand">
                  {section.list.map((item) => (
                    <div
                      key={item.term}
                      className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-x-8 gap-y-1 py-4 border-t border-sand"
                    >
                      <dt className="font-semibold text-charcoal">{item.term}</dt>
                      <dd className="text-warm-gray leading-relaxed">{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="cream" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionLabel>Related Care</SectionLabel>
            <SignatureHeadline primary="Where to go" accent="from here." size="md" />
            <ul className="mt-10 space-y-5">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <ArrowLink href={`/services/${service.slug}`}>{service.name}</ArrowLink>
                </li>
              ))}
              <li>
                <ArrowLink href="/conditions">All skin guides</ArrowLink>
              </li>
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <SectionLabel>
              {relatedProviders.length === 1 ? 'Your Provider' : 'Providers Who Treat This'}
            </SectionLabel>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedProviders.map((provider) => (
                <li key={provider.slug}>
                  <Link
                    href={providerPath(provider.slug)}
                    className="group flex items-center gap-5 h-full bg-warm-white border border-sand rounded-2xl p-4 hover:border-sage-deep hover:shadow-lg transition-all duration-500"
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-sand-light">
                      <Image
                        src={providerImage(provider)}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-charcoal leading-snug">
                        {providerShortName(provider)}
                      </h3>
                      <p className="mt-1 text-sm text-warm-gray leading-snug">{provider.role}</p>
                      <ArrowLabel className="mt-3">Profile</ArrowLabel>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section bg="warm-white" padding="xl" size="narrow">
        <Reveal className="text-center mb-12">
          <SectionLabel align="center">Frequently Asked</SectionLabel>
          <SignatureHeadline
            primary="Common questions"
            accent={`about ${guide.topic}.`}
            align="center"
            size="md"
          />
        </Reveal>
        <Accordion items={guide.faqs} />
        <p className="mt-14 text-sm text-warm-gray leading-relaxed text-center max-w-2xl mx-auto">
          {guideDisclaimer}
        </p>
      </Section>

      <BookingCTA
        primary={guide.cta.primary}
        accent={guide.cta.accent}
        description={guide.cta.description}
      />
    </>
  );
}
