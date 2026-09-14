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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((type) => (
            <section key={type.id} id={type.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand">
                <type.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-[#2c1a7a]">{type.title}</h2>
              <p className="mt-1 text-sm font-semibold text-ink">{type.tagline}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{type.desc}</p>
            </section>
          ))}
        </div>
        <section className="mt-16 overflow-hidden rounded-3xl bg-brand px-6 py-16 text-center shadow-brand sm:px-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-foreground/70">Get started</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-brand-foreground sm:text-4xl">
            Whatever your business, one tap is all it takes
          </h2>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.95rem] font-semibold text-[#2c1a7a] shadow-lg transition hover:-translate-y-0.5"
          >
            Get your Chitra Tap
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}