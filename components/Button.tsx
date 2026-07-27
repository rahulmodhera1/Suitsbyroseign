import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  /** Solid CTAs carry the arrow badge the hero introduced. */
  withArrow?: boolean;
  external?: boolean;
  className?: string;
};

/**
 * The site's one button shape, taken from the hero: a pill, either filled
 * ivory with a circular arrow badge, or an ivory hairline outline.
 */
export default function Button({
  href,
  children,
  variant = "solid",
  withArrow = variant === "solid",
  external = false,
  className = "",
}: Props) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (variant === "outline") {
    return (
      <a
        href={href}
        {...externalProps}
        className={`inline-flex h-16 items-center justify-center rounded-full border border-ivory/50 px-9 eyebrow !text-ivory text-sm transition-[background-color,border-color,transform] duration-200 ease-out hover:bg-ivory/10 hover:border-ivory active:scale-[0.97] ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      {...externalProps}
      className={`group inline-flex h-16 items-center gap-5 rounded-full bg-ivory eyebrow !text-ink text-sm transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.97] ${
        withArrow ? "pl-9 pr-3" : "px-9 justify-center"
      } ${className}`}
    >
      {children}
      {withArrow && (
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-ink text-ivory transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M8.5 3.5 13 8l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </a>
  );
}
