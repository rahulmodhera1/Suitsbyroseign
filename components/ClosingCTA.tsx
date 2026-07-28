import Image from "next/image";
import { Reveal } from "./Reveal";
import Button from "./Button";
import { CALENDLY_URL, INSTAGRAM_URL } from "@/lib/site";

export default function ClosingCTA() {
  return (
    <section
      id="book"
      className="scroll-mt-24 lg:scroll-mt-32 relative isolate overflow-hidden bg-ink"
    >
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] max-w-[130vw] max-h-[130vw] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(243,243,241,0.08) 0%, rgba(243,243,241,0) 70%)",
          }}
          aria-hidden="true"
        />

        <Image
          src="/brand/crown-mark.png"
          alt=""
          width={1008}
          height={592}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] lg:w-[520px] h-auto opacity-[0.09] pointer-events-none"
          aria-hidden="true"
        />

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
