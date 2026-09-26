import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { GuideTemplate } from '@/components/guides/GuideTemplate';
import { getGuide, guidePath, guides } from '@/lib/guides';

interface Props {
  params: Promise<{ slug: string }>;
}

// Only the guides defined in guides.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.filter((guide) => guide.kind === 'treatment').map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide('treatment', slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.title, description: guide.metaDescription, path: guidePath(guide) });
}

export default async function TreatmentGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide('treatment', slug);
  if (!guide) notFound();
  return <GuideTemplate guide={guide} />;
}
