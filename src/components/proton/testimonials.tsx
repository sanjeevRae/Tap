"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useInView, useCountUp } from "./use-in-view";

const stats = [
  { value: 100, suffix: "M+", label: "accounts" },
  { value: 4.7, suffix: "+", label: "app rating", decimals: 1 },
  { value: 140, suffix: "+", label: "countries" },
  { value: 20000, suffix: "+", label: "servers" },
];

const press = [
  {
    quote:
      "Proton VPN rises above the competition with an excellent collection of features, a high-performance server network, and a nearly peerless free subscription option.",
    source: "TechRadar",
    award: "Top-scoring Best Buy VPN",
  },
  {
    quote:
      "Our top pick thanks to its easy-to-use interface, no-logs policy and open-source framework.",
    source: "Which?",
    award: "Best Buy",
  },
  {
    quote:
      "A privacy-first VPN built by scientists and engineers who met at CERN — and it shows.",
    source: "Wired",
    award: "Editor's Choice",
  },
];

export function Testimonials() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#2bb4ff]/10 blur-[110px]" />
      </div>

      <div className="container-proton" ref={ref}>
        {/* stats */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 0.1} inView={inView} />
          ))}
        </div>

        <div className="mt-20 mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            100M+ people choose Proton to keep them safe online
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-[#ffb547] text-[#ffb547]" />
              ))}
            </div>
            <span className="text-sm text-white/70">4.7+ average app rating</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {press.map((p, i) => (
            <motion.figure
              key={p.source}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <Quote className="h-8 w-8 text-brand" />
              <blockquote className="mt-4 flex-1 text-pretty text-sm text-white/80">
                "{p.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{p.source}</p>
                <p className="text-xs text-brand">{p.award}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  delay,
  inView,
}: {
  stat: { value: number; suffix: string; label: string; decimals?: number };
  delay: number;
  inView: boolean;
}) {
  const { ref, val } = useCountUp(stat.value);
  const display = stat.decimals ? val.toFixed(stat.decimals) : Math.round(val).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur"
    >
      <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {display}
        <span className="text-brand">{stat.suffix}</span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
        {stat.label}
      </p>
    </motion.div>
  );
}
