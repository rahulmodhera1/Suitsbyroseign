import { Reveal } from "./Reveal";
import SectionDivider from "./SectionDivider";

export default function Statement() {
  return (
    <section
      data-rail-section="Statement"
      className="px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <SectionDivider className="mb-14" />
      <Reveal>
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.35] text-ivory measure mx-auto text-center">
          A suit that fits is not a luxury. It is the baseline. You should not have to drive
          across the city to get one: the cloth, the cut, and the fitting should come to you,
          wherever the day takes place.
        </p>
      </Reveal>
    </section>
  );
}
