import Image from "next/image";
import { Reveal } from "./Reveal";

const TEXTURE_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3GHeym8zFcW8bPwweVke9vdUrGE/hf_20260728_014409_cda4584d-3d44-4ac4-a97e-963878773f9a.png";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 lg:scroll-mt-32 px-6 lg:px-24 overflow-hidden"
      style={{
        paddingTop: "var(--section-pad)",
        paddingBottom: "var(--section-pad)",
        backgroundColor: "var(--ink)",
        backgroundImage: `url(${TEXTURE_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />

      <Reveal className="relative">
        <p className="eyebrow text-center">The house</p>
        <h2
          className="font-display font-bold text-center mt-4 mb-16 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          About Roseign
        </h2>
      </Reveal>

      <div className="relative max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
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
