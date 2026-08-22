"use client";

import * as React from "react";
import { ChevronDown, ListTree } from "lucide-react";
import type { NumberedSection } from "@/lib/policies";

function flattenToc(tree: NumberedSection[]): NumberedSection[] {
  return tree.flatMap((s) => [s, ...flattenToc(s.children)]);
}

export function PolicyToc({ tree }: { tree: NumberedSection[] }) {
  const items = flattenToc(tree);
  const [active, setActive] = React.useState<string>("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Active-section highlighting via scroll position
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    items.forEach((s) => {
      const el = document.getElementById(s.anchorId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  function scrollTo(anchorId: string) {
    const el = document.getElementById(anchorId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileOpen(false);
  }

  const list = (
    <ul className="space-y-0.5">
      {items.map((s) => {
        const depth = s.number.includes(".") ? 1 : 0;
        return (
          <li key={s.anchorId}>
            <button
              onClick={() => scrollTo(s.anchorId)}
              type="button"
              className={`flex w-full items-baseline gap-2 rounded-md px-2 py-1.5 text-left text-[0.8rem] transition ${
                active === s.anchorId
                  ? "bg-neutral-100 font-medium text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
              }`}
              style={{ paddingLeft: `${8 + depth * 16}px` }}
            >
              <span className="shrink-0 tabular-nums text-neutral-400">{s.number}</span>
              <span className="truncate">{s.title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <ListTree className="h-3.5 w-3.5" /> Contents
          </p>
          {list}
        </div>
      </aside>

      {/* Mobile collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2"><ListTree className="h-4 w-4 text-neutral-400" /> Table of Contents</span>
          <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen ? <div className="mt-2 rounded-lg border border-neutral-200 bg-white p-2">{list}</div> : null}
      </div>
    </>
  );
}
