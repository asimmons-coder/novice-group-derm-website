import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { ArrowLink } from '@/components/ui/Button';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { images } from '@/lib/images';

const products = [
  {
    name: 'Gentle Daily Cleanser',
    category: 'Cleanser',
    price: '$38',
    image: images.shop.cleanser,
  },
  {
    name: 'Mineral Sunscreen SPF 50',
    category: 'Sunscreen',
    price: '$42',
    image: images.shop.sunscreen,
  },
  {
    name: 'Retinol Renewal Serum',
    category: 'Retinoid',
    price: '$76',
    image: images.shop.retinoid,
  },
  {
    name: 'Hydrating Repair Cream',
    category: 'Moisturizer',
    price: '$54',
    image: images.shop.moisturizer,
  },
];

export function SkinShopTeaser() {
  return (
    <Section bg="cream" padding="xl">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <SectionLabel>Skin Shop</SectionLabel>
          <SignatureHeadline
            primary="Curated by"
            accent="your dermatologist."
            size="lg"
          />
        </div>
        <ArrowLink href="/skin-shop">Shop All Products</ArrowLink>
      </Reveal>

      <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <StaggerItem key={p.name}>
            <Link
              href="/skin-shop"
              className="group block bg-warm-white border border-sand rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-sand-light">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 45vw, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold mb-2">
                  {p.category}
                </p>
                <h3 className="font-display text-base text-charcoal mb-3 leading-snug">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal">{p.price}</span>
                  <span className="text-[11px] uppercase tracking-widest text-warm-gray group-hover:text-sage transition-colors">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
