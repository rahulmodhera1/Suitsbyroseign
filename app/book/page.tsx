import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Book a Fitting",
  description:
    "Request a mobile fitting anywhere in the GTA. We'll be in touch within one business day.",
};

const CONTACT_PHONE = null; // TODO: confirm with client
const CONTACT_EMAIL = null; // TODO: confirm with client

export default function BookPage() {
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

  return (
    <div style={{ paddingTop: "calc(var(--section-pad) + 3rem)", paddingBottom: "var(--section-pad)" }}>
      <div className="px-6 lg:px-24 text-center mb-14">
        <p className="eyebrow">Book a fitting</p>
        <h1 className="font-display text-h2 mt-4">Let&apos;s get you measured</h1>
        <p className="text-body text-ivory/80 mt-6 max-w-md mx-auto">
          Tell us a little about the occasion and where you&apos;d like to meet. We&apos;ll be in
          touch within one business day.
        </p>
      </div>
      <SectionDivider className="mb-16" />

      <div className="px-6 lg:px-24 max-w-xl mx-auto">
        {emailConfigured ? (
          <BookingForm />
        ) : (
          <div className="text-center py-16 border border-brass/30 px-8">
            <p className="font-display text-h3 mb-4">Reach us directly</p>
            <p className="text-body text-ivory/85 mb-8">
              Online booking isn&apos;t connected on this preview. Email us directly and
              we&apos;ll reply within one business day.
            </p>
            <a
              href="mailto:hello@suitsbyroseign.ca?subject=Fitting%20request"
              className="inline-flex items-center border border-brass px-9 py-3.5 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
            >
              Email us
            </a>
          </div>
        )}

        <div className="mt-16 text-center space-y-3">
          <p className="eyebrow">Or reach us directly</p>
          <a
            href="https://instagram.com/suitsbyroseign"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-ivory hover:text-brass transition-colors duration-300"
          >
            @suitsbyroseign on Instagram
          </a>
          {CONTACT_PHONE && <p className="text-ivory">{CONTACT_PHONE}</p>}
          {CONTACT_EMAIL && <p className="text-ivory">{CONTACT_EMAIL}</p>}
        </div>
      </div>
    </div>
  );
}
