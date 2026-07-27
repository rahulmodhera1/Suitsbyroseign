import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { WorkImage } from "@/lib/gallery";

const OCCASIONS: { category: string; label: string }[] = [
  { category: "weddings", label: "Weddings" },
  { category: "suiting", label: "Business" },
  { category: "womenswear", label: "Womenswear" },
  { category: "juniors", label: "Juniors" },
];

export default function Occasions({ cover }: { cover: Record<string, WorkImage | undefined> }) {
  return (
    <section
      data-rail-section="Occasions"
      className="px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <Reveal>
        <p className="eyebrow text-center">Every occasion</p>
        <h2 className="font-display text-h2 text-center mt-4 mb-16">What we tailor</h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {OCCASIONS.map((o, i) => {
          const img = cover[o.category];
          return (
            <Reveal key={o.category} delay={i * 0.08}>
              <Link
                href={`/work?category=${o.category}`}
                className="group block relative aspect-[3/4] overflow-hidden"
              >
                {img && (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors duration-500" />
                <span className="absolute inset-x-0 bottom-6 text-center eyebrow text-ivory">
                  {o.label}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
