"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import testimonials from "@/content/testimonials.json";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const current = testimonials[index];

  return (
    <section
      data-rail-section="Testimonials"
      className="px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <div className="max-w-3xl mx-auto text-center min-h-[260px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-display italic text-2xl sm:text-3xl leading-relaxed text-ivory">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="eyebrow mt-8">
              {current.name} &middot; {current.occasion}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-12" role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-6 transition-colors duration-300 ${
                i === index ? "bg-brass" : "bg-ivory/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
