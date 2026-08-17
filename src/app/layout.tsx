import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Proton VPN | The best VPN for speed and security",
  description:
    "Get fast, secure VPN service in 140+ countries. Download our free VPN now — or check out Proton VPN Plus for even more premium features.",
  keywords: [
    "VPN",
    "Proton VPN",
    "free VPN",
    "secure VPN",
    "privacy",
    "online security",
  ],
  authors: [{ name: "Proton AG" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Proton VPN | The best VPN for speed and security",
    description:
      "Get fast, secure VPN service in 140+ countries. Download our free VPN now.",
    url: "https://protonvpn.com",
    siteName: "Proton VPN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proton VPN | The best VPN for speed and security",
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
