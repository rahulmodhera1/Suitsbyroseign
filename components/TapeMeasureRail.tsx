"use client";

import { useEffect, useRef, useState } from "react";

const TICKS = Array.from({ length: 21 }, (_, i) => i); // 0..20, major every 5

/**
 * Fixed vertical tailor's-tape scroll indicator for the empty left gutter
 * (desktop only). Progress and the active section label are both driven by
 * IntersectionObserver callbacks rather than a per-frame scroll listener:
 * a full-page sentinel reports scroll progress at threshold crossings, and
 * each [data-rail-section] element reports when it becomes the active one.
 */
export default function TapeMeasureRail() {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const syncHeight = () => {
      sentinel.style.height = `${document.body.scrollHeight}px`;
    };
    syncHeight();
    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(document.body);

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
    const progressObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const ratio = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        setProgress(ratio);
      },
      { threshold: thresholds }
    );
    progressObserver.observe(sentinel);

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-rail-section]"));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setLabel(visible.target.getAttribute("data-rail-section") ?? "");
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      resizeObserver.disconnect();
      progressObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" aria-hidden="true" />

      {/* Desktop: fixed vertical rail in the left gutter */}
      <div
        className="hidden lg:flex fixed left-10 top-0 h-screen w-8 z-40 flex-col items-center motion-reduce:hidden"
        aria-hidden="true"
      >
        <div className="relative h-[60vh] w-px bg-brass/30 mt-[20vh]">
          <div
            className="absolute left-0 top-0 w-px bg-brass"
            style={{ height: `${progress * 100}%`, transition: "height 0.1s linear" }}
          />
          {TICKS.map((t) => {
            const major = t % 5 === 0;
            return (
              <div
                key={t}
                className="absolute flex items-center"
                style={{ top: `${(t / 20) * 100}%`, left: 0 }}
              >
                <span
                  className="block bg-brass/60"
                  style={{ width: major ? "10px" : "5px", height: "1px" }}
                />
                {major && (
                  <span className="eyebrow ml-2 text-[9px] tracking-[0.2em] text-smoke">
                    {t / 5}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {label && (
          <span className="eyebrow mt-4 -rotate-90 origin-left translate-y-6 whitespace-nowrap text-brass">
            {label}
          </span>
        )}
      </div>

      {/* Mobile: 2px brass line pinned to top of viewport */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 h-[2px] z-40 bg-ivory/10 motion-reduce:hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-brass"
          style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </>
  );
}
