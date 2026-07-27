"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

const SERVICES = [
  {
    title: "Wedding Suits",
    body: "Grooms and full wedding parties, coordinated and fitted together so every build is accounted for.",
    timeline: "Book 8–12 weeks out",
  },
  {
    title: "Business Suits",
    body: "Two- and three-piece suiting for the working week. Cut for long days, built to hold its shape.",
    timeline: "3–4 weeks",
  },
  {
    title: "Black Tie",
    body: "Dinner jackets and tuxedos, from peak lapels to shawl collars, finished with the details the occasion asks for.",
    timeline: "4–6 weeks",
  },
  {
    title: "Made-to-Measure",
    body: "A refined base pattern adjusted to your measurements and preferences. The choice for most commissions.",
    timeline: "3–4 weeks",
  },
  {
    title: "Bespoke",
    body: "A suit built from a pattern drafted for you alone. The fullest expression of fit.",
    timeline: "6–8 weeks",
  },
  {
    title: "Shirting & Accessories",
    body: "Made-to-measure shirts, waistcoats, ties and pocket squares, matched to the cloth of your suit.",
    timeline: "2–3 weeks",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-32 lg:scroll-mt-40 px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <Reveal>
        <p className="eyebrow text-center">What we tailor</p>
        <h2
          className="font-display font-bold text-center mt-4 mb-16 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Services
        </h2>
      </Reveal>

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 max-w-6xl mx-auto">
        {SERVICES.map((service) => (
          <motion.div key={service.title} variants={revealItem}>
            <h3 className="font-display text-2xl mb-3">{service.title}</h3>
            <p className="text-body font-light text-ivory/75 leading-relaxed mb-4">
              {service.body}
            </p>
            <p className="eyebrow !text-ivory/45">{service.timeline}</p>
          </motion.div>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="font-display italic text-xl text-ivory text-center mt-20">
          Every commission is quoted after the consultation.
        </p>
      </Reveal>
    </section>
  );
}
