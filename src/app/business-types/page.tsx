import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, Briefcase, Building2, Laptop, Scissors, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { Header } from "@/components/proton/header";
import { Footer } from "@/components/proton/footer";

export const metadata: Metadata = {
  title: "Business types — Chitra Tap",
  description:
    "Chitra Tap works for every business: restaurants and cafes, hotels, retail shops, professional services, salons, offices and freelancers. See how each one benefits.",
  alternates: { canonical: "/business-types" },
};

const TYPES = [
  {
    id: "restaurants-cafes",
    icon: UtensilsCrossed,
    title: "Restaurants & Cafes",
    tagline: "Perfect for menus, locations and reviews",
    desc: "Put your menu, opening hours, table location and Google reviews one tap away. Guests check the menu and find your place before they even sit down.",
  },
  {
    id: "hotels-hospitality",
    icon: BedDouble,
    title: "Hotels & Hospitality",
    tagline: "Connect guests with your digital information",
    desc: "Add the stand at reception or in every room. Guests instantly see check-in details, amenities, contact numbers and nearby recommendations.",
  },
  {
    id: "retail-shops",
    icon: ShoppingBag,
    title: "Retail & Shops",
    tagline: "Make your business easier to discover",
    desc: "Show your products, social media and store location. Turn foot traffic into followers and repeat customers with a single scan at the counter.",
  },
  {
    id: "professional-services",
    icon: Briefcase,
    title: "Professional services",
    tagline: "Present your services and credentials in one place",
    desc: "Consultants, doctors, lawyers and agencies can share services, qualifications, contact details and booking links with clients in seconds.",
  },
  {
    id: "salons-beauty",
    icon: Scissors,
    title: "Salons & Beauty",
    tagline: "Show services, contact details and socials",
    desc: "Display your services, price list and Instagram portfolio. Clients book by tapping your WhatsApp or calling you directly from the page.",
  },
  {
    id: "offices-companies",
    icon: Building2,
    title: "Offices & Companies",
    tagline: "Create a professional digital presence",
    desc: "Give visitors, partners and new staff one professional page with your company profile, address, contacts and key links.",
  },
  {
    id: "freelancers",
    icon: Laptop,
    title: "Freelancers",
    tagline: "Share your professional information instantly",
    desc: "Your digital business card for meetings and events. Share your portfolio, socials and contact details in one tap, and look professional doing it.",
  },
];

export default function BusinessTypesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-20 md:px-10">
        <div className="pb-4 pt-20">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">Business types</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#2c1a7a]">Made for every kind of business</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Chitra Tap adapts to how your customers find you. Pick your business type to see what it can do for you.
          </p>
        </div>
        <div className="grid gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((type) => (
            <section key={type.id} id={type.id} className="scroll-mt-24">
              {/* IMAGE AREA - put your image here. Example:
                  <img src="/images/restaurants.jpg" alt="Restaurants & Cafes" className="h-full w-full object-cover" /> */}
              <div className="relative h-64 overflow-hidden rounded-xl bg-secondary md:h-72">
                <div className="grid h-full place-items-center gap-2 text-brand/30">
                  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span className="text-xs font-medium text-brand/50">Add image</span>
                </div>
              </div>
              {/* Overlapping content card */}
              <div className="relative z-10 mx-auto -mt-24 w-[88%] rounded-xl border border-border bg-card px-6 pb-8 pt-12 text-center shadow-[0_18px_40px_-12px_rgba(28,27,41,0.18)]">
                <span className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-brand text-white shadow-brand ring-4 ring-white">
                  <type.icon className="h-6 w-6" />
                </span>
                <h2 className="font-display text-2xl font-semibold text-[#2c1a7a]">{type.title}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand">{type.tagline}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{type.desc}</p>
              </div>
            </section>
          ))}
        </div>
        
      </main>
      <Footer />
    </div>
  );
}