import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllWork, getCategories } from "@/lib/gallery";
import WorkGrid from "@/components/WorkGrid";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "The Portfolio",
  description:
    "Wedding suits, made-to-measure tailoring, womenswear and junior suiting from Suits By Roseign, across the GTA.",
};

export default function WorkPage() {
  const images = getAllWork();
  const categories = getCategories();

  return (
    <div className="px-6 lg:px-24" style={{ paddingTop: "calc(var(--section-pad) + 3rem)", paddingBottom: "var(--section-pad)" }}>
      <div className="text-center mb-14">
        <p className="eyebrow">The portfolio</p>
        <h1 className="font-display text-h2 mt-4">Recent commissions</h1>
      </div>
      <SectionDivider className="mb-16" />
      <Suspense fallback={<div className="text-center text-smoke py-24">Loading the portfolio&hellip;</div>}>
        <WorkGrid images={images} categories={categories} />
      </Suspense>
    </div>
  );
}
