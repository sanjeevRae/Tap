"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Globe } from "lucide-react";
import { ProtonLogo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type MegaItem = {
  label: string;
  href?: string;
  desc?: string;
  badge?: string;
};

type MegaColumn = {
  heading: string;
  items: MegaItem[];
};

type NavItem = {
  label: string;
  href?: string;
  columns?: MegaColumn[];
};

const NAV: NavItem[] = [
  {
    label: "Why Proton VPN",
    columns: [
      {
        heading: "Why Proton VPN?",
        items: [
          { label: "What is a VPN?", desc: "How a VPN works and when to use one" },
          { label: "Why Proton VPN?", desc: "No logs, no ads, open-source & audited" },
          { label: "All features", desc: "Advanced security & privacy features" },
        ],
      },
      {
        heading: "VPN servers",
        items: [
          { label: "Servers in 140+ countries", desc: "Truly global connectivity" },
          { label: "VPN for Streaming", desc: "Watch what you want, from anywhere" },
          { label: "Countries", desc: "United States · United Kingdom · France" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "What is my IP address?", desc: "Free, safe IP scanner" },
          { label: "Proton VPN Observatory", desc: "Spikes in use for online freedom" },
          { label: "Censorship simulator", desc: "See what a VPN unblocks" },
        ],
      },
    ],
  },
  {
    label: "Services",
    columns: [
      {
        heading: "Services",
        items: [
          { label: "Netflix", desc: "Stream securely from anywhere" },
          { label: "Amazon Prime Video", desc: "Unlock regional libraries" },
          { label: "Disney+", desc: "Watch on your terms" },
        ],
      },
      {
        heading: "Devices",
        items: [
          { label: "Android TV", desc: "Big-screen privacy" },
          { label: "Fire Stick", desc: "Streaming made private" },
          { label: "Apple TV", desc: "Secure your set-top box" },
        ],
      },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Download",
    href: "#devices",
  },
  {
    label: "Resources",
    columns: [
      {
        heading: "Help and support",
        items: [
          { label: "Proton VPN support", desc: "Guides and troubleshooting" },
          { label: "Proton VPN blog", desc: "News and privacy guides" },
        ],
      },
      {
        heading: "Discover Proton",
        items: [
          { label: "Proton ecosystem", desc: "Mail, Calendar, Drive, Pass & more" },
          { label: "Proton for Business", desc: "End-to-end encryption for teams" },
        ],
      },
    ],
  },
];

function MegaPanel({ item }: { item: NavItem }) {
  if (!item.columns) return null;
  return (
    <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-3 group-hover:block">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="w-[680px] rounded-2xl border border-border bg-popover p-3 shadow-card"
      >
        <div className="grid grid-cols-3 gap-2">
          {item.columns.map((col) => (
            <div key={col.heading} className="rounded-xl p-2">
              <p className="px-2 pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {col.heading}
              </p>
              <ul className="space-y-0.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href="#"
                      className="group/item flex flex-col rounded-lg px-2 py-2 transition-colors hover:bg-accent"
                    >
                      <span className="flex items-center gap-1 text-sm font-medium text-ink">
                        {it.label}
                        {it.badge && (
                          <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase text-brand">
                            {it.badge}
                          </span>
                        )}
                      </span>
                      {it.desc && (
                        <span className="text-xs text-muted-foreground">
                          {it.desc}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-border/80 bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-background"
        )}
      >
        <div className="container-proton">
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#" aria-label="Proton VPN home" className="shrink-0">
              <ProtonLogo />
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center lg:flex">
              {NAV.map((item) =>
                item.columns ? (
                  <div
                    key={item.label}
                    className="group relative"
                    onMouseEnter={() => setOpen(item.label)}
                    onMouseLeave={() => setOpen(null)}
                  >
                    <button
                      className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-accent hover:text-ink"
                      aria-expanded={open === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          open === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {open === item.label && <MegaPanel item={item} />}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-accent hover:text-ink"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            <div className="flex items-center gap-2">
              <button className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-accent hover:text-ink sm:flex">
                <Globe className="h-4 w-4" />
                EN
              </button>
              <a
                href="#"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-accent hover:text-ink md:inline-flex"
              >
                Sign in
              </a>
              <a
                href="#pricing"
                className="hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
              >
                Get Proton VPN
              </a>

              {/* Mobile trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background lg:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="top" className="h-[100dvh] w-full p-0">
                  <SheetHeader className="flex-row items-center justify-between border-b border-border px-4 py-3">
                    <SheetTitle className="text-left">
                      <ProtonLogo />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex h-[calc(100dvh-57px)] flex-col">
                    <div className="thin-scrollbar flex-1 overflow-y-auto px-4 py-4">
                      <Accordion type="single" collapsible className="w-full">
                        {NAV.filter((n) => n.columns).map((item) => (
                          <AccordionItem
                            key={item.label}
                            value={item.label}
                            className="border-b border-border"
                          >
                            <AccordionTrigger className="py-3 text-base font-medium text-ink hover:no-underline">
                              {item.label}
                            </AccordionTrigger>
                            <AccordionContent className="pb-3">
                              <div className="space-y-3">
                                {item.columns!.map((col) => (
                                  <div key={col.heading}>
                                    <p className="px-1 pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                                      {col.heading}
                                    </p>
                                    <ul className="space-y-0.5">
                                      {col.items.map((it) => (
                                        <li key={it.label}>
                                          <a
                                            href="#"
                                            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-accent"
                                          >
                                            <span className="font-medium text-ink">
                                              {it.label}
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      {NAV.filter((n) => !n.columns).map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center justify-between border-b border-border py-3 text-base font-medium text-ink"
                        >
                          {item.label}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-border p-4">
                      <a
                        href="#pricing"
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-brand"
                      >
                        Get Proton VPN
                      </a>
                      <a
                        href="#"
                        className="mt-2 flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-ink"
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
