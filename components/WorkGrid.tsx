"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORY_LABELS, type WorkImage } from "@/lib/gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WorkGrid({
  images,
  categories,
}: {
  images: WorkImage[];
  categories: string[];
}) {
  // Local state rather than a URL param: the gallery now lives inside the
  // one-page layout, so filtering must not push history or move the scroll.
  const [active, setActive] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () => (active === "all" ? images : images.filter((img) => img.category === active)),
    [images, active]
  );

  const setCategory = useCallback((cat: string) => setActive(cat), []);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mb-16" role="tablist" aria-label="Filter by category">
        <FilterButton label="All" isActive={active === "all"} onClick={() => setCategory("all")} />
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            label={CATEGORY_LABELS[cat] ?? cat}
            isActive={active === cat}
            onClick={() => setCategory(cat)}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {filtered.map((img, i) => {
          const isWide = i === 0 && img.featured;
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={`group relative block overflow-hidden text-left ${
                isWide ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                loading={i < 6 ? "eager" : "lazy"}
                sizes={isWide ? "100vw" : "(max-width: 768px) 50vw, 33vw"}
                className="photo object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent transition-opacity duration-500 ease-out group-hover:from-ink/90"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 lg:p-6">
                <span className={`eyebrow !text-ivory block ${isWide ? "text-sm" : ""}`}>
                  {CATEGORY_LABELS[img.category] ?? img.category}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-smoke py-24">No images in this category yet.</p>
      )}

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
        reduced={!!reduced}
      />
    </div>
  );
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`eyebrow pb-1 border-b transition-colors duration-300 ${
        isActive ? "!text-ivory border-ivory" : "text-ivory/70 border-transparent hover:!text-ivory"
      }`}
    >
      {label}
    </button>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
  reduced,
}: {
  images: WorkImage[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  reduced: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const img = open ? images[index] : null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {open && img && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[70] bg-ink/97 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={img.caption}
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex justify-end p-6">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="eyebrow text-ivory"
              aria-label="Close image viewer"
            >
              Close
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pb-6">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 eyebrow text-ivory hover:text-ivory/60 p-3"
            >
              &#8592;
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={img.src}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="max-w-full max-h-full flex flex-col items-center"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  sizes="90vw"
                  className="photo max-h-[70vh] w-auto object-contain"
                  priority
                />
                <div className="mt-6 text-center">
                  <p className="font-display italic text-lg text-ivory">{img.caption}</p>
                  {img.location && <p className="eyebrow mt-2">{img.location}</p>}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 eyebrow text-ivory hover:text-ivory/60 p-3"
            >
              &#8594;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
