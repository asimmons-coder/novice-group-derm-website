import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { BookingCTA } from '@/components/home/BookingCTA';
import { images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Article',
  description: 'Skin health education from Novice Group Dermatology.',
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <article className="pt-36 md:pt-44 pb-16 bg-cream">
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warm-gray hover:text-sage transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage mb-4">
            Skin Health
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            The dermatologist&rsquo;s guide to sunscreen
          </h1>
          <p className="text-lg text-warm-gray mb-10">
            By Dr. Karlee Novice · 6 min read
          </p>
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-xl">
            <Image
              src={images.blog.post1}
              alt="Article header image"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 800px"
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-charcoal/85 space-y-6">
            <p className="text-xl leading-relaxed font-accent italic text-charcoal/75">
              The best sunscreen is the one you&rsquo;ll actually wear every day —
              but a few principles can help you find the one you&rsquo;ll love.
            </p>
            <p>
              This is a placeholder article body. In the production site, this
              would be sourced from a CMS or markdown files and rendered with
              proper typography. For now, this template demonstrates what an
              article page looks like in the Novice Group brand system.
            </p>
            <h2 className="font-display text-3xl text-charcoal pt-8">
              Mineral vs. chemical
            </h2>
            <p>
              Mineral (or &ldquo;physical&rdquo;) sunscreens use zinc oxide and
              titanium dioxide to physically block UV radiation. Chemical
              sunscreens absorb UV radiation and convert it into heat. Both
              work. Both are safe. The right one for you depends on your skin
              type, your tolerance for white cast, and how you plan to use it.
            </p>
            <h2 className="font-display text-3xl text-charcoal pt-8">
              SPF numbers, demystified
            </h2>
            <p>
              SPF 30 blocks roughly 97% of UVB rays. SPF 50 blocks 98%. SPF 100
              blocks 99%. The difference between SPF 30 and SPF 100 is much
              smaller than the marketing suggests — and far less important than
              actually applying enough product.
            </p>
          </div>

          <div className="mt-16 p-10 bg-warm-white border border-sand rounded-3xl text-center">
            <p className="font-accent italic text-2xl text-charcoal mb-4">
              Have a question for our dermatologists?
            </p>
            <LinkButton href="/contact" variant="primary" size="lg" withArrow>
              Book a Consultation
            </LinkButton>
          </div>
        </Container>
      </article>

      <BookingCTA />
    </>
  );
}
