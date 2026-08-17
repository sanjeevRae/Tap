"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Minus, ArrowRight, Info } from "lucide-react";
import { useInView } from "./use-in-view";

type Cell = "yes" | "no" | "partial" | string;

const features: { label: string; proton: Cell; express: Cell; cyber: Cell; nord: Cell; surf: Cell; note?: string }[] = [
  { label: "Open-source VPN", proton: "yes", express: "no", cyber: "no", nord: "no", surf: "no" },
  { label: "Openly published no-logs audit", proton: "yes", express: "partial", cyber: "partial", nord: "partial", surf: "partial" },
  { label: "Ad blocker", proton: "yes", express: "yes", cyber: "yes", nord: "partial", surf: "yes" },
  { label: "Malware blocker", proton: "yes", express: "yes", cyber: "yes", nord: "partial", surf: "yes" },
  { label: "VPN Accelerator", proton: "yes", express: "no", cyber: "no", nord: "no", surf: "no" },
  { label: "Jurisdiction", proton: "Switzerland", express: "BVI", cyber: "Romania", nord: "Panama", surf: "Netherlands" },
  { label: "Owned by", proton: "Proton AG", express: "Kape", cyber: "Kape", nord: "Nord Security", surf: "Nord Security" },
];

const providers = [
  { key: "proton", name: "Proton VPN", highlight: true },
  { key: "express", name: "ExpressVPN" },
  { key: "cyber", name: "CyberGhost" },
  { key: "nord", name: "NordVPN" },
  { key: "surf", name: "Surfshark" },
];

function CellMark({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500/70">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
        <span className="text-xs font-bold">~</span>
      </span>
    );
  return <span className="text-xs font-medium text-ink">{value}</span>;
}

export function Comparison() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="compare" className="py-20 sm:py-28">
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/60 px-3 py-1 text-xs font-medium text-brand">
            Compare with the rest
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            See how Proton VPN stacks up
          </h2>
          <p className="mt-3 text-ink-soft">
            An honest, side-by-side look at the features that matter most for
            your privacy and speed.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-card"
        >
          <div className="thin-scrollbar overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-card p-5 text-sm font-semibold text-ink-soft">
                    VPN vendors comparison
                  </th>
                  {providers.map((p) => (
                    <th
                      key={p.key}
                      className={`p-5 text-center align-bottom ${
                        p.highlight
                          ? "bg-brand-soft/50"
                          : "bg-card"
                      }`}
                    >
                      <span
                        className={`block text-sm font-semibold ${
                          p.highlight ? "text-brand" : "text-ink"
                        }`}
                      >
                        {p.name}
                      </span>
                      {p.highlight && (
                        <span className="mt-1 inline-block rounded-full bg-brand px-2 py-0.5 text-[0.6rem] font-semibold uppercase text-white">
                          Recommended
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, ri) => (
                  <tr
                    key={row.label}
                    className={ri % 2 === 1 ? "bg-muted/30" : "bg-card"}
                  >
                    <td className="sticky left-0 z-10 bg-inherit p-5 text-sm font-medium text-ink">
                      <span className="flex items-center gap-1.5">
                        {row.label}
                        {row.note && (
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </span>
                    </td>
                    {providers.map((p) => {
                      const val = row[p.key as keyof typeof row] as Cell;
                      return (
                        <td
                          key={p.key}
                          className={`p-5 text-center ${
                            p.highlight ? "bg-brand-soft/50" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <CellMark value={val} />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="sticky left-0 z-10 bg-card p-5"></td>
                  {providers.map((p) => (
                    <td
                      key={p.key}
                      className={`p-5 text-center ${
                        p.highlight ? "bg-brand-soft/50" : "bg-card"
                      }`}
                    >
                      <a
                        href="#pricing"
                        className={`inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                          p.highlight
                            ? "bg-brand text-white shadow-brand hover:-translate-y-0.5"
                            : "border border-border text-ink-soft hover:text-ink"
                        }`}
                      >
                        {p.highlight ? "Try now" : "Visit"}
                        {p.highlight && <ArrowRight className="h-3.5 w-3.5" />}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Try Proton VPN risk free — if you're not satisfied, we'll refund your
            payment in full within 30 days. Last updated: April 2026.
          </span>
        </p>
      </div>
    </section>
  );
}
