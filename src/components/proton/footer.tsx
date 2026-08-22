"use client";

import * as React from "react";
import { Globe, Mail, MapPin } from "lucide-react";
import { ProtonLogo } from "./logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const columns = [
  {
    heading: "Product",
    links: [
      "How it works",
      "Features",
      "NFC Business Stand",
      "QR Code",
      "Digital Business Profile",
      "Business Dashboard",
      "Pricing",
    ],
  },
  {
    heading: "For Businesses",
    links: [
      "Restaurants & Cafes",
      "Hotels",
      "Salons & Spas",
      "Retail Shops",
      "Offices",
      "Professionals",
      "All Businesses",
    ],
  },
  {
    heading: "Resources",
    links: [
      "Getting started",
      "How ChitraTap works",
      "Help & Support",
      "FAQs",
      "Business Guide",
      "Contact Support",
    ],
  },
  {
    heading: "ChitraTech",
    links: [
      "About ChitraTech",
      "Our Products",
      "Blog",
      "Careers",
      "Contact Us",
    ],
  },
];


export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#ebe9f5] bg-[#fbfaff]">
      <div className="container-proton py-14">
        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_3fr]">
          {/* Brand */}
          <div>
            <ProtonLogo />

            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-soft">
              Digital tools that help businesses connect, grow, and build a
              stronger online presence.
            </p>

            {/* Location */}
            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Kapan, Kathmandu, Nepal</span>
            </div>

            {/* Email */}
            <a
              href="mailto:info@chitratech.com"
              className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" />
              info@chitratech.com
            </a>


            {/* Social Links */}
<div className="mt-6 flex items-center gap-2">
  <a
  href="https://www.linkedin.com/company/chitratech"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-accent"
>
  <img
    src="https://s.magecdn.com/social/tc-linkedin.svg"
    alt="LinkedIn"
    className="h-4 w-4"
  />
</a>

  <a
    href="https://www.tiktok.com/@chitratech"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-accent"
  >
    <img
      src="https://s.magecdn.com/social/tc-tiktok.svg"
      alt="TikTok"
      className="h-4 w-4"
    />
  </a>

  <a
    href="https://www.instagram.com/chitra.tech"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-accent"
  >
    <img
      src="https://s.magecdn.com/social/tc-instagram.svg"
      alt="Instagram"
      className="h-4 w-4"
    />
  </a>

  <a
    href="https://www.facebook.com/people/Chitra-Tech/61589090079956/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-accent"
  >
    <img
      src="https://s.magecdn.com/social/tc-facebook.svg"
      alt="Facebook"
      className="h-4 w-4"
    />
  </a>
</div>      
           
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                  {column.heading}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-ink-soft transition-colors hover:text-brand"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a
              href="/privacy-policy"
              className="transition-colors hover:text-brand"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-and-conditions"
              className="transition-colors hover:text-brand"
            >
              Terms & Conditions
            </a>

            <a
              href="/refund-policy"
              className="transition-colors hover:text-brand"
            >
              Refund Policy
            </a>

            <a
              href="mailto:info@chitratech.com"
              className="transition-colors hover:text-brand"
            >
              Contact
            </a>
          </div>

          {/* System Status */}
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            ChitraTap is operational
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ChitraTech. All rights reserved.</p>

          <p>ChitraTap — One tap. Your business, connected.</p>
        </div>
      </div>
    </footer>
  );
}