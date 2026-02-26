import type { Locale } from "@/lib/i18n";

export const classGroupOrder = ["hot-yoga", "strength-fundamentals", "mom-dad-baby", "mobility-recovery"] as const;

export type ClassGroupSlug = (typeof classGroupOrder)[number];

export const classSlugOrder = [
  "hot-power-flow",
  "hot-yoga-sculpt",
  "dumbbell-sculpt",
  "core-glutes",
  "upper-body-posture",
  "baby-me-foundations",
  "baby-me-strong",
  "mobility-reset",
  "deep-stretch-restore",
  "yin-release",
  "recovery-flow"
] as const;

export type ClassSlug = (typeof classSlugOrder)[number];

type ClassVideoConfig = {
  sourceRelativePath: string;
  streamEnvBase: string;
  fallbackStreamId: string;
  fallbackVideoSrc?: string;
};

type ClassStaticConfig = {
  slug: ClassSlug;
  groupSlug: ClassGroupSlug;
  durationMinutes: number;
  heatLabel: string;
  intensityLabel: string;
  image: string;
  video: ClassVideoConfig;
};

type ClassLocaleCopy = {
  title: string;
  subtitle: string;
  description: string;
  benefits: readonly string[];
};

type GroupLocaleCopy = {
  title: string;
  description: string;
};

export type LocalizedClass = {
  slug: ClassSlug;
  groupSlug: ClassGroupSlug;
  title: string;
  subtitle: string;
  description: string;
  benefits: readonly string[];
  durationMinutes: number;
  heatLabel: string;
  intensityLabel: string;
  image: string;
  streamId?: string;
  iframeSrc?: string;
  fallbackVideoSrc?: string;
};

export type LocalizedClassGroup = {
  slug: ClassGroupSlug;
  title: string;
  description: string;
  classes: readonly LocalizedClass[];
};

const defaultCloudflareCustomerHost = "customer-bvw30n7zlfevs367.cloudflarestream.com";

function resolveCloudflareCustomerHost(): string {
  const raw =
    process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim();

  if (!raw) {
    return defaultCloudflareCustomerHost;
  }

  return raw.endsWith(".cloudflarestream.com") ? raw : `${raw}.cloudflarestream.com`;
}

function buildCloudflareIframeUrl(streamId: string): string {
  const host = resolveCloudflareCustomerHost();
  const poster = encodeURIComponent(
    `https://${host}/${streamId}/thumbnails/thumbnail.jpg?time=&height=600`
  );

  return `https://${host}/${streamId}/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false&poster=${poster}`;
}

const classStaticBySlug: Record<ClassSlug, ClassStaticConfig> = {
  "hot-power-flow": {
    slug: "hot-power-flow",
    groupSlug: "hot-yoga",
    durationMinutes: 60,
    heatLabel: "95°F studio",
    intensityLabel: "High",
    image: "/images/gallery/fitness-2.jpg",
    video: {
      sourceRelativePath: "docs/Website/1.Hot Yoga/Hot Power Flow.mp4",
      streamEnvBase: "HOT_POWER_FLOW",
      fallbackStreamId: "b0df2d9ced432615b29302fb6b30cf9d",
      fallbackVideoSrc: "/videos/classes/hot-power-flow.mp4"
    }
  },
  "hot-yoga-sculpt": {
    slug: "hot-yoga-sculpt",
    groupSlug: "hot-yoga",
    durationMinutes: 60,
    heatLabel: "95°F studio",
    intensityLabel: "High",
    image: "/images/gallery/fitness-2.jpg",
    video: {
      sourceRelativePath: "docs/Website/1.Hot Yoga/Hot Yoga + Sculpt.mp4",
      streamEnvBase: "HOT_YOGA_SCULPT",
      fallbackStreamId: "cfc36f3cddc2cf706e40ad2098f21abd"
    }
  },
  "dumbbell-sculpt": {
    slug: "dumbbell-sculpt",
    groupSlug: "strength-fundamentals",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "High",
    image: "/images/gallery/fitness-3.jpg",
    video: {
      sourceRelativePath: "docs/Website/2.STRENGTH FUNDAMENTALS/Dumbbell Sculpt.mp4",
      streamEnvBase: "DUMBBELL_SCULPT",
      fallbackStreamId: "18ce772a06872ca6353e3ad9e57bed67",
      fallbackVideoSrc: "/videos/classes/dumbbell-sculpt.mp4"
    }
  },
  "core-glutes": {
    slug: "core-glutes",
    groupSlug: "strength-fundamentals",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Medium",
    image: "/images/gallery/fitness-3.jpg",
    video: {
      sourceRelativePath: "docs/Website/2.STRENGTH FUNDAMENTALS/Core + Glutes.mp4",
      streamEnvBase: "CORE_GLUTES",
      fallbackStreamId: "e4fc5322393966be6614bcee35942e94"
    }
  },
  "upper-body-posture": {
    slug: "upper-body-posture",
    groupSlug: "strength-fundamentals",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Medium",
    image: "/images/gallery/fitness-3.jpg",
    video: {
      sourceRelativePath: "docs/Website/2.STRENGTH FUNDAMENTALS/Upper Body + Posture.mp4",
      streamEnvBase: "UPPER_BODY_POSTURE",
      fallbackStreamId: "80de4bb6b361be9fdf55a39e0c67c289"
    }
  },
  "baby-me-foundations": {
    slug: "baby-me-foundations",
    groupSlug: "mom-dad-baby",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Low",
    image: "/images/gallery/fitness-6.jpg",
    video: {
      sourceRelativePath: "docs/Website/3.MOM_DAD + BABY/Baby + Me Foundations2.mp4",
      streamEnvBase: "BABY_ME_FOUNDATIONS",
      fallbackStreamId: "47c10b3289b69dff2340325f693af189",
      fallbackVideoSrc: "/videos/classes/baby-me-foundations.mp4"
    }
  },
  "baby-me-strong": {
    slug: "baby-me-strong",
    groupSlug: "mom-dad-baby",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Medium",
    image: "/images/gallery/fitness-6.jpg",
    video: {
      sourceRelativePath: "docs/Website/3.MOM_DAD + BABY/Baby + Me Strong2.mp4",
      streamEnvBase: "BABY_ME_STRONG",
      fallbackStreamId: "b356d2028cbe09d060a415252b2718a2"
    }
  },
  "mobility-reset": {
    slug: "mobility-reset",
    groupSlug: "mobility-recovery",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Low",
    image: "/images/gallery/fitness-4.jpg",
    video: {
      sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Mobility Reset.mp4",
      streamEnvBase: "MOBILITY_RESET",
      fallbackStreamId: "c2ce3e1a6e52c2bd4f3ed3c2feb165b9",
      fallbackVideoSrc: "/videos/classes/mobility-reset.mp4"
    }
  },
  "deep-stretch-restore": {
    slug: "deep-stretch-restore",
    groupSlug: "mobility-recovery",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Low",
    image: "/images/gallery/fitness-4.jpg",
    video: {
      sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Deep Stretch Restore.mp4",
      streamEnvBase: "DEEP_STRETCH_RESTORE",
      fallbackStreamId: "af2bd4639fcb5a715a949d2c89f48866"
    }
  },
  "yin-release": {
    slug: "yin-release",
    groupSlug: "mobility-recovery",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Low",
    image: "/images/gallery/fitness-4.jpg",
    video: {
      sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Yin + Release.mp4",
      streamEnvBase: "YIN_RELEASE",
      fallbackStreamId: "f29152e5af09ab1e4bd6f59e726f7e58"
    }
  },
  "recovery-flow": {
    slug: "recovery-flow",
    groupSlug: "mobility-recovery",
    durationMinutes: 60,
    heatLabel: "Unheated",
    intensityLabel: "Low",
    image: "/images/gallery/fitness-4.jpg",
    video: {
      sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Recovery Flow.mp4",
      streamEnvBase: "RECOVERY_FLOW",
      fallbackStreamId: "143b08bc88996c5be2dbc45fbe03e2f2"
    }
  }
};

const groupCopyByLocale: Record<Locale, Record<ClassGroupSlug, GroupLocaleCopy>> = {
  en: {
    "hot-yoga": {
      title: "Hot Yoga",
      description: "The only heated yoga in Armenia. 95°F studio. 60 minutes."
    },
    "strength-fundamentals": {
      title: "Strength Fundamentals",
      description: "Functional strength with dumbbells and bodyweight. Proper form. Real results."
    },
    "mom-dad-baby": {
      title: "Mom/Dad + Baby",
      description: "Parent-focused fitness with baby integration, core rehab, and community."
    },
    "mobility-recovery": {
      title: "Mobility + Recovery",
      description: "Deep stretching, release work, and breath-led recovery sessions."
    }
  },
  hy: {
    "hot-yoga": {
      title: "Թեժ յոգա",
      description: "Հայաստանի միակ տաք յոգայի ձևաչափը՝ 35°C ստուդիայում, 60 րոպե։"
    },
    "strength-fundamentals": {
      title: "Ուժի հիմունքներ",
      description: "Ֆունկցիոնալ ուժ՝ հանտելներով և մարմնի քաշով, ճիշտ տեխնիկայով։"
    },
    "mom-dad-baby": {
      title: "Մամա/Պապա և երեխա",
      description: "Ծնողների համար ստեղծված մարզում՝ երեխայի հետ միասին։"
    },
    "mobility-recovery": {
      title: "Շարժունակություն և վերականգնում",
      description: "Խոր ձգումներ, ֆասցիայի թուլացում և շնչառական վերականգնում։"
    }
  },
  ru: {
    "hot-yoga": {
      title: "Горячая йога",
      description: "Единственный формат горячей йоги в Армении: 95°F, 60 минут."
    },
    "strength-fundamentals": {
      title: "Силовые основы",
      description: "Функциональная силовая работа с гантелями и собственным весом."
    },
    "mom-dad-baby": {
      title: "Мама/Папа и малыш",
      description: "Тренировки для родителей с интеграцией малыша и поддержкой сообщества."
    },
    "mobility-recovery": {
      title: "Мобильность и восстановление",
      description: "Глубокая растяжка, миофасциальный релиз и дыхательные практики."
    }
  }
};

const classCopyByLocale: Record<Locale, Record<ClassSlug, ClassLocaleCopy>> = {
  en: {
    "hot-power-flow": {
      title: "Hot Power Flow",
      subtitle: "Dynamic heated vinyasa",
      description:
        "A fast-paced vinyasa sequence in a heated room with sun salutations, standing balances, and deep holds.",
      benefits: [
        "Increases flexibility and range of motion",
        "Builds full-body strength with bodyweight resistance",
        "Improves cardiovascular endurance and focus"
      ]
    },
    "hot-yoga-sculpt": {
      title: "Hot Yoga + Sculpt",
      subtitle: "Yoga flow meets light resistance",
      description:
        "Yoga flow paired with Bala Bar strength work in the heat for elevated heart rate and lean-muscle sculpting.",
      benefits: [
        "Combines hot yoga flexibility with targeted toning",
        "Accelerates calorie burn via heat plus resistance",
        "Builds functional strength without bulking"
      ]
    },
    "dumbbell-sculpt": {
      title: "Dumbbell Sculpt",
      subtitle: "Circuit-based full-body strength",
      description:
        "A high-output full-body class using Bala Bars and compound circuit work to build lean muscle and conditioning.",
      benefits: [
        "Builds lean muscle and metabolic output",
        "Improves cardio through circuit programming",
        "Develops practical total-body strength"
      ]
    },
    "core-glutes": {
      title: "Core + Glutes",
      subtitle: "Targeted strength foundations",
      description:
        "A controlled class focused on glute bridges, dead bugs, single-leg work, and plank progressions.",
      benefits: [
        "Strengthens deep core stability",
        "Improves posture and hip support",
        "Reduces imbalances from prolonged sitting"
      ]
    },
    "upper-body-posture": {
      title: "Upper Body + Posture",
      subtitle: "Shoulders, upper back, alignment",
      description:
        "A focused upper-body session with presses, rows, raises, and rotator cuff work to restore posture and strength.",
      benefits: [
        "Corrects rounded-shoulder desk posture",
        "Builds defined, resilient upper body strength",
        "Reduces neck and shoulder tension"
      ]
    },
    "baby-me-foundations": {
      title: "Baby + Me Foundations",
      subtitle: "Postpartum-safe movement",
      description:
        "A gentle class for parents with newborns, centered on core rehab, pelvic floor activation, and breathwork.",
      benefits: [
        "Rebuilds core and pelvic floor strength",
        "Supports parent-baby bonding during movement",
        "Creates a safe return to exercise postpartum"
      ]
    },
    "baby-me-strong": {
      title: "Baby + Me Strong",
      subtitle: "Playful functional training for parents",
      description:
        "A higher-energy format where babies and toddlers become part of squats, presses, and full-body functional drills.",
      benefits: [
        "Builds real-world parenting strength",
        "Improves posture under carrying demands",
        "Delivers full-body work without childcare"
      ]
    },
    "mobility-reset": {
      title: "Mobility Reset",
      subtitle: "Active recovery for range of motion",
      description:
        "An active recovery class with joint circles, spinal work, hip opening, and guided breathwork.",
      benefits: [
        "Restores mobility lost to repetitive habits",
        "Reduces stiffness and chronic tightness",
        "Improves movement quality for all training"
      ]
    },
    "deep-stretch-restore": {
      title: "Deep Stretch Restore",
      subtitle: "Long-hold floor-based release",
      description:
        "A slow class with 2–5 minute supported stretches to release fascia and connective tissue tension.",
      benefits: [
        "Improves flexibility via sustained holds",
        "Activates parasympathetic recovery response",
        "Supports evening decompression and sleep"
      ]
    },
    "yin-release": {
      title: "Yin + Release",
      subtitle: "Nervous-system downregulation",
      description:
        "Long passive poses with breathwork and low stimulation to shift from stress mode to rest-and-repair.",
      benefits: [
        "Calms the nervous system deeply",
        "Supports recovery between hard sessions",
        "Improves emotional regulation and clarity"
      ]
    },
    "recovery-flow": {
      title: "Recovery Flow",
      subtitle: "Gentle movement between training days",
      description:
        "A soft movement class with cat-cow, half-speed sun salutations, and balanced transitions for active recovery.",
      benefits: [
        "Improves blood flow to sore muscles",
        "Reduces post-workout soreness",
        "Maintains patterns without adding stress"
      ]
    }
  },
  hy: {
    "hot-power-flow": {
      title: "Hot Power Flow",
      subtitle: "Դինամիկ տաք վինյասա",
      description:
        "Արագ տեմպով վինյասա տաք սրահում՝ արևի ողջույններով, հավասարակշռությամբ և խորը պահումներով։",
      benefits: [
        "Բարձրացնում է ճկունությունն ու շարժման ծավալը",
        "Ամրացնում է ամբողջ մարմինը",
        "Լավացնում է դիմացկունությունն ու կենտրոնացումը"
      ]
    },
    "hot-yoga-sculpt": {
      title: "Hot Yoga + Sculpt",
      subtitle: "Յոգա + թեթև ուժային աշխատանք",
      description:
        "Տաք միջավայրում յոգայի հոսք և Bala Bar-երով դիմադրողական աշխատանք՝ սրտի հաճախության աճով։",
      benefits: [
        "Միավորում է ճկունությունն ու մկանային տոնուսը",
        "Արագացնում է կալորիաների ծախսը",
        "Կառուցում է ֆունկցիոնալ ուժ"
      ]
    },
    "dumbbell-sculpt": {
      title: "Dumbbell Sculpt",
      subtitle: "Շրջանաձև ամբողջ մարմնի ուժ",
      description:
        "Բարձր էներգիայի ամբողջ մարմնի դաս Bala Bar-երով և կոմպաունդ շարժումներով։",
      benefits: [
        "Աճեցնում է մկանային զանգվածը",
        "Լավացնում է սրտանոթային դիմացկունությունը",
        "Զարգացնում է ֆունկցիոնալ ուժ"
      ]
    },
    "core-glutes": {
      title: "Core + Glutes",
      subtitle: "Թիրախային հիմքային ուժ",
      description:
        "Վերահսկվող պարապմունք՝ կորի և նստատեղի մկանների ամրապնդման վրա։",
      benefits: [
        "Ամրացնում է խորը կոր մկանները",
        "Բարելավում է կեցվածքն ու ազդրի կայունությունը",
        "Նվազեցնում է նստակյաց կյանքի անհավասարակշռությունները"
      ]
    },
    "upper-body-posture": {
      title: "Upper Body + Posture",
      subtitle: "Ուսեր, մեջք, կեցվածք",
      description:
        "Վերին մարմնի նպատակային դաս՝ հրումներ, քաշումներ և դիրքային մկանների ակտիվացում։",
      benefits: [
        "Ուղղում է կռացած ուսերը",
        "Ամրացնում է մեջքն ու ուսերը",
        "Թուլացնում է պարանոցի լարվածությունը"
      ]
    },
    "baby-me-foundations": {
      title: "Baby + Me Foundations",
      subtitle: "Հետծննդյան անվտանգ շարժում",
      description:
        "Նուրբ դաս նորածին ունեցող ծնողների համար՝ կորի վերականգնում, կոնքի հատակի ակտիվացում, շնչառություն։",
      benefits: [
        "Վերականգնում է կորն ու կոնքի հատակը",
        "Աջակցում է ծնող-երեխա կապին",
        "Ապահով վերադարձ մարզմանը"
      ]
    },
    "baby-me-strong": {
      title: "Baby + Me Strong",
      subtitle: "Էներգետիկ ֆունկցիոնալ ծնողական դաս",
      description:
        "Ավելի ակտիվ ձևաչափ, որտեղ փոքրիկը դառնում է վարժությունների մի մասը՝ խաղային, բայց արդյունավետ։",
      benefits: [
        "Կառուցում է առօրյա ծնողական ուժ",
        "Բարելավում է կրելուց ծանրաբեռնված կեցվածքը",
        "Լիարժեք մարզում՝ առանց երեխայի խնամք կազմակերպելու"
      ]
    },
    "mobility-reset": {
      title: "Mobility Reset",
      subtitle: "Ակտիվ վերականգնում շարժունակության համար",
      description:
        "Հոդերի շարժունակություն, ողնաշարի աշխատանք, ազդրի բացումներ և շնչառություն։",
      benefits: [
        "Վերականգնում է կորցրած շարժունակությունը",
        "Նվազեցնում է կաշկանդվածությունն ու ցավոտ լարվածությունը",
        "Բարելավում է շարժման որակը"
      ]
    },
    "deep-stretch-restore": {
      title: "Deep Stretch Restore",
      subtitle: "Երկար պահումներով խորը ձգում",
      description:
        "Դանդաղ դաս՝ 2-5 րոպեանոց պահումներով, ֆասցիայի և կապակցական հյուսվածքի թուլացման համար։",
      benefits: [
        "Բարելավում է ճկունությունը",
        "Ակտիվացնում է հանգստի նյարդային ռեժիմը",
        "Աջակցում է երեկոյան թուլացմանը և քնին"
      ]
    },
    "yin-release": {
      title: "Yin + Release",
      subtitle: "Նյարդային համակարգի հանգստացում",
      description:
        "Երկար պասիվ դիրքեր և շնչառական ուղեցույց՝ սթրեսից հանգստի ռեժիմ անցնելու համար։",
      benefits: [
        "Խորը հանգստացնում է նյարդային համակարգը",
        "Արագացնում է վերականգնումը ինտենսիվ պարապմունքների միջև",
        "Բարձրացնում է մտավոր հստակությունը"
      ]
    },
    "recovery-flow": {
      title: "Recovery Flow",
      subtitle: "Նուրբ շարժում ծանր օրերի միջև",
      description:
        "Հանգիստ շարժումներով դաս՝ cat-cow, դանդաղ արևի ողջույններ և սահուն անցումներ։",
      benefits: [
        "Ակտիվացնում է արյան շրջանառությունը",
        "Նվազեցնում է հետմարզումային ցավոտությունը",
        "Պահպանում է շարժման նախշերը առանց ավելորդ բեռի"
      ]
    }
  },
  ru: {
    "hot-power-flow": {
      title: "Hot Power Flow",
      subtitle: "Динамичная горячая виньяса",
      description:
        "Быстрая виньяса в нагретом зале с приветствиями солнцу, балансами и глубокими удержаниями.",
      benefits: [
        "Повышает гибкость и амплитуду движения",
        "Укрепляет все тело",
        "Улучшает выносливость и концентрацию"
      ]
    },
    "hot-yoga-sculpt": {
      title: "Hot Yoga + Sculpt",
      subtitle: "Йога и легкая силовая нагрузка",
      description:
        "Поток йоги в тепле с Bala Bar для тонуса, высокого пульса и функциональной силы.",
      benefits: [
        "Сочетает гибкость и мышечный тонус",
        "Усиливает калорийный расход",
        "Развивает функциональную силу"
      ]
    },
    "dumbbell-sculpt": {
      title: "Dumbbell Sculpt",
      subtitle: "Круговая силовая тренировка",
      description:
        "Высокоинтенсивный full-body класс с Bala Bar и базовыми комплексными движениями.",
      benefits: [
        "Увеличивает мышечную массу",
        "Улучшает кардио-подготовку",
        "Развивает практичную силу"
      ]
    },
    "core-glutes": {
      title: "Core + Glutes",
      subtitle: "Точечная база силы",
      description:
        "Контролируемая тренировка для кора и ягодиц с акцентом на стабильность и технику.",
      benefits: [
        "Укрепляет глубокие мышцы кора",
        "Улучшает осанку и стабильность таза",
        "Снижает дисбалансы от сидячего образа жизни"
      ]
    },
    "upper-body-posture": {
      title: "Upper Body + Posture",
      subtitle: "Плечи, верх спины, осанка",
      description:
        "Целенаправленный класс на верх тела с жимами, тягами и работой для мышц осанки.",
      benefits: [
        "Корректирует сутулость",
        "Укрепляет спину и плечевой пояс",
        "Снимает напряжение шеи и плеч"
      ]
    },
    "baby-me-foundations": {
      title: "Baby + Me Foundations",
      subtitle: "Безопасное послеродовое движение",
      description:
        "Мягкий формат для родителей с новорожденными: восстановление кора, тазового дна и дыхания.",
      benefits: [
        "Восстанавливает кор и тазовое дно",
        "Поддерживает связь родителя и малыша",
        "Дает безопасный возврат к тренировкам"
      ]
    },
    "baby-me-strong": {
      title: "Baby + Me Strong",
      subtitle: "Функциональная тренировка для родителей",
      description:
        "Более энергичный формат, где малыш становится частью упражнения: приседания, жимы и функциональные связки.",
      benefits: [
        "Развивает силу для родительских задач",
        "Улучшает осанку при переноске ребенка",
        "Дает full-body нагрузку без необходимости childcare"
      ]
    },
    "mobility-reset": {
      title: "Mobility Reset",
      subtitle: "Активное восстановление подвижности",
      description:
        "Класс с суставной мобильностью, работой со спиной, раскрытием бедер и дыхательными практиками.",
      benefits: [
        "Возвращает утраченную подвижность",
        "Снимает скованность и хроническое напряжение",
        "Улучшает качество движений в других классах"
      ]
    },
    "deep-stretch-restore": {
      title: "Deep Stretch Restore",
      subtitle: "Глубокая растяжка с длинными удержаниями",
      description:
        "Медленный формат с удержанием 2–5 минут для расслабления фасций и соединительной ткани.",
      benefits: [
        "Повышает гибкость за счет длительных удержаний",
        "Активирует восстановительный режим нервной системы",
        "Помогает вечернему расслаблению и сну"
      ]
    },
    "yin-release": {
      title: "Yin + Release",
      subtitle: "Глубокое успокоение нервной системы",
      description:
        "Длительные пассивные позы и дыхание для перехода из режима стресса в режим восстановления.",
      benefits: [
        "Сильно успокаивает нервную систему",
        "Ускоряет восстановление между интенсивными днями",
        "Повышает ясность и эмоциональную устойчивость"
      ]
    },
    "recovery-flow": {
      title: "Recovery Flow",
      subtitle: "Мягкое движение между тренировками",
      description:
        "Плавный класс с cat-cow, медленными приветствиями солнцу и мягкими переходами.",
      benefits: [
        "Улучшает кровоток в уставших мышцах",
        "Снижает мышечную болезненность после нагрузок",
        "Поддерживает движение без дополнительного стресса"
      ]
    }
  }
};

function resolveClassStream(slug: ClassSlug): { streamId?: string; iframeSrc?: string } {
  const config = classStaticBySlug[slug];
  const streamIdFromEnv = process.env[`NEXT_PUBLIC_CLOUDFLARE_${config.video.streamEnvBase}_STREAM_ID`]?.trim();
  const streamId = streamIdFromEnv || config.video.fallbackStreamId;
  const iframeFromEnv = process.env[`NEXT_PUBLIC_CLOUDFLARE_${config.video.streamEnvBase}_IFRAME_URL`]?.trim();

  if (iframeFromEnv) {
    return {
      streamId,
      iframeSrc: iframeFromEnv
    };
  }

  if (streamId) {
    return {
      streamId,
      iframeSrc: buildCloudflareIframeUrl(streamId)
    };
  }

  return {};
}

function buildLocalizedClass(locale: Locale, slug: ClassSlug): LocalizedClass {
  const staticConfig = classStaticBySlug[slug];
  const copy = classCopyByLocale[locale][slug];
  const stream = resolveClassStream(slug);

  return {
    slug,
    groupSlug: staticConfig.groupSlug,
    title: copy.title,
    subtitle: copy.subtitle,
    description: copy.description,
    benefits: copy.benefits,
    durationMinutes: staticConfig.durationMinutes,
    heatLabel: staticConfig.heatLabel,
    intensityLabel: staticConfig.intensityLabel,
    image: staticConfig.image,
    streamId: stream.streamId,
    iframeSrc: stream.iframeSrc,
    fallbackVideoSrc: staticConfig.video.fallbackVideoSrc
  };
}

export function getLocalizedClass(locale: Locale, slug: string): LocalizedClass | null {
  if (!isClassSlug(slug)) {
    return null;
  }

  return buildLocalizedClass(locale, slug);
}

export function getLocalizedClasses(locale: Locale): readonly LocalizedClass[] {
  return classSlugOrder.map((slug) => buildLocalizedClass(locale, slug));
}

export function getLocalizedClassGroups(locale: Locale): readonly LocalizedClassGroup[] {
  const classes = getLocalizedClasses(locale);

  return classGroupOrder.map((groupSlug) => {
    const groupCopy = groupCopyByLocale[locale][groupSlug];

    return {
      slug: groupSlug,
      title: groupCopy.title,
      description: groupCopy.description,
      classes: classes.filter((fitnessClass) => fitnessClass.groupSlug === groupSlug)
    };
  });
}

export function getClassSourceVideoPath(slug: ClassSlug): string {
  return classStaticBySlug[slug].video.sourceRelativePath;
}

export function getClassStreamEnvBase(slug: ClassSlug): string {
  return classStaticBySlug[slug].video.streamEnvBase;
}

export function isClassSlug(value: string): value is ClassSlug {
  return classSlugOrder.includes(value as ClassSlug);
}
