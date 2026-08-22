import type { Metadata } from "next";
import PolicyPage from "@/components/policy/policy-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Refund Policy | Chitra Tap",
  description: "Chitra Tap refund and return policy, provided by ChitraTech.",
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  return <PolicyPage slug="refund-policy" title="Refund Policy" />;
}
