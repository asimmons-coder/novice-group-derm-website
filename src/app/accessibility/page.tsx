import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'Accessibility statement for the Novice Group Dermatology website, including our standards, current measures, and how to report an issue.',
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      label="Accessibility"
      primary="Accessibility"
      accent="Statement"
      description="Our commitment to a website every patient can use."
      lastUpdated="July 2026"
      sections={[
        {
          heading: 'Our commitment',
          body: (
            <p>
              {site.name} wants every patient to be able to find our practice, learn about our
              services, and reach us, regardless of ability or the technology they use. We aim
              to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            </p>
          ),
        },
        {
          heading: 'What we do',
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Semantic HTML with a logical heading structure on every page</li>
              <li>A skip-to-content link and full keyboard navigability</li>
              <li>Text alternatives for meaningful images</li>
              <li>Color contrast checked against WCAG AA targets</li>
              <li>Layouts that adapt to screen readers, zoom, and mobile devices</li>
            </ul>
          ),
        },
        {
          heading: 'Ongoing work',
          body: (
            <p>
              Accessibility is an ongoing effort, not a one-time audit. We review new pages and
              features against these standards as we publish them, and we fix issues as they
              are found.
            </p>
          ),
        },
        {
          heading: 'Report an issue',
          body: (
            <p>
              If any part of this website is difficult for you to use, we want to know. Call us
              at {site.phone} or email {site.email} and we will address it and help you get the
              information you need another way in the meantime.
            </p>
          ),
        },
        {
          heading: 'In the office',
          body: (
            <p>
              If you need an accommodation for your visit, call us before your appointment at{' '}
              {site.phone} and we will make arrangements.
            </p>
          ),
        },
      ]}
    />
  );
}
