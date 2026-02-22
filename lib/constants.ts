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
  concept: string;
  yerevanStory: string;
  founder: string;
  pricing: string;
  waitlist: string;
};

export type ClassCard = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  iframeSrc?: string;
};

export type PricingTier = {
  name: string;
  price: string;
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
  navLabels: NavLabels;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;
  classFormatsBadge: string;
  conceptTitle: string;
  conceptIntro: string;
  classCards: readonly ClassCard[];
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
  pricingBadge: string;
  pricingTitle: string;
  spotsRemainingPrefix: string;
  spotsRemainingSuffix: string;
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
  waitlistAlreadyPrefix: string;
  waitlistAlreadySuffix: string;
  footerTagline: string;
  privacyLabel: string;
  termsLabel: string;
  metaTitle: string;
  metaDescription: string;
};

const languageNames: Record<Locale, string> = {
  en: "English",
  hy: "Հայերեն",
  ru: "Русский"
};

const cloudflareClassIframes = {
  yoga:
    process.env.NEXT_PUBLIC_CLOUDFLARE_YOGA_IFRAME_URL ??
    "https://customer-bvw30n7zlfevs367.cloudflarestream.com/d77a8add3d38d5b5cf48ff9af23b2597/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-bvw30n7zlfevs367.cloudflarestream.com%2Fd77a8add3d38d5b5cf48ff9af23b2597%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
  barre:
    process.env.NEXT_PUBLIC_CLOUDFLARE_BARRE_IFRAME_URL ??
    "https://customer-bvw30n7zlfevs367.cloudflarestream.com/22b23aa7f35b43bce64bf0e1558c5967/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-bvw30n7zlfevs367.cloudflarestream.com%2F22b23aa7f35b43bce64bf0e1558c5967%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
  pilates:
    process.env.NEXT_PUBLIC_CLOUDFLARE_PILATES_IFRAME_URL ??
    "https://customer-bvw30n7zlfevs367.cloudflarestream.com/556595e95c1c6e4583c0d645d846ee11/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-bvw30n7zlfevs367.cloudflarestream.com%2F556595e95c1c6e4583c0d645d846ee11%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
} as const;

export function getNavItems(labels: NavLabels): { id: SectionId; label: string }[] {
  return [
    { id: SECTION_IDS.concept, label: labels.concept },
    { id: SECTION_IDS.yerevanStory, label: labels.yerevanStory },
    { id: SECTION_IDS.founder, label: labels.founder },
    { id: SECTION_IDS.pricing, label: labels.pricing },
    { id: SECTION_IDS.waitlist, label: labels.waitlist }
  ];
}

const enContent: LandingContent = {
  siteName: "Studio Yerevan",
  cityLabel: "Yerevan, Armenia",
  languageSelectorLabel: "Language",
  languageNames,
  navLabels: {
    concept: "Offer",
    yerevanStory: "Story",
    founder: "Co-Founder",
    pricing: "Pricing",
    waitlist: "Waitlist"
  },
  badge: "Yerevan's First • Coming 2026",
  heroHeadline: "Where Movement Meets the Mountains",
  heroSubheadline:
    "Hot yoga • Barre • Pilates Reformer — Yerevan's first English-friendly boutique studio.",
  heroCta: "Join the Waitlist",
  classFormatsBadge: "Class Formats",
  conceptTitle: "What We Offer",
  conceptIntro:
    "We're building something Yerevan has never seen — a boutique fitness space designed for the international community.",
  classCards: [
    {
      title: "Hot Yoga",
      tagline: "Heat. Sweat. Transform.",
      description: "The only heated yoga studio in Armenia. 95°F, 60 minutes, complete release.",
      image: "/images/gallery/fitness-2.jpg",
      iframeSrc: cloudflareClassIframes.yoga
    },
    {
      title: "Barre",
      tagline: "Grace Meets Strength",
      description: "Ballet-inspired. Full-body burn. No dance experience needed.",
      image: "/images/gallery/fitness-3.jpg",
      iframeSrc: cloudflareClassIframes.barre
    },
    {
      title: "Pilates Reformer",
      tagline: "Reform Everything",
      description: "Group reformer classes — first of their kind in Yerevan.",
      image: "/images/gallery/fitness-4.jpg",
      iframeSrc: cloudflareClassIframes.pilates
    }
  ],
  yerevanBadge: "The Yerevan Story",
  yerevanTitle: "Born in Yerevan. Made for the World.",
  yerevanBody:
    "Yerevan is having a moment. A creative, international community is growing in one of the world's oldest cities. We're here to move with it.",
  yerevanStats: [
    { value: "70,000+", label: "Expats in Armenia" },
    { value: "0", label: "Hot yoga studios in Yerevan" },
    { value: "1", label: "Studio launching soon" }
  ],
  founderBadge: "Co-Founder",
  founderTitle: "Meet the Co-Founder",
  founderName: "Marzie Zare, Co-Founder & Lead Instructor",
  founderBio:
    "Originally from Iran and currently pursuing her Master of Sports at the University of Würzburg, Marzie is building the studio she always wished existed in Yerevan. The studio is named after her daughter, Sofia.",
  founderQuote:
    "I've spent my career helping people move better. Yerevan deserves a studio that matches its energy.",
  founderCredentials: [
    "MSc Sports (in progress)",
    "Certified Yoga Instructor",
    "Barre Instructor",
    "Pilates Reformer Certified",
    "English-Language Coaching"
  ],
  pricingBadge: "Founding Rates",
  pricingTitle: "Founding Member Pricing",
  spotsRemainingPrefix: "Only",
  spotsRemainingSuffix: "founding spots remaining",
  pricingTiers: [
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
  ],
  pricingLabels: {
    regularPrice: "Regular",
    commitment: "Commitment",
    perks: "Perks",
    featured: "Most Popular"
  },
  socialBadge: "Social Proof",
  socialTitle: "Community in Motion",
  socialFollowLabel: "Follow our journey @studioyerevan",
  socialGridImageAlt: "Studio community moment",
  testimonials: [
    {
      quote: "Finally, a fitness concept in Yerevan that feels global and personal at the same time.",
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
  ],
  waitlistEyebrow: "Primary Conversion",
  waitlistTitle: "Join the Movement",
  waitlistSubtitle:
    "Be the first to know when we open. Founding members get exclusive rates, priority booking, and VIP access to launch events.",
  waitlistAlreadyPrefix: "Already",
  waitlistAlreadySuffix: "people on the waitlist",
  footerTagline: "Hot yoga, barre, and reformer pilates. Coming soon.",
  privacyLabel: "Privacy Policy",
  termsLabel: "Terms",
  metaTitle: "Studio Yerevan — Hot Yoga, Barre & Pilates in Yerevan",
  metaDescription:
    "Yerevan's first English-friendly boutique fitness studio. Hot yoga, barre, and Pilates reformer classes in Kentron. Join the waitlist for founding member pricing."
};

const hyContent: LandingContent = {
  siteName: "Studio Yerevan",
  cityLabel: "Երևան, Հայաստան",
  languageSelectorLabel: "Լեզու",
  languageNames,
  navLabels: {
    concept: "Առաջարկ",
    yerevanStory: "Պատմություն",
    founder: "Համահիմնադիր",
    pricing: "Գներ",
    waitlist: "Սպասման ցուցակ"
  },
  badge: "Երևանի առաջինը • Բացումը՝ 2026",
  heroHeadline: "Շարժումը հանդիպում է լեռներին",
  heroSubheadline:
    "Թեժ յոգա • Բարե • Ռեֆորմեր փիլատես — Երևանի առաջին անգլախոս բուտիկ ստուդիան։",
  heroCta: "Միացեք սպասման ցուցակին",
  classFormatsBadge: "Դասերի ձևաչափեր",
  conceptTitle: "Ինչ ենք առաջարկում",
  conceptIntro:
    "Մենք ստեղծում ենք մի բան, որը Երևանը դեռ չի տեսել՝ միջազգային համայնքի համար մտածված բուտիկ ֆիթնես տարածք։",
  classCards: [
    {
      title: "Թեժ յոգա",
      tagline: "Ջերմություն. Քրտինք. Փոփոխություն.",
      description: "Հայաստանի միակ տաքացվող յոգայի ստուդիան։ 95°F, 60 րոպե, լիարժեք ազատում։",
      image: "/images/gallery/fitness-2.jpg",
      iframeSrc: cloudflareClassIframes.yoga
    },
    {
      title: "Բարե",
      tagline: "Նրբությունն ու ուժը միասին",
      description: "Բալետից ներշնչված ձևաչափ։ Ամբողջ մարմնի ծանրաբեռնվածություն՝ առանց պարային փորձի։",
      image: "/images/gallery/fitness-3.jpg",
      iframeSrc: cloudflareClassIframes.barre
    },
    {
      title: "Ռեֆորմեր փիլատես",
      tagline: "Փոխիր ամեն ինչ",
      description: "Խմբային ռեֆորմեր դասեր՝ իրենց տեսակի մեջ առաջինը Երևանում։",
      image: "/images/gallery/fitness-4.jpg",
      iframeSrc: cloudflareClassIframes.pilates
    }
  ],
  yerevanBadge: "Երևանի պատմությունը",
  yerevanTitle: "Ծնված Երևանում։ Ստեղծված աշխարհի համար։",
  yerevanBody:
    "Երևանն այսօր արագ փոխվում է։ Միջազգային ու ստեղծարար համայնքը մեծանում է աշխարհի ամենահին քաղաքներից մեկում, և մենք շարժվում ենք դրա հետ միասին։",
  yerevanStats: [
    { value: "70,000+", label: "Միջազգային բնակիչ Հայաստանում" },
    { value: "0", label: "Թեժ յոգայի ստուդիա Երևանում" },
    { value: "1", label: "Ստուդիա՝ բացվում է շուտով" }
  ],
  founderBadge: "Համահիմնադիր",
  founderTitle: "Ծանոթացեք համահիմնադրին",
  founderName: "Marzie Zare, Co-Founder & Lead Instructor",
  founderBio:
    "Իրանից ծագումով և ներկայումս Վյուրզբուրգի համալսարանում սպորտի մագիստրոսական կրթություն ստանալով՝ Մարզին ստեղծում է այն ստուդիան, որը միշտ ուզել է տեսնել Երևանում՝ պրեմիում ձևաչափեր, ջերմ համայնք և միջազգային չափանիշներ։ Ստուդիան անվանվել է նրա դստեր՝ Սոֆիայի պատվին։",
  founderQuote: "Իմ ամբողջ կարիերան մարդկանց ավելի լավ շարժվելուն օգնելու մասին է։ Երևանը արժանի է նման էներգիայով ստուդիայի։",
  founderCredentials: [
    "Սպորտի մագիստրոս (ընթացքում)",
    "Յոգայի սերտիֆիկացված հրահանգիչ",
    "Բարեի հրահանգիչ",
    "Ռեֆորմեր փիլատեսի սերտիֆիկացում",
    "Անգլերենով մարզում"
  ],
  pricingBadge: "Հիմնադիրների գներ",
  pricingTitle: "Հիմնադիր անդամակցության գներ",
  spotsRemainingPrefix: "Մնացել է",
  spotsRemainingSuffix: "հիմնադիր տեղ",
  pricingTiers: [
    {
      name: "Վաղ գրանցման ավանդ",
      price: "$25 (վերադարձվող)",
      regularPrice: "—",
      commitment: "Չկա",
      perks: "Առաջնահերթ հասանելիություն + բացման ժամանակ կրեդիտ",
      cta: "Ամրագրել տեղս"
    },
    {
      name: "Հիմնադիր 10 դաս",
      price: "$90 (25% խնայողություն)",
      regularPrice: "$120",
      commitment: "Ժամկետանցում չկա",
      perks: "Հիմնադիրի նշան, առաջնահերթ ամրագրում",
      cta: "Ֆիքսել գինս",
      featured: true
    },
    {
      name: "Հիմնադիր անսահմանափակ",
      price: "$99/ամիս (34% խնայողություն)",
      regularPrice: "$150/ամիս",
      commitment: "Նվազագույնը 3 ամիս",
      perks: "Անսահմանափակ դասեր, VIP միջոցառումներ, ցմահ գնի ֆիքսում",
      cta: "Դառնալ հիմնադիր"
    }
  ],
  pricingLabels: {
    regularPrice: "Սովորական",
    commitment: "Պարտավորություն",
    perks: "Առավելություններ",
    featured: "Ամենապահանջված"
  },
  socialBadge: "Համայնք",
  socialTitle: "Համայնքը շարժման մեջ",
  socialFollowLabel: "Հետևեք մեր ճանապարհին @studioyerevan",
  socialGridImageAlt: "Ստուդիայի համայնքային պահ",
  testimonials: [
    {
      quote: "Վերջապես Երևանում մի ֆիթնես կոնցեպտ, որը և՛ միջազգային է, և՛ շատ անձնական։",
      author: "Փոփ-ափի մասնակից"
    },
    {
      quote: "Էներգիան անհավանական էր։ Գրանցվեցի տեղում։",
      author: "Համայնքի անդամ"
    },
    {
      quote: "Պրոֆեսիոնալ մոտեցում, ջերմ մթնոլորտ և ուժեղ ծրագիր։",
      author: "Փիլատես դասի մասնակից"
    }
  ],
  waitlistEyebrow: "Հիմնական գրանցում",
  waitlistTitle: "Միացեք շարժմանը",
  waitlistSubtitle:
    "Ստացեք առաջին տեղեկությունը բացման մասին։ Հիմնադիր անդամները ստանում են բացառիկ գներ, առաջնահերթ ամրագրում և VIP մուտք բացման միջոցառումներին։",
  waitlistAlreadyPrefix: "Արդեն",
  waitlistAlreadySuffix: "մարդ սպասման ցուցակում",
  footerTagline: "Թեժ յոգա, բարե և ռեֆորմեր փիլատես։ Շուտով։",
  privacyLabel: "Գաղտնիության քաղաքականություն",
  termsLabel: "Պայմաններ",
  metaTitle: "Studio Yerevan — Թեժ յոգա, բարե և փիլատես Երևանում",
  metaDescription:
    "Երևանի առաջին անգլախոս բուտիկ ֆիթնես ստուդիան։ Թեժ յոգա, բարե և ռեֆորմեր փիլատես։ Միացեք սպասման ցուցակին հիմնադիր անդամի հատուկ գներով։"
};

const ruContent: LandingContent = {
  siteName: "Studio Yerevan",
  cityLabel: "Ереван, Армения",
  languageSelectorLabel: "Язык",
  languageNames,
  navLabels: {
    concept: "Форматы",
    yerevanStory: "История",
    founder: "Сооснователь",
    pricing: "Цены",
    waitlist: "Лист ожидания"
  },
  badge: "Первый в Ереване • Открытие в 2026",
  heroHeadline: "Где движение встречается с горами",
  heroSubheadline:
    "Hot yoga • Barre • Pilates Reformer — первая в Ереване бутик-студия с англоязычной средой.",
  heroCta: "Вступить в лист ожидания",
  classFormatsBadge: "Форматы занятий",
  conceptTitle: "Что мы предлагаем",
  conceptIntro:
    "Мы создаем то, чего Ереван еще не видел: бутик-пространство для фитнеса, спроектированное для международного сообщества.",
  classCards: [
    {
      title: "Hot Yoga",
      tagline: "Тепло. Пот. Трансформация.",
      description: "Единственная горячая йога-студия в Армении. 95°F, 60 минут, полная перезагрузка.",
      image: "/images/gallery/fitness-2.jpg",
      iframeSrc: cloudflareClassIframes.yoga
    },
    {
      title: "Barre",
      tagline: "Грация и сила",
      description: "Вдохновлено балетом. Интенсивная нагрузка на все тело. Опыт танцев не нужен.",
      image: "/images/gallery/fitness-3.jpg",
      iframeSrc: cloudflareClassIframes.barre
    },
    {
      title: "Pilates Reformer",
      tagline: "Переосмысли движение",
      description: "Групповые занятия на реформере — впервые в Ереване.",
      image: "/images/gallery/fitness-4.jpg",
      iframeSrc: cloudflareClassIframes.pilates
    }
  ],
  yerevanBadge: "История Еревана",
  yerevanTitle: "Рождено в Ереване. Создано для мира.",
  yerevanBody:
    "Ереван переживает особый момент. Международное и креативное сообщество растет в одном из древнейших городов мира, и мы двигаемся вместе с ним.",
  yerevanStats: [
    { value: "70,000+", label: "Экспатов в Армении" },
    { value: "0", label: "Студий hot yoga в Ереване" },
    { value: "1", label: "Студия скоро откроется" }
  ],
  founderBadge: "Сооснователь",
  founderTitle: "Познакомьтесь с сооснователем",
  founderName: "Marzie Zare, Co-Founder & Lead Instructor",
  founderBio:
    "Марзи родом из Ирана и сейчас получает степень магистра спорта в Университете Вюрцбурга. Она создает в Ереване студию, которую всегда хотела видеть: премиальные форматы, теплое сообщество и глобальные стандарты. Студия названа в честь ее дочери Софии.",
  founderQuote: "Всю карьеру я помогаю людям двигаться лучше. Ереван заслуживает студию с таким же уровнем энергии.",
  founderCredentials: [
    "Магистр спорта (в процессе)",
    "Сертифицированный инструктор по йоге",
    "Инструктор barre",
    "Сертификация Pilates Reformer",
    "Тренировки на английском языке"
  ],
  pricingBadge: "Цены для основателей",
  pricingTitle: "Тарифы founding members",
  spotsRemainingPrefix: "Осталось",
  spotsRemainingSuffix: "мест для основателей",
  pricingTiers: [
    {
      name: "Ранний депозит",
      price: "$25 (возвратный)",
      regularPrice: "—",
      commitment: "Нет",
      perks: "Приоритетный доступ + кредит при открытии",
      cta: "Забронировать место"
    },
    {
      name: "Founding 10-Pack",
      price: "$90 (экономия 25%)",
      regularPrice: "$120",
      commitment: "Без срока действия",
      perks: "Значок founding member, приоритетное бронирование",
      cta: "Зафиксировать цену",
      featured: true
    },
    {
      name: "Founding Unlimited",
      price: "$99/мес (экономия 34%)",
      regularPrice: "$150/мес",
      commitment: "Минимум 3 месяца",
      perks: "Безлимитные занятия, VIP-события, пожизненная фиксация цены",
      cta: "Стать основателем"
    }
  ],
  pricingLabels: {
    regularPrice: "Обычная цена",
    commitment: "Обязательства",
    perks: "Преимущества",
    featured: "Популярный выбор"
  },
  socialBadge: "Сообщество",
  socialTitle: "Сообщество в движении",
  socialFollowLabel: "Следите за нашим запуском @studioyerevan",
  socialGridImageAlt: "Момент из сообщества студии",
  testimonials: [
    {
      quote: "Наконец-то в Ереване фитнес-концепт, который одновременно международный и по-настоящему личный.",
      author: "Гость pop-up мероприятия"
    },
    {
      quote: "Энергия была невероятной. Я записался сразу на месте.",
      author: "Участник сообщества"
    },
    {
      quote: "Профессиональный подход, теплая атмосфера и сильная программа.",
      author: "Гость занятия Pilates"
    }
  ],
  waitlistEyebrow: "Главная конверсия",
  waitlistTitle: "Присоединяйтесь к движению",
  waitlistSubtitle:
    "Узнайте первыми о дате открытия. Участники founding-списка получают специальные цены, приоритетное бронирование и VIP-доступ к launch-событиям.",
  waitlistAlreadyPrefix: "Уже",
  waitlistAlreadySuffix: "человек в листе ожидания",
  footerTagline: "Hot yoga, barre и reformer pilates. Скоро открытие.",
  privacyLabel: "Политика конфиденциальности",
  termsLabel: "Условия использования",
  metaTitle: "Studio Yerevan — Hot Yoga, Barre и Pilates в Ереване",
  metaDescription:
    "Первая в Ереване англоязычная бутик-студия фитнеса. Hot yoga, barre и reformer pilates. Вступите в лист ожидания и получите цены для founding members."
};

export const contentByLocale: Record<Locale, LandingContent> = {
  en: enContent,
  hy: hyContent,
  ru: ruContent
};
