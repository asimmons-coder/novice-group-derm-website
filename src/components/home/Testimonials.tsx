import { Star } from 'lucide-react';
import { Section } from '@/components/ui/Container';
import { site } from '@/lib/site';
import {
  getGoogleReviews,
  type GoogleReview,
  type GoogleReviewsOk,
} from '@/lib/google-reviews';

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < filled ? 'fill-gold text-gold' : 'text-sand'}
        />
      ))}
    </span>
  );
}

function ratingLine(data: GoogleReviewsOk) {
  const count =
    data.userRatingsTotal != null
      ? `${data.userRatingsTotal.toLocaleString('en-US')} review${data.userRatingsTotal === 1 ? '' : 's'}`
      : null;
  if (data.rating != null && count) return `${data.rating} from ${count}`;
  if (data.rating != null) return `${data.rating} on Google`;
  if (count) return `${count} on Google`;
  return null;
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.author.slice(0, 1).toUpperCase() || 'G';
  const name = (
    <span className="font-display text-charcoal text-base leading-tight">
      {review.author}
    </span>
  );

  return (
    <article className="snap-start shrink-0 w-[min(20rem,85vw)] md:w-auto md:shrink flex flex-col bg-cream border border-sand rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        {review.authorPhoto ? (
          // Plain img: Google avatar hosts are not in next/image remotePatterns.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.authorPhoto}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-light text-sage text-xs font-semibold"
          >
            {initial}
          </span>
        )}
        <div className="min-w-0">
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
            >
              {name}
            </a>
          ) : (
            name
          )}
          {review.relativeTime ? (
            <p className="text-xs text-warm-gray mt-0.5">{review.relativeTime}</p>
          ) : null}
        </div>
      </div>
      {review.rating != null ? (
        <div className="mb-3">
          <Stars rating={review.rating} size={12} />
        </div>
      ) : null}
      {review.text ? (
        <p className="text-sm text-warm-gray leading-relaxed">
          &ldquo;{review.text}&rdquo;
        </p>
      ) : null}
    </article>
  );
}

function ReviewsJsonLd({ data }: { data: GoogleReviewsOk }) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: data.name,
    url: site.url,
  };
  if (data.rating != null && data.userRatingsTotal != null) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: data.userRatingsTotal,
    };
  }
  if (data.reviews.length) {
    node.review = data.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.text,
      ...(r.rating != null
        ? {
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
            },
          }
        : {}),
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
    />
  );
}

function FallbackCta() {
  return (
    <Section bg="warm-white" padding="xl" size="narrow">
      <div className="text-center">
        <p className="font-display text-3xl md:text-4xl text-charcoal leading-tight mb-6">
          Patients share their experiences on Google.
        </p>
        <p className="text-warm-gray leading-relaxed max-w-xl mx-auto mb-10">
          We do not publish invented quotes or review counts on this site.
          Read current patient reviews on our Google Business profile.
        </p>
        <a
          href={site.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs uppercase tracking-widest text-sage hover:text-charcoal transition-colors font-semibold"
        >
          See reviews on Google &rarr;
        </a>
      </div>
    </Section>
  );
}

export async function Testimonials() {
  const data = await getGoogleReviews();
  if (
    !data.ok ||
    (data.reviews.length === 0 && data.rating == null && data.userRatingsTotal == null)
  ) {
    return <FallbackCta />;
  }

  const summary = ratingLine(data);
  const profileUrl = data.url || site.googleReviews;

  return (
    <Section bg="warm-white" padding="xl">
      <ReviewsJsonLd data={data} />
      <div className="text-center mb-12">
        <p className="section-label mb-4">Reviews from Google</p>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal leading-tight mb-4">
          Patients on Google
        </h2>
        {summary ? (
          <p className="flex flex-wrap items-center justify-center gap-2 text-warm-gray">
            {data.rating != null ? <Stars rating={data.rating} size={16} /> : null}
            <span>{summary}</span>
          </p>
        ) : null}
      </div>

      {data.reviews.length > 0 ? (
        <div className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.reviews.map((review, i) => (
            <ReviewCard key={`${review.author}-${i}`} review={review} />
          ))}
        </div>
      ) : null}

      <div className="text-center mt-12">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs uppercase tracking-widest text-sage hover:text-charcoal transition-colors font-semibold"
        >
          See all reviews on Google &rarr;
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-widest text-warm-gray">
          Reviews from Google
        </p>
      </div>
    </Section>
  );
}
