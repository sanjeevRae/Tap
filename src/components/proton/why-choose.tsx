"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lock, Heart, Crosshair, ArrowRight } from "lucide-react";
import { useInView } from "./use-in-view";

const pillars = [
  {
    icon: Lock,
    eyebrow: "Private by default",
    title: "Backed by more than a decade of privacy leadership",
    desc: "Proton VPN keeps what you watch, click, and search private from trackers, advertisers, governments, and even Proton itself.",
    stat: "10+ years",
    statLabel: "of privacy leadership",
  },
  {
    icon: Heart,
    eyebrow: "People before profit",
    title: "Created by people who live and breathe digital freedom",
    desc: "Proton's entire ecosystem is committed to keeping your information safe without slowing you down or selling you out.",
    stat: "100M+",
    statLabel: "people protected",
  },
  {
    icon: Crosshair,
    eyebrow: "Proven under pressure",
    title: "Trusted by journalists and activists in high-risk places",
    desc: "Built to protect you no matter the challenge — relied on by those facing real-world threats in some of the world's toughest environments.",
    stat: "140+",
    statLabel: "countries available",
  },
];

export function WhyChoose() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="why" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-brand/25 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-[#2bb4ff]/15 blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      </div>

      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            Why choose Proton VPN
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            The preferred VPN for millions protecting their privacy and freedom
            online.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.article
              key={p.eyebrow}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-brand">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  {p.eyebrow}
                </span>
              </div>

              <h3 className="text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm text-white/70">{p.desc}</p>

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    {p.stat}
                  </p>
                  <p className="text-xs text-white/50">{p.statLabel}</p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-all hover:gap-2 hover:text-white"
                >
                  View details
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* corner glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
