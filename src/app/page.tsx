"use client";

import { Header } from "@/components/proton/header";
import { Hero } from "@/components/proton/hero";
import { ExposeSection } from "@/components/proton/expose-section";
import { WhyChoose } from "@/components/proton/why-choose";
import { Comparison } from "@/components/proton/comparison";
import { Ecosystem } from "@/components/proton/ecosystem";
import { Footer } from "@/components/proton/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyChoose />
        <Comparison />
        <ExposeSection />
        <Ecosystem />
      </main>
      <Footer />
    </div>
  );
}
