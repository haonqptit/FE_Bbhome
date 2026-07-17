import { ArrowDown, ArrowRight, CalendarDays, ChevronDown, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Dictionary, Locale } from "@/lib/i18n";

const roomImages = [
  "/ImageBbhomes/ImageRoom/301_BBHotel_resize.jpg",
  "/ImageBbhomes/ImageRoom/302_BBHotel_resize.jpg",
  "/ImageBbhomes/ImageRoom/802_BBHotel_resize.jpg",
];

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <>
      <section className="hero" id="top">
        <Image
          className="hero-image"
          src="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_resize.jpg"
          alt={locale === "vi" ? "Mặt tiền BB Homes về đêm" : "夜のBB Homes外観"}
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="site-container hero-content">
          <p className="eyebrow hero-eyebrow">{dictionary.hero.eyebrow}</p>
          <h1>{dictionary.hero.title}</h1>
          <p className="hero-description">{dictionary.hero.description}</p>
          <div className="hero-actions">
            <Link className="button button-gold" href={`/${locale}#rooms`}>
              {dictionary.hero.primary}<ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="text-link text-link-light" href={`/${locale}#story`}>
              {dictionary.hero.secondary}
            </Link>
          </div>
        </div>
        <a className="scroll-cue" href="#story">
          <ArrowDown size={15} aria-hidden="true" /> {dictionary.hero.scroll}
        </a>
      </section>

      <section className="booking-wrap" aria-label={dictionary.nav.book}>
        <div className="site-container booking-bar">
          <BookingField icon={<CalendarDays />} label={dictionary.booking.arrival} value="— / — / —" />
          <BookingField icon={<CalendarDays />} label={dictionary.booking.departure} value="— / — / —" />
          <BookingField icon={<Users />} label={dictionary.booking.guests} value={dictionary.booking.guestValue} />
          <BookingField icon={<ChevronDown />} label={dictionary.booking.room} value={dictionary.booking.roomValue} />
          <a className="booking-submit" href="#booking">{dictionary.booking.action}<ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="intro-section section-pad" id="story">
        <div className="site-container intro-grid">
          <div className="intro-copy">
            <p className="eyebrow">{dictionary.intro.eyebrow}</p>
            <h2 className="display-title">{dictionary.intro.title}</h2>
            <p className="body-large">{dictionary.intro.body}</p>
            <Link className="text-link" href={`/${locale}#gallery`}>
              {dictionary.intro.link}<ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="intro-visuals">
            <figure className="intro-image intro-image-main">
              <Image src="/ImageBbhomes/ImageRoom/302_BBHotel_05_resize.jpg" alt={locale === "vi" ? "Không gian phòng nghỉ BB Homes" : "BB Homesの客室"} fill sizes="(max-width: 768px) 70vw, 28vw" />
            </figure>
            <figure className="intro-image intro-image-side">
              <Image src="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_02_resize.jpg" alt={locale === "vi" ? "Mặt tiền BB Homes giữa phố xanh" : "緑の通りにあるBB Homes"} fill sizes="(max-width: 768px) 50vw, 17vw" />
            </figure>
          </div>
          <blockquote>{dictionary.intro.quote}</blockquote>
        </div>
      </section>

      <section className="rooms-section section-pad" id="rooms">
        <div className="site-container section-heading-row">
          <div>
            <p className="eyebrow">{dictionary.rooms.eyebrow}</p>
            <h2 className="display-title">{dictionary.rooms.title}</h2>
          </div>
          <div className="section-aside">
            <p>{dictionary.rooms.description}</p>
            <Link className="text-link" href={`/${locale}#rooms`}>{dictionary.rooms.viewAll}<ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="site-container room-grid">
          {dictionary.rooms.items.map((room, index) => (
            <article className={`room-card room-card-${index + 1}`} key={room.name}>
              <Image src={roomImages[index]} alt={room.name} fill sizes="(max-width: 767px) 84vw, (max-width: 1100px) 45vw, 31vw" />
              <div className="room-card-shade" />
              <div className="room-card-top"><span>0{index + 1}</span><span>{room.note}</span></div>
              <div className="room-card-content">
                <p>{room.meta}</p>
                <h3>{room.name}</h3>
                <span className="room-detail">{dictionary.rooms.details}<ArrowRight size={15} /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section section-pad" id="experience">
        <div className="site-container experience-grid">
          <div className="experience-copy">
            <p className="eyebrow eyebrow-gold">{dictionary.experience.eyebrow}</p>
            <h2 className="display-title">{dictionary.experience.title}</h2>
            <p>{dictionary.experience.body}</p>
            <Link className="text-link text-link-light" href={`/${locale}#experience`}>{dictionary.experience.link}<ArrowRight size={15} /></Link>
          </div>
          <figure className="experience-image-large">
            <Image src="/ImageBbhomes/ImageHotelBasement/1.jpg" alt="Izakaya at BB Homes" fill sizes="(max-width: 768px) 100vw, 55vw" />
            <figcaption>{dictionary.experience.caption}</figcaption>
          </figure>
          <figure className="experience-image-small">
            <Image src="/ImageBbhomes/ImageHotelBasement/5.jpg" alt="Izakaya entrance" fill sizes="(max-width: 768px) 45vw, 19vw" />
          </figure>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="site-container gallery-heading">
          <div><p className="eyebrow">{dictionary.gallery.eyebrow}</p><h2 className="display-title">{dictionary.gallery.title}</h2></div>
          <Link className="text-link" href={`/${locale}#gallery`}>{dictionary.gallery.link}<ArrowRight size={15} /></Link>
        </div>
        <div className="gallery-strip">
          <figure className="gallery-item gallery-tall"><Image src="/ImageBbhomes/ImageRoom/802_BBHotel_09_resize.jpg" alt="BB Homes detail" fill sizes="30vw" /></figure>
          <figure className="gallery-item"><Image src="/ImageBbhomes/ImageRoom/302_BBHotel_03_resize.jpg" alt="BB Homes room" fill sizes="38vw" /></figure>
          <figure className="gallery-item gallery-tall"><Image src="/ImageBbhomes/ImageHotelBasement/4.jpg" alt="BB Homes Izakaya" fill sizes="30vw" /></figure>
          <figure className="gallery-item"><Image src="/ImageBbhomes/ImageRoom/801_BBHotel_06_resize.jpg" alt="View from BB Homes" fill sizes="38vw" /></figure>
        </div>
      </section>

      <section className="closing-section" id="booking">
        <Image src="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_03_resize.jpg" alt="BB Homes Hanoi" fill sizes="100vw" />
        <div className="closing-shade" />
        <div className="site-container closing-content">
          <p className="eyebrow">{dictionary.closing.eyebrow}</p>
          <h2 className="display-title">{dictionary.closing.title}</h2>
          <p>{dictionary.closing.body}</p>
          <Link className="button button-gold" href={`/${locale}#booking`}>{dictionary.closing.action}<ArrowRight size={16} /></Link>
          <span className="closing-location"><MapPin size={15} /> Ba Đình · Hanoi</span>
        </div>
      </section>

      <a className="mobile-booking-cta" href="#booking">{dictionary.booking.mobile}<ArrowRight size={16} /></a>
    </>
  );
}

function BookingField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="booking-field"><span className="booking-icon">{icon}</span><span><small>{label}</small><strong>{value}</strong></span></div>;
}
