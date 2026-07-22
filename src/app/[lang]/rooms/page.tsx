import { ArrowRight, Expand, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";
import { formatPrice, roomOrder, rooms } from "@/lib/rooms";

export async function generateMetadata({ params }: PageProps<"/[lang]/rooms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.nav.rooms };
}

export default async function RoomsPage({ params }: PageProps<"/[lang]/rooms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const { rooms: roomsCopy, common } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={roomsCopy.hero.eyebrow}
        title={roomsCopy.hero.title}
        description={roomsCopy.hero.description}
        image="/bbhomes/premier/cover.png"
        imageAlt={roomsCopy.hero.eyebrow}
      />

      <div className="bg-ivory">
        {roomOrder.map((id, index) => {
          const room = rooms[id];
          const copy = roomsCopy.items[id];
          const reversed = index % 2 === 1;

          return (
            <section
              key={id}
              className={`relative overflow-hidden py-20 md:py-28 ${index % 2 === 1 ? "bg-sand/50" : ""}`}
            >
              {/* Ghost room number */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-8 hidden select-none font-display text-[13rem] leading-none text-espresso/[0.045] lg:block ${
                  reversed ? "left-6" : "right-6"
                }`}
              >
                {room.label}
              </span>

              <div
                className={`site-container grid items-center gap-12 lg:gap-20 ${
                  reversed ? "lg:grid-cols-[5fr_7fr]" : "lg:grid-cols-[7fr_5fr]"
                }`}
              >
                <Reveal className={reversed ? "lg:order-2" : ""}>
                  <Link href={`/${lang}/rooms/${id}`} className="img-zoom group relative block aspect-[4/3] overflow-hidden">
                    <Image src={room.cover} alt={copy.name} fill sizes="(max-width: 1023px) 92vw, 60vw" />
                    <div className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10" />
                  </Link>
                </Reveal>

                <div className={reversed ? "lg:order-1" : ""}>
                  <Reveal>
                    <p className="eyebrow">{copy.tagline}</p>
                  </Reveal>
                  <Reveal delay={100}>
                    <h2 className="display-title mt-5 text-[clamp(2rem,3.6vw,3.1rem)]">{copy.name}</h2>
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="mt-7 max-w-lg text-[0.94rem] leading-8 text-stone">{copy.summary}</p>
                  </Reveal>
                  <Reveal delay={280}>
                    <ul className="mt-8 flex flex-wrap gap-x-9 gap-y-3 text-[0.82rem] text-espresso/80">
                      <li className="flex items-center gap-2.5">
                        <Expand size={15} className="text-brass" aria-hidden="true" />
                        {room.sizeM2} m²
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Users size={15} className="text-brass" aria-hidden="true" />
                        {room.guests} {common.guests.toLowerCase()}
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="h-px w-4 bg-brass" aria-hidden="true" />
                        {copy.bedType}
                      </li>
                    </ul>
                  </Reveal>
                  <Reveal delay={360}>
                    <p className="mt-9 text-[0.88rem] text-stone">
                      {common.from}{" "}
                      <strong className="font-display text-[1.6rem] font-normal text-espresso">
                        {formatPrice(room.priceFrom, lang)}
                      </strong>
                      {common.perNight}
                    </p>
                  </Reveal>
                  <Reveal delay={440}>
                    <div className="mt-9 flex flex-wrap items-center gap-6">
                      <Link href={`/${lang}/rooms/${id}`} className="btn btn-outline-dark">
                        {common.viewDetails}
                      </Link>
                      <Link href={`/${lang}/booking?room=${id}`} className="text-link">
                        {common.bookNow}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
