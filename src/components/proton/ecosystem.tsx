"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  MapPin,
  Star,
  Mail,
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
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {products.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="group relative overflow-hidden rounded-lg border border-[#e3def4] bg-card p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft sm:p-6"
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
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-brand sm:h-12 sm:w-12 sm:rounded-2xl"
                  style={{
                    background: p.color,
                  }}
                >
                  <p.icon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    strokeWidth={1.8}
                  />
                </span>

                {/* Title */}
                <h3 className="mt-4 text-sm font-semibold text-ink sm:text-lg">
                  {p.name}
                </h3>

                {/* Tagline */}
                <p
                  className="mt-1 text-xs font-medium sm:text-sm"
                  style={{
                    color: p.color,
                  }}
                >
                  {p.tagline}
                </p>

                {/* Description */}
                <p className="mt-2 hidden text-sm leading-6 text-ink-soft sm:block">
                  {p.desc}
                </p>

                {/* Link */}
                <a
                  href="#"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink transition-all hover:gap-2 sm:mt-5 sm:text-sm"
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