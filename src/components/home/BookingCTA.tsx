import { Section } from '@/components/ui/Container';
import { SignatureHeadline } from '@/components/ui/SignatureHeadline';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { site, booking } from '@/lib/site';

interface Props {
  primary?: string;
  accent?: string;
  description?: string;
}

export function BookingCTA({
  primary = 'Ready to love',
  accent = 'your skin?',
  description = 'New patients welcome. Most major insurance accepted. Call or send a message to book a medical or cosmetic consultation.',
}: Props) {
  return (
    <Section bg="sage" padding="lg" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1.5, 3, 4.5].map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}s` }}
            className="absolute w-[36rem] h-[36rem] rounded-full border border-warm-white/40 animate-ripple"
          />
        ))}
      </div>
      <Reveal className="relative text-center max-w-3xl mx-auto">
        <SignatureHeadline
          primary={primary}
          accent={accent}
          align="center"
          size="lg"
          className="[&_*]:text-warm-white"
        />
        <p className="mt-6 text-cream/90 text-lg leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton
            href={booking.url}
            external={booking.external}
            variant="white"
            size="lg"
            withArrow
          >
            {booking.cta}
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
