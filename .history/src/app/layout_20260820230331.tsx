import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "ChitraTap | Smart NFC Business Stand",
  description:
    "ChitraTap is a smart NFC and QR business stand that lets customers instantly discover your business, contact details, social media, location, reviews, and more with a simple tap or scan.",
  keywords: [
    "NFC",
    "Digital Nepal",
    "Business",
    "ChitraTap",
    "NFC business stand",
    "NFC stand Nepal",
    "digital business stand",
    "NFC business card",
    "QR business stand",
    "digital business profile",
    "ChitraTech",
  ],
  authors: [{ name: "ChitraTech" }],
  creator: "ChitraTech",
  publisher: "ChitraTech",
  metadataBase: new URL("https://tap.chitratech.com.np"),
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ChitraTap | Smart NFC Business Stand",
    description:
      "One tap or scan connects customers to your business information, social media, location, reviews, and more.",
    url: "https://tap.chitratech.com.np",
    siteName: "ChitraTap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChitraTap | Smart NFC Business Stand",
    description:
      "Connect customers to your business instantly with ChitraTap NFC and QR technology.",
  },
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}