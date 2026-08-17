"use client";

import { cn } from "@/lib/utils";

export function ProtonLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 36 36"
        className="h-7 w-7"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          <linearGradient id="proton-logo-g" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#8b6dff" />
            <stop offset="100%" stopColor="#6d4aff" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="9" fill="url(#proton-logo-g)" />
        <path
          d="M11 12.5h7.2c3.9 0 6.6 2.1 6.6 5.4 0 3.4-2.7 5.6-6.7 5.6H15V25h-4V12.5Zm6.8 7.6c1.6 0 2.8-.8 2.8-2.2 0-1.4-1.2-2.1-2.8-2.1H15v4.3h2.8Z"
          fill="#fff"
        />
        <circle cx="25.5" cy="24.5" r="1.6" fill="#fff" />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
        Proton<span className="text-brand"> VPN</span>
      </span>
    </span>
  );
}
