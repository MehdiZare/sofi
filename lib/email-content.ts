import type { Locale } from "@/lib/i18n";

type EmailTemplate = {
  subject: string;
  body: string;
};

export type EmailSequenceContent = {
  welcome: EmailTemplate;
  day3: EmailTemplate;
  day7: EmailTemplate;
};

export const emailSequenceByLocale: Record<Locale, EmailSequenceContent> = {
  en: {
    welcome: {
      subject: "You're on the list — Sofi Fitness is coming to Yerevan",
      body:
        "Welcome to the waitlist! You're one of the first to join Yerevan's first boutique fitness studio. We're building hot yoga, strength, mobility & recovery, and mom/dad & baby classes — all in English, right in Kentron. We'll keep you updated on our progress, pop-up class invites, and your founding member perks. In the meantime, follow us on Instagram: {{instagram_handle}}"
    },
    day3: {
      subject: "Here's what we're building for you",
      body:
        "Four formats, one studio. Hot Yoga: 95°F heated room, 60-minute flows for deep detox and flexibility. Strength Fundamentals: dumbbells, bodyweight, proper form — build real, functional strength. Mobility & Recovery: deep stretching, myofascial release, breath work — your body's weekly reset. Mom/Dad & Baby: parent-friendly fitness with baby right beside you. All classes taught in English. Located in Kentron. Founding members get locked-in rates that never go up."
    },
    day7: {
      subject: "Bring a friend, move up the list",
      body:
        "Know someone who'd love boutique fitness in Yerevan? Share your unique link and both of you move up the waitlist. Your referral link: {{referral_link}}. Every friend who joins bumps you closer to founding member status."
    }
  },
  hy: {
    welcome: {
      subject: "Դուք ցուցակում եք — Sofi Fitness-ը գալիս է Երևան",
      body:
        "Բարի գալուստ սպասման ցուցակ։ Դուք առաջիններից եք, ովքեր միանում են Երևանի առաջին բուտիկ ֆիթնես ստուդիային։ Մենք ստեղծում ենք թեժ յոգայի, ուժային, շարժունակության և վերականգնման, ինչպես նաև մամա/պապա + երեխա պարապմունքներ — բոլորը անգլերենով, Կենտրոնում։ Կտեղեկացնենք ձեզ մեր նորությունների, պոպ-ափ դասերի հրավերների և հիմնադիր անդամի առավելությունների մասին։ Այդ ընթացքում հետևեք մեզ Instagram-ում՝ {{instagram_handle}}"
    },
    day3: {
      subject: "Ահա թե ինչ ենք ստեղծում ձեզ համար",
      body:
        "Չորս ձևաչափ, մեկ ստուդիա։ Թեժ յոգա՝ 35°C տաքացված սենյակ, 60 րոպեանոց հոսքեր խորը դետոքսի և ճկունության համար։ Ուժի հիմունքներ՝ հանտելներ, մարմնի քաշ, ճիշտ տեխնիկա — իրական ֆունկցիոնալ ուժ։ Շարժունակություն և վերականգնում՝ խորը ձգումներ, միոֆասցիալ թուլացում, շնչառական աշխատանք — ձեր մարմնի շաբաթական վերագործարկում։ Մամա/Պապա + երեխա՝ ծնողի համար ֆիթնես, երեխան ձեր կողքին։ Բոլոր պարապմունքները անգլերենով։ Տեղակայումը՝ Կենտրոն։ Հիմնադիր անդամները ստանում են գներ, որոնք երբեք չեն թանկանա։"
    },
    day7: {
      subject: "Բերեք ընկերոջ, բարձրացեք ցուցակում",
      body:
        "Գիտե՞ք մեկին, ով կսիրի բուտիկ ֆիթնեսը Երևանում։ Կիսվեք ձեր յուրահատուկ հղումով և երկուսդ էլ կբարձրանաք ցուցակում։ Ձեր ռեֆերալ հղումը՝ {{referral_link}}։ Յուրաքանչյուր միացած ընկեր ձեզ մոտեցնում է հիմնադիր անդամի կարգավիճակին։"
    }
  },
  ru: {
    welcome: {
      subject: "Вы в списке — Sofi Fitness скоро в Ереване",
      body:
        "Добро пожаловать в лист ожидания! Вы одни из первых, кто присоединился к первой бутик-фитнес студии Еревана. Мы создаем занятия по горячей йоге, силовым, мобильности и восстановлению, а также мама/папа + малыш — все на английском, в самом центре Кентрона. Мы будем держать вас в курсе наших новостей, приглашать на поп-ап занятия и сообщать о привилегиях основателей. А пока подписывайтесь на наш Instagram: {{instagram_handle}}"
    },
    day3: {
      subject: "Вот что мы создаем для вас",
      body:
        "Четыре формата, одна студия. Горячая йога: нагретый зал до 35°C, 60-минутные практики для глубокого детокса и гибкости. Силовые основы: гантели, собственный вес, правильная техника — реальная функциональная сила. Мобильность и восстановление: глубокая растяжка, миофасциальный релиз, дыхательные практики — еженедельная перезагрузка для тела. Мама/Папа + малыш: фитнес для родителей, малыш рядом. Все занятия на английском языке. Расположение: Кентрон. Основатели получают фиксированные цены, которые никогда не вырастут."
    },
    day7: {
      subject: "Приведи друга — поднимись в списке",
      body:
        "Знаете кого-то, кому понравится бутик-фитнес в Ереване? Поделитесь своей уникальной ссылкой, и вы оба подниметесь в листе ожидания. Ваша реферальная ссылка: {{referral_link}}. Каждый новый участник приближает вас к статусу основателя."
    }
  }
};
