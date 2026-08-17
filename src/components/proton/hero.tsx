"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Award, Users, Play } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "30-day money-back guarantee" },
  { icon: Award, label: "Endorsed as a Which? Best Buy" },
  { icon: Star, label: "Ranked #1 Best VPN" },
  { icon: Users, label: "Trusted by over 100 million users" },
];

const orbitCountries = [
  { angle: 12, name: "US" },
  { angle: 64, name: "UK" },
  { angle: 118, name: "JP" },
  { angle: 168, name: "DE" },
  { angle: 214, name: "BR" },
  { angle: 268, name: "AU" },
  { angle: 318, name: "IN" },
].map((c) => {
  const rad = (c.angle * Math.PI) / 180;
  const r = 47;
  const x = (50 + r * Math.cos(rad)).toFixed(2);
  const y = (50 + r * Math.sin(rad)).toFixed(2);
  return { ...c, x, y };
});

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background gradients + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.55] [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-0 bg-radial-brand" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute right-[8%] top-[20%] h-[280px] w-[280px] rounded-full bg-[#2bb4ff]/10 blur-[90px]" />
      </div>

      <div className="container-proton pt-14 pb-10 sm:pt-20 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/70 px-3 py-1 text-xs font-medium text-brand">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Swiss-based · No-logs VPN
            </span>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              The best VPN to take{" "}
              <span className="gradient-text">control of your online world</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-ink-soft sm:text-lg lg:mx-0">
              Join millions using Proton VPN to protect their information and
              access a global internet, anytime, anywhere.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#pricing"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
              >
                Get Proton VPN
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#why"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-brand/40 hover:bg-accent sm:w-auto"
              >
                <Play className="h-4 w-4 fill-current" />
                Business VPN
              </a>
            </div>

            {/* trust badges */}
            <ul className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-2">
              {badges.map((b, i) => (
                <motion.li
                  key={b.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-2 text-xs font-medium text-ink-soft sm:text-[0.8rem]"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <b.icon className="h-3.5 w-3.5" />
                  </span>
                  {b.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right visual: animated globe + connection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[460px]"
          >
            <HeroGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroGlobe() {
  return (
    <div className="relative h-full w-full">
      {/* halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-brand/20 to-transparent blur-2xl" />

      {/* rotating orbital rings */}
      <div className="absolute inset-[6%] rounded-full border border-dashed border-brand/25 animate-orbit" />
      <div className="absolute inset-[18%] rounded-full border border-brand/15 animate-orbit-rev" />

      {/* globe */}
      <div className="absolute inset-[26%] overflow-hidden rounded-full bg-gradient-to-b from-[#1b1640] via-[#2a1f6b] to-[#0f0e1a] shadow-brand">
        <div className="absolute inset-0 opacity-90">
          {/* meridians */}
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <radialGradient id="globe-glow" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#6d4aff" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#2a1f6b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b6dff" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b6dff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b6dff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="98" fill="url(#globe-glow)" />
            {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x) => (
              <ellipse
                key={`v${x}`}
                cx="100"
                cy="100"
                rx={Math.abs(100 - x) / 1.6 + 8}
                ry="98"
                fill="none"
                stroke="#8b6dff"
                strokeOpacity="0.18"
                strokeWidth="0.6"
              />
            ))}
            {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y) => (
              <ellipse
                key={`h${y}`}
                cx="100"
                cy="100"
                rx="98"
                ry={Math.abs(100 - y) / 1.6 + 8}
                fill="none"
                stroke="#8b6dff"
                strokeOpacity="0.18"
                strokeWidth="0.6"
              />
            ))}
            {/* abstract continents */}
            <path
              d="M55 70 Q72 58 92 66 Q104 70 100 84 Q92 96 78 92 Q62 88 55 78 Z"
              fill="#8b6dff"
              fillOpacity="0.35"
            />
            <path
              d="M110 60 Q132 56 142 72 Q150 88 138 96 Q120 100 112 88 Q106 76 110 60 Z"
              fill="#8b6dff"
              fillOpacity="0.30"
            />
            <path
              d="M88 120 Q108 116 122 128 Q128 142 116 150 Q98 152 90 140 Q84 130 88 120 Z"
              fill="#8b6dff"
              fillOpacity="0.28"
            />
            <path
              d="M140 120 Q156 118 160 132 Q156 144 144 142 Q134 136 140 120 Z"
              fill="#8b6dff"
              fillOpacity="0.25"
            />
            {/* connection arc */}
            <motion.path
              d="M60 80 Q100 30 150 90"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
            />
          </svg>
        </div>
        {/* glossy highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
      </div>

      {/* center shield */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 14 }}
        className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <div className="relative flex h-full w-full items-center justify-center rounded-2xl gradient-brand shadow-brand">
          <span className="absolute inset-0 rounded-2xl bg-brand/30 blur-md" />
          <ShieldCheck className="relative h-[42%] w-[42%] text-white" strokeWidth={2} />
          {/* pulse rings */}
          <span className="absolute inset-0 rounded-2xl border border-brand/40 animate-pulse-ring" />
        </div>
      </motion.div>

      {/* orbiting country pins */}
      {orbitCountries.map((c, i) => {
        return (
          <motion.div
            key={c.name}
            className="absolute"
            style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 220, damping: 12 }}
          >
            <div className="group relative flex items-center">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2bb4ff] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2bb4ff] ring-2 ring-white" />
              </span>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-1.5 py-0.5 text-[0.6rem] font-semibold text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
                {c.name}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* floating speed chip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute -right-2 top-[18%] animate-float-slow rounded-xl border border-border bg-background/95 px-3 py-2 shadow-card backdrop-blur"
      >
        <p className="text-[0.65rem] font-medium text-muted-foreground">VPN Accelerator</p>
        <p className="text-sm font-semibold text-brand">↑ 400% faster</p>
      </motion.div>

      {/* floating secure chip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.6 }}
        className="absolute -left-2 bottom-[14%] animate-float-slow rounded-xl border border-border bg-background/95 px-3 py-2 shadow-card backdrop-blur [animation-delay:1.4s]"
      >
        <p className="text-[0.65rem] font-medium text-muted-foreground">AES-256 / ChaCha20</p>
        <p className="text-sm font-semibold text-ink">Encrypted</p>
      </motion.div>
    </div>
  );
}
