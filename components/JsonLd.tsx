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
    sameAs: ["https://instagram.com/suitsbyroseign"],
    areaServed: AREAS.map((name) => ({ "@type": "City", name })),
    priceRange: "$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
