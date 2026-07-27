"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/home/hero-mobile.jpg" />
          <Image
            src="/home/hero.jpg"
            alt="Suits By Roseign — bespoke tailoring, fitted wherever you are across the GTA"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(12,11,10,0.1) 0%, rgba(12,11,10,0.55) 60%, rgba(12,11,10,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,11,10,0.65) 0%, rgba(12,11,10,0.05) 22%, rgba(12,11,10,0.1) 65%, rgba(12,11,10,0.75) 100%)",
          }}
        />
      </motion.div>

      {/* inset frame, echoing the placeholder/editorial framing motif */}
      <div
        className="absolute inset-4 sm:inset-8 lg:inset-12 border border-brass/25 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ marginTop: "-2vh" }}>
        <motion.div
          className="relative"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(169,136,79,0.16) 0%, rgba(169,136,79,0) 70%)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/brand/logo-white.png"
            alt="Suits By Roseign"
            width={320}
            height={320}
            priority
            className="relative w-52 sm:w-64 lg:w-72 h-auto mx-auto drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <motion.p
          className="font-display italic text-2xl sm:text-3xl text-ivory mt-8"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        >
          Effortless elegance, tailored perfection.
        </motion.p>

        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
        >
          <span className="h-px w-8 bg-brass/60" aria-hidden="true" />
          <p className="eyebrow">Mobile fittings across the GTA</p>
          <span className="h-px w-8 bg-brass/60" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
          className="mt-10"
        >
          <Link
            href="/book"
            className="inline-flex items-center border border-brass px-10 py-4 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
          >
            Book a fitting
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
