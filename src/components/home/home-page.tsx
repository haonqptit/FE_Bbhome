import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary, Locale } from "@/lib/i18n";
import { formatPrice, roomOrder, rooms } from "@/lib/rooms";

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const { home, common } = dictionary;
  const [signatureId, ...secondaryIds] = roomOrder;
  const signature = rooms[signatureId];

  const heroSlides = [
    {
      src: "/ImageBbhomes/ImageHotelBasement/1.jpg",
      alt: locale === "vi" ? "Góc izakaya ấm cúng" : "あたたかな居酒屋の一角",
      positionClassName: "object-[35%_center] lg:object-center",
    },
    {
      src: "/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_resize.jpg",
      alt: locale === "vi" ? "Mặt tiền BB Homes về đêm" : "夜のBB Homes外観",
      positionClassName: "lg:object-center",
      mobileContain: true,
    },
    {
      src: "/ImageBbhomes/ImageRoom/802_BBHotel_resize.jpg",
      alt: locale === "vi" ? "Signature Studio ngập ánh sáng" : "光あふれるシグネチャースタジオ",
    },
  ];

  return (
    <>
      <HeroSlideshow locale={locale} hero={dictionary.hero} scrollLabel={common.scroll} slides={heroSlides} />

      {/* Stats strip */}
      <section className="border-b border-line bg-ivory">
        <div className="site-container grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {home.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 120}>
              <div className="flex items-baseline gap-5 px-2 py-9 sm:justify-center">
                <span className="font-display text-[2.6rem] leading-none text-brass">{stat.value}</span>
                <span className="max-w-40 text-[0.78rem] leading-6 text-stone">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Intro editorial */}
      <section className="overflow-hidden bg-ivory py-24 md:py-36">
        <div className="site-container grid items-start gap-14 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <div className="pt-6 lg:pt-16">
            <Reveal>
              <p className="eyebrow">{home.intro.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.2rem,4.2vw,3.6rem)]">{home.intro.title}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-lg text-[0.95rem] leading-8 text-stone">{home.intro.body}</p>
            </Reveal>
            <Reveal delay={300}>
              <blockquote className="mt-10 border-l border-brass pl-7 font-display text-[clamp(1.15rem,1.8vw,1.5rem)] italic leading-relaxed text-espresso/85">
                {home.intro.quote}
              </blockquote>
            </Reveal>
            <Reveal delay={400}>
              <Link href={`/${locale}/about`} className="text-link mt-12 inline-flex">
                {home.intro.link}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal>
              <figure className="img-zoom relative ml-auto aspect-[4/5] w-[82%] overflow-hidden">
                <Image
                  src="/ImageBbhomes/ImageRoom/302_BBHotel_05_resize.jpg"
                  alt={locale === "vi" ? "Không gian phòng nghỉ BB Homes" : "BB Homesの客室"}
                  fill
                  sizes="(max-width: 1023px) 78vw, 44vw"
                />
              </figure>
            </Reveal>
            <Reveal delay={200}>
              <figure className="img-zoom relative -mt-[26%] aspect-[3/4] w-[46%] overflow-hidden border-[10px] border-ivory">
                <Image
                  src="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_02_resize.jpg"
                  alt={locale === "vi" ? "Mặt tiền BB Homes giữa phố xanh" : "緑の通りにあるBB Homes"}
                  fill
                  sizes="(max-width: 1023px) 42vw, 24vw"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rooms teaser */}
      <section className="bg-sand/60 py-24 md:py-36">
        <div className="site-container">
          <div className="grid items-end gap-8 lg:grid-cols-[7fr_5fr]">
            <div>
              <Reveal>
                <p className="eyebrow">{home.rooms.eyebrow}</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="display-title mt-6 text-[clamp(2.2rem,4.2vw,3.6rem)]">{home.rooms.title}</h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div>
                <p className="max-w-md text-[0.95rem] leading-8 text-stone">{home.rooms.description}</p>
                <Link href={`/${locale}/rooms`} className="text-link mt-7 inline-flex">
                  {common.viewAll}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Signature room — large card */}
          <Reveal delay={150} className="min-w-0 max-w-full">
            <Link
              href={`/${locale}/rooms/${signature.id}`}
              className="img-zoom group relative mt-16 block aspect-[4/5] min-w-0 max-w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[16/8] lg:min-h-[380px]"
            >
              <Image
                src={signature.cover}
                alt={dictionary.rooms.items[signature.id].name}
                fill
                sizes="(max-width: 1023px) 92vw, 1320px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,16,9,0.72)_0%,rgba(17,16,9,0.12)_55%)]" />
              <div className="absolute inset-x-0 bottom-0 flex min-w-0 flex-col gap-4 p-5 text-ivory sm:p-7 md:flex-row md:items-end md:justify-between md:p-12">
                <div className="min-w-0">
                  <p className="break-words text-[0.68rem] font-medium uppercase tracking-[0.26em] text-brass-light">
                    {home.rooms.signature} · {dictionary.rooms.items[signature.id].tagline}
                  </p>
                  <h3 className="display-title mt-3 text-[clamp(1.9rem,3.4vw,3rem)]">
                    {dictionary.rooms.items[signature.id].name}
                  </h3>
                </div>
                <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 lg:flex-nowrap">
                  <span className="text-[0.85rem] text-ivory/85">
                    {common.from} <strong className="font-display text-[1.3rem]">{formatPrice(signature.priceFrom, locale)}</strong>
                    <span className="text-ivory/60">{common.perNight}</span>
                  </span>
                  <span className="inline-flex items-center gap-3 border-b border-ivory/60 pb-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-[gap] duration-300 group-hover:gap-5">
                    {common.viewDetails}
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Secondary rooms */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {secondaryIds.map((id, index) => {
              const room = rooms[id];
              const copy = dictionary.rooms.items[id];
              return (
                <Reveal key={id} delay={index * 130}>
                  <Link href={`/${locale}/rooms/${id}`} className="img-zoom group relative block aspect-[3/4] overflow-hidden">
                    <Image src={room.cover} alt={copy.name} fill sizes="(max-width: 767px) 92vw, 31vw" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,16,9,0.7)_0%,rgba(17,16,9,0.05)_50%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                      <p className="text-[0.64rem] font-medium uppercase tracking-[0.24em] text-brass-light">{copy.tagline}</p>
                      <h3 className="display-title mt-2 text-[1.55rem]">{copy.name}</h3>
                      <p className="mt-3 flex items-center justify-between border-t border-ivory/25 pt-4 text-[0.78rem] text-ivory/80">
                        <span>
                          {common.from} <strong>{formatPrice(room.priceFrom, locale)}</strong>
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

      {/* Izakaya experience — dark section */}
      <section className="overflow-hidden bg-oak py-24 text-ivory md:py-36">
        <div className="site-container grid items-center gap-14 lg:grid-cols-[4fr_7fr] lg:gap-20">
          <div className="relative z-10">
            <Reveal>
              <p className="eyebrow text-brass-light">{home.experience.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-title mt-6 text-[clamp(2.1rem,3.8vw,3.3rem)]">{home.experience.title}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[0.93rem] leading-8 text-ivory/65">{home.experience.body}</p>
            </Reveal>
            <Reveal delay={300}>
              <Link href={`/${locale}/services`} className="text-link mt-11 inline-flex text-ivory">
                {home.experience.link}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal>
              <figure className="img-zoom relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/ImageBbhomes/ImageHotelBasement/1.jpg"
                  alt="Izakaya at BB Homes"
                  fill
                  sizes="(max-width: 1023px) 92vw, 58vw"
                />
              </figure>
            </Reveal>
            <Reveal delay={200}>
              <figure className="img-zoom relative -mt-[18%] ml-auto mr-[-4%] aspect-square w-[38%] overflow-hidden border-[10px] border-oak">
                <Image src="/ImageBbhomes/ImageHotelBasement/5.jpg" alt="Izakaya entrance" fill sizes="24vw" />
              </figure>
            </Reveal>
            <p className="mt-5 text-right text-[0.62rem] uppercase tracking-[0.24em] text-ivory/45">
              {home.experience.caption}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery mosaic preview */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow">{home.gallery.eyebrow}</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="display-title mt-6 text-[clamp(2.2rem,4.2vw,3.6rem)]">{home.gallery.title}</h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Link href={`/${locale}/gallery`} className="text-link">
                {home.gallery.link}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-5" style={{ gridAutoRows: "minmax(160px, 1fr)" }}>
            {[
              { src: "/ImageBbhomes/ImageRoom/802_BBHotel_09_resize.jpg", className: "md:col-span-2 md:row-span-2" },
              { src: "/ImageBbhomes/ImageRoom/302_BBHotel_03_resize.jpg", className: "" },
              { src: "/ImageBbhomes/ImageHotelBasement/4.jpg", className: "md:row-span-2" },
              { src: "/ImageBbhomes/ImageRoom/801_BBHotel_06_resize.jpg", className: "" },
            ].map((item, index) => (
              <Reveal key={item.src} delay={index * 110} className={item.className}>
                <figure className="img-zoom relative h-full min-h-[160px] w-full overflow-hidden">
                  <Image src={item.src} alt="BB Homes" fill sizes="(max-width: 767px) 46vw, 33vw" />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative flex min-h-[72svh] items-center overflow-hidden text-ivory">
        <Image
          src="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_03_resize.jpg"
          alt="BB Homes Hanoi"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,9,0.82)_0%,rgba(17,16,9,0.35)_100%)]" />
        <div className="site-container relative z-10 py-28">
          <Reveal>
            <p className="eyebrow text-brass-light">{home.cta.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display-title mt-6 text-[clamp(2.6rem,6vw,4.8rem)]">{home.cta.title}</h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-md text-[0.95rem] leading-8 text-ivory/75">{home.cta.body}</p>
          </Reveal>
          <Reveal delay={360}>
            <Link href={`/${locale}/booking`} className="btn btn-gold mt-10">
              {home.cta.action}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
