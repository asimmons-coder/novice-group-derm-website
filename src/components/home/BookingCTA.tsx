import { Section } from '@/components/ui/Container';
import { SignatureHeadline } from '@/components/ui/SignatureHeadline';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { site, booking } from '@/lib/site';

export function BookingCTA() {
  return (
    <Section bg="sage" padding="lg">
      <Reveal className="text-center max-w-3xl mx-auto">
        <SignatureHeadline
          primary="Ready to love"
          accent="your skin?"
          align="center"
          size="lg"
          className="[&_*]:text-warm-white"
        />
        <p className="mt-6 text-cream/90 text-lg leading-relaxed max-w-xl mx-auto">
          New patients welcome. Most major insurance accepted. Schedule online
          or call to book a medical or cosmetic consultation.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton
            href={booking.url}
            external={booking.external}
            variant="white"
            size="lg"
            withArrow
          >
            Book Online
          </LinkButton>
          <LinkButton
            href={`tel:${site.phoneRaw}`}
            variant="white-outline"
            size="lg"
          >
            Call {site.phone}
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}
