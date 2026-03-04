import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import Footer from "./components/Footer";
import CookiesPopup from "./components/CookiesPopup";
import DisclaimerModal from "./components/DisclaimerModal";
import prisma from "@/app/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const ogImage = settings.seo_og_image || "";
  const siteUrl = settings.site_url || "https://srisaradiscientific.com";
  const siteName = settings.site_name || "Sri Saradi Scientific";
  const favicon = settings.site_favicon || "/favicon.ico";

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
      title,
      description,
      url: siteUrl,
      siteName,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopHeader />
        <Header />
        <MenuSection />
        {children}
        <Footer />
        <CookiesPopup />
        <DisclaimerModal />
      </body>
    </html>
  );
}
