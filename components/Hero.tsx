"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center py-32">
      {/* atmospheric ground — no competing photography, the logo is the image */}
      <div className="absolute inset-0 bg-ink" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 46%, rgba(26,21,16,0.9) 0%, rgba(12,11,10,1) 70%)",
          }}
        />
      </div>

      {/* inset frame, echoing the placeholder/editorial framing motif */}
      <div
        className="absolute inset-4 sm:inset-8 lg:inset-12 border border-brass/25 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          className="relative"
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: "min(80vw, 900px)",
              height: "min(80vw, 900px)",
              background:
                "radial-gradient(circle, rgba(169,136,79,0.2) 0%, rgba(169,136,79,0) 68%)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/brand/logo-white.png"
            alt="Suits By Roseign — Suits By Roseign, Exceptional Threads"
            width={1080}
            height={1080}
            priority
            className="relative h-auto mx-auto drop-shadow-[0_4px_40px_rgba(0,0,0,0.55)]"
            style={{ width: "min(62vw, 560px)", minWidth: "260px" }}
          />
        </motion.div>

        <motion.p
          className="font-display italic text-2xl sm:text-3xl text-ivory mt-2 sm:mt-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
        >
          Effortless elegance, tailored perfection.
        </motion.p>

        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        >
          <span className="h-px w-8 bg-brass/60" aria-hidden="true" />
          <p className="eyebrow">Mobile fittings across the GTA</p>
          <span className="h-px w-8 bg-brass/60" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
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
