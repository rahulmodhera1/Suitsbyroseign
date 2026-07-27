"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    // The opening shot itself is framed slightly left of true centre and
    // settles into place by about a second in. Nudge the crop window right
    // to compensate only for that opening beat, easing back to a plain
    // centred crop as the shot self-corrects — later scenes are untouched.
    const CORRECTION_WINDOW = 1;
    const START_POSITION = 47.3;
    const DEFAULT_POSITION = 50;
    let raf = 0;

    const updateCrop = () => {
      const t = video.currentTime;
      if (t < CORRECTION_WINDOW) {
        const progress = t / CORRECTION_WINDOW;
        const x = START_POSITION + (DEFAULT_POSITION - START_POSITION) * progress;
        video.style.objectPosition = `${x}% center`;
        raf = requestAnimationFrame(updateCrop);
      } else {
        video.style.objectPosition = `${DEFAULT_POSITION}% center`;
      }
    };
    raf = requestAnimationFrame(updateCrop);

    // Plays once and stops on the final frame. Pausing a hair before the
    // true end (rather than seeking back after "ended" fires) avoids the
    // forward-then-back flicker some browsers show when they briefly blank
    // out at the exact end of a clip and get nudged backward to recover.
    const STOP_MARGIN = 0.15;
    const stopBeforeEnd = () => {
      if (video.duration && video.currentTime >= video.duration - STOP_MARGIN) {
        video.pause();
        video.removeEventListener("timeupdate", stopBeforeEnd);
      }
    };
    video.addEventListener("timeupdate", stopBeforeEnd);
    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("timeupdate", stopBeforeEnd);
    };
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
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/home/Hero_animation.mp4"
            poster="/home/hero-poster.jpg"
            autoPlay
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
          <Link
            href="/book"
            className="group inline-flex h-16 items-center gap-5 rounded-full bg-ivory pl-9 pr-3 eyebrow !text-ink text-sm transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.97]"
          >
            Book a fitting
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-ink text-ivory transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <Link
            href="/work"
            className="inline-flex h-16 items-center justify-center rounded-full border border-ivory/50 px-9 eyebrow !text-ivory text-sm transition-[background-color,border-color,transform] duration-200 ease-out hover:bg-ivory/10 hover:border-ivory active:scale-[0.97]"
          >
            View our work
          </Link>
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
