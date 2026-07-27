"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
];

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
      <div className="flex items-center justify-between px-6 lg:px-16 h-24 lg:h-28">
        <Link
          href="/"
          className="flex items-center transition-transform duration-150 ease-out active:scale-[0.97]"
          aria-label="Suits By Roseign home"
        >
          <Image
            src="/brand/logo-white.png"
            alt="Suits By Roseign"
            width={220}
            height={220}
            priority
            className="h-16 lg:h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="eyebrow text-ivory/75 hover:text-ivory transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/book"
            className="inline-flex items-center border border-ivory px-6 py-2.5 eyebrow text-ivory transition-[background-color,color,transform] duration-200 ease-out hover:bg-ivory hover:text-ink active:scale-[0.97]"
          >
            Book a fitting
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="md:hidden eyebrow text-ivory transition-transform duration-150 ease-out active:scale-[0.97]"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
      </header>
    </>
  );
}
