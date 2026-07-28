"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import Button from "./Button";
import { CALENDLY_URL, INSTAGRAM_URL } from "@/lib/site";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function ClosingCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="book"
      className="scroll-mt-24 lg:scroll-mt-32 relative isolate overflow-hidden bg-ink"
    >
      <div className="relative flex flex-col items-center justify-center text-center px-6 pt-24 lg:pt-28 pb-14 lg:pb-16">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[140vw] max-h-[140vw] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(243,243,241,0.07) 0%, rgba(243,243,241,0) 70%)",
          }}
          aria-hidden="true"
        />

        <Reveal>
          {/* The crown reads as a crest here — crisp and small, flanked by
              hairlines, echoing how it sits above the wordmark in the logo. */}
          <div className="flex items-center justify-center gap-5 sm:gap-7 mb-10">
            <motion.span
              className="h-px w-12 sm:w-20 bg-ivory/30 origin-right"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            />
            <Image
              src="/brand/crown-mark.png"
              alt=""
              width={1008}
              height={592}
              className="w-10 sm:w-12 h-auto"
              aria-hidden="true"
            />
            <motion.span
              className="h-px w-12 sm:w-20 bg-ivory/30 origin-left"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            />
          </div>

          <p className="eyebrow">Book a fitting</p>
          <h2
            className="font-display font-bold text-ivory mt-4 mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Your Fitting,
            <br />
            Wherever You Are.
          </h2>
          <p className="text-body font-light text-ivory/75 measure mx-auto mb-12">
            Book a 30-minute consultation and we&apos;ll come to you, anywhere across the Greater
            Toronto Area.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Button href={CALENDLY_URL} external>
              Book a fitting
            </Button>
            <Button href={INSTAGRAM_URL} variant="outline" external>
              @suitsbyroseign
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
