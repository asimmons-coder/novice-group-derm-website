import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

// The skin shop page is a client component and cannot export metadata itself.
export const metadata: Metadata = pageMetadata({
  title: 'Skin Shop: SkinMedica & Revision Skincare',
  description:
    'Medical-grade SkinMedica and Revision Skincare products selected by the dermatologists at Novice Group Dermatology, available in our Bloomfield Hills office.',
  path: '/skin-shop',
});

export default function SkinShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
