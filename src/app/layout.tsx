import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dragon-map.vercel.app";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const siteTitle = "Where Dragons Dwell - An Atlas of Dragon Myths";
const siteDescription =
  "An interactive dragon myth map exploring how cultures across East Asia, Europe, the Americas, Oceania, and the Middle East imagined dragons, serpents, and sacred dragon-like beings.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
  },
  title: {
    default: siteTitle,
    template: "%s | Where Dragons Dwell",
  },
  description: siteDescription,
  keywords: [
    "dragon myths",
    "world mythology map",
    "interactive mythology atlas",
    "dragon folklore",
    "serpent myths",
    "Chinese dragon",
    "Japanese ryu",
    "Naga mythology",
    "Quetzalcoatl",
    "Jormungandr",
    "Apep",
    "Rainbow Serpent",
    "Taniwha",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Where Dragons Dwell",
    type: "website",
    images: [
      {
        url: "/map.webp",
        width: 1400,
        height: 933,
        alt: "Antique world map for Where Dragons Dwell",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/map.webp"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Where Dragons Dwell",
  url: siteUrl,
  description: siteDescription,
  inLanguage: ["en", "zh-Hant"],
  about: [
    "Dragon mythology",
    "Comparative mythology",
    "Folklore",
    "World cultures",
  ],
  publisher: {
    "@type": "Person",
    name: "Huiying Chung",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Font loaded via stylesheet link rather than next/font because the
            build environment cannot always reach fonts.googleapis.com at build
            time; preconnect keeps the runtime cost low. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout: the font applies to every page */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
