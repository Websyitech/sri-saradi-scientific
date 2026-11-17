import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Script from "next/script";
import prisma from "@/app/lib/prisma";

const googleSans = Inter({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: 'swap',
});

// Fetch settings for metadata
async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    return settingsMap;
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const title = settings.seo_title || "Sri Saradi Scientific - Laboratory & Scientific Equipment Suppliers";
  const description = settings.seo_description || "Sri Saradi Scientific - Leading suppliers of scientific and laboratory equipment in Hyderabad, Telangana.";
  const keywords = settings.seo_keywords || "scientific products, laboratory equipment, research supplies";
  const ogImage = settings.seo_og_image || "/assets/sri-saradi-logo.png";
  const siteUrl = settings.site_url || "https://srisaradiscientific.com";
  const siteName = settings.site_name || "Sri Saradi Scientific";
  const favicon = settings.site_favicon || "/favicon.ico";

  // Open Graph specific settings with fallbacks
  const ogTitle = settings.og_title || title;
  const ogDescription = settings.og_description || description;
  const ogType = settings.og_type || "website";
  const ogUrl = settings.og_url || siteUrl;
  const ogSiteName = settings.og_site_name || siteName;

  return {
    title,
    description,
    keywords,
    // Google Search and Ads need a square icon of at least 48px (multiples of 48 preferred); the admin
    // favicon is only 32px, so larger brand icons are listed too.
    icons: {
      icon: [
        { url: favicon },
        { url: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: favicon,
      apple: '/assets/brand/icon-192.png',
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      siteName: ogSiteName,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: ogType as any,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : [],
    },
    metadataBase: new URL(siteUrl),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PXTC9W9L');
            `,
          }}
        />
      </head>
      <body
        className={`${googleSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              "@id": "https://srisaradiscientific.com/#organization",
              name: "Sri Saradi Scientific Private Limited",
              url: "https://srisaradiscientific.com",
              logo: "https://srisaradiscientific.com/assets/sri-saradi-logo.png",
              image: "https://srisaradiscientific.com/assets/sri-saradi-logo.png",
              email: "info@srisaradiscientific.com",
              telephone: "+91 72076 07444",
              address: {
                "@type": "PostalAddress",
                streetAddress: "319, 3rd Floor, VM Towers, Green Park Road, Suchitra, Kompally",
                addressLocality: "Secunderabad",
                addressRegion: "Telangana",
                postalCode: "500067",
                addressCountry: "IN",
              },
              hasMap: "https://maps.google.com/?cid=18331745998023802070",
              areaServed: [{ "@type": "City", name: "Hyderabad" }, { "@type": "State", name: "Telangana" }, { "@type": "Country", name: "India" }],
              openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
            }),
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXTC9W9L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
        <DisclaimerModal />
        <GoogleAnalytics />
      </body>
    </html>
  );
}