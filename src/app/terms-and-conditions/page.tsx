import type { Metadata } from "next";
import PolicyPage from "@/components/policy/policy-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terms & Conditions | Chitra Tap",
  description: "The terms governing your use of Chitra Tap, a product of ChitraTech.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function Page() {
  return <PolicyPage slug="terms-and-conditions" title="Terms & Conditions" />;
}
