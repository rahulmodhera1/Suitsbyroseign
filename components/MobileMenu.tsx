"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { CALENDLY_URL } from "@/lib/site";

type Section = { id: string; label: string };

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: readonly Section[];
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-ink flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduced ? undefined : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="flex justify-end px-6 h-32 items-center">
            <button
              type="button"
              onClick={onClose}
              className="font-sans font-medium uppercase text-lg tracking-[0.18em] text-ivory transition-transform duration-150 ease-out active:scale-[0.97]"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 mt-4" aria-label="Mobile primary">
            {links.map((link, i) => (
              <motion.div
                key={link.id}
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={onClose}
                  className="font-display text-5xl py-3 block text-ivory"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * links.length, ease: EASE }}
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex mt-8 bg-ivory px-8 py-3.5 eyebrow !text-ink transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                Book a fitting
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
