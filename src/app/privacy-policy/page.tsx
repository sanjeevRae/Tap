import type { Metadata } from "next";
import PolicyPage from "@/components/policy/policy-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy | Chitra Tap",
  description: "How ChitraTech collects, uses, and protects your information when you use Chitra Tap.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PolicyPage slug="privacy-policy" title="Privacy Policy" />;
}
