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

export function HowItWorksContent() {
  return (
    <div>
      <div className="pb-4 pt-20">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">How it works</p>
        
      </div>
      <WorkRow
        id="nfc-qr"
        index="01"
        tag="NFC · QR"
        title="NFC & QR"
        tagline="Tap or scan to open your digital business profile."
        body="Every Chitra Tap stand and card carries an NFC chip and a unique QR code. A customer taps their phone on the stand or scans the code — no app download, no typing in a URL. Your page opens instantly in their browser, ready to explore."
        metaLabel1="Type"
        metaValue1="Smart Business"
        metaLabel2="Setup"
        metaValue2="Under 5 minutes"
        cta="Get your Chitra Tap"
        ctaHref="/"
      />
      <WorkRow
        id="digital-profile"
        index="02"
        tag="Digital Profile"
        title="Digital business profile"
        tagline="Show your business information in one place."
        body="Contact details, social media, opening hours, location, Google reviews and more — everything a customer needs lives on one clean page. Share your website, WhatsApp, Instagram and other channels with a single link, and look professional doing it."
        metaLabel1="Content"
        metaValue1="Contacts · Links · Maps"
        metaLabel2="Reviews"
        metaValue2="Google integrated"
        cta="View live page"
        ctaHref="/"
        flip
      />
      <WorkRow
        id="dashboard"
        index="03"
        tag="Control Panel"
        title="Dashboard"
        tagline="Manage and update your information anytime."
        body="Log in to your dashboard to edit business details, reorder links, and track scans and clicks in real time. See your best performing day, watch how customers interact with your page, and publish changes instantly — update your QR page as often as you like without reprinting anything."
        metaLabel1="Analytics"
        metaValue1="Scans & clicks"
        metaLabel2="Updates"
        metaValue2="Instant publish"
        cta="Open dashboard"
        ctaHref="/login"
      />
     
     
      {/* FAQ */}
      <section className="mx-auto max-w-3xl py-16">
        <div className="text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#2c1a7a] sm:text-4xl">Questions, answered</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {[
            { q: "Do customers need to install an app?", a: "No. NFC tap and QR scan open your profile directly in the phone's browser — nothing to download, nothing to sign up for." },
            { q: "What happens when I change my information?", a: "Changes made in your dashboard publish instantly. Your printed stand and cards don't need to be reprinted — they always point to the same live page." },
            { q: "Where should I place my Chitra Tap stand?", a: "Anywhere customers already look: reception counters, cashier desks, tables, waiting areas. The stand works as soon as a phone is tapped or a code is scanned." },
            { q: "Can I see how my page is performing?", a: "Yes. Your dashboard tracks total scans, link clicks, click rate and daily trends, so you know exactly how customers interact with your business." },
            { q: "Is my business information kept up to date on Google too?", a: "Your profile links to your Google Maps location and reviews. Keep your Google Business profile connected and customers will always see accurate, current details." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium text-[#2c1a7a]">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      {/* CTA */}
      <section className="overflow-hidden rounded-3xl bg-brand px-6 py-16 text-center shadow-brand sm:px-12">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-foreground/70">Get started</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-brand-foreground sm:text-4xl">
          Ready to put your business one tap away?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-brand-foreground/80">
          Get your Chitra Tap stand or card today and give every customer an instant, complete introduction to your business.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.95rem] font-semibold text-[#2c1a7a] shadow-lg transition hover:-translate-y-0.5"
        >
          Get your Chitra Tap
        </Link>
      </section>
    </div>
  );
}
