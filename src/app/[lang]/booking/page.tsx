import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookingForm } from "@/components/forms/booking-form";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";
import { isRoomId, roomOrder, type RoomId } from "@/lib/rooms";

export async function generateMetadata({ params }: PageProps<"/[lang]/booking">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.nav.book };
}

export default async function BookingPage({ params, searchParams }: PageProps<"/[lang]/booking">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const { booking } = dictionary;

  const query = await searchParams;
  const roomParam = typeof query.room === "string" ? query.room : undefined;
  const preselectedRoom: RoomId | undefined = roomParam && isRoomId(roomParam) ? roomParam : undefined;

  const roomNames = Object.fromEntries(
    roomOrder.map((id) => [id, { name: dictionary.rooms.items[id].name, tagline: dictionary.rooms.items[id].tagline }]),
  ) as Record<RoomId, { name: string; tagline: string }>;

  return (
    <>
      <PageHero
        compact
        eyebrow={booking.hero.eyebrow}
        title={booking.hero.title}
        description={booking.hero.description}
        image="/bbhomes/deluxe/cover.png"
        imageAlt={booking.hero.eyebrow}
      />

      <section className="bg-ivory py-20 md:py-28">
        <div className="site-container">
          <Reveal>
            <BookingForm
              locale={lang}
              copy={booking.form}
              roomNames={roomNames}
              commonCopy={{ from: dictionary.common.from, perNight: dictionary.common.perNight }}
              preselectedRoom={preselectedRoom}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
