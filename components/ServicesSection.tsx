"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "./Reveal";
import Button from "./Button";
import { CALENDLY_URL } from "@/lib/site";

const SERVICES = [
  {
    title: "Wedding Suits",
    body: "Grooms and full wedding parties, coordinated and fitted together in one sitting so every build is accounted for.",
    detail: "Three-piece · Morning dress · Party coordination",
    timeline: "Book 8–12 weeks out",
  },
  {
    title: "Business Suits",
    body: "Two- and three-piece suiting for the working week. Cut for long days and built to hold its shape through them.",
    detail: "Two-piece · Three-piece · Separates",
    timeline: "3–4 weeks",
  },
  {
    title: "Black Tie",
    body: "Dinner jackets and tuxedos, from peak lapels to shawl collars, finished with the details the occasion asks for.",
    detail: "Tuxedo · Dinner jacket · Midnight blue",
    timeline: "4–6 weeks",
  },
  {
    title: "Made-to-Measure",
    body: "A refined base pattern adjusted to your measurements and preferences. The choice for most commissions.",
    detail: "Full canvas · Half canvas · Cloth library",
    timeline: "3–4 weeks",
  },
  {
    title: "Bespoke",
    body: "A suit built from a pattern drafted for you alone. The fullest expression of fit, reserved for occasions that call for it.",
    detail: "Hand-drafted pattern · Multiple fittings",
    timeline: "6–8 weeks",
  },
  {
    title: "Shirting & Accessories",
    body: "Made-to-measure shirts, waistcoats, ties and pocket squares, matched to the cloth of your suit.",
    detail: "Shirting · Waistcoats · Ties · Pocket squares",
    timeline: "2–3 weeks",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

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
          className="font-display font-bold text-center mt-4 mb-20 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Services
        </h2>
      </Reveal>

      <div className="max-w-6xl mx-auto border-t border-ivory/15">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            className="group border-b border-ivory/15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_OUT }}
            variants={revealItem}
          >
            <div className="grid md:grid-cols-12 gap-y-4 gap-x-8 items-baseline py-10 lg:py-12 transition-colors duration-500 group-hover:bg-ivory/[0.03]">
              <span className="md:col-span-1 font-display text-2xl text-ivory/30 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="md:col-span-4 font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)" }}
              >
                {service.title}
              </h3>

              <div className="md:col-span-5">
                <p className="text-body font-light text-ivory/75 leading-relaxed">
                  {service.body}
                </p>
                <p className="eyebrow !text-ivory/40 mt-4">{service.detail}</p>
              </div>

              <p className="md:col-span-2 eyebrow !text-ivory/55 md:text-right">
                {service.timeline}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="flex flex-col items-center gap-8 mt-20">
          <p className="font-display italic text-xl sm:text-2xl text-ivory text-center">
            Every commission is quoted after the consultation.
          </p>
          <Button href={CALENDLY_URL} external>
            Book a fitting
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
