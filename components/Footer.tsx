import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ivory/12 mt-32">
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
        <Image
          src="/brand/logo-white.png"
          alt="Suits By Roseign"
          width={72}
          height={72}
          className="h-16 w-16 object-contain opacity-90"
        />
        <p className="font-display italic text-xl text-ivory">
          Effortless elegance, tailored perfection.
        </p>
        <p className="eyebrow">Mobile fittings across the GTA</p>

        <nav className="flex flex-wrap justify-center gap-8 mt-4" aria-label="Footer">
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

        <a
          href="https://instagram.com/suitsbyroseign"
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow text-ivory/75 hover:text-ivory transition-colors duration-300"
        >
          @suitsbyroseign
        </a>

        <p className="eyebrow text-smoke mt-8">
          &copy; {new Date().getFullYear()} Suits By Roseign. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
