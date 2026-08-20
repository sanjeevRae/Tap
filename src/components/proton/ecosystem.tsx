"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  MapPin,
  Star,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInView } from "./use-in-view";

const products = [
  {
    name: "Social Media",
    tagline: "Connect across every platform",
    icon: Share2,
    color: "#6d4aff",
    desc: "Let customers easily find and connect with your Facebook, Instagram, TikTok, LinkedIn, and other social profiles.",
  },
  {
    name: "Google Maps",
    tagline: "Help customers find you",
    icon: MapPin,
    color: "#2bb4ff",
    desc: "Show your business location and make it easy for customers to get directions with a simple tap.",
  },
  {
    name: "Google Reviews",
    tagline: "Build trust with real reviews",
    icon: Star,
    color: "#ffb020",
    desc: "Show your Google rating and review count so customers can quickly see what others say about your business.",
  },
  {
    name: "Contact & Email",
    tagline: "Make getting in touch simple",
    icon: Mail,
    color: "#ff5c8a",
    desc: "Give customers quick access to your phone, email, WhatsApp, and other contact options.",
  },
];

export function Ecosystem() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = scrollerRef.current;

    if (!el) return;

    el.scrollBy({
      left: dir * 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="ecosystem"
      className="bg-[#fbfaff] py-20 sm:py-28"
    >
      <div className="container-proton" ref={ref}>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-background px-3 py-1 text-xs font-medium text-brand">
            More than just a tap
          </span>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#2c1a7a] sm:text-4xl lg:text-[2.5rem]">
            Everything your customers need, in one place.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Turn a simple tap or scan into a complete digital business
            profile with everything your customers need to connect with you.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          >
            {products.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-lg border border-[#e3def4] bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                {/* Background Glow */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{
                    background: p.color,
                  }}
                />

                {/* Icon */}
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-brand"
                  style={{
                    background: p.color,
                  }}
                >
                  <p.icon
                    className="h-6 w-6"
                    strokeWidth={1.8}
                  />
                </span>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {p.name}
                </h3>

                {/* Tagline */}
                <p
                  className="mt-1 text-sm font-medium"
                  style={{
                    color: p.color,
                  }}
                >
                  {p.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {p.desc}
                </p>

                {/* Link */}
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all hover:gap-2"
                >
                  Learn more
                  <span aria-hidden="true">→</span>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}