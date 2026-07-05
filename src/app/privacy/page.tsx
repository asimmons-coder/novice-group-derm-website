import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Novice Group Dermatology handles information collected through this website, including contact form submissions and analytics.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy"
      primary="Privacy"
      accent="Policy"
      description="How we handle information collected through this website."
      lastUpdated="July 2026"
      sections={[
        {
          heading: 'Scope of this policy',
          body: (
            <>
              <p>
                This policy describes how {site.legal} (&ldquo;we,&rdquo; &ldquo;us&rdquo;)
                handles information collected through this website. It applies to the website
                only.
              </p>
              <p>
                Your medical records and protected health information are governed by our
                Notice of Privacy Practices under HIPAA, which is provided at the office and
                available on request. Nothing submitted through this website becomes part of
                your medical record.
              </p>
            </>
          ),
        },
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>
                If you use our contact form, we receive the name, email address, phone number,
                and message you choose to send. We use it to respond to your inquiry and for no
                other purpose.
              </p>
              <p>
                Like most websites, we may use analytics tools (such as Google Analytics) to
                understand aggregate site usage, such as which pages are visited and how
                visitors arrive. This data is not used to identify you personally.
              </p>
            </>
          ),
        },
        {
          heading: 'What we do not do',
          body: (
            <>
              <p>We do not sell, rent, or trade your information to anyone.</p>
              <p>
                We do not use information submitted through this website for marketing without
                your consent, and we do not collect health information through this website.
                Please do not include medical details in the contact form; call us instead.
              </p>
            </>
          ),
        },
        {
          heading: 'Third-party services',
          body: (
            <p>
              This website links to services operated by others, including our online payment
              portal, our patient portal, and our social media pages. Those services have their
              own privacy policies, and this policy does not apply to them.
            </p>
          ),
        },
        {
          heading: 'Children',
          body: (
            <p>
              This website is not directed at children, and we do not knowingly collect
              information from children through it. Appointments for minors are arranged by a
              parent or legal guardian.
            </p>
          ),
        },
        {
          heading: 'Questions',
          body: (
            <p>
              If you have questions about this policy or want to review or delete information
              you submitted through the website, contact us at {site.email} or{' '}
              {site.phone}, or write to us at {site.address.full}.
            </p>
          ),
        },
      ]}
    />
  );
}
