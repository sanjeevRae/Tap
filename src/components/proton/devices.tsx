"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Apple,
  Terminal,
  Chrome,
  Smartphone,
  Tablet,
  Tv,
  Flame,
  Laptop,
} from "lucide-react";
import { useInView } from "./use-in-view";

const devices = [
  { label: "Windows", icon: Monitor },
  { label: "macOS", icon: Apple },
  { label: "Linux", icon: Terminal },
  { label: "Android", icon: Smartphone },
  { label: "iPhone / iPad", icon: Tablet },
  { label: "Chromebook", icon: Laptop },
  { label: "Chrome", icon: Chrome },
  { label: "Firefox", icon: Flame },
  { label: "Android TV", icon: Tv },
  { label: "Fire Stick", icon: Flame },
];

export function Devices() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="devices" className="relative border-y border-border bg-gradient-to-b from-white to-brand-soft/40 py-12 sm:py-16">
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Secure every connection
          </h2>
          <p className="mt-2 text-ink-soft">
            Native apps for all your favorite devices — one account, up to 10
            connections.
          </p>
        </div>

        <motion.ul
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10"
        >
          {devices.map((d) => (
            <motion.li
              key={d.label}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <a
                href="#"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-4 text-center transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <d.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium text-ink-soft group-hover:text-ink">
                  {d.label}
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
