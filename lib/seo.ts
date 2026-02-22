export function buildLocalBusinessStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "Sofi Fitness",
    description:
      "Yerevan's first English-friendly boutique fitness studio offering hot yoga, strength, mobility, and recovery.",
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
