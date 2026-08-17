import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Plan = {
  id: string;
  name: string;
  monthly: number; // base monthly price USD
  tagline: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  accent: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Proton Free",
    monthly: 0,
    tagline: "Security and privacy for everyone",
    features: [
      "Secure 1 device at a time",
      "Medium VPN speed",
      "Connect to servers in 5 countries (randomly selected)",
      "No ads",
      "No data limits",
      "Strict no-logs policy",
    ],
    cta: "Get Proton Free",
    accent: "#5a5868",
  },
  {
    id: "plus",
    name: "VPN Plus",
    monthly: 9.99,
    tagline: "Advanced features and fastest speeds",
    features: [
      "Secure 10 devices at a time",
      "Highest VPN speed",
      "Choose from 20,000+ servers in 140+ countries",
      "Stream your favorite TV shows and movies",
      "Block ads, trackers, and malware",
      "Priority support and live chat",
    ],
    highlight: true,
    cta: "Get VPN Plus",
    accent: "#6d4aff",
  },
  {
    id: "unlimited",
    name: "Proton Unlimited",
    monthly: 12.99,
    tagline: "Access all premium Proton products",
    features: [
      "Everything in VPN Plus",
      "Proton Pass — encrypted password manager",
      "Proton Mail — 500 GB encrypted storage",
      "Proton Calendar — 25 encrypted calendars",
      "Proton Drive — secure cloud storage",
      "Proton Meet — confidential video calls",
    ],
    cta: "Get Proton Unlimited",
    accent: "#2bb4ff",
  },
];

const rates: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  CHF: { symbol: "CHF", rate: 0.88 },
};

const cycles: Record<string, number> = { "1": 1, "12": 12, "24": 24 };
const discounts: Record<string, number> = { "1": 0, "12": 0.33, "24": 0.5 };

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const cycle = cycles[sp.get("cycle") ?? "1"] ?? 1;
  const discount = discounts[sp.get("cycle") ?? "1"] ?? 0;
  const currency = sp.get("currency") ?? "USD";
  const r = rates[currency] ?? rates.USD;

  const data = plans.map((p) => {
    const rawMonthly = p.monthly * (1 - discount);
    const billed = rawMonthly * cycle;
    const monthly = rawMonthly * r.rate;
    return {
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      features: p.features,
      highlight: p.highlight,
      cta: p.cta,
      accent: p.accent,
      currency,
      symbol: r.symbol,
      monthly: Number(monthly.toFixed(2)),
      billed: Number((billed * r.rate).toFixed(2)),
      cycle,
      discount: Math.round(discount * 100),
      isFree: p.monthly === 0,
    };
  });

  return NextResponse.json({ plans: data });
}
