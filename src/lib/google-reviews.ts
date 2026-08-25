import { site } from '@/lib/site';

// Vercel: set GOOGLE_PLACES_API_KEY (enable Places API (New), restrict to that API).
// Optional GOOGLE_PLACE_ID skips Text Search.

const REVALIDATE_SECONDS = 21600;
const FIND_QUERY =
  'Novice Group Dermatology 4120 West Maple Road Bloomfield Hills MI';
const DETAILS_MASK =
  'id,displayName,rating,userRatingCount,reviews,googleMapsUri';

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

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const t = (value as { text?: unknown }).text;
    if (typeof t === 'string') return t;
  }
  return '';
}

async function placesFetch(
  url: string,
  key: string,
  fieldMask: string,
  init?: RequestInit,
): Promise<Record<string, unknown> | null> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': fieldMask,
      ...(init?.headers ?? {}),
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Record<string, unknown>;
  return data;
}

async function resolvePlaceId(key: string): Promise<string | null> {
  const fromEnv = process.env.GOOGLE_PLACE_ID?.trim();
  if (fromEnv) return fromEnv;

  const data = await placesFetch(
    'https://places.googleapis.com/v1/places:searchText',
    key,
    'places.id,places.displayName,places.formattedAddress',
    {
      method: 'POST',
      body: JSON.stringify({ textQuery: FIND_QUERY }),
    },
  );
  if (!data) return null;
  const places = Array.isArray(data.places) ? data.places : [];
  const first = places[0] as { id?: unknown } | undefined;
  return typeof first?.id === 'string' && first.id ? first.id : null;
}

function normalizeReview(raw: unknown): GoogleReview {
  const r = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const author =
    r.authorAttribution && typeof r.authorAttribution === 'object'
      ? (r.authorAttribution as Record<string, unknown>)
      : {};
  return {
    author: String(author.displayName ?? '').trim() || 'Google user',
    rating: asNumber(r.rating),
    text: asText(r.text),
    relativeTime: String(r.relativePublishTimeDescription ?? ''),
    authorPhoto: typeof author.photoUri === 'string' ? author.photoUri : null,
    authorUrl: typeof author.uri === 'string' ? author.uri : null,
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const key = apiKey();
  if (!key) return { ok: false, reason: 'missing-key' };

  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) return { ok: false, reason: 'no-place' };

    const id = placeId.startsWith('places/') ? placeId.slice(7) : placeId;
    const data = await placesFetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`,
      key,
      DETAILS_MASK,
    );
    if (!data) return { ok: false, reason: 'api-error' };

    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map(normalizeReview).slice(0, 5)
      : [];

    return {
      ok: true,
      name: asText(data.displayName) || site.name,
      rating: asNumber(data.rating),
      userRatingsTotal: asNumber(data.userRatingCount),
      url:
        typeof data.googleMapsUri === 'string' && data.googleMapsUri
          ? data.googleMapsUri
          : site.googleReviews,
      placeId: typeof data.id === 'string' && data.id ? data.id : id,
      reviews,
    };
  } catch {
    return { ok: false, reason: 'api-error' };
  }
}
