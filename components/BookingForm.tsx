"use client";

import { useActionState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { submitBooking, type BookingState } from "@/app/book/actions";

const EASE = [0.16, 1, 0.3, 1] as const;

const initialState: BookingState = { status: "idle", errors: {} };

const OCCASIONS = ["Wedding", "Business", "Womenswear", "Junior", "Other"];

export default function BookingForm() {
  const [state, formAction, pending] = useActionState(submitBooking, initialState);
  const reduced = useReducedMotion();

  if (state.status === "success") {
    return (
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-center py-16"
        role="status"
      >
        <p className="font-display text-h3 mb-4">Thank you.</p>
        <p className="text-body text-ivory/85">
          We&apos;ll be in touch within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-8">
      {/* Honeypot — hidden from sighted users and screen readers, bots fill it anyway */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Name" name="name" type="text" autoComplete="name" error={state.errors.name} />
      <Field label="Email" name="email" type="email" autoComplete="email" error={state.errors.email} />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        error={state.errors.phone}
      />

      <div>
        <label htmlFor="occasion" className="eyebrow block mb-2">
          Occasion
        </label>
        <select
          id="occasion"
          name="occasion"
          defaultValue=""
          aria-invalid={!!state.errors.occasion}
          aria-describedby={state.errors.occasion ? "occasion-error" : undefined}
          className="w-full bg-transparent border-b border-ivory/30 focus:border-brass py-3 text-ivory outline-none transition-colors duration-300"
        >
          <option value="" disabled>
            Select one
          </option>
          {OCCASIONS.map((o) => (
            <option key={o} value={o} className="bg-ink">
              {o}
            </option>
          ))}
        </select>
        {state.errors.occasion && (
          <p id="occasion-error" className="text-brass text-sm mt-2">
            {state.errors.occasion}
          </p>
        )}
      </div>

      <Field
        label="Event date"
        name="eventDate"
        type="date"
        error={state.errors.eventDate}
        required={false}
      />

      <Field
        label="Preferred fitting area"
        name="area"
        type="text"
        hint="e.g. Mississauga, Brampton, downtown Toronto"
        error={state.errors.area}
      />

      <div>
        <label htmlFor="message" className="eyebrow block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-transparent border-b border-ivory/30 focus:border-brass py-3 text-ivory outline-none transition-colors duration-300 resize-none"
        />
      </div>

      <AnimatePresence>
        {state.formError && (
          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-brass"
            role="alert"
          >
            {state.formError}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center border border-brass px-9 py-3.5 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out disabled:opacity-50"
      >
        {pending ? "Sending…" : "Request a fitting"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  hint,
  error,
  required = true,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">
        {label}
        {!required && <span className="text-smoke normal-case tracking-normal"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className="w-full bg-transparent border-b border-ivory/30 focus:border-brass py-3 text-ivory outline-none transition-colors duration-300"
      />
      {hint && !error && (
        <p id={`${name}-hint`} className="text-smoke text-sm mt-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="text-brass text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
