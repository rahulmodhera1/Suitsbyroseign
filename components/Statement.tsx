"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Lines are revealed one after another, each wiping in from the left —
 *  the same "written" gesture the hero wordmark uses. */
const LINES = [
  { text: "A suit that fits", emphasis: false },
  { text: "is not a luxury.", emphasis: true },
  { text: "It is the baseline.", emphasis: false },
];

export default function Statement() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative px-6 lg:px-24 overflow-hidden"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] max-w-[120vw] max-h-[120vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,243,241,0.07) 0%, rgba(243,243,241,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {LINES.map((line, i) => (
          <div key={line.text} className="overflow-hidden">
            <motion.p
              className={`font-display leading-[1.02] text-center ${
                line.emphasis ? "italic text-ivory" : "font-bold text-ivory"
              }`}
              style={{
                fontSize: "clamp(2.25rem, 7.5vw, 6rem)",
                letterSpacing: "-0.015em",
              }}
              initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, delay: i * 0.18, ease: EASE_OUT }}
            >
              {line.text}
            </motion.p>
          </div>
        ))}

        <motion.div
          className="flex items-center justify-center gap-6 mt-14"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
          aria-hidden="true"
        >
          <span className="h-px w-16 sm:w-28 bg-ivory/30" />
          <span className="h-1.5 w-1.5 rotate-45 bg-ivory/50" />
          <span className="h-px w-16 sm:w-28 bg-ivory/30" />
        </motion.div>

        <motion.p
          className="text-body font-light text-ivory/70 measure mx-auto text-center mt-14 leading-relaxed"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE_OUT }}
        >
          You should not have to drive across the city to get one. The cloth, the cut and the
          fitting come to you — wherever the day takes place.
        </motion.p>
      </div>
    </section>
  );
}
