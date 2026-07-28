import { getAllWork, getCategories } from "@/lib/gallery";
import { Reveal } from "./Reveal";
import WorkGrid from "./WorkGrid";
import { Suspense } from "react";

export default function WorkSection() {
  const images = getAllWork();
  const categories = getCategories();

  return (
    <section
      id="work"
      className="scroll-mt-32 lg:scroll-mt-40 px-6 lg:px-24"
      style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "var(--section-pad)" }}
    >
      <Reveal>
        <p className="eyebrow text-center">The portfolio</p>
        <h2 className="font-display font-bold text-center mt-4 mb-14 leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Recent Commissions
        </h2>
      </Reveal>

      <Suspense fallback={<div className="text-center text-smoke py-24">Loading the portfolio&hellip;</div>}>
        <WorkGrid images={images} categories={categories} />
      </Suspense>
    </section>
  );
}
