import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';
import {
  posts,
  getPostAuthor,
  getAuthorLastName,
  formatPostDate,
} from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog & Education',
  description:
    'Skin health education from board-certified dermatologists. Articles on conditions, cosmetics, sun protection, and skincare.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Blog & Education"
        primary="Skin notes,"
        accent="from your dermatologists."
        description="Practical, evidence-based skincare guidance from the doctors who actually see patients all day. No hot takes, no influencer routines."
      />

      <Section bg="cream" padding="xl">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const author = getPostAuthor(post);
            return (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col bg-warm-white rounded-3xl overflow-hidden border border-sand hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                >
                  <div className="p-7 flex flex-col flex-1">
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-sage mb-3">
                      {formatPostDate(post.date)}
                      <span className="text-warm-gray"> · {getAuthorLastName(author)}</span>
                    </p>
                    <h2 className="font-display text-2xl text-charcoal mb-3 group-hover:text-sage transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-warm-gray leading-relaxed mb-6 flex-1">
                      {post.description}
                    </p>
                    <span className="text-sm font-semibold text-sage">Read the note</span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Section>

      <BookingCTA />
    </>
  );
}
