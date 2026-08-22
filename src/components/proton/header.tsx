"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { ProtonLogo } from "./logo";
import { openRequestForm } from "./request-form";

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
  action?: "contact" | "external";
  externalUrl?: string;
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
    label: "Why ChitraTap",
    columns: [
      {
        heading: "Why ChitraTap?",
        items: [
          {
            label: "What is ChitraTap?",
            desc: "Discover how NFC and QR make your business easier to find",
            href: "#hero",
          },
          {
            label: "Why ChitraTap?",
            desc: "Connect customers to your business with one simple tap",
            href: "#why",
          },
          {
            label: "All features",
            desc: "Explore everything included with ChitraTap",
            href: "#compare",
          },
        ],
      },
      {
        heading: "How it works",
        items: [
          {
            label: "NFC & QR",
            desc: "Tap or scan to open your digital business profile",
          },
          {
            label: "Digital business profile",
            desc: "Show your business information in one place",
          },
          {
            label: "Dashboard",
            desc: "Manage and update your information anytime",
          },
        ],
      },
      {
        heading: "Discover",
        items: [
          {
            label: "Google Maps",
            desc: "Help customers find your business easily",
            href: "#ecosystem",
          },
          {
            label: "Google reviews",
            desc: "Show your business rating and reviews",
            href: "#ecosystem",
          },
          {
            label: "Social media",
            desc: "Connect customers to your online presence",
            href: "#ecosystem",
          },
        ],
      },
    ],
  },

  {
    label: "Features",
    columns: [
      {
        heading: "Business profile",
        items: [
          {
            label: "Business information",
            desc: "Display your essential business details",
            href: "#ecosystem",
          },
          {
            label: "Contact details",
            desc: "Let customers quickly call or contact you",
            href: "#ecosystem",
          },
          {
            label: "Opening hours",
            desc: "Show customers when you're open",
            href: "#ecosystem",
          },
        ],
      },
      {
        heading: "Online presence",
        items: [
          {
            label: "Social media",
            desc: "Connect Facebook, Instagram, TikTok and more",
            href: "#ecosystem",
          },
          {
            label: "Google Maps",
            desc: "Show your exact business location",
            href: "#ecosystem",
          },
          {
            label: "Google reviews",
            desc: "Highlight your existing business reputation",
            href: "#ecosystem",
          },
        ],
      },
      {
        heading: "Connections",
        items: [
          {
            label: "NFC tap",
            desc: "Instant access with a simple tap",
            href: "#expose",
          },
          {
            label: "QR code",
            desc: "Scan and open your profile instantly",
            href: "#expose",
          },
          {
            label: "Customer insights",
            desc: "Understand how customers interact with your profile",
            href: "#expose",
          },
        ],
      },
    ],
  },

  {
    label: "For Business",
    columns: [
      {
        heading: "Business types",
        items: [
          {
            label: "Restaurants & Cafes",
            desc: "Perfect for menus, locations and reviews",
          },
          {
            label: "Hotels & Hospitality",
            desc: "Connect guests with your digital information",
          },
          {
            label: "Retail & Shops",
            desc: "Make your business easier to discover",
          },
        ],
      },
      {
        heading: "Professional services",
        items: [
          {
            label: "Salons & Beauty",
            desc: "Show services, contact details and socials",
          },
          {
            label: "Offices & Companies",
            desc: "Create a professional digital presence",
          },
          {
            label: "Freelancers",
            desc: "Share your professional information instantly",
          },
        ],
      },
    ],
  },

  {
    label: "Resources",
    columns: [
      {
        heading: "Help & support",
        items: [
          {
            label: "ChitraTap Support",
            desc: "Get help and find useful guides",
          },
          {
            label: "Getting started",
            desc: "Learn how to set up your ChitraTap",
          },
          {
            label: "Contact us",
            desc: "Talk to the ChitraTech team",
            action: "contact",
          },
        ],
      },
      {
        heading: "Discover ChitraTech",
        items: [
          {
            label: "About ChitraTech",
            desc: "Learn more about the company behind ChitraTap",
            action: "external",
            externalUrl: "https://chitratech.com.np/",
          },
          {
            label: "ChitraTech website",
            desc: "Explore our other technology solutions",
            action: "external",
            externalUrl: "https://chitratech.com.np/",
          },
        ],
      },
    ],
  },
];

function handleItemClick(it: MegaItem, event: React.MouseEvent) {
  if (it.action === "contact") {
    event.preventDefault();
    openRequestForm();
  } else if (it.action === "external" && it.externalUrl) {
    event.preventDefault();
    window.open(it.externalUrl, "_blank", "noopener");
  }
}

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
        <div
          className={cn(
            "grid gap-2",
            item.columns.length >= 3 ? "grid-cols-3" : "grid-cols-2"
          )}
        >
          {item.columns.map((col) => (
            <div key={col.heading} className="rounded-xl p-2">
              <p className="px-2 pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {col.heading}
              </p>

              <ul className="space-y-0.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href || "#"}
                      onClick={(e) => handleItemClick(it, e)}
                      className="group/item flex flex-col rounded-lg px-2 py-2 transition-colors hover:bg-accent"
                    >
                      <span className="flex items-center gap-1 text-sm font-medium text-[#2c1a7a]">
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

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

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
            {/* Logo */}
            <a
              href="#"
              aria-label="ChitraTap home"
              className="shrink-0"
            >
              <ProtonLogo />
            </a>

            {/* Desktop Navigation */}
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
                      type="button"
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#2c1a7a] transition-colors hover:bg-accent hover:text-[#2c1a7a]"
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
                    className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#2c1a7a] transition-colors hover:bg-accent hover:text-[#2c1a7a]"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href="/login"
                className="hidden rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#2c1a7a] transition-colors hover:bg-accent md:inline-flex"
              >
                Login
              </a>

              <button
                type="button"
                onClick={openRequestForm}
                className="hidden items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-[13px] font-semibold text-brand-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
              >
                Contact Us
              </button>

              {/* Mobile trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background lg:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="top"
                  className="h-[100dvh] w-full p-0"
                >
                  <SheetHeader className="flex-row items-center justify-between border-b border-border px-4 py-3">
                    <SheetTitle className="text-left">
                      <ProtonLogo />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex h-[calc(100dvh-57px)] flex-col">
                    <div className="thin-scrollbar flex-1 overflow-y-auto px-4 py-4">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        {NAV.filter((n) => n.columns).map((item) => (
                          <AccordionItem
                            key={item.label}
                            value={item.label}
                            className="border-b border-border"
                          >
                            <AccordionTrigger className="py-3 text-base font-medium text-[#2c1a7a] hover:no-underline">
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
                                            href={it.href || "#"}
                                            onClick={(e) => handleItemClick(it, e)}
                                            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-accent"
                                          >
                                            <span className="font-medium text-[#2c1a7a]">
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
                          className="flex items-center justify-between border-b border-border py-3 text-base font-medium text-[#2c1a7a]"
                        >
                          {item.label}

                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </div>

                    {/* Mobile buttons */}
                    <div className="border-t border-border p-4">
                      <button
                        type="button"
                        onClick={openRequestForm}
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-brand"
                      >
                        Get Tap Chitra
                      </button>

                      <a
                        href="/login"
                        className="mt-2 flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-[#2c1a7a]"
                      >
                        Login
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
