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
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
          scrolled
            ? "bg-ink/70 backdrop-blur-md border-b border-ivory/12"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 lg:px-16 transition-[height] duration-500 ease-out ${
            scrolled ? "h-20 lg:h-24" : "h-32 lg:h-40"
          }`}
        >
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
              className={`w-auto object-contain transition-[height] duration-500 ease-out ${
                scrolled ? "h-14 sm:h-16 lg:h-[4.5rem]" : "h-24 sm:h-28 lg:h-32"
              }`}
            />
          </Link>

          <nav
            className={`hidden md:flex items-center transition-[gap] duration-500 ease-out ${
              scrolled ? "gap-9" : "gap-12"
            }`}
            aria-label="Primary"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`font-sans font-medium uppercase tracking-[0.18em] text-ivory/75 hover:text-ivory transition-[color,font-size] duration-300 ${
                  scrolled ? "text-sm lg:text-base" : "text-base lg:text-lg"
                }`}
              >
                {section.label}
              </a>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center bg-ivory eyebrow !text-ink text-base transition-[transform,padding] duration-500 ease-out hover:scale-[1.02] active:scale-[0.97] ${
                scrolled ? "px-8 py-3" : "px-10 py-4"
              }`}
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
