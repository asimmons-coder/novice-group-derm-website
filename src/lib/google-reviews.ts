import { site } from '@/lib/site';

// Vercel: set GOOGLE_PLACES_API_KEY (Places API enabled, restrict to that API).
// Optional GOOGLE_PLACE_ID skips Find Place from text.

const REVALIDATE_SECONDS = 21600;
const FIND_QUERY =
  'Novice Group Dermatology 4120 West Maple Road Bloomfield Hills MI';

export type GoogleReview = {
  author: string;
  rating: number | null;
  text: string;
  relativeTime: string;
  authorPhoto: string | null;
  authorUrl: string | null;
};

export type GoogleReviewsOk = {
  ok: true;
  name: string;
  rating: number | null;
  userRatingsTotal: number | null;
  url: string;
  placeId: string;
  reviews: GoogleReview[];
};

export type GoogleReviewsError = {
  ok: false;
  reason: 'missing-key' | 'no-place' | 'api-error';
};

export type GoogleReviewsResult = GoogleReviewsOk | GoogleReviewsError;

function apiKey() {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() ?? '';
}

async function fetchPlacesJson(url: string): Promise<Record<string, unknown> | null> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return null;
  const data = (await res.json()) as Record<string, unknown>;
  return data;
}

async function resolvePlaceId(key: string): Promise<string | null> {
  const fromEnv = process.env.GOOGLE_PLACE_ID?.trim();
  if (fromEnv) return fromEnv;

  const params = new URLSearchParams({
    input: FIND_QUERY,
    inputtype: 'textquery',
    fields: 'place_id',
    key,
  });
  const data = await fetchPlacesJson(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`,
  );
  if (!data || data.status !== 'OK') return null;
  const candidates = Array.isArray(data.candidates) ? data.candidates : [];
  const first = candidates[0] as { place_id?: unknown } | undefined;
  return typeof first?.place_id === 'string' && first.place_id ? first.place_id : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function normalizeReview(raw: unknown): GoogleReview {
  const r = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  return {
    author: String(r.author_name ?? '').trim() || 'Google user',
    rating: asNumber(r.rating),
    text: String(r.text ?? ''),
    relativeTime: String(r.relative_time_description ?? ''),
    authorPhoto: typeof r.profile_photo_url === 'string' ? r.profile_photo_url : null,
    authorUrl: typeof r.author_url === 'string' ? r.author_url : null,
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const key = apiKey();
  if (!key) return { ok: false, reason: 'missing-key' };

  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) return { ok: false, reason: 'no-place' };

    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'name,rating,user_ratings_total,reviews,url,place_id',
      key,
    });
    const data = await fetchPlacesJson(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
    );
    if (!data || data.status !== 'OK' || !data.result || typeof data.result !== 'object') {
      return { ok: false, reason: 'api-error' };
    }

    const result = data.result as Record<string, unknown>;
    const reviews = Array.isArray(result.reviews)
      ? result.reviews.map(normalizeReview).slice(0, 5)
      : [];

    return {
      ok: true,
      name: String(result.name ?? site.name),
      rating: asNumber(result.rating),
      userRatingsTotal: asNumber(result.user_ratings_total),
      url:
        typeof result.url === 'string' && result.url
          ? result.url
          : site.googleReviews,
      placeId: typeof result.place_id === 'string' && result.place_id ? result.place_id : placeId,
      reviews,
    };
  } catch {
    return { ok: false, reason: 'api-error' };
  }
}
