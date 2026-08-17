"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  ShieldBan,
  Eye,
  Gauge,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInView } from "./use-in-view";

const slides = [
  {
    icon: Server,
    eyebrow: "Global network",
    title: "20,000+ servers in 140+ countries",
    desc: "Access one of the world's most extensive VPN server networks with high-speed connections for reliable streaming, browsing, and global access.",
    visual: "servers",
  },
  {
    icon: ShieldBan,
    eyebrow: "Built-in protection",
    title: "Ad and malware blocker",
    desc: "Block ads, trackers, phishing scams, and malicious websites before they load with advanced DNS-level protection that keeps browsing faster, cleaner, and safer.",
    visual: "blocker",
  },
  {
    icon: Eye,
    eyebrow: "Privacy by default",
    title: "Private browsing by default",
    desc: "Hide your IP address, browsing activity, and real location with encrypted VPN protection backed by European laws and a strict no-logs policy.",
    visual: "privacy",
  },
  {
    icon: Gauge,
    eyebrow: "Performance",
    title: "Speed without compromise",
    desc: "Boost VPN speeds by up to 400% with Proton's unique VPN Accelerator technology, designed for faster, more stable, and more reliable connections.",
    visual: "speed",
  },
];

export function VpnFeatures() {
  const [index, setIndex] = React.useState(0);
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  const [auto, setAuto] = React.useState(true);

  React.useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [auto, inView]);

  const go = (dir: number) => {
    setAuto(false);
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <section id="features" className="relative overflow-hidden bg-gradient-to-b from-brand-soft/40 to-white py-20 sm:py-28">
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-background px-3 py-1 text-xs font-medium text-brand">
            Battle-tested VPN features
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Shield your personal information, stay safe from online threats, and
            access the internet on your terms.
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-2">
          {/* Left: slide list */}
          <div className="order-2 lg:order-1">
            <div className="space-y-3">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => {
                    setAuto(false);
                    setIndex(i);
                  }}
                  className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                    i === index
                      ? "border-brand/30 bg-card shadow-card"
                      : "border-border bg-card/50 hover:bg-card"
                  }`}
                  aria-pressed={i === index}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      i === index
                        ? "bg-brand text-white"
                        : "bg-brand-soft text-brand"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.eyebrow}
                    </p>
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                    <AnimatePresence initial={false}>
                      {i === index && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden text-sm text-ink-soft"
                        >
                          <span className="block pt-2">{s.desc}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="ml-2 flex flex-1 gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAuto(false);
                      setIndex(i);
                    }}
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-border"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <motion.span
                      className="block h-full bg-brand"
                      initial={false}
                      animate={{
                        width: i === index ? "100%" : "0%",
                      }}
                      transition={{ duration: i === index ? 5.2 : 0.3, ease: "linear" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: animated visual */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.visual}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#15122e] via-[#221b50] to-[#0f0e1a] p-8 shadow-soft"
              >
                <FeatureVisual kind={slide.visual as "servers" | "blocker" | "privacy" | "speed"} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureVisual({ kind }: { kind: "servers" | "blocker" | "privacy" | "speed" }) {
  if (kind === "servers") {
    const dots = Array.from({ length: 60 });
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-44 w-44">
            {[0, 1, 2, 3].map((r) => (
              <div
                key={r}
                className="absolute inset-0 rounded-full border border-brand/30"
                style={{ transform: `scale(${0.3 + r * 0.25})` }}
              />
            ))}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(109,74,255,0.5), transparent 50%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl gradient-brand shadow-brand">
              <Server className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        {dots.map((_, i) => {
          const angle = (i / dots.length) * Math.PI * 2;
          const r = 38 + (i % 3) * 4;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#2bb4ff]"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
            />
          );
        })}
        <div className="absolute bottom-4 left-4 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
          <p className="text-[0.65rem] text-white/60">Server network</p>
          <p className="text-lg font-semibold text-white">20,000+ servers</p>
        </div>
      </div>
    );
  }

  if (kind === "blocker") {
    const threats = ["Ads", "Trackers", "Phishing", "Malware"];
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-[0.1]" />
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full gradient-brand shadow-brand">
          <span className="absolute inset-0 rounded-full border border-brand/40 animate-pulse-ring" />
          <ShieldBan className="h-16 w-16 text-white" />
        </div>
        {threats.map((t, i) => {
          const angle = (i / threats.length) * Math.PI * 2 - Math.PI / 2;
          const r = 42;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <motion.div
              key={t}
              className="absolute flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-300 backdrop-blur"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 1, 0.4], scale: 1 }}
              transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity, repeatType: "reverse" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {t}
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (kind === "privacy") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-[0.1]" />
        <div className="relative">
          <motion.div
            className="absolute -inset-8 rounded-full bg-brand/20 blur-2xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <svg viewBox="0 0 120 120" className="relative h-44 w-44">
            <defs>
              <linearGradient id="pr-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b6dff" />
                <stop offset="100%" stopColor="#4b2fe0" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="40" fill="url(#pr-g)" />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#8b6dff"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeDasharray="6 8"
              animate={{ rotate: 360 }}
              style={{ transformOrigin: "60px 60px" }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <Eye className="text-white" x="42" y="42" width="36" height="36" />
            <motion.path
              d="M50 60 L70 60"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
          <p className="text-[0.65rem] text-white/60">Your real IP</p>
          <p className="font-mono text-sm font-semibold text-white">•••.•••.•••.•••</p>
        </div>
      </div>
    );
  }

  // speed
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 bg-grid opacity-[0.1]" />
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="14" />
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#sp-g)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="502"
            transform="rotate(-90 100 100)"
            initial={{ strokeDashoffset: 502 }}
            animate={{ strokeDashoffset: 502 - 502 * 0.92 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="sp-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b6dff" />
              <stop offset="100%" stopColor="#2bb4ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-white"
          >
            400%
          </motion.span>
          <span className="text-xs text-white/60">faster speeds</span>
        </div>
      </div>
      {/* speed lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent to-brand"
          style={{ left: `${10 + i * 4}%`, top: `${30 + i * 12}%` }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 40, opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
