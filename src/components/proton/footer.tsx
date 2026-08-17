"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
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
    heading: "Features",
    links: [
      "Free VPN",
      "VPN servers",
      "VPN for streaming",
      "Netflix VPN",
      "Secure Core VPN",
      "VPN for Business",
      "Getting started",
    ],
  },
  {
    heading: "Platforms",
    links: [
      "Download VPN",
      "VPN for Windows",
      "VPN for macOS",
      "VPN for Android",
      "VPN for iOS",
      "VPN for Linux",
      "VPN for Chrome",
      "VPN for Firefox",
    ],
  },
  {
    heading: "Company",
    links: [
      "About us",
      "Proton Foundation",
      "Blog",
      "Careers — We're hiring",
      "Threat model",
      "Open source",
    ],
  },
  {
    heading: "Connect",
    links: [
      "Help and support",
      "Business sales",
      "Partners and affiliates",
      "Press and media",
      "Contact us",
      "Live chat",
      "Student discount",
    ],
  },
];

const languages = [
  "English", "Bahasa Indonesia", "Čeština", "Dansk", "Deutsch", "Español (España)",
  "Español (Latinoamérica)", "Français", "Italiano", "Nederlands", "Norsk bokmål",
  "Polski", "Português (Brasil)", "Português (Portugal)", "Română", "Suomi",
  "Svenska", "Tiếng Việt", "Türkçe", "Русский", "عربي", "ไทย", "한국어", "日本語", "繁體中文",
];

const social = ["X", "in", "f", "ig", "yt"];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container-proton py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          {/* Brand + language */}
          <div>
            <ProtonLogo />
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              A better internet starts with privacy and freedom. Built by
              Proton AG, Geneva, Switzerland.
            </p>
            <address className="mt-4 text-xs not-italic leading-relaxed text-muted-foreground">
              Proton AG
              <br />
              Route de la Galaise 32
              <br />
              1228 Plan-les-Ouates
              <br />
              Geneva, Switzerland
            </address>

            <div className="mt-6 flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select defaultValue="English">
                <SelectTrigger className="w-[180px] h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {languages.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs font-semibold text-ink-soft transition-colors hover:border-brand/40 hover:bg-accent hover:text-brand"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-ink-soft transition-colors hover:text-brand"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* system status row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-brand">Privacy Policy</a>
            <a href="#" className="hover:text-brand">Terms & conditions</a>
            <a href="#" className="hover:text-brand">Transparency report</a>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              System status: All systems operational
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-brand">Report abuse</a>
            <a href="#" className="hover:text-brand">Report a problem</a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 Proton AG. All rights reserved.</p>
          <p>Made with privacy in mind, in Switzerland.</p>
        </div>
      </div>
    </footer>
  );
}
