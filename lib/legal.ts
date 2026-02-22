import type { Locale } from "@/lib/i18n";

type LegalSection = {
  heading: string;
  body: readonly string[];
};

type LegalContent = {
  privacyTitle: string;
  privacyUpdatedAt: string;
  privacySections: readonly LegalSection[];
  termsTitle: string;
  termsUpdatedAt: string;
  termsSections: readonly LegalSection[];
};

export const legalContentByLocale: Record<Locale, LegalContent> = {
  en: {
    privacyTitle: "Privacy Policy",
    privacyUpdatedAt: "Last updated: February 22, 2026",
    privacySections: [
      {
        heading: "Information We Collect",
        body: [
          "When you join our waitlist or contact us, we may collect your name, email address, referral details, and analytics information such as pages viewed and campaign source."
        ]
      },
      {
        heading: "How We Use Information",
        body: [
          "We use this data to manage waitlist access, communicate launch updates, improve site performance, and measure marketing campaign effectiveness."
        ]
      },
      {
        heading: "Data Sharing and Retention",
        body: [
          "We share data only with service providers needed to operate the waitlist, analytics, and communications. We retain personal data only as long as necessary for these purposes and legal obligations."
        ]
      },
      {
        heading: "Your Rights",
        body: [
          "You may request access, correction, or deletion of your personal data at any time by contacting hello@sofia.fitness."
        ]
      }
    ],
    termsTitle: "Terms of Service",
    termsUpdatedAt: "Last updated: February 22, 2026",
    termsSections: [
      {
        heading: "Use of the Site",
        body: [
          "By using this website, you agree to use it lawfully and in a way that does not harm the site, our business, or other users."
        ]
      },
      {
        heading: "Waitlist and Pricing",
        body: [
          "Waitlist positions, founding offers, and pricing details may change before launch. Any promotional terms shown on this site are subject to final confirmation at purchase."
        ]
      },
      {
        heading: "Health and Participation",
        body: [
          "Fitness activities involve physical risk. You are responsible for ensuring you are medically fit before participating in classes."
        ]
      },
      {
        heading: "Contact",
        body: [
          "If you have questions about these terms, contact hello@sofia.fitness."
        ]
      }
    ]
  },
  hy: {
    privacyTitle: "Գաղտնիության քաղաքականություն",
    privacyUpdatedAt: "Վերջին թարմացումը՝ 22 փետրվարի, 2026",
    privacySections: [
      {
        heading: "Ինչ տվյալներ ենք հավաքում",
        body: [
          "Սպասման ցուցակին միանալու կամ մեզ հետ կապ հաստատելու դեպքում կարող ենք հավաքել ձեր անունը, էլ․ հասցեն, հղման տվյալները և անալիտիկ տվյալներ՝ օրինակ այցելած էջերը և արշավի աղբյուրը։"
        ]
      },
      {
        heading: "Ինչպես ենք օգտագործում տվյալները",
        body: [
          "Տվյալներն օգտագործում ենք սպասման ցուցակի կառավարելու, բացման մասին հաղորդակցվելու, կայքի արդյունավետությունը բարելավելու և մարքեթինգային արշավների արդյունավետությունը չափելու համար։"
        ]
      },
      {
        heading: "Տվյալների փոխանցում և պահպանում",
        body: [
          "Տվյալները փոխանցում ենք միայն այն ծառայություններին, որոնք անհրաժեշտ են սպասման ցուցակի, անալիտիկայի և հաղորդակցության աշխատանքի համար։ Անձնական տվյալները պահպանում ենք այնքան ժամանակ, որքան անհրաժեշտ է նշված նպատակների և իրավական պահանջների համար։"
        ]
      },
      {
        heading: "Ձեր իրավունքները",
        body: [
          "Դուք կարող եք ցանկացած պահի խնդրել ձեր անձնական տվյալների հասանելիություն, ճշտում կամ ջնջում՝ գրելով hello@sofia.fitness։"
        ]
      }
    ],
    termsTitle: "Օգտագործման պայմաններ",
    termsUpdatedAt: "Վերջին թարմացումը՝ 22 փետրվարի, 2026",
    termsSections: [
      {
        heading: "Կայքի օգտագործում",
        body: [
          "Օգտվելով կայքից՝ դուք համաձայնում եք այն օգտագործել օրինական ձևով և չվնասել կայքը, մեր բիզնեսը կամ այլ օգտատերերին։"
        ]
      },
      {
        heading: "Սպասման ցուցակ և գներ",
        body: [
          "Սպասման ցուցակի դիրքերը, հիմնադիր առաջարկները և գները կարող են փոխվել մինչև բացումը։ Կայքում ներկայացված ակցիոն պայմանները վերջնականապես հաստատվելու են գնման պահին։"
        ]
      },
      {
        heading: "Առողջություն և մասնակցություն",
        body: [
          "Ֆիթնես ակտիվությունները ներառում են ֆիզիկական ռիսկեր։ Դասերին մասնակցելուց առաջ դուք պատասխանատու եք համոզվելու, որ բժշկական առումով պատրաստ եք։"
        ]
      },
      {
        heading: "Կապ",
        body: [
          "Այս պայմանների վերաբերյալ հարցերի դեպքում գրեք hello@sofia.fitness հասցեին։"
        ]
      }
    ]
  },
  ru: {
    privacyTitle: "Политика конфиденциальности",
    privacyUpdatedAt: "Последнее обновление: 22 февраля 2026",
    privacySections: [
      {
        heading: "Какие данные мы собираем",
        body: [
          "Когда вы присоединяетесь к листу ожидания или связываетесь с нами, мы можем собирать ваше имя, email, данные о рефералах и аналитическую информацию, включая просмотренные страницы и источник кампании."
        ]
      },
      {
        heading: "Как мы используем данные",
        body: [
          "Мы используем эти данные для управления листом ожидания, отправки обновлений о запуске, улучшения работы сайта и оценки эффективности маркетинговых кампаний."
        ]
      },
      {
        heading: "Передача и хранение данных",
        body: [
          "Мы передаем данные только поставщикам сервисов, необходимых для работы листа ожидания, аналитики и коммуникаций. Персональные данные хранятся только столько, сколько требуется для этих целей и выполнения юридических обязательств."
        ]
      },
      {
        heading: "Ваши права",
        body: [
          "Вы можете запросить доступ, исправление или удаление ваших персональных данных в любое время, написав на hello@sofia.fitness."
        ]
      }
    ],
    termsTitle: "Условия использования",
    termsUpdatedAt: "Последнее обновление: 22 февраля 2026",
    termsSections: [
      {
        heading: "Использование сайта",
        body: [
          "Используя этот сайт, вы соглашаетесь использовать его законно и не причинять вред сайту, нашему бизнесу или другим пользователям."
        ]
      },
      {
        heading: "Лист ожидания и цены",
        body: [
          "Позиции в листе ожидания, founding-условия и цены могут измениться до открытия. Любые промо-условия на сайте подлежат финальному подтверждению при покупке."
        ]
      },
      {
        heading: "Здоровье и участие",
        body: [
          "Фитнес-активности связаны с физическим риском. Вы несете ответственность за медицинскую готовность к участию в занятиях."
        ]
      },
      {
        heading: "Контакты",
        body: [
          "Если у вас есть вопросы по этим условиям, свяжитесь с нами: hello@sofia.fitness."
        ]
      }
    ]
  }
};
