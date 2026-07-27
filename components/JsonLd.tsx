import { CALENDLY_URL, INSTAGRAM_URL } from "@/lib/site";

const AREAS = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Scarborough",
  "Richmond Hill",
  "Oakville",
  "Ajax",
  "Pickering",
  "Whitby",
  "Oshawa",
];

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Suits By Roseign",
    description:
      "Mobile bespoke tailoring for weddings, business and formalwear across the Greater Toronto Area.",
    image: "https://suitsbyroseign.ca/brand/og-image.jpg",
    url: "https://suitsbyroseign.ca",
    sameAs: [INSTAGRAM_URL],
    areaServed: AREAS.map((name) => ({ "@type": "City", name })),
    priceRange: "$$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tailoring services",
      itemListElement: [
        "Wedding Suits",
        "Business Suits",
        "Black Tie",
        "Made-to-Measure",
        "Bespoke",
        "Shirting & Accessories",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: CALENDLY_URL,
      name: "Book a fitting",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
