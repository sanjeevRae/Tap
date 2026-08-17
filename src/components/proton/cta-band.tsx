"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Globe2 } from "lucide-react";
import { useInView } from "./use-in-view";

const items = [
  { icon: ShieldCheck, label: "Shield your personal information" },
  { icon: Lock, label: "Stay safe from online threats" },
  { icon: Globe2, label: "Access the internet on your terms" },
];

export function CtaBand() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="container-proton" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] gradient-brand p-8 text-white shadow-brand sm:p-14"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#2bb4ff]/20 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
                Browse, stream, and connect with total freedom
              </h2>
              <ul className="mt-6 space-y-3">
                {items.map((it, i) => (
                  <motion.li
                    key={it.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm font-medium sm:text-base"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                      <it.icon className="h-4 w-4" />
                    </span>
                    {it.label}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="#pricing"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Proton VPN
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
              >
                Talk to sales
              </a>
              <p className="text-center text-xs text-white/70">
                30-day money-back guarantee · Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
