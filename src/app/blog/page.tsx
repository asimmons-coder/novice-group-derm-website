import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';
import { images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Blog & Education',
  description:
    'Skin health education from board-certified dermatologists. Articles on conditions, cosmetics, sun protection, and skincare products.',
};

const posts = [
  {
    slug: 'sunscreen-guide',
    title: 'The dermatologist&rsquo;s guide to sunscreen',
    excerpt: 'Mineral vs chemical, SPF numbers explained, and why the one you actually use is the best one.',
    category: 'Sun Protection',
    image: images.blog.post1,
    date: 'March 2026',
    author: 'Dr. Karlee Novice',
  },
  {
    slug: 'retinol-101',
    title: 'Retinol 101: how to start without the irritation',
    excerpt: 'A simple ramp-up plan that actually works for sensitive skin.',
    category: 'Skin Health',
    image: images.blog.post2,
    date: 'February 2026',
    author: 'Dr. Karlee Novice',
  },
  {
    slug: 'subtle-botox',
    title: 'What &ldquo;subtle Botox&rdquo; actually means',
    excerpt: 'A treatise on dosing, placement, and the case for less.',
    category: 'Cosmetic',
    image: images.blog.post3,
    date: 'February 2026',
    author: 'Dr. Fred Novice',
  },
  {
    slug: 'mole-check',
    title: 'When to worry about a mole — the ABCDEs',
    excerpt: 'A short, practical guide to noticing the changes that matter.',
    category: 'Conditions',
    image: images.blog.post4,
    date: 'January 2026',
    author: 'Dr. Taylor Novice',
  },
  {
    slug: 'eczema-winter',
    title: 'Winter eczema: a five-product routine that works',
    excerpt: 'How we coach patients through the toughest months.',
    category: 'Conditions',
    image: images.blog.post5,
    date: 'January 2026',
    author: 'Dr. Karlee Novice',
  },
  {
    slug: 'derm-vs-drugstore',
    title: 'Drugstore skincare we actually recommend',
    excerpt: 'Five formulas you can buy for under $20 that we use ourselves.',
    category: 'Products',
    image: images.blog.post6,
    date: 'December 2025',
    author: 'Dr. Karlee Novice',
  },
];

const categories = ['All', 'Skin Health', 'Cosmetic', 'Sun Protection', 'Conditions', 'Products'];

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Blog & Education"
        primary="Skin notes,"
        accent="from your dermatologists."
        description="Practical, evidence-based skincare guidance from the doctors who actually see patients all day. No hot takes, no influencer routines — just what works."
      />

      <Section bg="cream" padding="md">
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border bg-warm-white border-sand text-charcoal/70 hover:border-charcoal transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-warm-white border border-sand rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand-light">
                  <Image
                    src={post.image}
                    alt={post.title.replace(/&[^;]+;/g, '')}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage">
                      {post.category}
                    </span>
                    <span className="text-xs text-warm-gray">{post.date}</span>
                  </div>
                  <h2
                    className="font-display text-2xl text-charcoal mb-3 leading-snug group-hover:text-sage transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <p
                    className="text-sm text-warm-gray leading-relaxed mb-5"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <p className="text-xs text-warm-gray italic">By {post.author}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <BookingCTA />
    </>
  );
}
