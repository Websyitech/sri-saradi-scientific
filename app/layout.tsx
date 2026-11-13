import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Script from "next/script";
import { SITE_SETTINGS } from "@/app/lib/siteSettings";

const googleSans = Inter({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: 'swap',
});

async function getSettings(): Promise<Record<string, string>> {
  return SITE_SETTINGS;
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
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
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
              "@type": "Organization",
              name: "Sri Saradi Scientific Private Limited",
              url: "https://srisaradiscientific.com",
              logo: "https://srisaradiscientific.com/assets/sri-saradi-logo.png",
              email: "info@srisaradiscientific.com",
              telephone: "+91 97424 43809",
              address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
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
        <TopHeader />
        <Header />
        {children}
        <Footer />
        <DisclaimerModal />
        <GoogleAnalytics />
      </body>
    </html>
  );
}