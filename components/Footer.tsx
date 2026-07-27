import Image from "next/image";
import { CALENDLY_URL, INSTAGRAM_URL, SECTIONS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/12">
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
        <Image
          src="/brand/logo-white.png"
          alt="Suits By Roseign"
          width={140}
          height={140}
          className="h-24 w-auto object-contain"
        />
        <p className="font-display italic text-xl text-ivory">
          Effortless Elegance, Tailored Perfection.
        </p>
        <p className="eyebrow">Toronto, Canada</p>

        <nav className="flex flex-wrap justify-center gap-8 mt-4" aria-label="Footer">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="eyebrow !text-ivory/75 hover:!text-ivory transition-colors duration-300"
            >
              {section.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow !text-ivory/75 hover:!text-ivory transition-colors duration-300"
          >
            Book
          </a>
        </nav>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow !text-ivory/75 hover:!text-ivory transition-colors duration-300"
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
