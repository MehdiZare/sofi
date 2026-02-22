import type { Locale } from "@/lib/i18n";

export const WAITLIST_CAPACITY = 100;

export const SECTION_IDS = {
  hero: "hero",
  concept: "concept",
  yerevanStory: "yerevan-story",
  founder: "founder",
  pricing: "pricing",
  socialProof: "social-proof",
  waitlist: "waitlist"
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: SECTION_IDS.concept, label: "Offer" },
  { id: SECTION_IDS.yerevanStory, label: "Story" },
  { id: SECTION_IDS.founder, label: "Founder" },
  { id: SECTION_IDS.pricing, label: "Pricing" },
  { id: SECTION_IDS.waitlist, label: "Waitlist" }
];

const commonContent = {
  siteName: "Studio Yerevan",
  cityLabel: "Yerevan, Armenia",
  badge: "Yerevan's First • Coming 2026",
  heroHeadline: "Where Movement Meets the Mountains",
  heroSubheadline:
    "Hot yoga • Barre • Pilates Reformer — Yerevan's first English-friendly boutique studio.",
  heroCta: "Join the Waitlist",
  conceptTitle: "What We Offer",
  conceptIntro:
    "We're building something Yerevan has never seen — a boutique fitness space designed for the international community.",
  yerevanTitle: "Born in Yerevan. Made for the World.",
  yerevanBody:
    "Yerevan is having a moment. A creative, international community is growing in one of the world's oldest cities. We're here to move with it.",
  founderTitle: "Meet the Founder",
  founderName: "[Name], Founder & Lead Instructor",
  founderBio:
    "With a physical education background and years coaching in English, she is building the studio she always wished existed in Yerevan.",
  founderQuote:
    "I've spent my career helping people move better. Yerevan deserves a studio that matches its energy.",
  pricingTitle: "Founding Member Pricing",
  socialTitle: "Community in Motion",
  waitlistTitle: "Join the Movement",
  waitlistSubtitle:
    "Be the first to know when we open. Founding members get exclusive rates, priority booking, and VIP access to launch events.",
  footerTagline: "Hot yoga, barre, and reformer pilates. Coming soon.",
  instagramHandle: "@studioyerevan"
};

export type LandingContent = typeof commonContent;

export const contentByLocale: Record<Locale, LandingContent> = {
  en: commonContent,
  hy: {
    ...commonContent,
    heroCta: "Join the Waitlist",
    waitlistTitle: "Join the Movement"
  },
  ru: {
    ...commonContent,
    heroCta: "Join the Waitlist",
    waitlistTitle: "Join the Movement"
  }
};

export const classCards = [
  {
    title: "Hot Yoga",
    tagline: "Heat. Sweat. Transform.",
    description:
      "The only heated yoga studio in Armenia. 95°F, 60 minutes, complete release.",
    image: "/images/placeholders/hot-yoga.svg"
  },
  {
    title: "Barre",
    tagline: "Grace Meets Strength",
    description: "Ballet-inspired. Full-body burn. No dance experience needed.",
    image: "/images/placeholders/barre.svg"
  },
  {
    title: "Pilates Reformer",
    tagline: "Reform Everything",
    description: "Group reformer classes — first of their kind in Yerevan.",
    image: "/images/placeholders/reformer.svg"
  }
] as const;

export const pricingTiers = [
  {
    name: "Early Bird Deposit",
    price: "$25 (refundable)",
    regularPrice: "—",
    commitment: "None",
    perks: "Priority access + credit on opening",
    cta: "Reserve My Spot"
  },
  {
    name: "Founding 10-Pack",
    price: "$90 (save 25%)",
    regularPrice: "$120",
    commitment: "No expiry",
    perks: "Founding member badge, priority booking",
    cta: "Lock In My Rate",
    featured: true
  },
  {
    name: "Founding Unlimited",
    price: "$99/mo (save 34%)",
    regularPrice: "$150/mo",
    commitment: "3-month minimum",
    perks: "Unlimited classes, VIP events, lifetime rate lock",
    cta: "Become a Founder"
  }
] as const;

export const testimonials = [
  {
    quote:
      "Finally, a fitness concept in Yerevan that feels global and personal at the same time.",
    author: "Pop-up attendee"
  },
  {
    quote: "The energy was incredible. I signed up on the spot.",
    author: "Community member"
  },
  {
    quote: "Professional coaching, warm vibe, and serious programming.",
    author: "Pilates class guest"
  }
] as const;

export const founderCredentials = [
  "BSc Physical Education",
  "Certified Yoga Instructor",
  "Barre Instructor",
  "Pilates Reformer Certified",
  "English-Language Coaching"
] as const;
