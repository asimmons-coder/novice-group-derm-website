'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section, Container } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';
import { images } from '@/lib/images';
import { clsx } from '@/lib/clsx';

const products = [
  { name: 'Gentle Daily Cleanser', category: 'Cleanser', price: '$38', image: images.shop.cleanser, brand: 'SkinMedica' },
  { name: 'Foaming AHA Cleanser', category: 'Cleanser', price: '$42', image: images.shop.cleanser, brand: 'SkinCeuticals' },
  { name: 'Mineral Sunscreen SPF 50', category: 'Sunscreen', price: '$42', image: images.shop.sunscreen, brand: 'EltaMD' },
  { name: 'Tinted Sunscreen SPF 46', category: 'Sunscreen', price: '$48', image: images.shop.sunscreen, brand: 'EltaMD' },
  { name: 'Retinol Renewal Serum', category: 'Retinoid', price: '$76', image: images.shop.retinoid, brand: 'SkinCeuticals' },
  { name: 'Tretinoin Microsphere', category: 'Retinoid', price: '$95', image: images.shop.retinoid, brand: 'Rx' },
  { name: 'Hydrating Repair Cream', category: 'Moisturizer', price: '$54', image: images.shop.moisturizer, brand: 'CeraVe' },
  { name: 'Barrier Repair Lotion', category: 'Moisturizer', price: '$48', image: images.shop.moisturizer, brand: 'EltaMD' },
  { name: 'Vitamin C E Ferulic', category: 'Treatment', price: '$182', image: images.shop.serum, brand: 'SkinCeuticals' },
  { name: 'Brightening Eye Cream', category: 'Treatment', price: '$72', image: images.shop.eye, brand: 'SkinMedica' },
  { name: 'Hydrating Lip Balm', category: 'Treatment', price: '$24', image: images.shop.lip, brand: 'Aquaphor' },
  { name: 'Hydrating B5 Mask', category: 'Treatment', price: '$58', image: images.shop.mask, brand: 'SkinCeuticals' },
];

const categories = ['All', 'Cleanser', 'Sunscreen', 'Retinoid', 'Moisturizer', 'Treatment'];

export default function SkinShopPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-12 bg-cream overflow-hidden">
        <Container size="wide">
          <Reveal className="text-center max-w-3xl mx-auto">
            <SectionLabel align="center">The Skin Shop</SectionLabel>
            <SignatureHeadline
              as="h1"
              primary="Curated by"
              accent="your dermatologist."
              align="center"
              size="xl"
            />
            <p className="mt-8 text-lg text-warm-gray leading-relaxed">
              Every product on this page is one our dermatologists actively
              recommend. No paid placements, no white-label markups — just the
              ingredients, formulations, and brands we trust on real patients.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section bg="cream" padding="md">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={clsx(
                  'px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all border',
                  active
                    ? 'bg-charcoal text-warm-white border-charcoal'
                    : 'bg-warm-white border-sand text-charcoal/70 hover:border-charcoal',
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filtered.map((p) => (
            <motion.div
              layout
              key={p.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="group h-full bg-warm-white border border-sand rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-sand-light">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 45vw, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-warm-white/90 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-sage">
                      Derm Recommended
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray mb-2">
                    {p.brand}
                  </p>
                  <h3 className="font-display text-base text-charcoal mb-1 leading-snug flex-1">
                    {p.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-sage font-semibold mb-3">
                    {p.category}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base font-medium text-charcoal">{p.price}</span>
                    <button
                      type="button"
                      className="text-[11px] uppercase tracking-widest text-warm-gray group-hover:text-sage transition-colors font-semibold"
                    >
                      View →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <BookingCTA />
    </>
  );
}
