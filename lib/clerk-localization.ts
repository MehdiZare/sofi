import type { Locale } from "@/lib/i18n";

type ClerkLocalization = {
  locale: string;
  waitlist: {
    start: {
      title: string;
      subtitle: string;
      formButton: string;
      actionText: string;
      actionLink: string;
    };
  };
  formFieldLabel__emailAddress: string;
  formFieldInputPlaceholder__emailAddress: string;
};

const enWaitlistLocalization: ClerkLocalization = {
  locale: "en-US",
  waitlist: {
    start: {
      title: "Join the Waitlist",
      subtitle: "Enter your email address and we'll let you know when your spot is ready",
      formButton: "Join the Waitlist",
      actionText: "Already have access?",
      actionLink: "Sign in"
    }
  },
  formFieldLabel__emailAddress: "Email address",
  formFieldInputPlaceholder__emailAddress: "Enter your email address"
};

const hyWaitlistLocalization: ClerkLocalization = {
  locale: "hy-AM",
  waitlist: {
    start: {
      title: "Միանալ սպասման ցուցակին",
      subtitle: "Մուտքագրեք ձեր email-ը, և մենք կտեղեկացնենք, երբ ձեր տեղը պատրաստ լինի",
      formButton: "Միանալ սպասման ցուցակին",
      actionText: "Արդեն մուտք ունե՞ք",
      actionLink: "Մուտք գործել"
    }
  },
  formFieldLabel__emailAddress: "Email",
  formFieldInputPlaceholder__emailAddress: "Մուտքագրեք ձեր email-ը"
};

const ruWaitlistLocalization: ClerkLocalization = {
  locale: "ru-RU",
  waitlist: {
    start: {
      title: "Записаться в лист ожидания",
      subtitle: "Введите ваш email, и мы сообщим, когда ваше место будет готово",
      formButton: "Записаться в лист ожидания",
      actionText: "Уже есть доступ?",
      actionLink: "Войти"
    }
  },
  formFieldLabel__emailAddress: "Email",
  formFieldInputPlaceholder__emailAddress: "Введите ваш email"
};

const clerkLocalizationByLocale: Record<Locale, ClerkLocalization> = {
  en: enWaitlistLocalization,
  hy: hyWaitlistLocalization,
  ru: ruWaitlistLocalization
};

export function getClerkLocalization(locale: Locale): ClerkLocalization {
  return clerkLocalizationByLocale[locale];
}
