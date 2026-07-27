"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    // Plays once; without a loop attribute the browser already holds the
    // last frame on end, but some browsers briefly blank out — nudging
    // currentTime back onto the final frame keeps it visibly frozen there.
    const holdLastFrame = () => {
      video.currentTime = Math.max(0, video.duration - 0.05);
    };
    video.addEventListener("ended", holdLastFrame);
    return () => video.removeEventListener("ended", holdLastFrame);
  }, [reduced]);

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
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/home/Suit_hero_animation.mp4"
            poster="/home/hero-poster.jpg"
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        )}
        {/* layered vignette so the logo and copy stay legible over motion */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 50% 46%, rgba(12,11,10,0.28) 0%, rgba(12,11,10,0.62) 68%, rgba(12,11,10,0.88) 100%)",
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
        <motion.div
          className="relative"
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: "min(60vw, 640px)",
              height: "min(60vw, 640px)",
              background:
                "radial-gradient(circle, rgba(243,243,241,0.14) 0%, rgba(243,243,241,0) 68%)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/brand/logo-white.png"
            alt="Suits By Roseign — Exceptional Threads"
            width={1080}
            height={1080}
            priority
            className="relative h-auto mx-auto drop-shadow-[0_4px_36px_rgba(0,0,0,0.6)]"
            style={{ width: "min(40vw, 320px)", minWidth: "190px" }}
          />
        </motion.div>

        <motion.p
          className="font-display italic text-2xl sm:text-3xl text-ivory mt-6"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
        >
          Effortless elegance, tailored perfection.
        </motion.p>

        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
        >
          <span className="h-px w-8 bg-ivory/40" aria-hidden="true" />
          <p className="eyebrow">Mobile fittings across the GTA</p>
          <span className="h-px w-8 bg-ivory/40" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          className="mt-10"
        >
          <Link
            href="/book"
            className="inline-flex items-center border border-ivory px-10 py-4 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
          >
            Book a fitting
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
