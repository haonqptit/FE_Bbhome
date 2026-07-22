import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.nav.about };
}

const storyImages = [
  "/bbhomes/facade/night.png",
  "/bbhomes/deluxe/cover.png",
  "/bbhomes/amenities/kit.png",
];

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const { about } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.description}
        image="/bbhomes/facade/day.png"
        imageAlt={about.hero.eyebrow}
      />

      {/* Story — alternating paragraphs and images */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="site-container">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{about.story.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.2rem,4.2vw,3.6rem)]">{about.story.title}</h2>
            </Reveal>
          </div>

          <div className="mt-20 flex flex-col gap-24">
            {about.story.paragraphs.map((paragraph, index) => (
              <div
                key={paragraph.slice(0, 24)}
                className={`grid items-center gap-10 lg:grid-cols-12 ${index % 2 === 1 ? "" : ""}`}
              >
                <Reveal
                  className={
                    index % 2 === 0 ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8 lg:row-start-1"
                  }
                >
                  <div className="flex gap-7">
                    <span aria-hidden="true" className="font-display text-[2.6rem] leading-none text-brass/45">
                      0{index + 1}
                    </span>
                    <p className="text-[0.96rem] leading-9 text-espresso/80">{paragraph}</p>
                  </div>
                </Reveal>
                <Reveal
                  delay={150}
                  className={index % 2 === 0 ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6 lg:col-start-1 lg:row-start-1"}
                >
                  <figure className={`img-zoom relative overflow-hidden ${index % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/3] lg:w-[88%]"}`}>
                    <Image src={storyImages[index]} alt="" fill sizes="(max-width: 1023px) 92vw, 52vw" />
                  </figure>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — dark section */}
      <section className="bg-oak py-24 text-ivory md:py-36">
        <div className="site-container">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-brass-light">{about.values.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.1rem,3.8vw,3.3rem)]">{about.values.title}</h2>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-3">
            {about.values.items.map((value, index) => (
              <Reveal key={value.title} delay={index * 140}>
                <article className="flex h-full flex-col gap-6 bg-oak p-10">
                  <span aria-hidden="true" className="font-display text-[1.4rem] text-brass">
                    0{index + 1}
                  </span>
                  <h3 className="display-title text-[1.5rem]">{value.title}</h3>
                  <p className="text-[0.88rem] leading-8 text-ivory/60">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Space */}
      <section className="overflow-hidden bg-ivory py-24 md:py-36">
        <div className="site-container grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">{about.space.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.1rem,3.8vw,3.3rem)]">{about.space.title}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[0.94rem] leading-8 text-stone">{about.space.body}</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Reveal>
              <figure className="img-zoom relative aspect-[3/4] overflow-hidden">
                <Image src="/bbhomes/standard/cover.png" alt="" fill sizes="(max-width: 1023px) 46vw, 28vw" />
              </figure>
            </Reveal>
            <Reveal delay={160}>
              <figure className="img-zoom relative mt-12 aspect-[3/4] overflow-hidden">
                <Image src="/bbhomes/premier/01.png" alt="" fill sizes="(max-width: 1023px) 46vw, 28vw" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-sand/60 py-20 md:py-28">
        <div className="site-container flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <h2 className="display-title text-[clamp(1.9rem,3.4vw,2.8rem)]">{about.cta.title}</h2>
          </Reveal>
          <Reveal delay={150}>
            <Link href={`/${lang}/rooms`} className="btn btn-gold">
              {about.cta.action}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
