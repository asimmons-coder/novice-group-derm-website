import { Star } from 'lucide-react';
import { Section } from '@/components/ui/Container';
import { site } from '@/lib/site';

export function Testimonials() {
  return (
    <Section bg="warm-white" padding="xl" size="narrow">
      <div className="text-center">
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className="fill-gold text-gold" />
          ))}
        </div>
        <p className="font-display text-3xl md:text-4xl text-charcoal leading-tight mb-6">
          Patients share their experiences on Google.
        </p>
        <p className="text-warm-gray leading-relaxed max-w-xl mx-auto mb-10">
          We do not publish invented quotes or review counts on this site.
          Read current patient reviews on our Google Business profile.
        </p>
        <a
          href={site.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs uppercase tracking-widest text-sage hover:text-charcoal transition-colors font-semibold"
        >
          See reviews on Google &rarr;
        </a>
      </div>
    </Section>
  );
}
