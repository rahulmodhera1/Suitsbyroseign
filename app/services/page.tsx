import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealGroup } from "@/components/Reveal";
import SectionDivider from "@/components/SectionDivider";
import ServiceMotionItem from "@/components/ServiceMotionItem";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bespoke and made-to-measure tailoring for weddings, business and womenswear, fitted at your home, office or venue anywhere in the GTA.",
};

const SERVICES = [
  {
    title: "Bespoke",
    body: "A suit built from a pattern drafted for you alone. The fullest expression of fit, reserved for occasions that call for it.",
    timeline: "6–8 weeks",
  },
  {
    title: "Made-to-measure",
    body: "A refined base pattern adjusted to your measurements and preferences. The choice for most commissions.",
    timeline: "3–4 weeks",
  },
  {
    title: "Wedding parties",
    body: "Coordinated looks for the groom and the full party, fitted together in one sitting so every build is accounted for.",
    timeline: "8–12 weeks out",
  },
  {
    title: "Womenswear",
    body: "Tailored blazers, suiting sets and structured pieces, cut to complement rather than borrow from menswear.",
    timeline: "3–5 weeks",
  },
  {
    title: "Juniors",
    body: "Suiting for the youngest members of the wedding party, scaled properly rather than shrunk from an adult pattern.",
    timeline: "2–3 weeks",
  },
];

const PROCESS = [
  { n: "01", title: "Consultation", body: "We meet wherever suits you and talk through the occasion, fit and budget." },
  { n: "02", title: "Cloth and cut", body: "You choose the fabric and silhouette in person, in your own light." },
  { n: "03", title: "Measurement", body: "A precise, unhurried fitting on site." },
  { n: "04", title: "Construction", body: "Your garment is cut and built by hand." },
  { n: "05", title: "Fitting", body: "A first fitting to check drape, break and proportion, adjusted as needed." },
  { n: "06", title: "Delivery", body: "The finished piece, delivered and fitted a final time wherever the day is." },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: "calc(var(--section-pad) + 3rem)", paddingBottom: "var(--section-pad)" }}>
      <div className="px-6 lg:px-24 text-center mb-14">
        <p className="eyebrow">Services</p>
        <h1 className="font-display text-h2 mt-4">What we tailor, and how</h1>
      </div>
      <SectionDivider className="mb-16" />

      <RevealGroup className="px-6 lg:px-24 grid sm:grid-cols-2 gap-x-12 gap-y-14 max-w-5xl mx-auto">
        {SERVICES.map((s) => (
          <ServiceMotionItem key={s.title}>
            <h2 className="font-display text-h3 mb-2">{s.title}</h2>
            <p className="text-body font-light text-ivory/85 leading-relaxed mb-3">{s.body}</p>
            <p className="eyebrow text-brass">{s.timeline}</p>
          </ServiceMotionItem>
        ))}
      </RevealGroup>

      <div className="px-6 lg:px-24 mt-32">
        <Reveal>
          <p className="eyebrow text-center">The process</p>
          <h2 className="font-display text-h2 text-center mt-4 mb-16">Six steps, in order</h2>
        </Reveal>

        <RevealGroup className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {PROCESS.map((p) => (
            <ServiceMotionItem key={p.n}>
              <span className="font-display text-3xl text-brass">{p.n}</span>
              <h3 className="text-h3 font-display mt-3 mb-2">{p.title}</h3>
              <p className="text-body font-light text-ivory/85 leading-relaxed">{p.body}</p>
            </ServiceMotionItem>
          ))}
        </RevealGroup>
      </div>

      <div className="px-6 lg:px-24 mt-32 text-center">
        <p className="font-display italic text-xl text-ivory measure mx-auto mb-8">
          Every commission is quoted after the consultation.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center border border-brass px-9 py-3.5 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
        >
          Book a fitting
        </Link>
      </div>
    </div>
  );
}
