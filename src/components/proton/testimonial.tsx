"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useInView } from "./use-in-view";

type Testimonial = {
  name: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Jeevan Tamang",
    date: "June 2, 2026",
    rating: 4,
    title: "Good choice!",
    text: "Easy to set up and makes our business look more professional.",
  },
  {
    name: "Sita Sharma",
    date: "June 13, 2026",
    rating: 5,
    title: "Best decision for my cafe",
    text: "Since adding the Chitra Tap at our counter, customers check our menu, reviews and socials instantly. No more printing new menus.",
  },
  {
    name: "Anish Gurung",
    date: "July 21, 2026",
    rating: 5,
    title: "Simple and professional",
    text: "Setup took minutes. Updating my business hours and links anytime is the best part my printed QR never goes out of date.",
  },
  {
    name: "Priya Maharjan",
    date: "August 8, 2026",
    rating: 5,
    title: "Customers love it",
    text: "The stand looks premium on our reception desk and guests scan it all the time. Support was quick too.",
  },
  {
    name: "Bikash Thapa",
    date: "August 17, 2026",
    rating: 4,
    title: "Worth every rupee",
    text: "One place for my contacts, location and reviews. I stopped carrying paper cards completely.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-[#f6b51e] text-[#f6b51e]" : "fill-[#e8e2d9] text-[#e8e2d9]"}`}
        />
      ))}
    </div>
  );
}

const VISIBLE = 3;

export function Testimonial() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [page, setPage] = React.useState(0);
  const pages = Math.ceil(testimonials.length / VISIBLE);

  function prev() { setPage((p) => (p - 1 + pages) % pages); }
  function next() { setPage((p) => (p + 1) % pages); }

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-proton" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Testimonials</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[#2c1a7a] sm:text-4xl lg:text-[2.5rem]">
            Loved by businesses like yours
          </h2>
          <p className="mt-4 text-base leading-7 text-[#6a7280]">
            Hear what owners say about putting their business one tap away.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5"
        >
          {/* Mobile nav row (top) */}
          <div className="flex items-center justify-between sm:hidden">
            <button
              onClick={prev}
              type="button"
              aria-label="Previous testimonials"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#e7e2d9] bg-white text-[#171421] transition active:scale-95 active:bg-[#1d4ed8] active:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-[#1d4ed8]" : "w-1.5 bg-[#ddd6cb] hover:bg-[#c4bbae]"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              type="button"
              aria-label="Next testimonials"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#e7e2d9] bg-white text-[#171421] transition active:scale-95 active:bg-[#1d4ed8] active:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop prev button */}
          <button
            onClick={prev}
            type="button"
            aria-label="Previous testimonials"
            className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e7e2d9] bg-white text-[#171421] transition hover:border-[#1d4ed8] hover:bg-[#1d4ed8] hover:text-white active:scale-95 sm:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {testimonials.map((t) => (
                <article key={t.name} className="w-1/2 shrink-0 px-1.5 sm:w-1/3 sm:px-2">
                  <div className="rounded-xl border border-[#eeeae2] bg-white p-3.5 shadow-[0_6px_20px_rgba(34,28,54,0.05)] sm:p-5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {t.avatar ? (
                        <img src={t.avatar} alt="" className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11" />
                      ) : (
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dbeafe] text-xs font-bold text-[#1d4ed8] sm:h-11 sm:w-11 sm:text-sm">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-[0.8rem] font-bold tracking-tight text-[#171421] sm:text-sm">{t.name}</p>
                        <p className="truncate text-[0.65rem] text-[#9aa1ab] sm:text-xs">{t.date}</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <Stars count={t.rating} />
                      <h3 className="mt-1.5 text-[0.8rem] font-bold leading-snug text-[#171421] sm:mt-2 sm:text-base">{t.title}</h3>
                      <p className="mt-1 line-clamp-3 text-[0.72rem] leading-[1.15rem] text-[#3f3948] sm:line-clamp-2 sm:text-sm sm:leading-6">{t.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Desktop next button */}
          <button
            onClick={next}
            type="button"
            aria-label="Next testimonials"
            className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e7e2d9] bg-white text-[#171421] transition hover:border-[#1d4ed8] hover:bg-[#1d4ed8] hover:text-white active:scale-95 sm:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* Desktop dots */}
        <div className="mt-6 hidden justify-center gap-2 sm:flex">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-[#1d4ed8]" : "w-1.5 bg-[#ddd6cb] hover:bg-[#c4bbae]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
