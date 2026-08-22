"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

export function openRequestForm() {
  window.dispatchEvent(new Event("open-request-form"));
}

export function RequestForm() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-request-form", onOpen);
    return () => window.removeEventListener("open-request-form", onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    // Radix Sheet/Dialog can leave pointer-events disabled on body when the
    // form is opened from the mobile menu — restore them so the form is clickable.
    document.body.style.pointerEvents = "auto";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send request");
      }

      setStatus("sent");
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      <button
        type="button"
        aria-label="Close request form"
        className="absolute inset-0 cursor-default bg-white/35 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <aside className="relative z-10 flex h-full w-full max-w-[820px] flex-col overflow-hidden border-l border-border bg-white shadow-[-24px_0_60px_rgba(28,27,41,0.14)]">
        <div className="px-5 pb-4 pt-5 sm:px-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <span className="inline-flex rounded-full bg-[#eef4fb] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#16458d]">
                Let's Talk
              </span>
              <h2 className="mt-3 max-w-xl text-pretty font-sans text-2xl font-semibold leading-[1.05] text-[#151515] sm:text-3xl">
                Ready to take your business digital?
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-[#5f6b7a] sm:text-sm">
                Tell us what you need, how many stands you're interested in, or any questions you have about ChitraTap.
              </p>
            </div>

            <button
              type="button"
              aria-label="Close"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3f3f5] text-[#151515] transition-colors hover:bg-[#e9e9ed]"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form
          onSubmit={submitForm}
          className="flex min-h-0 flex-1 flex-col border-t border-[#edf0f4] px-5 py-5 sm:px-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-xs font-semibold text-[#202124]">
              <span>Name & Company</span>
              <input
                required
                value={form.name}
                onChange={updateField("name")}
                placeholder="Ram from AppleStore"
                className="h-11 w-full rounded-2xl border border-[#dde4ee] bg-[#f7f8fa] px-4 text-xs font-semibold text-[#202124] outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
              />
            </label>

            <label className="space-y-2 text-xs font-semibold text-[#202124]">
              <span>Your Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={updateField("email")}
                placeholder="ram@applestore.com"
                className="h-11 w-full rounded-2xl border border-[#dde4ee] bg-[#f7f8fa] px-4 text-xs font-semibold text-[#202124] outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
              />
            </label>
          </div>

          <label className="mt-5 flex min-h-0 flex-1 flex-col space-y-2 text-xs font-semibold text-[#202124]">
            <span>Tell us more about your project</span>
            <textarea
              required
              value={form.message}
              onChange={updateField("message")}
              placeholder="Something about your great idea"
              className="min-h-[120px] flex-1 resize-none rounded-2xl border border-[#dde4ee] bg-[#f7f8fa] px-4 py-4 text-xs font-semibold text-[#202124] outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
            />
          </label>

          <div className="mt-5 flex flex-col gap-4 border-t border-[#edf0f4] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium text-[#9aa6b8] sm:text-xs">
              Our Email{" "}
              <a
                href="mailto:info@chitratech.com"
                className="font-semibold underline underline-offset-2"
              >
                info@chitratech.com
              </a>
            </p>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-11 min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#222222] px-5 text-xs font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Submitting..." : "Submit the request"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {status === "sent" && (
                <p className="text-sm font-semibold text-[#188038]">
                  Request sent. We will contact you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-semibold text-destructive">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}
