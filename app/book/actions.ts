"use server";

import { Resend } from "resend";

export type BookingFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "occasion" | "eventDate" | "area" | "message", string>
>;

export type BookingState = {
  status: "idle" | "error" | "success";
  errors: BookingFieldErrors;
  formError?: string;
};

const OCCASIONS = ["Wedding", "Business", "Womenswear", "Junior", "Other"];

// Best-effort, per-instance rate limit. Not durable across deploys or
// serverless cold starts, but enough to blunt casual form abuse.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(key: string) {
  const now = Date.now();
  const times = (submissions.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  submissions.set(key, times);
  return times.length > MAX_PER_WINDOW;
}

const PHONE_RE = /^[\d\s()+-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitBooking(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  // Honeypot: bots fill every field, humans never see this one.
  if (formData.get("company")) {
    return { status: "success", errors: {} };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const occasion = String(formData.get("occasion") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  const area = String(formData.get("area") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: BookingFieldErrors = {};
  if (!name) errors.name = "Tell us who we're fitting.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "Enter an email address we can reach you on.";
  if (!phone || !PHONE_RE.test(phone)) errors.phone = "Enter a phone number we can reach you on.";
  if (!occasion || !OCCASIONS.includes(occasion)) errors.occasion = "Choose the occasion closest to yours.";
  if (!area) errors.area = "Let us know roughly where you'd like the fitting.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const rateLimitKey = email.toLowerCase();
  if (isRateLimited(rateLimitKey)) {
    return {
      status: "error",
      errors: {},
      formError: "We've received a few requests from this address recently. Give us a moment and try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // No email service configured — the form still validates so a fresh
    // clone never appears broken, it just can't actually send.
    console.warn("RESEND_API_KEY / CONTACT_TO_EMAIL not set — booking not emailed.");
    return { status: "success", errors: {} };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Suits By Roseign <bookings@suitsbyroseign.ca>",
      to,
      replyTo: email,
      subject: `New fitting request — ${name} (${occasion})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Occasion: ${occasion}`,
        `Event date: ${eventDate || "not provided"}`,
        `Preferred fitting area: ${area}`,
        "",
        "Message:",
        message || "(none)",
      ].join("\n"),
    });
    return { status: "success", errors: {} };
  } catch (err) {
    console.error("Failed to send booking email", err);
    return {
      status: "error",
      errors: {},
      formError: "Something went wrong sending your request. Please try again, or reach us directly on Instagram.",
    };
  }
}
