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
  title: "Tap Chitra | The best VPN for speed and security",
  description:
    "Get fast, secure VPN service in 140+ countries. Download our free VPN now — or check out Tap Chitra Plus for even more premium features.",
  keywords: [
    "VPN",
    "Tap Chitra",
    "free VPN",
    "secure VPN",
    "privacy",
    "online security",
  ],
  authors: [{ name: "Proton AG" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Tap Chitra | The best VPN for speed and security",
    description:
      "Get fast, secure VPN service in 140+ countries. Download our free VPN now.",
    url: "https://protonvpn.com",
    siteName: "Tap Chitra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tap Chitra | The best VPN for speed and security",
    description:
      "Get fast, secure VPN service in 140+ countries. Download our free VPN now.",
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
