"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart3, MapPin, MessageSquare, Nfc, QrCode, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function WorkRow({ id, index, tag, title, tagline, body, metaLabel1, metaValue1, metaLabel2, metaValue2, cta, ctaHref, flip }: {
  id?: string;
  index: string;
  tag: string;
  title: string;
  tagline: string;
  body: string;
  metaLabel1: string;
  metaValue1: string;
  metaLabel2: string;
  metaValue2: string;
  cta: string;
  ctaHref: string;
  flip?: boolean;
}) {
  return (
    <section id={id} className="grid scroll-mt-24 items-center gap-12 border-b border-border py-20 md:grid-cols-2 md:gap-16">
      <div className={flip ? "md:order-2" : ""}>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand">{index} — {tag}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#2c1a7a]">{title}</h2>
        <p className="mt-3 text-base font-semibold text-ink">{tagline}</p>
        <p className="mt-5 text-[0.95rem] leading-7 text-muted-foreground">{body}</p>
        <dl className="mt-8 flex gap-12">
          <div>
            <dt className="text-[0.7rem] text-muted-foreground">{metaLabel1}</dt>
            <dd className="mt-1.5 text-base font-semibold text-ink">{metaValue1}</dd>
          </div>
          <div>
            <dt className="text-[0.7rem] text-muted-foreground">{metaLabel2}</dt>
            <dd className="mt-1.5 text-base font-semibold text-ink">{metaValue2}</dd>
          </div>
        </dl>
        <Link
          href={ctaHref}
          className="mt-9 inline-flex h-12 items-center rounded-full bg-brand px-7 text-[0.95rem] font-semibold text-brand-foreground shadow-brand transition hover:-translate-y-0.5 hover:bg-brand-deep"
        >
          {cta}
        </Link>
      </div>
      <div className={`relative grid min-h-[28rem] place-items-center overflow-hidden rounded-3xl border border-border bg-secondary ${flip ? "md:order-1" : ""}`}>
        {/* IMAGE PLACEHOLDER — put your image here. Example:
            <img src="/your-image.png" alt="NFC & QR" className="h-full w-full object-cover" /> */}
        <div className="grid place-items-center gap-2 text-brand/30">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-xs font-medium text-brand/50">Add image</span>
        </div>
      </div>
    </section>
  );
}