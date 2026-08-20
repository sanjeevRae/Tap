"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Hand,
  MapPin,
  Nfc,
  Smartphone,
} from "lucide-react";
import { useInView } from "./use-in-view";

const reasons = [
  {
    icon: Nfc,
    title: "One tap, everything about your business",
    desc: "Give customers instant access to your business profile, services, contact details, social media, location, reviews, and more from a single NFC tap or QR scan.",
  },
  {
    icon: Smartphone,
    title: "No app. No complicated setup.",
    desc: "Customers don't need to download anything. They simply tap or scan and your digital business profile opens instantly on their phone.",
  },
  {
    icon: Building2,
    title: "Your business, available anywhere",
    desc: "Whether customers are at your shop or discovering you online, your digital profile makes it easy to find your information, location, contact details, and online presence.",
  },
  {
    icon: Hand,
    title: "Update once, change everything",
    desc: "Changed your phone number, menu, social media, or business information? Update it from your dashboard without replacing your physical stand.",
  },
  {
    icon: MapPin,
    title: "Build trust with real business information",
    desc: "Show your business information, Google rating, reviews, location, opening hours, and social profiles in one convenient place.",
  },
  {
    icon: BadgeCheck,
    title: "Made for every business",
    desc: "From cafes and restaurants to salons, hotels, shops, offices, and professionals, ChitraTap gives any business a simple way to build a stronger digital presence.",
  },
];

export function WhyChoose() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="why"
      className="relative overflow-hidden border-t border-[#f2efff] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container-proton" ref={ref}>
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center font-sans text-3xl font-medium tracking-tight text-[#2c1a7a] sm:text-4xl lg:text-[2.5rem]"
        >
          Why choose ChitraTap?
        </motion.h2>

        {/* Feature Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group min-h-[210px] rounded-[1.25rem] bg-[#f5f6f8] px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f7f5ff] hover:shadow-[0_12px_32px_rgba(49,31,130,0.07)] sm:min-h-[215px] sm:px-7"
              >
                {/* Icon */}
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2e5ec] bg-white text-brand shadow-[0_8px_20px_rgba(49,31,130,0.05)] transition-transform duration-300 group-hover:scale-105">
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={2.1}
                  />
                </span>

                {/* Title */}
                <h3 className="mt-5 font-sans text-lg font-semibold leading-snug text-[#2c1a7a]">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-sans text-sm leading-6 text-[#536273]">
                  {reason.desc}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}