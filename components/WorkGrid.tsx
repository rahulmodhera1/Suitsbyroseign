"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORY_LABELS, type WorkItem } from "@/lib/gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A gallery video: muted and looping, never showing controls in the grid.
 * The source files carry no audio track at all, so there is nothing to mute
 * beyond satisfying the autoplay policy.
 *
 * Playback is driven by an IntersectionObserver rather than the `autoPlay`
 * attribute so that a grid of clips only fetches the ones actually on screen
 * — with `preload="none"`, nothing downloads until the tile is scrolled to.
 */
/**
 * `.photo` is the site-wide desaturation rule. Toggling it per-element here
 * rather than in the stylesheet lets one control retone the whole grid.
 * Callers own the transition, since the grid animates transform alongside
 * filter and the two must share a single transition-property declaration.
 */
function toneClass(mono: boolean) {
  return mono ? "photo" : "";
}

function GridVideo({ item, reduced, mono }: { item: WorkItem; reduced: boolean; mono: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    // Reduced motion keeps the poster frame and never starts playback.
    if (!video || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser declines autoplay; the poster stays
          // up in that case, which is a perfectly good fallback.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster ?? undefined}
      aria-label={item.alt}
      loop
      muted
      playsInline
      preload="none"
      className={`${toneClass(mono)} absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.05]`}
    />
  );
}

export default function WorkGrid({
  images,
  categories,
}: {
  images: WorkItem[];
  categories: string[];
}) {
  // Local state rather than a URL param: the gallery now lives inside the
  // one-page layout, so filtering must not push history or move the scroll.
  const [active, setActive] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Colour is the default: the cloth is the product. Black and white is the
  // house look, so the toggle offers it rather than imposing it.
  const [mono, setMono] = useState(false);
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
      {/* The filters stay optically centred on the section; the tone toggle is
          pulled out to the right on wide screens and drops below on narrow
          ones, where there is no room beside them. */}
      <div className="relative mb-16">
        <div
          className="flex flex-wrap gap-x-8 gap-y-3 justify-center"
          role="tablist"
          aria-label="Filter by category"
        >
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

        <div className="mt-8 flex justify-center lg:mt-0 lg:absolute lg:right-0 lg:-top-1">
          <ToneToggle mono={mono} onChange={setMono} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative block overflow-hidden text-left aspect-[4/5] border border-line"
          >
            {img.type === "video" ? (
              <GridVideo item={img} reduced={!!reduced} mono={mono} />
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                loading={i < 6 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                className={`${toneClass(mono)} object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.05]`}
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent transition-opacity duration-500 ease-out group-hover:from-ink/90"
              aria-hidden="true"
            />
            <span className="absolute inset-x-0 bottom-0 p-2 sm:p-4 lg:p-6">
              <span className="eyebrow !text-ivory block !text-[9px] sm:!text-[11px]">
                {CATEGORY_LABELS[img.category] ?? img.category}
              </span>
            </span>
          </button>
        ))}
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
        mono={mono}
      />
    </div>
  );
}

/**
 * Two mutually exclusive states rather than a switch widget: the labels name
 * both options outright, so nobody has to infer what the "off" position of a
 * switch would mean. Exposed as a radiogroup for the same reason.
 */
function ToneToggle({ mono, onChange }: { mono: boolean; onChange: (mono: boolean) => void }) {
  return (
    <div
      className="inline-flex items-center border border-line"
      role="radiogroup"
      aria-label="Portfolio colour treatment"
    >
      {[
        { label: "Colour", value: false },
        { label: "B&W", value: true },
      ].map(({ label, value }) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={mono === value}
          onClick={() => onChange(value)}
          className={`eyebrow px-4 py-2 transition-colors duration-300 ${
            mono === value ? "bg-ivory !text-ink" : "text-ivory/60 hover:!text-ivory"
          }`}
        >
          {label}
        </button>
      ))}
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
  mono,
}: {
  images: WorkItem[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  reduced: boolean;
  mono: boolean;
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
                {img.type === "video" ? (
                  // Controls appear here but not in the grid: at full size a
                  // 30-second clip is worth being able to pause and scrub.
                  <video
                    src={img.src}
                    poster={img.poster ?? undefined}
                    aria-label={img.alt}
                    autoPlay={!reduced}
                    loop
                    muted
                    playsInline
                    controls
                    className={`${toneClass(mono)} max-h-[70vh] w-auto object-contain transition-[filter] duration-500 ease-out`}
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    sizes="90vw"
                    className={`${toneClass(mono)} max-h-[70vh] w-auto object-contain transition-[filter] duration-500 ease-out`}
                    priority
                  />
                )}
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
