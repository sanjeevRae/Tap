import type { Metadata } from "next";
import { Header } from "@/components/proton/header";
import { Footer } from "@/components/proton/footer";
import { HowItWorksContent } from "@/components/proton/how-it-works";

export const metadata: Metadata = {
  title: "How it works — NFC & QR digital business stand",
  description:
    "See how Chitra Tap works: tap or scan with NFC & QR to open your digital business profile, present your business information in one place, and manage everything from your dashboard.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-20 md:px-10">
        <HowItWorksContent />
      </main>
      <Footer />
    </div>
  );
}