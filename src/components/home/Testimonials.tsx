'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Container';

const testimonials = [
  {
    quote:
      'Dr. Fred has been my dermatologist for over twenty years. When my daughter started getting acne, there was no one else I would have trusted. The continuity of care is unlike anything I&rsquo;ve experienced in medicine.',
    name: 'Margaret L.',
    location: 'Birmingham, MI',
  },
  {
    quote:
      'I&rsquo;ve had Botox in three different cities. Dr. Novice is in a category of his own. You walk out looking refreshed, not frozen. He somehow makes you look like the best version of yourself.',
    name: 'Catherine R.',
    location: 'Bloomfield Hills, MI',
  },
  {
    quote:
      'Dr. Karlee diagnosed and treated a rash three other dermatologists had misread. Then she explained exactly what was happening in language I actually understood. Genuinely the best medical experience I&rsquo;ve had.',
    name: 'James T.',
    location: 'Royal Oak, MI',
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <Section bg="warm-white" padding="xl" size="narrow">
      <div className="text-center">
        <p className="font-display text-7xl text-sand leading-none -mb-4 select-none" aria-hidden>
          &ldquo;
        </p>
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="font-accent italic text-2xl md:text-3xl text-charcoal leading-relaxed mb-10 max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: testimonials[index].quote }}
              />
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm font-bold text-charcoal">{testimonials[index].name}</p>
              <p className="text-xs text-warm-gray mt-1">{testimonials[index].location}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === i ? 'w-8 bg-sage' : 'w-2 bg-sand'
              }`}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="https://www.google.com/maps/place/Novice+Group+Dermatology/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-sage hover:text-charcoal transition-colors font-semibold"
          >
            See all reviews on Google &rarr;
          </a>
          <p className="text-[11px] text-warm-gray/60">
            Reviews shared with permission
          </p>
        </div>
      </div>
    </Section>
  );
}
