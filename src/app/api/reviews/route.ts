import { NextResponse } from 'next/server';
import { getGoogleReviews } from '@/lib/google-reviews';

export const runtime = 'nodejs';

export async function GET() {
  const data = await getGoogleReviews();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=21600',
    },
  });
}
