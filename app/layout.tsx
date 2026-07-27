import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Grain from "@/components/Grain";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = "https://suitsbyroseign.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Suits By Roseign | Bespoke Tailoring Across the GTA",
    template: "%s | Suits By Roseign",
  },
  description:
    "Effortless elegance, tailored perfection. Mobile bespoke tailoring for weddings, business and formalwear across the Greater Toronto Area.",
  openGraph: {
    title: "Suits By Roseign | Bespoke Tailoring Across the GTA",
    description:
      "Effortless elegance, tailored perfection. Mobile bespoke tailoring for weddings, business and formalwear across the Greater Toronto Area.",
    url: siteUrl,
    siteName: "Suits By Roseign",
    images: ["/brand/og-image.jpg"],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suits By Roseign | Bespoke Tailoring Across the GTA",
    description:
      "Effortless elegance, tailored perfection. Mobile bespoke tailoring across the GTA.",
    images: ["/brand/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-ink text-ivory antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ivory focus:text-ink focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Grain />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
