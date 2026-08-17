"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "./use-in-view";

const faqs = [
  {
    q: "How does Proton VPN work?",
    a: "Proton VPN protects your online privacy by hiding your real IP address. With your virtual location hidden, it's much harder for your online activity to be monitored, restricted, or sold to advertisers. All traffic between your device and the VPN server is encrypted.",
  },
  {
    q: "How do I install Proton VPN?",
    a: "To install Proton VPN, download the Proton VPN application for your device and follow our setup guide. Then, just sign in to your Proton account, and you'll be ready to connect in seconds.",
  },
  {
    q: "Can I watch Netflix, Hulu, or Disney+ with Proton VPN?",
    a: "When connected to a Proton VPN server, you can access Netflix, Hulu, Disney+, and other major streaming platforms from your VPN location. Streaming is available with all paid Proton VPN plans, including Plus, Unlimited, Visionary, and Family.",
  },
  {
    q: "Is Proton VPN free?",
    a: "Yes. While some premium features are only available on our paid Proton VPN Plus subscription, we also have a free plan. We're the only free VPN service with no ads, no data limits, and a strict no-logs policy.",
  },
  {
    q: "How secure is Proton VPN?",
    a: "All Proton VPN network traffic is encrypted using either AES-256 or ChaCha20, and we use strong VPN protocols like WireGuard® and OpenVPN. Even if your VPN connection is interrupted, you can protect your data with free VPN features like kill switch and always-on VPN.",
  },
  {
    q: "How many devices can I connect to Proton VPN?",
    a: "With a paid Proton VPN subscription, you can connect up to 10 devices at once. The free plan allows you to secure 1 device at a time.",
  },
  {
    q: "Is it legal to use Proton VPN?",
    a: "Using a VPN is legal in most countries, but some nations restrict or ban VPN use. Learn more in our country-by-country VPN guide.",
  },
];

export function Faq() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="container-proton" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/60 px-3 py-1 text-xs font-medium text-brand">
            FAQ
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                  <span className="pr-2">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-ink-soft">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 rounded-3xl border border-border bg-gradient-to-br from-brand-soft/60 to-background p-8 text-center">
            <h3 className="text-xl font-semibold text-ink">Still have questions?</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Browse, stream, and connect with total freedom — our team is here
              to help.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-brand transition-all hover:-translate-y-0.5 sm:w-auto"
              >
                Get Proton VPN
              </a>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-brand/40 sm:w-auto"
              >
                Help center
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
