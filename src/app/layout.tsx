import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { RequestForm } from "@/components/proton/request-form";
import { WhatsappWidget } from "@/components/proton/whatsapp-widget";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const SITE_URL = "https://tap.chitratech.com.np";
const SITE_NAME = "Chitra Tap";
const SITE_TAGLINE = "Your Digital Connection";
const SITE_DESCRIPTION =
  "Chitra Tap is a smart NFC and QR-powered solution by ChitraTech that brings your digital business information together in one place — customers discover, connect, and share with a simple tap or scan.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — NFC & QR Digital Business Stand in Nepal | ChitraTech`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "NFC",
    "Digital Nepal",
    "Business",
    "Chitra Tap",
    "NFC business stand",
    "NFC stand Nepal",
    "digital business stand",
    "NFC business card",
    "QR business stand",
    "digital business profile",
    "ChitraTech",
    "NFC card Nepal",
    "smart business card",
    "digital visiting card Nepal",
  ],
  authors: [{ name: "ChitraTech", url: "https://chitratech.com.np" }],
  creator: "ChitraTech",
  publisher: "ChitraTech",
  alternates: { canonical: "/" },
  category: "business",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "One tap or scan connects customers to your business information, social media, location, reviews, and more.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.svg",
        width: 1200,
        height: 630,
        alt: "Chitra Tap — NFC & QR digital business stand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Connect customers to your business instantly with Chitra Tap NFC and QR technology.",
    images: ["/hero.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ChitraTech",
      url: "https://chitratech.com.np",
      email: "info@chitratech.com.np",
      telephone: "+977-971-2039906",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Budhanilakantha-12, Kapan Kharibot",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Product",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      brand: { "@id": `${SITE_URL}/#organization` },
      url: SITE_URL,
      offers: {
        "@type": "Offer",
        priceCurrency: "NPR",
        availability: "https://schema.org/InStock",
        url: SITE_URL,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${serif.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsappWidget />
        <RequestForm />
        <Toaster />
      </body>
    </html>
  );
}
