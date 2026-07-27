import Image from "next/image";
import Link from "next/link";
import type { WorkImage } from "@/lib/gallery";
import { Reveal } from "./Reveal";

// Deliberately uneven editorial arrangement rather than a uniform grid —
// spans control size and vertical offset.
const LAYOUT = [
  "col-span-7 row-span-2",
  "col-span-5 row-span-1",
  "col-span-5 row-span-1 mt-8",
  "col-span-4 row-span-1",
  "col-span-8 row-span-1 -mt-6",
  "col-span-12 sm:col-span-4 row-span-1",
];

export default function FeaturedWork({ images }: { images: WorkImage[] }) {
  return (
    <section
      className="px-6 lg:px-24"
      style={{ paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}
    >
      <Reveal>
        <p className="eyebrow text-center">Recent commissions</p>
        <h2 className="font-display text-h2 text-center mt-4 mb-16">Featured work</h2>
      </Reveal>

      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.06} className={LAYOUT[i % LAYOUT.length]}>
            <Link href="/work" className="group block relative overflow-hidden h-full min-h-[220px]">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="photo w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-ink/80 px-4 py-3">
                <span className="eyebrow text-ivory">{img.caption}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link
          href="/work"
          className="inline-flex items-center border border-ivory px-8 py-3 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97]"
        >
          View the full portfolio
        </Link>
      </div>
    </section>
  );
}
