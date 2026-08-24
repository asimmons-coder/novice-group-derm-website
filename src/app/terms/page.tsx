import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for the Novice Group Dermatology website, including medical disclaimer and conditions for using site content.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms"
      primary="Terms"
      accent="of Use"
      description="The conditions that apply when you use this website."
      lastUpdated="July 2026"
      sections={[
        {
          heading: 'Acceptance of these terms',
          body: (
            <p>
              This website is operated by {site.legal}. By using it, you agree to these terms.
              If you do not agree, please do not use the site.
            </p>
          ),
        },
        {
          heading: 'Not medical advice',
          body: (
            <>
              <p>
                The content on this website is for general information only. It is not medical
                advice, and it is not a substitute for an examination, diagnosis, or treatment
                by a qualified clinician. Using this website, including submitting the contact
                form, does not create a doctor-patient relationship.
              </p>
              <p>
                If you have a medical emergency, call 911 or go to the nearest emergency room.
                For urgent skin concerns, call our office at {site.phone}.
              </p>
            </>
          ),
        },
        {
          heading: 'Appointments and communication',
          body: (
            <p>
              Online messages and booking requests are reviewed during business hours and do
              not guarantee an appointment time until confirmed by our staff. Please do not use
              the website to communicate time-sensitive medical information.
            </p>
          ),
        },
        {
          heading: 'Products and pricing',
          body: (
            <p>
              Skin care products shown on this website are sold in office. Prices and
              availability are subject to change without notice, and product descriptions are
              provided by their manufacturers.
            </p>
          ),
        },
        {
          heading: 'Intellectual property',
          body: (
            <p>
              The content, design, and imagery on this website belong to {site.legal} or its
              licensors. You may not reproduce or redistribute it for commercial purposes
              without written permission.
            </p>
          ),
        },
        {
          heading: 'Third-party links',
          body: (
            <p>
              This website links to third-party services, including our payment page
              and social media pages. We are not responsible for the content or
              practices of those services.
            </p>
          ),
        },
        {
          heading: 'Limitation of liability',
          body: (
            <p>
              To the fullest extent permitted by law, {site.legal} is not liable for damages
              arising from your use of this website or reliance on its content. This does not
              limit any responsibility we have to you as a patient under applicable law.
            </p>
          ),
        },
        {
          heading: 'Changes and governing law',
          body: (
            <p>
              We may update these terms from time to time; the current version is always posted
              on this page. These terms are governed by the laws of the State of Michigan.
              Questions can be sent to {site.email}.
            </p>
          ),
        },
      ]}
    />
  );
}
