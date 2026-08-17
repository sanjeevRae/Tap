"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
import { useInView } from "./use-in-view";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  accent: string;
  currency: string;
  symbol: string;
  monthly: number;
  billed: number;
  cycle: number;
  discount: number;
  isFree: boolean;
};

const cycles = [
  { key: "1", label: "1 month", note: "" },
  { key: "12", label: "1 year", note: "Save 33%" },
  { key: "24", label: "2 years", note: "Best deal · Save 50%" },
];

const currencies = ["USD", "EUR", "CHF"];

export function Pricing() {
  const [cycle, setCycle] = React.useState("24");
  const [currency, setCurrency] = React.useState("USD");
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { ref, inView } = useInView<HTMLDivElement>();
  const [openCurrency, setOpenCurrency] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/pricing?cycle=${cycle}&currency=${currency}`)
      .then((r) => r.json())
      .then((d) => {
        if (active) {
          setPlans(d.plans);
          setLoading(false);
        }
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [cycle, currency]);

  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      </div>
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/60 px-3 py-1 text-xs font-medium text-brand">
            Choose your plan
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Gain the freedom to browse, stream, and connect without limits.
          </h2>
          <p className="mt-3 text-ink-soft">
            30-day money-back guarantee. Cancel anytime.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* billing cycle toggle */}
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-card">
            {cycles.map((c) => (
              <button
                key={c.key}
                onClick={() => setCycle(c.key)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cycle === c.key ? "text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {cycle === c.key && (
                  <motion.span
                    layoutId="cycle-pill"
                    className="absolute inset-0 rounded-full gradient-brand shadow-brand"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {c.label}
                  {c.note && (
                    <span
                      className={`hidden rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold sm:inline ${
                        cycle === c.key
                          ? "bg-white/20 text-white"
                          : "bg-brand-soft text-brand"
                      }`}
                    >
                      {c.note}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* currency */}
          <div className="relative">
            <button
              onClick={() => setOpenCurrency((o) => !o)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink shadow-card"
            >
              {currency}
              <ChevronDown className={`h-4 w-4 transition-transform ${openCurrency ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openCurrency && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-card"
                >
                  {currencies.map((cur) => (
                    <li key={cur}>
                      <button
                        onClick={() => {
                          setCurrency(cur);
                          setOpenCurrency(false);
                        }}
                        className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors hover:bg-accent ${
                          cur === currency ? "font-semibold text-brand" : "text-ink"
                        }`}
                      >
                        {cur}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {loading
            ? [0, 1, 2].map((i) => <PricingSkeleton key={i} highlight={i === 1} />)
            : plans.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`relative flex flex-col overflow-hidden rounded-3xl border bg-card p-7 shadow-card transition-all hover:-translate-y-1 ${
                    p.highlight
                      ? "border-brand/40 lg:-translate-y-3 lg:scale-[1.03]"
                      : "border-border"
                  }`}
                >
                  {p.highlight && (
                    <div className="absolute inset-x-0 top-0 h-1 gradient-brand" />
                  )}
                  {p.discount > 0 && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand-soft px-2.5 py-1 text-[0.65rem] font-semibold text-brand">
                      {p.discount}% off
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                      style={{ background: p.accent }}
                    >
                      {p.id === "free" ? (
                        <ShieldCheck className="h-4.5 w-4.5" />
                      ) : p.id === "plus" ? (
                        <Sparkles className="h-4.5 w-4.5" />
                      ) : (
                        <Check className="h-4.5 w-4.5" strokeWidth={3} />
                      )}
                    </span>
                    <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>

                  <div className="mt-5 flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${p.id}-${p.cycle}-${p.currency}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-end gap-1"
                      >
                        <span className="text-sm font-medium text-ink-soft">
                          {p.isFree ? "" : p.symbol}
                        </span>
                        <span className="text-4xl font-semibold tracking-tight text-ink">
                          {p.isFree ? "Free" : p.monthly.toFixed(2)}
                        </span>
                        {!p.isFree && (
                          <span className="mb-1 text-sm text-ink-soft">/month</span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {!p.isFree && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Billed{" "}
                      {p.symbol}
                      {p.billed.toFixed(2)} for the first{" "}
                      {p.cycle === 1 ? "month" : `${p.cycle} months`}
                    </p>
                  )}

                  <a
                    href="#"
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      p.highlight
                        ? "gradient-brand text-white shadow-brand"
                        : "border border-border bg-background text-ink hover:border-brand/40"
                    }`}
                  >
                    {p.cta}
                  </a>

                  <div className="mt-6 border-t border-border pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Included
                    </p>
                    <ul className="space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                          <span
                            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${p.accent}20`, color: p.accent }}
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          30-day money-back guarantee · No credit card required for Free plan
        </p>
      </div>
    </section>
  );
}

function PricingSkeleton({ highlight }: { highlight?: boolean }) {
  return (
    <div
      className={`flex flex-col rounded-3xl border bg-card p-7 shadow-card ${
        highlight ? "border-brand/40 lg:-translate-y-3 lg:scale-[1.03]" : "border-border"
      }`}
    >
      <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
      <div className="mt-4 h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-10 w-28 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-6 space-y-2.5 border-t border-border pt-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3.5 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
