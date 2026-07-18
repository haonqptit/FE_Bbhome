import { ArrowLeft, ArrowRight, BedDouble, Building2, Check, Expand, Eye, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RoomGallery } from "@/components/rooms/room-gallery";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { formatPrice, isRoomId, roomOrder, rooms } from "@/lib/rooms";

export function generateStaticParams() {
  return locales.flatMap((lang) => roomOrder.map((id) => ({ lang, id })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/rooms/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang) || !isRoomId(id)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.rooms.items[id].name };
}

export default async function RoomDetailPage({ params }: PageProps<"/[lang]/rooms/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang) || !isRoomId(id)) notFound();

  const dictionary = await getDictionary(lang);
  const { common, rooms: roomsCopy } = dictionary;
  const room = rooms[id];
  const copy = roomsCopy.items[id];
  const detail = roomsCopy.detail;
  const others = roomOrder.filter((otherId) => otherId !== id).slice(0, 3);

  const galleryImages = room.images.map((src, index) => ({
    src,
    alt: `${copy.name} — ${String(index + 1).padStart(2, "0")}`,
  }));

  const specs = [
    { icon: Users, label: common.guests, value: String(room.guests) },
    { icon: Expand, label: common.size, value: `${room.sizeM2} m²` },
    { icon: BedDouble, label: common.bed, value: copy.bedType },
    { icon: Building2, label: common.floor, value: String(room.floor) },
    { icon: Eye, label: common.view, value: copy.viewType },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[76svh] items-end overflow-hidden bg-espresso text-ivory">
        <Image src={room.cover} alt={copy.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,9,0.4)_0%,rgba(17,16,9,0.2)_40%,rgba(17,16,9,0.82)_100%)]" />
        <div className="site-container relative z-10 pb-16 pt-44">
          <Link
            href={`/${lang}/rooms`}
            className="hero-stage inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:text-brass-light"
            style={{ "--stage-delay": "80ms" } as React.CSSProperties}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {detail.backToRooms}
          </Link>
          <p className="eyebrow hero-stage mt-8 text-brass-light" style={{ "--stage-delay": "220ms" } as React.CSSProperties}>
            {copy.tagline}
          </p>
          <h1 className="display-title hero-stage mt-5 text-[clamp(2.6rem,6vw,4.6rem)]" style={{ "--stage-delay": "380ms" } as React.CSSProperties}>
            {copy.name}
          </h1>
        </div>
      </section>

      {/* Spec bar */}
      <section className="border-b border-line bg-ivory">
        <div className="site-container grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-center gap-4 px-2 py-7 lg:justify-center">
              <spec.icon size={19} strokeWidth={1.4} className="shrink-0 text-brass" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-stone">{spec.label}</span>
                <span className="text-[0.85rem] text-espresso">{spec.value}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Description + booking panel */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[7fr_4fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="max-w-2xl text-[1.02rem] leading-9 text-espresso/85">{copy.description}</p>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="display-title mt-16 text-[1.7rem]">{detail.amenitiesTitle}</h2>
            </Reveal>
            <Reveal delay={250}>
              <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {copy.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-start gap-3.5 border-b border-line pb-4 text-[0.9rem] text-espresso/80">
                    <Check size={16} className="mt-1 shrink-0 text-brass" aria-hidden="true" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Booking panel */}
          <div>
            <Reveal delay={200}>
              <aside className="border border-line bg-white p-9 lg:sticky lg:top-28">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-stone">{common.from}</p>
                <p className="mt-3 font-display text-[2.1rem] leading-none text-espresso">
                  {formatPrice(room.priceFrom, lang)}
                  <span className="ml-1 font-sans text-[0.8rem] text-stone">{common.perNight}</span>
                </p>
                <h2 className="mt-8 font-display text-[1.15rem]">{detail.bookTitle}</h2>
                <p className="mt-3 text-[0.85rem] leading-7 text-stone">{detail.bookBody}</p>
                <Link href={`/${lang}/booking?room=${id}`} className="btn btn-gold mt-8 w-full">
                  {detail.bookAction}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href={`/${lang}/contact`} className="mt-5 block text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-stone underline-offset-4 transition-colors hover:text-brass">
                  {dictionary.nav.contact}
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Room gallery strip */}
      <section className="bg-sand/50 py-20 md:py-28">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">{copy.name}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-title mt-5 text-[clamp(1.9rem,3.4vw,2.8rem)]">{detail.galleryTitle}</h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="site-container mt-12">
            <RoomGallery images={galleryImages} labels={{ close: common.close, next: common.next, prev: common.prev }} />
          </div>
        </Reveal>
      </section>

      {/* Other rooms */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="site-container">
          <Reveal>
            <h2 className="display-title text-[clamp(1.9rem,3.4vw,2.8rem)]">{detail.otherRooms}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {others.map((otherId, index) => {
              const other = rooms[otherId];
              const otherCopy = roomsCopy.items[otherId];
              return (
                <Reveal key={otherId} delay={index * 120}>
                  <Link href={`/${lang}/rooms/${otherId}`} className="img-zoom group relative block aspect-[3/4] overflow-hidden">
                    <Image src={other.cover} alt={otherCopy.name} fill sizes="(max-width: 767px) 92vw, 31vw" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,16,9,0.68)_0%,rgba(17,16,9,0.05)_50%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-brass-light">{otherCopy.tagline}</p>
                      <h3 className="display-title mt-2 text-[1.45rem]">{otherCopy.name}</h3>
                      <p className="mt-3 flex items-center justify-between border-t border-ivory/25 pt-4 text-[0.78rem] text-ivory/80">
                        <span>
                          {common.from} <strong>{formatPrice(other.priceFrom, lang)}</strong>
                          {common.perNight}
                        </span>
                        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile fixed booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-ivory/95 px-5 py-4 backdrop-blur-md lg:hidden">
        <span className="text-[0.8rem] text-stone">
          {common.from}{" "}
          <strong className="font-display text-[1.15rem] font-normal text-espresso">{formatPrice(room.priceFrom, lang)}</strong>
          {common.perNight}
        </span>
        <Link href={`/${lang}/booking?room=${id}`} className="btn btn-gold min-h-12 px-6 text-[0.68rem]">
          {common.bookNow}
        </Link>
      </div>
    </>
  );
}
