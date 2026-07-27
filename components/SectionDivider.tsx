"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The tapered spear-point rule from the logo's flourish, with the filigree
 * removed — thickens toward the centre, animates outward from centre once
 * when it scrolls into view.
 */
export default function SectionDivider({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <motion.svg
        width="220"
        height="9"
        viewBox="0 0 220 9"
        fill="none"
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center" }}
      >
        <path
          d="M0 4.5H92L110 0.5L128 4.5H220"
          stroke="var(--ivory)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <path d="M110 0.5L128 4.5L110 8.5L92 4.5L110 0.5Z" fill="var(--ivory)" />
      </motion.svg>
    </div>
  );
}
