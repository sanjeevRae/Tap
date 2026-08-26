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

    const BACKEND = "https://chitra-ai-backend-p6ex.onrender.com";

    // Route fetch/XHR calls to the backend through the same-origin proxy
    const originalFetch = window.fetch;
    const patchedFetch: typeof window.fetch = (input, init) => {
      if (typeof input === "string" && input.startsWith(BACKEND)) {
        input = `/ai-backend${input.slice(BACKEND.length)}`;
      } else if (input instanceof Request && input.url.startsWith(BACKEND)) {
        input = new Request(`/ai-backend${input.url.slice(BACKEND.length)}`, input);
      }
      return originalFetch.call(window, input, init);
    };
    window.fetch = patchedFetch;

    // Rewrite any cross-origin backend URLs the widget injects to same-origin proxy
    const rewrite = () => {
      document
        .querySelectorAll(
          `img[src^="${BACKEND}"], link[href^="${BACKEND}"], script[src^="${BACKEND}"]`
        )
        .forEach((el) => {
          const attr = el.hasAttribute("src") ? "src" : "href";
          const url = el.getAttribute(attr);
          if (url && url.startsWith(BACKEND)) {
            el.setAttribute(attr, `/ai-backend${url.slice(BACKEND.length)}`);
          }
        });
    };

    const observer = new MutationObserver(rewrite);
    observer.observe(document.body, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.src = "/ai-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      window.fetch = originalFetch;
      observer.disconnect();
      script.remove();
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
