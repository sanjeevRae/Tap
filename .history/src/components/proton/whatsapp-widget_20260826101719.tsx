"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function WhatsappWidget() {
  const pathname = usePathname();

  const shouldHide =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/t/");

  useEffect(() => {
    if (shouldHide) return;

    const src =
      "https://chitra-ai-backend-p6ex.onrender.com/widget.js?org=e37e6fef-c42b-4214-b4b7-c0910f7157da";

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      // Clean up any DOM the widget injected
      document
        .querySelectorAll(
          "[class*='chitra'], [id*='chitra'], [src*='chitra-ai-backend']"
        )
        .forEach((el) => el.remove());
    };
  }, [shouldHide]);

  if (shouldHide) return null;

  return null;
}
