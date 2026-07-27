"use client";

import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";

const BEATS = [
  {
    n: "01",
    title: "Consultation at your place",
    body: "We come to your home, your office, or wherever suits you, to talk through the occasion, the silhouette, and the timeline.",
  },
  {
    n: "02",
    title: "Cloth and cut chosen in person",
    body: "Swatches in hand, in your own light, so the colour you choose is the colour you get.",
  },
  {
    n: "03",
    title: "Measurements taken on site",
    body: "A precise, unhurried fitting in the space where you're comfortable.",
  },
  {
    n: "04",
    title: "Fittings at your home or venue",
    body: "Final adjustments happen wherever the day is, including the morning of, if that's what it takes.",
  },
];

export default function MobileStudio() {
  return (
    <section
      data-rail-section="Mobile Studio"
      className="bg-oxblood px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="eyebrow text-center">The mobile studio</p>
          <h2 className="font-display text-h2 text-center mt-4 mb-16">
            Seamlessly mobile across the GTA
          </h2>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 gap-x-12 gap-y-14">
          {BEATS.map((beat) => (
            <motion.div key={beat.n} variants={revealItem}>
              <span className="font-display text-3xl text-brass">{beat.n}</span>
              <h3 className="text-h3 font-display mt-3 mb-2">{beat.title}</h3>
              <p className="text-body font-light text-ivory/85 leading-relaxed">{beat.body}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
