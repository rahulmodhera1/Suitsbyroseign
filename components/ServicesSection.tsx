"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
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

const TEXTURE_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3GHeym8zFcW8bPwweVke9vdUrGE/hf_20260728_020057_627a6e4c-e61a-477f-b1ea-bff51a5d6a19.png";

export default function ServicesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="services"
      // overflow-x-clip, not overflow-hidden: the paper backdrop below is
      // deliberately wider than the section and would otherwise widen the page
      // on narrow screens. `clip` contains it without creating a scrollport,
      // which is what `hidden` does — and a scrollport here would strand the
      // sticky heading, since sticky resolves against the nearest one.
      className="relative scroll-mt-24 lg:scroll-mt-32 px-6 lg:px-24 text-ink overflow-x-clip"
      style={{
        paddingTop: "var(--section-pad)",
        paddingBottom: "var(--section-pad)",
        backgroundColor: "var(--paper)",
        backgroundImage: `url(${TEXTURE_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-[1800px] mx-auto">
        <div
          className="absolute -inset-x-8 -inset-y-12 sm:-inset-x-14 sm:-inset-y-16 bg-paper"
          style={{ filter: "blur(48px)" }}
          aria-hidden="true"
        />

        <div className="relative lg:grid lg:grid-cols-[320px_1fr] lg:gap-16 xl:gap-24">
      <Reveal className="mb-14 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
        <p className="eyebrow !text-ink/50">What we tailor</p>
        <h2
          className="font-display font-bold mt-4 mb-6 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 3.6vw, 3.75rem)" }}
        >
          Services
        </h2>
        <p className="text-body font-light text-ink/60 leading-relaxed mb-10 max-w-sm">
          Six ways we build a suit, each one quoted after a proper consultation, never off a
          price list.
        </p>
        <Button href={CALENDLY_URL} external variant="dark">
          Book a fitting
        </Button>
      </Reveal>

      <div className="border-t border-ink/15">
        {SERVICES.map((service, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={service.title}
              className="group relative border-b border-ink/15 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_OUT }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="relative flex w-full items-center gap-4 sm:gap-6 py-8 lg:py-10 text-left"
              >
                <span className="font-display text-lg sm:text-xl text-ink/35 tabular-nums w-8 sm:w-10 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className={`flex-1 font-display font-bold leading-tight transition-colors duration-300 ${
                    isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                  }`}
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)" }}
                >
                  {service.title}
                </h3>

                <span className="eyebrow !text-ink/45 hidden sm:block shrink-0">{service.timeline}</span>

                <span
                  className={`relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-500 ${
                    isOpen ? "border-ink bg-ink rotate-45" : "border-ink/30 group-hover:border-ink/60"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-500 ${
                      isOpen ? "bg-ivory" : "bg-ink/70"
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-500 ${
                      isOpen ? "bg-ivory" : "bg-ink/70"
                    }`}
                  />
                </span>
              </button>

              <div
                className="relative grid transition-[grid-template-rows] duration-500 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="pl-12 sm:pl-16 pr-4 pb-8 lg:pb-10 max-w-2xl">
                    <p className="text-body font-light text-ink/70 leading-relaxed">{service.body}</p>
                    <p className="eyebrow !text-ink/45 mt-4">{service.detail}</p>
                    <p className="eyebrow !text-ink/45 mt-2 sm:hidden">{service.timeline}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
        </div>
      </div>
    </section>
  );
}
