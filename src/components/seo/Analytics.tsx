import Script from 'next/script';

// Google Analytics 4. Inert until NEXT_PUBLIC_GA_ID is set (Vercel project env or
// a local .env.local), so it ships safely with no measurement ID and activates
// the moment one is provided. Format: G-XXXXXXXXXX.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
