import Image from "next/image";
import { Reveal } from "./Reveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-32 lg:scroll-mt-40 px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <Reveal>
        <p className="eyebrow text-center">The house</p>
        <h2
          className="font-display font-bold text-center mt-4 mb-16 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          About Roseign
        </h2>
      </Reveal>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/home/about-portrait.jpg"
              alt="Portrait of the tailor at work"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="photo object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="measure text-body font-light leading-relaxed text-ivory/80 space-y-6">
            <p>
              {/* TODO: confirm with client */}
              Suits By Roseign started the way most tailoring houses do: with a single commission,
              and a client who couldn&apos;t find the time to visit a shop twice, let alone three
              or four times, before a wedding.
            </p>
            <p>
              {/* TODO: confirm with client */}
              So we brought the fitting room to them instead. That decision became the studio:
              cloth, cut and measurement carried to your home, your office, or the venue itself,
              rather than the other way around.
            </p>
            <p>
              {/* TODO: confirm with client */}
              We work mostly with wedding parties across the GTA: grooms, groomsmen, and the
              occasional bride who wants a tailored suit of her own, alongside professionals who
              want a made-to-measure jacket without losing an afternoon to get it.
            </p>
            <p>
              A suit that fits changes how a person stands in a room. That is the only outcome we
              are working toward, on every commission, regardless of postcode.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
