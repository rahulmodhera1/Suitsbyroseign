"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We come to your home, your office, or wherever suits you, and talk through the occasion, the silhouette and the timeline.",
  },
  {
    n: "02",
    title: "Cloth & Cut",
    body: "Swatches in hand, in your own light, so the cloth you choose is the cloth you get.",
  },
  {
    n: "03",
    title: "Measurement",
    body: "A precise, unhurried fitting in the space where you're comfortable.",
  },
  {
    n: "04",
    title: "Construction",
    body: "Your garment is cut and built by hand, then checked against your measurements.",
  },
  {
    n: "05",
    title: "Fitting",
    body: "A first fitting to check drape, break and proportion, adjusted until it sits right.",
  },
  {
    n: "06",
    title: "Delivery",
    body: "The finished piece, delivered and fitted a final time wherever the day is.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-32 lg:scroll-mt-40 bg-paper text-ink px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <Reveal>
        <p className="eyebrow !text-ink/50 text-center">The mobile studio</p>
        <h2
          className="font-display font-bold text-center mt-4 mb-6 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          We Come To You
        </h2>
        <p className="text-body font-light text-ink/70 text-center measure mx-auto mb-16">
          The whole commission happens wherever you are — home, office, or venue. No showroom
          visits, no lost afternoons.
        </p>
      </Reveal>

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 max-w-6xl mx-auto">
        {STEPS.map((step) => (
          <motion.div key={step.n} variants={revealItem}>
            <span className="font-display text-3xl text-ink/35">{step.n}</span>
            <h3 className="font-display text-2xl mt-3 mb-2">{step.title}</h3>
            <p className="text-body font-light text-ink/70 leading-relaxed">{step.body}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
