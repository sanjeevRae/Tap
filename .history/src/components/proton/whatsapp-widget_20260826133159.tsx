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

    const SRC =
      "https://chitra-ai-backend-p6ex.onrender.com/widget.js?org=e37e6fef-c42b-4214-b4b7-c0910f7157da";

    // Backend widget.js has a bug: /**...**/g starts a block comment -> "g is not defined".
    // Fetch the script, patch the broken regexes, then run it.
    const loadWidget = async () => {
      try {
        const res = await fetch(SRC);
        let code = await res.text();
        code = code
          .replace(
            "/**([^*]+)**/g",
            "/\\*\\*([^*]+)\\*\\*/g"
          )
          .replace(
            "/(^|[^*])*([^*]+)*/g",
            "/(^|[^*])\\*([^*]+)\\*/g"
          );
        const script = document.createElement("script");
        script.textContent = code;
        document.body.appendChild(script);
      } catch {
        // Fallback: load raw script if fetching fails
        const script = document.createElement("script");
        script.src = SRC;
        script.defer = true;
        document.body.appendChild(script);
      }
    };
    loadWidget();

    return () => {
      // Clean up any DOM the widget injected
      document
        .querySelectorAll(
          "[class*='chitra'], [id*='chitra'], [src*='ai-widget']"
        )
        .forEach((el) => el.remove());
    };
  }, [shouldHide]);

  if (shouldHide) return null;

  return null;
}
