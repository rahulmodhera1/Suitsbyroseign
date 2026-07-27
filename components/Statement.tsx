import { Reveal } from "./Reveal";
import SectionDivider from "./SectionDivider";

export default function Statement() {
  return (
    <section
      className="relative px-6 lg:px-24 overflow-hidden"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,243,241,0.06) 0%, rgba(243,243,241,0) 70%)",
        }}
        aria-hidden="true"
      />
      <SectionDivider className="mb-14 relative" />
      <Reveal>
        <p className="relative font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.35] text-ivory measure mx-auto text-center">
          A suit that fits is not a luxury. It is the baseline. You should not have to drive
          across the city to get one: the cloth, the cut, and the fitting should come to you,
          wherever the day takes place.
        </p>
      </Reveal>
    </section>
  );
}
