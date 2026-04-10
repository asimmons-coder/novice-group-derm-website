import { Star } from 'lucide-react';
import { stats } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export function DifferentiatorStrip() {
  return (
    <section className="bg-charcoal text-warm-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-14 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 divide-y lg:divide-y-0 lg:divide-x divide-warm-white/10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="lg:px-8 first:lg:pl-0 last:lg:pr-0 pt-10 lg:pt-0">
              <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
                <p className="font-display text-4xl md:text-5xl text-gold leading-none flex items-baseline gap-2">
                  {stat.value}
                  {stat.label === 'Patient Rating' && (
                    <Star size={18} className="fill-gold text-gold" />
                  )}
                </p>
                <p className="mt-3 text-[13px] md:text-sm text-cream/90 font-medium">
                  {stat.label}
                </p>
                <p className="mt-1 font-accent italic text-xs md:text-sm text-taupe">
                  {stat.sublabel}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
