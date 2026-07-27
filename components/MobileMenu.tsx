"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type Link_ = { href: string; label: string };

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: Link_[];
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
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="flex justify-end px-6 h-20 items-center">
            <button
              type="button"
              onClick={onClose}
              className="eyebrow text-ivory"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 mt-8" aria-label="Mobile primary">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-4xl py-3 block text-ivory"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * links.length, ease: EASE }}
            >
              <Link
                href="/book"
                onClick={onClose}
                className="inline-flex mt-6 border border-brass px-6 py-2.5 eyebrow text-ivory"
              >
                Book a fitting
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
