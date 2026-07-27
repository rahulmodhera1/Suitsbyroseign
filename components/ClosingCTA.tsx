import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export default function ClosingCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[60vh] min-h-[420px] flex items-center justify-center text-center px-6">
        <Image
          src="/home/process-04.jpg"
          alt="Final fitting adjustments on location"
          fill
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-ink/70 -z-10" />
        <Reveal>
          <h2 className="font-display text-h2 text-ivory mb-8">
            Your fitting, wherever you are.
          </h2>
          <Link
            href="/book"
            className="inline-flex items-center border border-brass px-9 py-3.5 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
          >
            Book a fitting
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
