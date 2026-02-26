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

export type NavLabels = {
  about: string;
  classes: string;
  pricing: string;
  join: string;
};

export type ClassCard = {
  groupSlug: "hot-yoga" | "strength-fundamentals" | "mobility-recovery" | "mom-dad-baby";
  title: string;
  tagline: string;
  description: string;
  image: string;
  videoSrc?: string;
  streamId?: string;
  iframeSrc?: string;
};

export type FounderGalleryImage = {
  src: string;
  alt: string;
};

export type PricingTier = {
  name: string;
  price: string;
  amountAmd: number;
  regularPrice: string;
  commitment: string;
  perks: string;
  cta: string;
  featured?: boolean;
};

export type PricingLabels = {
  regularPrice: string;
  commitment: string;
  perks: string;
  featured: string;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export type StoryStat = {
  value: string;
  label: string;
};

export type LandingContent = {
  siteName: string;
  cityLabel: string;
  languageSelectorLabel: string;
  languageNames: Record<Locale, string>;
  instagramHandle: string;
  instagramUrl: string;
  telegramUrl: string;
  facebookUrl: string;
  navLabels: NavLabels;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;
  scrollIndicatorLabel: string;
  classFormatsBadge: string;
  conceptTitle: string;
  conceptIntro: string;
  classCards: readonly ClassCard[];
  conceptStoryParagraph: string;
  yerevanBadge: string;
  yerevanTitle: string;
  yerevanBody: string;
  yerevanStats: readonly StoryStat[];
  founderBadge: string;
  founderTitle: string;
  founderName: string;
  founderBio: string;
  founderQuote: string;
  founderCredentials: readonly string[];
  founderGallery: readonly FounderGalleryImage[];
  pricingBadge: string;
  pricingTitle: string;
  pricingTiers: readonly PricingTier[];
  pricingLabels: PricingLabels;
  socialBadge: string;
  socialTitle: string;
  socialFollowLabel: string;
  socialGridImageAlt: string;
  testimonials: readonly Testimonial[];
  waitlistEyebrow: string;
  waitlistTitle: string;
  waitlistSubtitle: string;
  footerTagline: string;
  footerInstagramCta: string;
  privacyLabel: string;
  termsLabel: string;
  cookieBannerText: string;
  cookieAcceptLabel: string;
  cookieDeclineLabel: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
};

const languageNames: Record<Locale, string> = {
  en: "English",
  hy: "Հայերեն",
  ru: "Русский"
};

const DEFAULT_CLOUDFLARE_STREAM_CUSTOMER_HOST = "customer-bvw30n7zlfevs367.cloudflarestream.com";

function resolveCloudflareStreamCustomerHost(): string {
  const configuredHost =
    process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim();

  if (!configuredHost) {
    return DEFAULT_CLOUDFLARE_STREAM_CUSTOMER_HOST;
  }

  return configuredHost.endsWith(".cloudflarestream.com")
    ? configuredHost
    : `${configuredHost}.cloudflarestream.com`;
}

function buildCloudflareIframeUrl(streamId: string): string {
  const cloudflareHost = resolveCloudflareStreamCustomerHost();
  const poster = encodeURIComponent(
    `https://${cloudflareHost}/${streamId}/thumbnails/thumbnail.jpg?time=&height=600`
  );

  return `https://${cloudflareHost}/${streamId}/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false&poster=${poster}`;
}

const cloudflareClassStreams = {
  hotPowerFlow: process.env.NEXT_PUBLIC_CLOUDFLARE_HOT_POWER_FLOW_STREAM_ID ?? "b0df2d9ced432615b29302fb6b30cf9d",
  dumbbellSculpt: process.env.NEXT_PUBLIC_CLOUDFLARE_DUMBBELL_SCULPT_STREAM_ID ?? "18ce772a06872ca6353e3ad9e57bed67",
  babyMeFoundations:
    process.env.NEXT_PUBLIC_CLOUDFLARE_BABY_ME_FOUNDATIONS_STREAM_ID ?? "47c10b3289b69dff2340325f693af189",
  mobilityReset: process.env.NEXT_PUBLIC_CLOUDFLARE_MOBILITY_RESET_STREAM_ID ?? "c2ce3e1a6e52c2bd4f3ed3c2feb165b9"
} as const;

const cloudflareClassIframes = {
  hotPowerFlow:
    process.env.NEXT_PUBLIC_CLOUDFLARE_HOT_POWER_FLOW_IFRAME_URL ??
    process.env.NEXT_PUBLIC_CLOUDFLARE_YOGA_IFRAME_URL ??
    buildCloudflareIframeUrl(cloudflareClassStreams.hotPowerFlow),
  dumbbellSculpt:
    process.env.NEXT_PUBLIC_CLOUDFLARE_DUMBBELL_SCULPT_IFRAME_URL ??
    buildCloudflareIframeUrl(cloudflareClassStreams.dumbbellSculpt),
  babyMeFoundations:
    process.env.NEXT_PUBLIC_CLOUDFLARE_BABY_ME_FOUNDATIONS_IFRAME_URL ??
    buildCloudflareIframeUrl(cloudflareClassStreams.babyMeFoundations),
  mobilityReset:
    process.env.NEXT_PUBLIC_CLOUDFLARE_MOBILITY_RESET_IFRAME_URL ??
    buildCloudflareIframeUrl(cloudflareClassStreams.mobilityReset)
} as const;

export function getNavItems(labels: NavLabels): { id: SectionId; label: string }[] {
  return [
    { id: SECTION_IDS.yerevanStory, label: labels.about },
    { id: SECTION_IDS.concept, label: labels.classes },
    { id: SECTION_IDS.pricing, label: labels.pricing },
    { id: SECTION_IDS.waitlist, label: labels.join }
  ];
}

const enContent: LandingContent = {
  siteName: "Sofi Fitness",
  cityLabel: "Yerevan, Armenia",
  languageSelectorLabel: "Language",
  languageNames,
  instagramHandle: "studioyerevan",
  instagramUrl: "https://instagram.com/studioyerevan",
  telegramUrl: "https://t.me/studioyerevan",
  facebookUrl: "https://facebook.com/studioyerevan",
  navLabels: {
    about: "About",
    classes: "Classes",
    pricing: "Pricing",
    join: "Join"
  },
  badge: "Yerevan's First · Coming 2026",
  heroHeadline: "Where Movement Meets the Mountains",
  heroSubheadline:
    "Hot yoga · Strength · Mobility & Recovery — Yerevan's first English-friendly boutique studio",
  heroCta: "Join the Waitlist",
  scrollIndicatorLabel: "Scroll to explore",
  classFormatsBadge: "What We Offer",
  conceptTitle: "What We Offer",
  conceptIntro: "Four signature formats: Hot Yoga, Strength Fundamentals, Mobility + Recovery, and Mom/Dad + Baby.",
  classCards: [
    {
      groupSlug: "hot-yoga",
      title: "Hot Yoga",
      tagline: "Hot Power Flow",
      description:
        "A dynamic heated vinyasa that builds flexibility, full-body strength, and focused endurance in a 95°F studio.",
      image: "/images/gallery/fitness-2.jpg",
      videoSrc: "/videos/classes/hot-power-flow.mp4",
      streamId: cloudflareClassStreams.hotPowerFlow,
      iframeSrc: cloudflareClassIframes.hotPowerFlow
    },
    {
      groupSlug: "strength-fundamentals",
      title: "Strength Fundamentals",
      tagline: "Dumbbell Sculpt",
      description:
        "A fast-paced full-body strength circuit with Bala Bars to build lean muscle, elevate heart rate, and drive real-world power.",
      image: "/images/gallery/fitness-3.jpg",
      videoSrc: "/videos/classes/dumbbell-sculpt.mp4",
      streamId: cloudflareClassStreams.dumbbellSculpt,
      iframeSrc: cloudflareClassIframes.dumbbellSculpt
    },
    {
      groupSlug: "mobility-recovery",
      title: "Mobility & Recovery",
      tagline: "Mobility Reset",
      description:
        "An active recovery class with joint mobility, spinal work, deep hip opening, and breathwork to restore range of motion.",
      image: "/images/gallery/fitness-4.jpg",
      videoSrc: "/videos/classes/mobility-reset.mp4",
      streamId: cloudflareClassStreams.mobilityReset,
      iframeSrc: cloudflareClassIframes.mobilityReset
    },
    {
      groupSlug: "mom-dad-baby",
      title: "Mom/Dad & Baby",
      tagline: "Baby + Me Foundations",
      description:
        "A gentle postpartum-safe class for parents and newborns focused on core rehab, pelvic floor activation, and supported movement.",
      image: "/images/gallery/fitness-6.jpg",
      videoSrc: "/videos/classes/baby-me-foundations.mp4",
      streamId: cloudflareClassStreams.babyMeFoundations,
      iframeSrc: cloudflareClassIframes.babyMeFoundations
    }
  ],
  conceptStoryParagraph:
    "We're building something Yerevan has never seen — a boutique fitness space designed for the international community. English-friendly classes. World-class formats. A studio that feels like the ones you loved in New York, London, or LA — with Mount Ararat in the window.",
  yerevanBadge: "The Yerevan Story",
  yerevanTitle: "Born in Yerevan. Made for the World.",
  yerevanBody:
    "Yerevan is having a moment. A creative, international community is growing in one of the world's oldest cities. We're here to move with it.",
  yerevanStats: [
    { value: "70,000+", label: "expats" },
    { value: "0", label: "boutique studios" },
    { value: "1", label: "coming soon" }
  ],
  founderBadge: "Meet the Founder",
  founderTitle: "Meet the Founder",
  founderName: "Marzie Zare, Founder & Lead Instructor",
  founderBio:
    "With a degree in Physical Education and years of experience as a gym instructor and English teacher, Marzie has spent her career helping people move better. She's bringing world-class boutique fitness to Yerevan because this city — and its growing international community — deserves it.",
  founderQuote:
    "I've spent my career helping people move better. Yerevan deserves a studio that matches its energy.",
  founderCredentials: [
    "Physical Education Degree",
    "Certified Gym Instructor",
    "English Language Teaching"
  ],
  founderGallery: [
    { src: "/images/founder/founder-1.png", alt: "Marzie Zare leading a studio session" },
    { src: "/images/founder/founder-2.webp", alt: "Marzie Zare in motion during class" },
    { src: "/images/founder/founder-3.png", alt: "Marzie Zare portrait at Sofi Fitness" }
  ],
  pricingBadge: "Founding Rates",
  pricingTitle: "Founding Member Pricing",
  pricingTiers: [
    {
      name: "Early Bird Deposit",
      price: "10,000 ֏ (refundable)",
      amountAmd: 10000,
      regularPrice: "—",
      commitment: "None",
      perks: "Priority access + credit on opening",
      cta: "Reserve My Spot"
    },
    {
      name: "Founding 10-Pack",
      price: "36,000 ֏ (save 25%)",
      amountAmd: 36000,
      regularPrice: "48,000 ֏",
      commitment: "No expiry",
      perks: "Founding member badge, priority booking",
      cta: "Lock In My Rate"
    },
    {
      name: "Founding Unlimited",
      price: "39,600 ֏/mo (save 34%)",
      amountAmd: 39600,
      regularPrice: "60,000 ֏/mo",
      commitment: "3-month minimum",
      perks: "All classes unlimited, VIP events, lifetime rate lock",
      cta: "Become a Founder",
      featured: true
    }
  ],
  pricingLabels: {
    regularPrice: "Regular price",
    commitment: "Commitment",
    perks: "Perks",
    featured: "Most Popular"
  },
  socialBadge: "Community",
  socialTitle: "Community in Motion",
  socialFollowLabel: "Follow our journey @studioyerevan",
  socialGridImageAlt: "Sofi Fitness community moment",
  testimonials: [
    {
      quote: "This is exactly what Yerevan has been missing. I can't wait for the studio to open.",
      author: "Sarah M., digital nomad"
    },
    {
      quote: "The pop-up class at the Cascade was incredible. Best workout I've had in Yerevan.",
      author: "Armen K., repatriated diaspora"
    },
    {
      quote: "Finally, a fitness community for English speakers in Yerevan. This fills a huge gap.",
      author: "Katya D., tech professional"
    }
  ],
  waitlistEyebrow: "Primary Conversion",
  waitlistTitle: "Join the Movement",
  waitlistSubtitle:
    "Be the first to know when we open. Founding members get exclusive rates, priority booking, and VIP access to our launch events.",
  footerTagline: "Sofi Fitness — Move with Yerevan.",
  footerInstagramCta: "Follow us on Instagram for class updates and Yerevan fitness content",
  privacyLabel: "Privacy Policy",
  termsLabel: "Terms of Service",
  cookieBannerText:
    "We use cookies to improve your experience. By continuing, you agree to our Privacy Policy.",
  cookieAcceptLabel: "Accept",
  cookieDeclineLabel: "Decline",
  metaTitle: "Sofi Fitness — Hot Yoga, Strength & Mobility in Yerevan",
  metaDescription:
    "Yerevan's first English-friendly boutique fitness studio. Hot yoga, strength, mobility & recovery classes in Kentron. Join the waitlist for founding member pricing.",
  ogTitle: "Sofi Fitness — Yerevan's First Boutique Fitness Studio",
  ogDescription: "Hot yoga · Strength · Mobility & Recovery. Join the waitlist."
};

const hyContent: LandingContent = {
  siteName: "Sofi Fitness",
  cityLabel: "Երևան, Հայաստան",
  languageSelectorLabel: "Լեզու",
  languageNames,
  instagramHandle: "studioyerevan",
  instagramUrl: "https://instagram.com/studioyerevan",
  telegramUrl: "https://t.me/studioyerevan",
  facebookUrl: "https://facebook.com/studioyerevan",
  navLabels: {
    about: "Մեր մասին",
    classes: "Պարապմունքներ",
    pricing: "Գներ",
    join: "Միանալ"
  },
  badge: "Երևանում առաջինը · Շուտով 2026",
  heroHeadline: "Որտեղ շարժումը հանդիպում է լեռներին",
  heroSubheadline:
    "Թեժ յոգա · Ուժային պարապմունքներ · Շարժունակություն և վերականգնում — Երևանի առաջին անգլերենալեզու բուտիկ ստուդիան",
  heroCta: "Միանալ սպասման ցուցակին",
  scrollIndicatorLabel: "Թերթեք՝ շարունակելու համար",
  classFormatsBadge: "Ինչ ենք առաջարկում",
  conceptTitle: "Ինչ ենք առաջարկում",
  conceptIntro: "Չորս հիմնական ձևաչափ՝ Թեժ յոգա, Ուժի հիմունքներ, Շարժունակություն և վերականգնում, Մամա/Պապա և երեխա։",
  classCards: [
    {
      groupSlug: "hot-yoga",
      title: "Թեժ յոգա",
      tagline: "Hot Power Flow",
      description:
        "Դինամիկ տաք վինյասա, որը 35°C ստուդիայում զարգացնում է ճկունություն, ամբողջ մարմնի ուժ և կենտրոնացված դիմացկունություն։",
      image: "/images/gallery/fitness-2.jpg",
      videoSrc: "/videos/classes/hot-power-flow.mp4",
      streamId: cloudflareClassStreams.hotPowerFlow,
      iframeSrc: cloudflareClassIframes.hotPowerFlow
    },
    {
      groupSlug: "strength-fundamentals",
      title: "Ուժի հիմունքներ",
      tagline: "Dumbbell Sculpt",
      description:
        "Արագ տեմպով ամբողջ մարմնի ուժային սեսիա Bala Bar-երով, որը ձևավորում է նիհար մկաններ, բարձրացնում սրտի հաճախությունը և ուժեղացնում ֆունկցիոնալ ուժը։",
      image: "/images/gallery/fitness-3.jpg",
      videoSrc: "/videos/classes/dumbbell-sculpt.mp4",
      streamId: cloudflareClassStreams.dumbbellSculpt,
      iframeSrc: cloudflareClassIframes.dumbbellSculpt
    },
    {
      groupSlug: "mobility-recovery",
      title: "Շարժունակություն և վերականգնում",
      tagline: "Mobility Reset",
      description:
        "Ակտիվ վերականգնման դաս՝ հոդերի շարժունակությամբ, ողնաշարի աշխատանքով, ազդրի խորը բացումներով և շնչառությամբ՝ շարժման ծավալը վերականգնելու համար։",
      image: "/images/gallery/fitness-4.jpg",
      videoSrc: "/videos/classes/mobility-reset.mp4",
      streamId: cloudflareClassStreams.mobilityReset,
      iframeSrc: cloudflareClassIframes.mobilityReset
    },
    {
      groupSlug: "mom-dad-baby",
      title: "Մամա/Պապա և երեխա",
      tagline: "Baby + Me Foundations",
      description:
        "Նուրբ, հետծննդյան փուլին անվտանգ դաս ծնողների և նորածինների համար՝ կորի վերականգնման, կոնքի հատակի ակտիվացման և աջակցվող շարժման շեշտով։",
      image: "/images/gallery/fitness-6.jpg",
      videoSrc: "/videos/classes/baby-me-foundations.mp4",
      streamId: cloudflareClassStreams.babyMeFoundations,
      iframeSrc: cloudflareClassIframes.babyMeFoundations
    }
  ],
  conceptStoryParagraph:
    "Մենք ստեղծում ենք մի բան, ինչ Երևանը դեռ չի տեսել՝ բուտիկ ֆիթնես տարածք միջազգային համայնքի համար։ Անգլերենով դասեր։ Համաշխարհային մակարդակի ձևաչափեր։ Ստուդիա, որը հիշեցնում է Նյու Յորքի, Լոնդոնի և Լոս Անջելեսի սիրելի ստուդիաները՝ Արարատի տեսարանով։",
  yerevanBadge: "Երևանի պատմությունը",
  yerevanTitle: "Ծնվել է Երևանում։ Ստեղծվել է աշխարհի համար։",
  yerevanBody:
    "Երևանը հիմա ապրում է իր կարևոր պահը։ Ստեղծարար և միջազգային համայնքը աճում է աշխարհի ամենահին քաղաքներից մեկում։ Մենք այստեղ ենք՝ շարժվելու դրա հետ։",
  yerevanStats: [
    { value: "70,000+", label: "արտասահմանցիներ" },
    { value: "0", label: "բուտիկ ստուդիա" },
    { value: "1", label: "շուտով" }
  ],
  founderBadge: "Ծանոթացեք հիմնադրին",
  founderTitle: "Ծանոթացեք հիմնադրին",
  founderName: "Marzie Zare, Founder & Lead Instructor",
  founderBio:
    "Ֆիզիկական դաստիարակության կրթությամբ և մարզիչ ու անգլերենի դասավանդման տարիների փորձով՝ Մարզին իր կարիերան նվիրել է մարդկանց ավելի լավ շարժվելուն օգնելուն։ Նա համաշխարհային մակարդակի բուտիկ ֆիթնեսը բերում է Երևան, որովհետև այս քաղաքը և նրա աճող միջազգային համայնքը արժանի են դրան։",
  founderQuote:
    "Ես իմ կարիերան նվիրել եմ մարդկանց ավելի լավ շարժվելուն օգնելուն։ Երևանը արժանի է ստուդիայի, որը համապատասխանում է իր էներգիային։",
  founderCredentials: [
    "Ֆիզդաստիարակության դիպլոմ",
    "Սերտիֆիկացված մարզիչ",
    "Անգլերենի դասավանդում"
  ],
  founderGallery: [
    { src: "/images/founder/founder-1.png", alt: "Մարզի Զարեն վարում է ստուդիայի դաս" },
    { src: "/images/founder/founder-2.webp", alt: "Մարզի Զարեն շարժման պահին" },
    { src: "/images/founder/founder-3.png", alt: "Մարզի Զարեի դիմանկար Sofi Fitness-ում" }
  ],
  pricingBadge: "Հիմնադիրների գներ",
  pricingTitle: "Հիմնադիր անդամակցության գներ",
  pricingTiers: [
    {
      name: "Վաղ ամրագրում",
      price: "10,000 ֏ (վերադարձելի)",
      amountAmd: 10000,
      regularPrice: "—",
      commitment: "Առանց պարտավորության",
      perks: "Առաջնահերթ մուտք + կրեդիտ բացման օրը",
      cta: "Ամրագրել տեղը"
    },
    {
      name: "Հիմնադիր 10-փաթեթ",
      price: "36,000 ֏ (25% խնայողություն)",
      amountAmd: 36000,
      regularPrice: "48,000 ֏",
      commitment: "Առանց ժամկետի",
      perks: "Հիմնադիր անդամի նշան, առաջնահերթ ամրագրում",
      cta: "Ամրագրել գինը"
    },
    {
      name: "Հիմնադիր անսահմանափակ",
      price: "39,600 ֏/ամիս (34% խնայողություն)",
      amountAmd: 39600,
      regularPrice: "60,000 ֏/ամիս",
      commitment: "Նվազագույնը 3 ամիս",
      perks: "Բոլոր դասերը անսահմանափակ, VIP միջոցառումներ, գնի ցմահ ամրագրում",
      cta: "Դառնալ հիմնադիր",
      featured: true
    }
  ],
  pricingLabels: {
    regularPrice: "Սովորական գին",
    commitment: "Պարտավորություն",
    perks: "Առավելություններ",
    featured: "Ամենապահանջված"
  },
  socialBadge: "Համայնք",
  socialTitle: "Համայնքը շարժման մեջ",
  socialFollowLabel: "Հետևեք մեր ճանապարհին @studioyerevan",
  socialGridImageAlt: "Sofi Fitness համայնքի պահ",
  testimonials: [
    {
      quote: "Սա հենց այն է, ինչ Երևանին պակասում էր։ Անհամբեր սպասում եմ ստուդիայի բացմանը։",
      author: "Սառա Մ., թվային նոմադ"
    },
    {
      quote: "Կասկադի մոտ պոպ-ափ պարապմունքը հիանալի էր։ Երևանում ունեցածս լավագույն մարզումն էր։",
      author: "Արմեն Կ., սփյուռքից վերադարձած"
    },
    {
      quote: "Վերջապես անգլերեն խոսողների համար ֆիթնես համայնք Երևանում։ Սա լրացնում է մեծ բացը։",
      author: "Կատյա Դ., տեխնոլոգիական մասնագետ"
    }
  ],
  waitlistEyebrow: "Հիմնական գրանցում",
  waitlistTitle: "Միացեք շարժմանը",
  waitlistSubtitle:
    "Առաջինը իմացեք մեր բացման մասին։ Հիմնադիր անդամները կստանան բացառիկ գներ, առաջնահերթ ամրագրում և VIP մուտք բացման միջոցառումներին։",
  footerTagline: "Sofi Fitness — Շարժվիր Երևանի հետ։",
  footerInstagramCta: "Հետևեք մեզ Instagram-ում՝ դասերի թարմացումների և Երևանի ֆիթնես բովանդակության համար",
  privacyLabel: "Գաղտնիության քաղաքականություն",
  termsLabel: "Ծառայության պայմաններ",
  cookieBannerText:
    "Մենք օգտագործում ենք cookie ֆայլեր՝ ձեր փորձը բարելավելու համար։ Շարունակելով՝ դուք համաձայնում եք մեր Գաղտնիության քաղաքականությանը։",
  cookieAcceptLabel: "Ընդունել",
  cookieDeclineLabel: "Մերժել",
  metaTitle: "Sofi Fitness — Թեժ յոգա, ուժային և շարժունակություն Երևանում",
  metaDescription:
    "Երևանի առաջին անգլերենալեզու բուտիկ ֆիթնես ստուդիան։ Թեժ յոգա, ուժային, շարժունակություն և վերականգնում Կենտրոնում։ Միացեք սպասման ցուցակին հիմնադիր գներով։",
  ogTitle: "Sofi Fitness — Երևանի առաջին բուտիկ ֆիթնես ստուդիան",
  ogDescription: "Թեժ յոգա · Ուժային · Շարժունակություն և վերականգնում։ Միացեք սպասման ցուցակին։"
};

const ruContent: LandingContent = {
  siteName: "Sofi Fitness",
  cityLabel: "Ереван, Армения",
  languageSelectorLabel: "Язык",
  languageNames,
  instagramHandle: "studioyerevan",
  instagramUrl: "https://instagram.com/studioyerevan",
  telegramUrl: "https://t.me/studioyerevan",
  facebookUrl: "https://facebook.com/studioyerevan",
  navLabels: {
    about: "О нас",
    classes: "Занятия",
    pricing: "Цены",
    join: "Записаться"
  },
  badge: "Первый в Ереване · Открытие в 2026",
  heroHeadline: "Где движение встречает горы",
  heroSubheadline:
    "Горячая йога · Силовые тренировки · Мобильность и восстановление — первая англоязычная бутик-студия Еревана",
  heroCta: "Записаться в лист ожидания",
  scrollIndicatorLabel: "Листайте, чтобы узнать больше",
  classFormatsBadge: "Наши направления",
  conceptTitle: "Что мы предлагаем",
  conceptIntro: "Четыре ключевых формата: Горячая йога, Силовые основы, Мобильность и восстановление, Мама/Папа и малыш.",
  classCards: [
    {
      groupSlug: "hot-yoga",
      title: "Горячая йога",
      tagline: "Hot Power Flow",
      description:
        "Динамичная горячая виньяса в студии 35°C, которая развивает гибкость, силу всего тела и устойчивую концентрацию.",
      image: "/images/gallery/fitness-2.jpg",
      videoSrc: "/videos/classes/hot-power-flow.mp4",
      streamId: cloudflareClassStreams.hotPowerFlow,
      iframeSrc: cloudflareClassIframes.hotPowerFlow
    },
    {
      groupSlug: "strength-fundamentals",
      title: "Силовые основы",
      tagline: "Dumbbell Sculpt",
      description:
        "Быстрая круговая силовая тренировка на все тело с Bala Bars, которая формирует сухую мышечную массу и повышает рабочую выносливость.",
      image: "/images/gallery/fitness-3.jpg",
      videoSrc: "/videos/classes/dumbbell-sculpt.mp4",
      streamId: cloudflareClassStreams.dumbbellSculpt,
      iframeSrc: cloudflareClassIframes.dumbbellSculpt
    },
    {
      groupSlug: "mobility-recovery",
      title: "Мобильность и восстановление",
      tagline: "Mobility Reset",
      description:
        "Класс активного восстановления с мобильностью суставов, работой со спиной, глубоким раскрытием бедер и дыхательными практиками для возврата амплитуды движения.",
      image: "/images/gallery/fitness-4.jpg",
      videoSrc: "/videos/classes/mobility-reset.mp4",
      streamId: cloudflareClassStreams.mobilityReset,
      iframeSrc: cloudflareClassIframes.mobilityReset
    },
    {
      groupSlug: "mom-dad-baby",
      title: "Мама/Папа и малыш",
      tagline: "Baby + Me Foundations",
      description:
        "Мягкий и безопасный послеродовой класс для родителей с новорожденными: восстановление кора, активация мышц тазового дна и поддерживаемое движение.",
      image: "/images/gallery/fitness-6.jpg",
      videoSrc: "/videos/classes/baby-me-foundations.mp4",
      streamId: cloudflareClassStreams.babyMeFoundations,
      iframeSrc: cloudflareClassIframes.babyMeFoundations
    }
  ],
  conceptStoryParagraph:
    "Мы создаем то, чего Ереван еще не видел — бутик-фитнес пространство для международного сообщества. Занятия на английском. Форматы мирового уровня. Студия, которая напоминает те, что вы любили в Нью-Йорке, Лондоне или Лос-Анджелесе — но с видом на Арарат.",
  yerevanBadge: "История Еревана",
  yerevanTitle: "Родился в Ереване. Создан для мира.",
  yerevanBody:
    "Ереван переживает особый момент. Креативное международное сообщество растет в одном из древнейших городов мира. Мы здесь, чтобы двигаться вместе с ним.",
  yerevanStats: [
    { value: "70,000+", label: "экспатов" },
    { value: "0", label: "бутик-студий" },
    { value: "1", label: "уже скоро" }
  ],
  founderBadge: "Познакомьтесь с основательницей",
  founderTitle: "Познакомьтесь с основательницей",
  founderName: "Marzie Zare, Founder & Lead Instructor",
  founderBio:
    "С дипломом в области физического воспитания и многолетним опытом работы инструктором и преподавателем английского языка Марзи посвятила карьеру тому, чтобы помогать людям двигаться лучше. Она приносит бутик-фитнес мирового уровня в Ереван, потому что этот город и его растущее международное сообщество этого заслуживают.",
  founderQuote:
    "Я посвятила свою карьеру тому, чтобы помогать людям двигаться лучше. Ереван заслуживает студию, которая соответствует его энергии.",
  founderCredentials: [
    "Диплом по физическому воспитанию",
    "Сертифицированный инструктор",
    "Преподаватель английского языка"
  ],
  founderGallery: [
    { src: "/images/founder/founder-1.png", alt: "Марзи Заре проводит занятие в студии" },
    { src: "/images/founder/founder-2.webp", alt: "Марзи Заре в движении во время класса" },
    { src: "/images/founder/founder-3.png", alt: "Портрет Марзи Заре в Sofi Fitness" }
  ],
  pricingBadge: "Цены для основателей",
  pricingTitle: "Тарифы founding members",
  pricingTiers: [
    {
      name: "Ранний депозит",
      price: "10,000 ֏ (возвратный)",
      amountAmd: 10000,
      regularPrice: "—",
      commitment: "Без обязательств",
      perks: "Приоритетный доступ + кредит при открытии",
      cta: "Забронировать место"
    },
    {
      name: "Пакет основателя: 10 занятий",
      price: "36,000 ֏ (скидка 25%)",
      amountAmd: 36000,
      regularPrice: "48,000 ֏",
      commitment: "Без срока действия",
      perks: "Значок основателя, приоритетная запись",
      cta: "Зафиксировать цену"
    },
    {
      name: "Безлимит основателя",
      price: "39,600 ֏/мес. (скидка 34%)",
      amountAmd: 39600,
      regularPrice: "60,000 ֏/мес.",
      commitment: "Минимум 3 месяца",
      perks: "Все занятия без ограничений, VIP-мероприятия, пожизненная фиксация цены",
      cta: "Стать основателем",
      featured: true
    }
  ],
  pricingLabels: {
    regularPrice: "Обычная цена",
    commitment: "Обязательства",
    perks: "Преимущества",
    featured: "Самый популярный"
  },
  socialBadge: "Сообщество",
  socialTitle: "Сообщество в движении",
  socialFollowLabel: "Следите за нашим путём @studioyerevan",
  socialGridImageAlt: "Момент сообщества Sofi Fitness",
  testimonials: [
    {
      quote: "Это именно то, чего не хватало Еревану. Жду не дождусь открытия студии.",
      author: "Sarah M., digital nomad"
    },
    {
      quote: "Поп-ап занятие у Каскада было невероятным. Лучшая тренировка, которая у меня была в Ереване.",
      author: "Armen K., repatriated diaspora"
    },
    {
      quote: "Наконец-то фитнес-сообщество для англоговорящих в Ереване. Это закрывает огромный пробел.",
      author: "Katya D., tech professional"
    }
  ],
  waitlistEyebrow: "Главная конверсия",
  waitlistTitle: "Присоединяйтесь к движению",
  waitlistSubtitle:
    "Будьте первыми, кто узнает об открытии. Основатели получат эксклюзивные цены, приоритетную запись и VIP-доступ к нашим launch-мероприятиям.",
  footerTagline: "Sofi Fitness — Двигайся с Ереваном.",
  footerInstagramCta: "Подписывайтесь на наш Instagram для новостей о занятиях и фитнес-контента из Еревана",
  privacyLabel: "Политика конфиденциальности",
  termsLabel: "Условия использования",
  cookieBannerText:
    "Мы используем файлы cookie для улучшения вашего опыта. Продолжая, вы соглашаетесь с нашей Политикой конфиденциальности.",
  cookieAcceptLabel: "Принять",
  cookieDeclineLabel: "Отклонить",
  metaTitle: "Sofi Fitness — Горячая йога, силовые и мобильность в Ереване",
  metaDescription:
    "Первая англоязычная бутик-фитнес студия Еревана. Горячая йога, силовые, мобильность и восстановление в Кентроне. Запишитесь в лист ожидания по ценам основателей.",
  ogTitle: "Sofi Fitness — Первая бутик-фитнес студия Еревана",
  ogDescription: "Горячая йога · Силовые · Мобильность и восстановление. Записывайтесь."
};

export const contentByLocale: Record<Locale, LandingContent> = {
  en: enContent,
  hy: hyContent,
  ru: ruContent
};
