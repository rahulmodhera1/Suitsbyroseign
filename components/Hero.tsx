"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      data-rail-section="Hero"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-center justify-center"
    >
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
            alt="Groom in tailored formalwear, styled on location for a Toronto wedding"
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
              "radial-gradient(ellipse at center, rgba(12,11,10,0.15) 0%, rgba(12,11,10,0.55) 65%, rgba(12,11,10,0.85) 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ marginTop: "-4vh" }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <Image
            src="/brand/logo-white.png"
            alt="Suits By Roseign"
            width={220}
            height={220}
            priority
            className="w-40 sm:w-48 h-auto mx-auto"
          />
        </motion.div>

        <motion.p
          className="font-display italic text-xl sm:text-2xl text-ivory mt-6"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        >
          Effortless elegance, tailored perfection.
        </motion.p>

        <motion.p
          className="eyebrow mt-10"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
        >
          Mobile fittings across the GTA
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          className="mt-8"
        >
          <Link
            href="/book"
            className="inline-flex items-center border border-brass px-9 py-3.5 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
          >
            Book a fitting
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
