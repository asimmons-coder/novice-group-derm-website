import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { ArrowLink } from '@/components/ui/Button';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';

// A few of the products patients ask about most, from the full /skin-shop list.
const featured = [
  { name: 'TNS Advanced+ Serum', brand: 'SkinMedica', image: '/images/shop/tns-advanced.jpg' },
  { name: 'HA5 Rejuvenating Hydrator', brand: 'SkinMedica', image: '/images/shop/ha5.jpg' },
  { name: 'Intellishade Original', brand: 'Revision Skincare', image: '/images/shop/intellishade-original.jpg' },
  { name: 'Total Defense + Repair SPF 34', brand: 'SkinMedica', image: '/images/shop/total-defense-spf34.jpg' },
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

      <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product) => (
          <StaggerItem key={product.name}>
            <Link
              href="/skin-shop"
              className="group flex h-full flex-col overflow-hidden bg-warm-white border border-sand rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray font-semibold mb-2">
                  {product.brand}
                </p>
                <h3 className="font-display text-base md:text-lg text-charcoal leading-snug group-hover:text-sage-deep transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal>
        <p className="text-center text-sm text-warm-gray mt-10">
          Available in-office. Ask your provider about a personalized regimen.
        </p>
      </Reveal>
    </Section>
  );
}
