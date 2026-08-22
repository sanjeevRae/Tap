"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function WhatsappWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const shouldHide =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/t/");

  useEffect(() => {
    document
      .querySelectorAll(
        "[class*='wa-widget'], [id*='wa-widget'], .free-wa-widget"
      )
      .forEach((el) => el.remove());
  }, []);

  if (shouldHide) return null;

  return (
    <>
      <button
        id="wa-launcher"
        aria-label="Open WhatsApp chat"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="#fff">
          <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.8L.5 31.5l7.9-2c2.3 1.2 4.9 1.9 7.6 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5C3.9 20.7 3.3 18.4 3.3 16 3.3 9 9 3.3 16 3.3S28.7 9 28.7 16 23 28.8 16 28.8zm7.1-9.4c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-1 .5-.3.4-1.3 1.3-1.3 3.1 0 1.8 1.3 3.6 1.5 3.8.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z" />
        </svg>
        <span id="wa-dot" />
      </button>
      <div id="wa-chat" className={open ? "open" : ""}>
        <div id="wa-header">
          <img
            src="https://chitratech.com.np/logo-transparent.png"
            alt="Chitra Tech"
            id="wa-avatar"
          />
          <div>
            <div id="wa-name">Chitra Tech</div>
            <div id="wa-status">
              <span className="wa-online-dot" /> Online
            </div>
          </div>
          <button id="wa-close" aria-label="Close" onClick={() => setOpen(false)}>
            &times;
          </button>
        </div>
        <div id="wa-body">
          <div id="wa-bubble">
            <p style={{ margin: "0 0 6px", fontWeight: 600 }}>
              Welcome to Chitra Tech!
            </p>
            <p style={{ margin: 0 }}>
              Thank you for contacting us. How can we help you today?
            </p>
            <span id="wa-time">{time}</span>
          </div>
        </div>
        <div id="wa-footer">
          <a
            id="wa-cta"
            href="https://wa.me/9779712039906"
            target="_blank"
            rel="noopener"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
