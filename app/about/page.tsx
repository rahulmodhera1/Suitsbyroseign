import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who's behind Suits By Roseign, why the studio is mobile, and what we believe about fit.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "calc(var(--section-pad) + 3rem)", paddingBottom: "var(--section-pad)" }}>
      <div className="px-6 lg:px-24 text-center mb-14">
        <p className="eyebrow">About</p>
        <h1 className="font-display text-h2 mt-4">The house</h1>
      </div>
      <SectionDivider className="mb-16" />

      <div className="px-6 lg:px-24 max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/home/about-portrait.jpg"
              alt="Portrait of the tailor at work"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="measure text-body font-light leading-relaxed text-ivory/90 space-y-6">
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
    </div>
  );
}
