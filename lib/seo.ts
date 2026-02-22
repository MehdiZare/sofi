export function buildLocalBusinessStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "Studio Yerevan",
    description:
      "Yerevan's first English-friendly boutique fitness studio offering hot yoga, barre, and Pilates reformer.",
    areaServed: "Yerevan, Armenia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yerevan",
      addressCountry: "AM"
    },
    url: baseUrl,
    sameAs: [
      "https://instagram.com/studioyerevan",
      "https://facebook.com/studioyerevan",
      "https://t.me/studioyerevan"
    ]
  };
}
