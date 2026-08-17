"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  CalendarDays,
  HardDrive,
  KeyRound,
  Video,
  Sparkle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInView } from "./use-in-view";

const products = [
  {
    name: "Proton Mail",
    tagline: "Defeat spam, tracking, and ads",
    icon: Mail,
    color: "#6d4aff",
    desc: "Encrypted email that keeps your conversations truly private.",
  },
  {
    name: "Proton Calendar",
    tagline: "Keep your schedule secure",
    icon: CalendarDays,
    color: "#ff5c8a",
    desc: "End-to-end encrypted calendars that nobody else can read.",
  },
  {
    name: "Proton Drive",
    tagline: "Safeguard your files and photos",
    icon: HardDrive,
    color: "#2bb4ff",
    desc: "Secure cloud storage with encrypted sync and sharing.",
  },
  {
    name: "Proton Pass",
    tagline: "Generate and store strong passwords",
    icon: KeyRound,
    color: "#00a878",
    desc: "An encrypted password manager with 2FA built in.",
  },
  {
    name: "Proton Meet",
    tagline: "Host confidential video calls",
    icon: Video,
    color: "#ff8a3d",
    desc: "Private, end-to-end encrypted video conferencing.",
  },
  {
    name: "Lumo AI",
    tagline: "Chat with our private AI",
    icon: Sparkle,
    color: "#9b6dff",
    desc: "Ask and ideate with a privacy-first AI assistant.",
  },
];

export function Ecosystem() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="ecosystem" className="bg-gradient-to-b from-white to-brand-soft/30 py-20 sm:py-28">
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-background px-3 py-1 text-xs font-medium text-brand">
            More than just a VPN
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Proton VPN is part of a privacy ecosystem designed to protect your
            data end-to-end.
          </h2>
          <p className="mt-3 text-ink-soft">
            Our mission is simple: keep your information safe, without slowing
            you down or selling you out.
          </p>
        </div>

        <div className="relative mt-12">
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-card transition-colors hover:bg-accent md:flex"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-card transition-colors hover:bg-accent md:flex"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          >
            {products.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ background: p.color }}
                />
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-brand"
                  style={{ background: p.color }}
                >
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm font-medium" style={{ color: p.color }}>
                  {p.tagline}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{p.desc}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all hover:gap-2"
                >
                  Learn more →
                </a>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            View plans
          </a>
        </div>
      </div>
    </section>
  );
}
