import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "outline" | "ghost";
};

export default function Button({ href, variant = "outline", className = "", children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 border border-ivory px-8 py-3 eyebrow transition-colors duration-300 ease-out";
  const styles =
    variant === "outline"
      ? "text-ivory hover:bg-ivory hover:text-ink"
      : "text-ivory/70 hover:text-ivory border-transparent";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
