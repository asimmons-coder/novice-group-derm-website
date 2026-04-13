import Link from 'next/link';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { ArrowLink } from '@/components/ui/Button';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';

const brands = [
  { name: 'SkinMedica', category: 'Medical-Grade Skincare' },
  { name: 'Revision Skincare', category: 'Clinical Results' },
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

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {brands.map((b) => (
          <StaggerItem key={b.name}>
            <Link
              href="/skin-shop"
              className="group block bg-warm-white border border-sand rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="font-display text-lg text-charcoal mb-2 group-hover:text-sage transition-colors">
                {b.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray font-semibold">
                {b.category}
              </p>
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
