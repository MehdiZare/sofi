import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/card-3d";
import MovingBorder from "@/components/aceternity/moving-border";
import SectionHeader from "@/components/ui/section-header";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { classCards, contentByLocale, SECTION_IDS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type ConceptProps = {
  locale: Locale;
};

export default function Concept({ locale }: ConceptProps) {
  const content = contentByLocale[locale];

  return (
    <section id={SECTION_IDS.concept} data-track-section={SECTION_IDS.concept} className="section-shell py-24 md:py-32">
      <SectionHeader badge="Class Formats" title={content.conceptTitle} description={content.conceptIntro} />

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {classCards.map((card) => (
          <CardContainer key={card.title}>
            <CardBody>
              <MovingBorder className="h-full p-1">
                <article className="h-full rounded-[calc(1.5rem-4px)] bg-surface p-6">
                  <CardItem className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={card.image}
                      alt={`${card.title} class`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </CardItem>

                  <Badge className="mb-3">{card.title}</Badge>
                  <CardTitle>{card.tagline}</CardTitle>
                  <CardDescription className="mt-3 text-base">{card.description}</CardDescription>
                </article>
              </MovingBorder>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
