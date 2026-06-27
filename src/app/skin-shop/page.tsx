'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { Reveal } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';
import { clsx } from '@/lib/clsx';

const products = [
  // Cleansers
  { name: 'Facial Cleanser', category: 'Cleanser', price: '$38', image: 'https://novicegroupderm.com/wp-content/uploads/2020/10/Cleansers_SkinMedica_FacialCleanser.png', brand: 'SkinMedica' },
  { name: 'AHA/BHA Exfoliating Cleanser', category: 'Cleanser', price: '$47', image: 'https://novicegroupderm.com/wp-content/uploads/2020/10/Cleansers_SkinMedica_AHA-BHA-Exfoliating-Cleanser.png', brand: 'SkinMedica' },
  // Sunscreens
  { name: 'Intellishade Original', category: 'Sunscreen', price: '$80', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Sunscreen_Revision-Skincare_Intellishade-Original.png', brand: 'Revision Skincare' },
  { name: 'Intellishade Matte', category: 'Sunscreen', price: '$80', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Sunscreen_Revision-Skincare_Intellishade-Matte.png', brand: 'Revision Skincare' },
  { name: 'Intellishade TruPhysical', category: 'Sunscreen', price: '$80', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Sunscreen_Revision-Skincare_Intellishade-TruPhysical.png', brand: 'Revision Skincare' },
  { name: 'Intellishade Clear SPF 50', category: 'Sunscreen', price: '$80', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Screen-Shot-2022-02-03-at-3.30.39-PM.png', brand: 'Revision Skincare' },
  { name: 'Total Defense + Repair SPF 34', category: 'Sunscreen', price: '$68', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Sunscreen_SkinMedica_SPF34.png', brand: 'SkinMedica' },
  // Serums
  { name: 'Hydrating Serum', category: 'Serum', price: '$72', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Serum_Revision-Hydrating-Serum.png', brand: 'Revision Skincare' },
  { name: 'HA5 Rejuvenating Hydrator', category: 'Serum', price: '$178', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Serum_SkinMedica-HA5-Rejuvenating-Hydrator.png', brand: 'SkinMedica' },
  { name: 'TNS Advanced+ Serum', category: 'Serum', price: '$295', image: 'https://novicegroupderm.com/wp-content/uploads/2021/01/Serum_SkinMedica-TNS-Advanced-Serum.png', brand: 'SkinMedica' },
  { name: 'LUMIVIVE System', category: 'Serum', price: '$265', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Serum_SkinMedica-LUMIVIVE.png', brand: 'SkinMedica' },
  // Moisturizers
  { name: 'Replenish Hydrating Cream', category: 'Moisturizer', price: '$66', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Moisturizers_SkinMedica-Replenish-Hydrating-Cream.png', brand: 'SkinMedica' },
  { name: 'Dermal Repair Cream', category: 'Moisturizer', price: '$129', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Moisturizers_SkinMedica-Dermal-Repair-Cream.png', brand: 'SkinMedica' },
  { name: 'Ceramide Treatment Cream', category: 'Moisturizer', price: '$69', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Moisturizers_SkinMedica-Ceramide-Treatment-Cream.png', brand: 'SkinMedica' },
  { name: 'Firming Night Cream', category: 'Moisturizer', price: '$65', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Moisturizers_Revision-Firming-Night-Cream.png', brand: 'Revision Skincare' },
  // Eyes
  { name: 'DEJ Eye Cream', category: 'Eyes', price: '$97', image: 'https://novicegroupderm.com/wp-content/uploads/2020/10/Eyes_Revision_DEJ_EyeCream.png', brand: 'Revision Skincare' },
  { name: 'Instant Bright Eye Cream', category: 'Eyes', price: '$88', image: 'https://novicegroupderm.com/wp-content/uploads/2020/10/Eyes_SkinMedica_InstantBrightEyeCream.png', brand: 'SkinMedica' },
  { name: 'TNS Eye Repair', category: 'Eyes', price: '$102', image: 'https://novicegroupderm.com/wp-content/uploads/2020/10/Eyes_SkinMedica_TNS_EyeRepair.png', brand: 'SkinMedica' },
  // Neck
  { name: 'Nectifirm', category: 'Neck', price: '$86', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Neck_Revision-Nectifirm.png', brand: 'Revision Skincare' },
  { name: 'Nectifirm Advanced', category: 'Neck', price: '$142', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/Neck_Revision-Nectifirm-Advanced.png', brand: 'Revision Skincare' },
  // Treatments
  { name: 'Scar Recovery Gel with Centelline', category: 'Treatment', price: '$44', image: 'https://novicegroupderm.com/wp-content/uploads/2021/01/Misc_SkinMedica-Scar-Recovery-Gel.png', brand: 'SkinMedica' },
  { name: 'Lytera 2.0', category: 'Treatment', price: '$154', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/PigmentCorrectingSerum_SkinMedica-Lytera-2.0.png', brand: 'SkinMedica' },
  { name: 'Retinol 0.25', category: 'Treatment', price: '$62', image: 'https://novicegroupderm.com/wp-content/uploads/2021/01/PigmentCorrectingSerum_SkinMedica-Retinol-0.25.png', brand: 'SkinMedica' },
  { name: 'Retinol 0.5', category: 'Treatment', price: '$78', image: 'https://novicegroupderm.com/wp-content/uploads/2020/12/PigmentCorrectingSerum_SkinMedica-Retinol-0.5.png', brand: 'SkinMedica' },
  { name: 'Retinol 1.0', category: 'Treatment', price: '$93', image: 'https://novicegroupderm.com/wp-content/uploads/2021/01/PigmentCorrectingSerum_SkinMedica-Retinol-1.0.png', brand: 'SkinMedica' },
];

const categories = ['All', 'Cleanser', 'Sunscreen', 'Serum', 'Moisturizer', 'Eyes', 'Neck', 'Treatment'];

// Soft per-category tint so the grid has gentle variety instead of one flat color.
const categoryTint: Record<string, string> = {
  Cleanser: 'bg-sand-light',
  Sunscreen: 'bg-gold-light/50',
  Serum: 'bg-sage-light',
  Moisturizer: 'bg-blush-light/60',
  Eyes: 'bg-sage-light',
  Neck: 'bg-sand-light',
  Treatment: 'bg-gold-light/40',
};

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
                <div
                  className={clsx(
                    'relative aspect-square overflow-hidden flex flex-col items-center justify-center text-center px-6',
                    categoryTint[p.category] ?? 'bg-sand-light',
                  )}
                >
                  {/* Brand monogram watermark */}
                  <span
                    aria-hidden
                    className="pointer-events-none select-none absolute -bottom-8 -right-3 font-display leading-none text-[9rem] text-charcoal/[0.05] transition-transform duration-700 group-hover:scale-110"
                  >
                    {p.brand.charAt(0)}
                  </span>
                  <span className="relative text-[10px] uppercase tracking-[0.25em] text-warm-gray font-semibold mb-3">
                    {p.brand}
                  </span>
                  <h3 className="relative font-display text-lg text-charcoal leading-snug">
                    {p.name}
                  </h3>
                  <span className="relative mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-sage font-semibold">
                    <span className="h-px w-4 bg-sage/40" />
                    {p.category}
                    <span className="h-px w-4 bg-sage/40" />
                  </span>
                  <div className="absolute top-4 left-4 bg-warm-white/90 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-sage">
                      Derm Recommended
                    </span>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <span className="text-base font-medium text-charcoal">{p.price}</span>
                  <button
                    type="button"
                    className="text-[11px] uppercase tracking-widest text-warm-gray group-hover:text-sage transition-colors font-semibold"
                  >
                    View →
                  </button>
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
