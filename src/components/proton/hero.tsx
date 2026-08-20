"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f5ff] via-white to-white">
      <div className="container-proton relative pt-15 pb-2 sm:pt-14 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl text-center"
        >
          <p className="font-sans text-sm font-bold text-brand sm:text-base">
            Powered by ChitraTech
          </p>

          <h1 className="mx-auto mt-4 max-w-5xl text-balance font-sans text-[1.3rem] font-semibold leading-[1.05] tracking-tight text-[#351f82] sm:text-[1rem] lg:text-[2.05rem]">
            The smarter way to share your business
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-pretty font-sans text-base leading-7 text-[#536273] sm:text-lg">
            A smarter business stand that lets customers instantly discover,
            connect with, and interact with your business.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <a
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-semibold text-white shadow-[0_10px_20px_rgba(109,74,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-[0_14px_26px_rgba(109,74,255,0.26)]"
                >
              Get Started
            </a>

            <p className="inline-flex items-center gap-3 font-sans text-lg font-medium text-[#536273]">
              <CheckCircle2 className="h-5 w-5 text-[#667487]" strokeWidth={2} />
              Tap. Connect. Grow.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 w-full max-w-6xl sm:mt-24"
        >
          <img
            src="/hero.svg"
            alt="Tap Chitra business sharing preview"
            className="mx-auto block h-auto w-full object-contain"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
