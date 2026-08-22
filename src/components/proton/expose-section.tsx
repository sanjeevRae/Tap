"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Nfc,
  PencilLine,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";
import { useInView } from "./use-in-view";

const cards = [
  {
    icon: Nfc,
    title: "Powered by NFC technology",
    desc: "Give customers a faster way to discover your business with a simple tap that instantly opens your digital profile, without apps or typing.",
    accent: "from-[#6d4aff] to-[#4b2fe0]",
    visual: "tap",
  },
  {
    icon: PencilLine,
    title: "Stay up to date without reprinting",
    desc: "Your business changes. Your stand doesn't have to. Update your digital profile anytime from your dashboard without replacing your physical stand.",
    accent: "from-[#ff5c8a] to-[#e23a6b]",
    visual: "update",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Turn interactions into insights",
    desc: "Understand how customers interact with your business through useful tap, scan, and profile activity insights.",
    accent: "from-[#2bb4ff] to-[#1d7fd1]",
    visual: "analytics",
  },
];

export function ExposeSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="expose" className="bg-white py-20 sm:py-28">
      <div className="container-proton" ref={ref}>
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-brand"
          >
            Tap once. Connect instantly.
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
className="mx-auto mt-4 max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-[#2c1a7a] sm:text-3xl"          >
            A smarter way to connect with customers.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-soft"          >
            Three simple ways ChitraTap turns everyday customer interactions
            into digital connections.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-[#e8e3f4] bg-[#fbfaff] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                {/* Visual */}
                <div className="relative mb-6 h-44 overflow-hidden rounded-lg bg-gradient-to-br from-brand-soft to-white">
                  <CardVisual
                    kind={
                      card.visual as "tap" | "update" | "analytics"
                    }
                  />

                  {/* Card Icon */}
                  <div
                    className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${card.accent} text-white shadow-brand`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-semibold text-ink">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {card.desc}
                </p>

                {/* CTA */}
                <a
                  href="/login"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-all duration-200 hover:gap-2"
                >
                  Get ChitraTap
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Card Visuals                                                               */
/* -------------------------------------------------------------------------- */

function CardVisual({
  kind,
}: {
  kind: "tap" | "update" | "analytics";
}) {
  /* ------------------------------------------------------------------------ */
  /* NFC TAP VISUAL                                                           */
  /* ------------------------------------------------------------------------ */

  if (kind === "tap") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-28 w-28">
          {/* NFC Signal Rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-brand/30"
              style={{
                transform: `scale(${0.4 + i * 0.3})`,
              }}
              animate={{
                opacity: [0.25, 0.7, 0.25],
                scale: [
                  0.4 + i * 0.3,
                  0.45 + i * 0.3,
                  0.4 + i * 0.3,
                ],
              }}
              transition={{
                duration: 2.2,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Rotating NFC Signal */}
          <motion.div
            className="absolute inset-0 origin-center"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(109,74,255,0.35), transparent 60%)",
              borderRadius: "9999px",
              maskImage:
                "radial-gradient(circle, transparent 28%, black 29%, black 42%, transparent 43%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 28%, black 29%, black 42%, transparent 43%)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center NFC Button */}
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-card">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-brand"
            >
              <Nfc className="h-5 w-5" strokeWidth={1.8} />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* UPDATE VISUAL                                                            */
  /* ------------------------------------------------------------------------ */

  if (kind === "update") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-52 rounded-xl border border-[#e8e3f4] bg-white p-4 shadow-card"
        >
          {/* Profile Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff5c8a]/15">
              <div className="h-4 w-4 rounded-full bg-[#ff5c8a]/50" />
            </div>

            <div className="space-y-1.5">
              <div className="h-2 w-20 rounded-full bg-ink/15" />
              <div className="h-1.5 w-14 rounded-full bg-ink/10" />
            </div>

            {/* Refresh Icon */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="ml-auto"
            >
            </motion.div>
          </div>

          {/* Editable Items */}
          {["Phone", "Location", "Social links"].map((item, index) => (
            <motion.div
              key={item}
              animate={{
                opacity: [0.55, 1, 0.55],
              }}
              transition={{
                duration: 2,
                delay: index * 0.45,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-2 flex items-center justify-between rounded-lg bg-[#fbfaff] px-3 py-2"
            >
              <span className="text-[10px] text-ink-soft">{item}</span>

              <span className="text-[9px] font-semibold text-[#e23a6b]">
                Updated
              </span>
            </motion.div>
          ))}

          {/* Save Status */}
          <div className="mt-3 flex items-center justify-end">
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="rounded-md bg-[#e23a6b]/10 px-3 py-1.5 text-[9px] font-semibold text-[#e23a6b]"
            >
              Changes saved
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* ANALYTICS VISUAL                                                         */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="w-52 rounded-xl border border-[#e8e3f4] bg-white p-4 shadow-card">
        {/* Header */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-ink-soft">
              Total interactions
            </div>

            <div className="mt-1 text-2xl font-semibold text-ink">
              1,248
            </div>
          </div>

          <motion.div
            animate={{
              y: [-1, 1, -1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="rounded-md bg-[#2bb4ff]/10 px-2 py-1 text-[9px] font-semibold text-[#1d7fd1]"
          >
            +18.4%
          </motion.div>
        </div>

        {/* Chart */}
        <div className="relative h-16">
          <svg
            viewBox="0 0 200 65"
            className="h-full w-full overflow-visible"
          >
            {/* Grid Lines */}
            <line
              x1="0"
              y1="55"
              x2="200"
              y2="55"
              stroke="currentColor"
              className="text-[#2bb4ff]/10"
              strokeWidth="1"
            />

            <line
              x1="0"
              y1="35"
              x2="200"
              y2="35"
              stroke="currentColor"
              className="text-[#2bb4ff]/10"
              strokeWidth="1"
            />

            <line
              x1="0"
              y1="15"
              x2="200"
              y2="15"
              stroke="currentColor"
              className="text-[#2bb4ff]/10"
              strokeWidth="1"
            />

            {/* Graph */}
            <motion.path
              d="M5 55 C30 48, 35 42, 55 45 S80 28, 100 34 S125 20, 145 25 S170 10, 195 5"
              fill="none"
              stroke="#2bb4ff"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
            />

            {/* End Point */}
            <motion.circle
              cx="195"
              cy="5"
              fill="#1d7fd1"
              initial={{ r: 3 }}
              animate={{
                r: [3, 5, 3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </svg>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-[#fbfaff] p-2">
            <div className="text-[9px] text-ink-soft">
              NFC Taps
            </div>

            <div className="mt-0.5 text-sm font-semibold text-ink">
              824
            </div>
          </div>

          <div className="rounded-lg bg-[#fbfaff] p-2">
            <div className="text-[9px] text-ink-soft">
              QR Scans
            </div>

            <div className="mt-0.5 text-sm font-semibold text-ink">
              424
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}