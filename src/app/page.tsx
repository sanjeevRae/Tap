"use client";

import { Header } from "@/components/proton/header";
import { Hero } from "@/components/proton/hero";
import { Devices } from "@/components/proton/devices";
import { ExposeSection } from "@/components/proton/expose-section";
import { WhyChoose } from "@/components/proton/why-choose";
import { Comparison } from "@/components/proton/comparison";
import { VpnFeatures } from "@/components/proton/vpn-features";
import { Pricing } from "@/components/proton/pricing";
import { Ecosystem } from "@/components/proton/ecosystem";
import { Testimonials } from "@/components/proton/testimonials";
import { Faq } from "@/components/proton/faq";
import { CtaBand } from "@/components/proton/cta-band";
import { Footer } from "@/components/proton/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Devices />
        <ExposeSection />
        <WhyChoose />
        <Comparison />
        <VpnFeatures />
        <Pricing />
        <Ecosystem />
        <Testimonials />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
