import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { BookingCTA } from '@/components/home/BookingCTA';
import { site } from '@/lib/site';
import {
  posts,
  getPost,
  getPostAuthor,
  getAuthorLastName,
  formatPostDate,
} from '@/lib/posts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  const author = getPostAuthor(post);
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${site.url}${post.image}`,
    url: `${site.url}/blog/${post.slug}`,
    author: {
      '@type': 'Physician',
      name: author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <PageHero
        label="Blog & Education"
        primary={post.title}
        accent="From the exam room."
        description={`${formatPostDate(post.date)} · ${author.name}`}
      />

      <Section bg="cream" padding="xl" size="narrow">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl mb-12">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 92vw, 720px"
              className="object-cover"
            />
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-sage mb-8">
            {getAuthorLastName(author)}
          </p>
          <div className="space-y-5 text-warm-gray text-lg leading-relaxed">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-12 text-sm text-warm-gray leading-relaxed border-t border-sand pt-8">
            This article is for education only. It is not a diagnosis or a treatment
            plan. For personal advice, call our office at {site.phone}.
          </p>
        </Reveal>
      </Section>

      <BookingCTA />
    </>
  );
}
