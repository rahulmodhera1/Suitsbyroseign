"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import { CALENDLY_URL } from "@/lib/site";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center py-32">
      <div className="absolute inset-0 bg-ink" aria-hidden="true">
        {reduced ? (
          // Reduced motion: the settled final frame, no playback at all.
          <Image
            src="/home/hero-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          // A purpose-cut loop: it runs continuously rather than playing once
          // and freezing, so the hero never settles into a still frame.
          <video
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/home/HERO_LOOP.mp4"
            poster="/home/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        )}
        {/* layered vignette so the wordmark and copy stay legible over motion */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 50% 46%, rgba(12,11,10,0.32) 0%, rgba(12,11,10,0.66) 68%, rgba(12,11,10,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,11,10,0.7) 0%, rgba(12,11,10,0.05) 24%, rgba(12,11,10,0.1) 62%, rgba(12,11,10,0.8) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <Wordmark reduced={!!reduced} />

        <motion.p
          className="font-display italic text-ivory mt-8"
          style={{ letterSpacing: "-0.01em", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.9, ease: EASE_OUT }}
        >
          Effortless Elegance, Tailored Perfection.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-12"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.1, ease: EASE_OUT }}
        >
          <Button href={CALENDLY_URL} external>
            Book a fitting
          </Button>

          <Button href="#work" variant="outline">
            View our work
          </Button>
        </motion.div>

        <motion.p
          className="eyebrow mt-9 !text-sm"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.3, ease: EASE_OUT }}
        >
          Toronto, Canada
        </motion.p>
      </div>
    </section>
  );
}

/**
 * The wordmark, set live in type rather than the logo image — "SUITS BY" in
 * the geometric sans, "ROSEIGN" in the high-contrast display serif, each
 * line revealed left to right like ink being laid down, one line after
 * the other. No bounce, no scale, no separate flourish — just the name
 * being written.
 */
function Wordmark({ reduced }: { reduced: boolean }) {
  return (
    <h1 className="relative">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "min(70vw, 760px)",
          height: "min(70vw, 760px)",
          background: "radial-gradient(circle, rgba(243,243,241,0.14) 0%, rgba(243,243,241,0) 68%)",
        }}
        aria-hidden="true"
      />

      <div className="overflow-hidden">
        <motion.span
          className="block font-sans font-bold uppercase text-ivory"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
            letterSpacing: "0.5em",
            textIndent: "0.5em",
          }}
          initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
        >
          Suits By
        </motion.span>
      </div>

      <div className="overflow-hidden mt-2 sm:mt-3">
        <motion.span
          className="block font-display font-extrabold uppercase text-ivory leading-none"
          style={{
            fontSize: "clamp(4.5rem, 17vw, 13rem)",
            letterSpacing: "-0.01em",
          }}
          initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.1, delay: 0.6, ease: EASE_OUT }}
        >
          Roseign
        </motion.span>
      </div>

      <span className="sr-only"> — Bespoke Tailoring Across the GTA</span>
    </h1>
  );
}
