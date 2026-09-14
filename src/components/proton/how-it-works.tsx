"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart3, MapPin, MessageSquare, Nfc, QrCode, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function WorkRow({ id, index, tag, title, tagline, body, body2, body3, metaLabel1, metaValue1, metaLabel2, metaValue2, cta, ctaHref, flip }: {
  id?: string;
  index: string;
  tag: string;
  title: string;
  tagline: string;
  body: string;
  body2?: string;
  body3?: string;
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
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand">{index} · {tag}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#2c1a7a]">{title}</h2>
        <p className="mt-3 text-base font-semibold text-ink">{tagline}</p>
        <p className="mt-5 text-[0.95rem] leading-7 text-muted-foreground">{body}</p>
        {body2 ? <p className="mt-4 text-[0.95rem] leading-7 text-muted-foreground">{body2}</p> : null}
        {body3 ? <p className="mt-4 text-[0.95rem] leading-7 text-muted-foreground">{body3}</p> : null}
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
        {/* IMAGE PLACEHOLDER - put your image here. Example:
            <img src="/your-image.png" alt="Section" className="h-full w-full object-cover" /> */}
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
        body="Every Chitra Tap stand and card carries an NFC chip and a unique QR code. A customer taps their phone on the stand or scans the code. No app download, no typing in a URL. Your page opens instantly in their browser, ready to explore."
        body2="Works with every modern smartphone, Android or iPhone. Most phones open the tap automatically, and the QR code is always there as a backup."
        body3="Place it on your reception desk, next to the cashier, or on every table. Wherever a customer looks, your business is one tap away."
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
        body="Contact details, social media, opening hours, location, Google reviews and more, all on one clean page. Share your website, WhatsApp, Instagram and other channels with a single link and look professional doing it."
        body2="Built to convert: a Call button, WhatsApp shortcut, one-tap directions and a Google Review button sit right where customers expect them."
        body3="Hide your address or phone number anytime, and pick the color and theme that match your brand. Works for restaurants, cafes, salons, hotels, shops and professionals alike."
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
        body="Log in to your dashboard to edit business details, reorder links, and track scans and clicks in real time. Publish changes instantly and update your QR page as often as you like without reprinting anything."
        body2="Changed your number? Moved location? Running an offer? Edit once and every future tap shows the new information immediately."
        body3="The dashboard also shows a profile completion score, and you can regenerate a fresh QR code in one click."
        metaLabel1="Analytics"
        metaValue1="Scans & clicks"
        metaLabel2="Updates"
        metaValue2="Instant publish"
        cta="Open dashboard"
        ctaHref="/login"
      />
     
    </div>
  );
}
