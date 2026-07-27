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
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ease-out ${
          scrolled ? "bg-ink border-b border-ivory/15" : "bg-transparent"
        }`}
      >
      <div className="flex items-center justify-between px-6 lg:px-16 h-20">
        <Link href="/" className="flex items-center gap-3" aria-label="Suits By Roseign home">
          <Image
            src="/brand/logo-white.png"
            alt="Suits By Roseign"
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain"
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
            className="inline-flex items-center border border-ivory px-6 py-2.5 eyebrow text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300 ease-out"
          >
            Book a fitting
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="md:hidden eyebrow text-ivory"
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
