import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.nav.services };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const { services } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        description={services.hero.description}
        image="/ImageBbhomes/ImageHotelBasement/3.jpg"
        imageAlt={services.hero.eyebrow}
      />

      {/* Izakaya — signature service, dark editorial */}
      <section className="overflow-hidden bg-oak py-24 text-ivory md:py-36">
        <div className="site-container grid items-center gap-14 lg:grid-cols-[6fr_5fr] lg:gap-24">
          <div className="relative">
            <Reveal>
              <figure className="img-zoom relative aspect-[4/3] overflow-hidden">
                <Image src="/ImageBbhomes/ImageHotelBasement/1.jpg" alt="Izakaya BB Homes" fill sizes="(max-width: 1023px) 92vw, 52vw" />
              </figure>
            </Reveal>
            <Reveal delay={180}>
              <figure className="img-zoom relative -mt-[22%] ml-[52%] aspect-[3/4] w-[42%] overflow-hidden border-[10px] border-oak">
                <Image src="/ImageBbhomes/ImageHotelBasement/4.jpg" alt="" fill sizes="24vw" />
              </figure>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow text-brass-light">{services.izakaya.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.1rem,3.8vw,3.3rem)]">{services.izakaya.title}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-lg text-[0.94rem] leading-8 text-ivory/65">{services.izakaya.body}</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-9 flex items-center gap-3 text-[0.82rem] tracking-[0.06em] text-brass-light">
                <Clock size={15} aria-hidden="true" />
                {services.izakaya.hours}
              </p>
            </Reveal>
            <Reveal delay={380}>
              <p className="mt-4 border-l border-brass pl-5 text-[0.84rem] leading-7 text-ivory/55">{services.izakaya.note}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service list — editorial numbered rows */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="site-container">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{services.list.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.2rem,4.2vw,3.6rem)]">{services.list.title}</h2>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-line">
            {services.list.items.map((service, index) => (
              <Reveal key={service.title} delay={(index % 3) * 90}>
                <article className="group grid gap-4 border-b border-line py-9 transition-colors duration-300 hover:bg-sand/40 md:grid-cols-[110px_320px_1fr] md:items-baseline md:gap-10 md:px-4">
                  <span aria-hidden="true" className="font-display text-[1.5rem] text-brass/55 transition-colors duration-300 group-hover:text-brass">
                    0{index + 1}
                  </span>
                  <h3 className="display-title text-[1.35rem]">{service.title}</h3>
                  <p className="max-w-xl text-[0.9rem] leading-8 text-stone">{service.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-sand/60 py-20 md:py-28">
        <div className="site-container flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <h2 className="display-title text-[clamp(1.9rem,3.4vw,2.8rem)]">{services.cta.title}</h2>
          </Reveal>
          <Reveal delay={150}>
            <Link href={`/${lang}/contact`} className="btn btn-outline-dark">
              {services.cta.action}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
