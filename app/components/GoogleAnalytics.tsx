'use client'

import Script from 'next/script'

/**
 * Loads gtag.js once and configures every Google tag ID that is set:
 *   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID  (GA4, G-XXXX)
 *   NEXT_PUBLIC_GOOGLE_ADS_ID        (Google Ads, AW-XXXX)
 */
export default function GoogleAnalytics() {
  const ids = [
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  ].filter((id): id is string => !!id)

  if (ids.length === 0) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${ids.map((id) => `gtag('config', ${JSON.stringify(id)});`).join('\n          ')}
        `}
      </Script>
    </>
  )
}
