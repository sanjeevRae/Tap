"use client";

import { cn } from "@/lib/utils";

export function ProtonLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src="/logo.svg"
        alt="ChitraTap"
        className="h-12 w-12"
      />

      <span className="text-[1.05rem] font-semibold tracking-tight text-[#471dce]">
        Chitra<span className="text-brand">Tap</span>
      </span>
    </span>
  );
}