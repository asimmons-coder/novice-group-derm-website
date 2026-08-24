import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/boon-public-assets/**",
      },
      {
        protocol: "https",
        hostname: "novicegroupderm.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/our-story", permanent: true },
      { source: "/visit", destination: "/contact", permanent: true },
      { source: "/shop", destination: "/skin-shop", permanent: true },
      { source: "/shop/:path*", destination: "/skin-shop", permanent: true },
      { source: "/product/:path*", destination: "/skin-shop", permanent: true },
      { source: "/product-category/:path*", destination: "/skin-shop", permanent: true },
      { source: "/my-cart", destination: "/skin-shop", permanent: true },
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/schedule", destination: "/contact", permanent: true },
      {
        source: "/wp-content/uploads/:path*",
        destination: "/patient-resources",
        permanent: false,
      },
      { source: "/services/medical", destination: "/services/medical-dermatology", permanent: true },
      { source: "/services/cosmetic", destination: "/services/cosmetic-aesthetics", permanent: true },
      { source: "/services/surgical", destination: "/services/surgical-dermatology", permanent: true },
      { source: "/services/pathology", destination: "/services/dermatopathology", permanent: true },
    ];
  },
};

export default nextConfig;
