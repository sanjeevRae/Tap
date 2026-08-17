"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EyeOff, ShieldAlert, Clapperboard, ArrowRight } from "lucide-react";
import { useInView } from "./use-in-view";

const cards = [
  {
    icon: EyeOff,
    title: "Browse without being watched",
    desc: "Stop trackers and advertisers from following your every move and exploiting your data.",
    accent: "from-[#6d4aff] to-[#4b2fe0]",
    visual: "radar",
  },
  {
    icon: ShieldAlert,
    title: "Stay safe from cybercriminals",
    desc: "Protect yourself from identity theft, financial fraud, and stolen personal data.",
    accent: "from-[#ff5c8a] to-[#e23a6b]",
    visual: "shield",
  },
  {
    icon: Clapperboard,
    title: "Watch while you're away from home",
    desc: "Watch your favorite shows, live sports, movies, and news no matter where you are.",
    accent: "from-[#2bb4ff] to-[#1d7fd1]",
    visual: "play",
  },
];

export function ExposeSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="expose" className="py-20 sm:py-28">
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/60 px-3 py-1 text-xs font-medium text-brand"
          >
            Expose nothing. Access everything.
          </motion.span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Shield personal information, dodge online threats, and explore the
            internet on your terms.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Three reasons millions trust Proton VPN to keep them safe and
            connected.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              {/* visual */}
              <div className="relative mb-6 h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-soft to-brand-soft-2">
                <CardVisual kind={c.visual as "radar" | "shield" | "play"} />
                <div className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} text-white shadow-brand`}>
                  <c.icon className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{c.desc}</p>

              <a
                href="#pricing"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-all hover:gap-2"
              >
                Get Proton VPN
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardVisual({ kind }: { kind: "radar" | "shield" | "play" }) {
  if (kind === "radar") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-28 w-28">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-brand/30"
              style={{ transform: `scale(${0.4 + i * 0.3})` }}
            />
          ))}
          <motion.div
            className="absolute inset-0 origin-center"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(109,74,255,0.35), transparent 60%)",
              borderRadius: "9999px",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
        </div>
      </div>
    );
  }
  if (kind === "shield") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-24 w-24 rounded-full bg-[#ff5c8a]/20 blur-md"
        />
        <svg viewBox="0 0 100 100" className="relative h-24 w-24">
          <defs>
            <linearGradient id="sh-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff5c8a" />
              <stop offset="100%" stopColor="#e23a6b" />
            </linearGradient>
          </defs>
          <path
            d="M50 12 L82 24 V52 Q82 76 50 90 Q18 76 18 52 V24 Z"
            fill="url(#sh-g)"
          />
          <path
            d="M36 50 L46 60 L66 38"
            fill="none"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(43,180,255,0.25),transparent_60%)]" />
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1d7fd1] shadow-card"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-[#2bb4ff]/50" />
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </motion.button>
    </div>
  );
}
