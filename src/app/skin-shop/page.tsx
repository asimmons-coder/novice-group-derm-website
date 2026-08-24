import type { Metadata } from 'next';
import { SkinShopClient } from './SkinShopClient';

export const metadata: Metadata = {
  title: 'Skin Shop | Dermatologist-Recommended Skincare in Bloomfield Hills',
  description:
    'SkinMedica and Revision Skincare products recommended by the dermatologists at Novice Group Dermatology. Available in our Bloomfield Hills office.',
  alternates: {
    canonical: '/skin-shop',
  },
};

export default function SkinShopPage() {
  return <SkinShopClient />;
}
