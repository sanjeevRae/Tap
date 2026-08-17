"use client";

import { useEffect, useRef, useState } from "react";

/** Returns true once the element has entered the viewport. */
export function useInView<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.18 }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const once = (options as { once?: boolean }).once ?? true;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

/** Count up to a target number when in view. */
export function useCountUp(target: number, duration = 1600) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { ref, val };
}
