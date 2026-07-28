"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We come to your home, your office, or wherever suits you, and talk through the occasion, the silhouette and the timeline.",
    where: "At your place",
  },
  {
    n: "02",
    title: "Cloth & Cut",
    body: "Swatches in hand, in your own light, so the cloth you choose is the cloth you get.",
    where: "At your place",
  },
  {
    n: "03",
    title: "Measurement",
    body: "A precise, unhurried fitting in the space where you're comfortable. Every measurement taken twice.",
    where: "At your place",
  },
  {
    n: "04",
    title: "Construction",
    body: "Your garment is cut and built by hand, then checked against your measurements before it leaves the bench.",
    where: "In the workroom",
  },
  {
    n: "05",
    title: "Fitting",
    body: "A first fitting to check drape, break and proportion, adjusted until it sits right on you.",
    where: "At your place",
  },
  {
    n: "06",
    title: "Delivery",
    body: "The finished piece, delivered and fitted a final time wherever the day is — including the morning of.",
    where: "Home or venue",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="scroll-mt-24 lg:scroll-mt-32 bg-paper text-ink px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <div className="max-w-[1800px] mx-auto lg:grid lg:grid-cols-[320px_1fr] lg:gap-16 xl:gap-24">
      <Reveal className="mb-14 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
        <p className="eyebrow !text-ink/50">The mobile studio</p>
        <h2
          className="font-display font-bold mt-4 mb-6 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 3.6vw, 3.75rem)" }}
        >
          We Come To You
        </h2>
        <p className="text-body font-light text-ink/60 leading-relaxed max-w-sm">
          The whole commission happens wherever you are — home, office, or venue. No showroom
          visits, no lost afternoons.
        </p>
      </Reveal>

      <div ref={containerRef} className="relative">
        <div
          className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-ink/12"
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-ink origin-top"
          style={{ scaleY: lineScale }}
          aria-hidden="true"
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            className="group relative flex gap-6 sm:gap-10 pb-16 last:pb-0"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_OUT }}
          >
            <span className="relative z-10 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-paper border border-ink/25 flex items-center justify-center font-display text-sm sm:text-base tabular-nums transition-colors duration-500 group-hover:border-ink">
              {step.n}
            </span>

            <div className="flex-1 pt-1 sm:pt-2 transition-transform duration-500 group-hover:translate-x-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-3">
                <h3
                  className="font-display font-bold leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}
                >
                  {step.title}
                </h3>
                <span className="eyebrow !text-ink/40">{step.where}</span>
              </div>
              <p className="text-body font-light text-ink/65 leading-relaxed max-w-xl">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
