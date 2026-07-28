"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import { CALENDLY_URL, SECTIONS } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute top-[80vh] h-px w-px"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />
      {/*
        The header's own size stays constant on scroll — only its background
        (color + blur) toggles. Those two properties don't affect layout, so
        they're cheap to animate. Previously height, logo size, nav gap, font
        size and button padding all transitioned together on scroll, which
        forced a layout reflow on every frame of a 500ms transition inside a
        `position: fixed` + `backdrop-filter` element — the combination that
        caused the header to visibly stutter/redraw incompletely on scroll,
        especially on mobile.
      */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-300 ease-out ${
          scrolled
            ? "bg-ink/80 backdrop-blur-md border-b border-ivory/12"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-16 h-24 lg:h-28">
          <Link
            href="/"
            className="flex items-center transition-transform duration-150 ease-out active:scale-[0.97]"
            aria-label="Suits By Roseign home"
          >
            <Image
              src="/brand/logo-white.png"
              alt="Suits By Roseign"
              width={340}
              height={340}
              priority
              className="h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-10" aria-label="Primary">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="font-sans font-medium uppercase text-base tracking-[0.18em] text-ivory/75 hover:text-ivory transition-colors duration-300"
              >
                {section.label}
              </a>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center whitespace-nowrap bg-ivory px-5 lg:px-9 py-3.5 eyebrow !text-ink text-base transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.97]"
            >
              Book a fitting
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden font-sans font-medium uppercase text-lg tracking-[0.18em] text-ivory transition-transform duration-150 ease-out active:scale-[0.97]"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={SECTIONS} />
      </header>
    </>
  );
}
