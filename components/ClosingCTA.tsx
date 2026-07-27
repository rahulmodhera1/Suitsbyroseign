import Image from "next/image";
import { Reveal } from "./Reveal";
import Button from "./Button";
import { CALENDLY_URL, INSTAGRAM_URL } from "@/lib/site";

export default function ClosingCTA() {
  return (
    <section id="book" className="scroll-mt-32 lg:scroll-mt-40 relative isolate overflow-hidden">
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <Image
          src="/home/process-04.jpg"
          alt=""
          fill
          sizes="100vw"
          className="photo object-cover -z-10"
        />
        <div className="absolute inset-0 bg-ink/75 -z-10" />

        <Reveal>
          <p className="eyebrow">Book a fitting</p>
          <h2
            className="font-display font-bold text-ivory mt-4 mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Your Fitting,
            <br />
            Wherever You Are.
          </h2>
          <p className="text-body font-light text-ivory/75 measure mx-auto mb-12">
            Book a 30-minute consultation and we&apos;ll come to you, anywhere across the Greater
            Toronto Area.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Button href={CALENDLY_URL} external>
              Book a fitting
            </Button>
            <Button href={INSTAGRAM_URL} variant="outline" external>
              @suitsbyroseign
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
