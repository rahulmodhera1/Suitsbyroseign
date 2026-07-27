"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We come to your home, your office, or wherever suits you, and talk through the occasion, the silhouette and the timeline.",
    where: "At your place",
  },
  {
    n: "02",
    title: "Cloth & Cut",
    body: "Swatches in hand, in your own light, so the cloth you choose is the cloth you get.",
    where: "At your place",
  },
  {
    n: "03",
    title: "Measurement",
    body: "A precise, unhurried fitting in the space where you're comfortable. Every measurement taken twice.",
    where: "At your place",
  },
  {
    n: "04",
    title: "Construction",
    body: "Your garment is cut and built by hand, then checked against your measurements before it leaves the bench.",
    where: "In the workroom",
  },
  {
    n: "05",
    title: "Fitting",
    body: "A first fitting to check drape, break and proportion, adjusted until it sits right on you.",
    where: "At your place",
  },
  {
    n: "06",
    title: "Delivery",
    body: "The finished piece, delivered and fitted a final time wherever the day is — including the morning of.",
    where: "Home or venue",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

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
        <p className="text-body font-light text-ink/60 text-center measure mx-auto mb-20">
          The whole commission happens wherever you are — home, office, or venue. No showroom
          visits, no lost afternoons.
        </p>
      </Reveal>

      <div className="max-w-6xl mx-auto border-t border-ink/15">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            className="group border-b border-ink/15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_OUT }}
          >
            <div className="grid md:grid-cols-12 gap-y-4 gap-x-8 items-baseline py-10 lg:py-12 transition-colors duration-500 group-hover:bg-ink/[0.03]">
              <span className="md:col-span-1 font-display text-2xl text-ink/30 tabular-nums">
                {step.n}
              </span>

              <h3
                className="md:col-span-4 font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)" }}
              >
                {step.title}
              </h3>

              <p className="md:col-span-5 text-body font-light text-ink/65 leading-relaxed">
                {step.body}
              </p>

              <p className="md:col-span-2 eyebrow !text-ink/45 md:text-right">{step.where}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
