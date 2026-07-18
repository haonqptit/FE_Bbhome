import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import type { Dictionary, Locale } from "@/lib/i18n";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const { footer, nav } = dictionary;

  return (
    <footer className="bg-espresso text-ivory">
      {/* Booking strip */}
      <div className="border-b border-ivory/10">
        <div className="site-container flex flex-col gap-7 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display-title text-[clamp(1.7rem,3vw,2.4rem)]">{footer.bookTitle}</h2>
            <p className="mt-3 text-[0.92rem] text-ivory/60">{footer.bookBody}</p>
          </div>
          <Link href={`/${locale}/booking`} className="btn btn-gold w-fit">
            {nav.book}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="site-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
        <div>
          <Link href={`/${locale}`} className="inline-flex flex-col">
            <span className="font-display text-[1.8rem] leading-none tracking-[0.14em]">BB HOMES</span>
            <span className="mt-2 text-[0.62rem] font-medium tracking-[0.34em] text-brass">{footer.tagline}</span>
          </Link>
          <p className="mt-6 max-w-sm text-[0.88rem] leading-7 text-ivory/60">{footer.about}</p>
        </div>

        <div>
          <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-brass">{footer.contactTitle}</h3>
          <ul className="mt-6 flex flex-col gap-4 text-[0.88rem] text-ivory/75">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-1 shrink-0 text-brass" aria-hidden="true" />
              {footer.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="shrink-0 text-brass" aria-hidden="true" />
              <a href={`tel:${footer.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-brass">
                {footer.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="shrink-0 text-brass" aria-hidden="true" />
              <a href={`mailto:${footer.email}`} className="transition-colors hover:text-brass">
                {footer.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-brass">{footer.hoursTitle}</h3>
          <ul className="mt-6 flex flex-col gap-3 text-[0.88rem] text-ivory/75">
            <li>{footer.checkin}</li>
            <li>{footer.checkout}</li>
            <li>{footer.reception}</li>
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-brass">{footer.navTitle}</h3>
          <ul className="mt-6 flex flex-col gap-3 text-[0.88rem] text-ivory/75">
            <li><Link href={`/${locale}/about`} className="transition-colors hover:text-brass">{nav.about}</Link></li>
            <li><Link href={`/${locale}/rooms`} className="transition-colors hover:text-brass">{nav.rooms}</Link></li>
            <li><Link href={`/${locale}/services`} className="transition-colors hover:text-brass">{nav.services}</Link></li>
            <li><Link href={`/${locale}/gallery`} className="transition-colors hover:text-brass">{nav.gallery}</Link></li>
            <li><Link href={`/${locale}/contact`} className="transition-colors hover:text-brass">{nav.contact}</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-ivory/10">
        <div className="site-container flex flex-col gap-4 py-7 text-[0.72rem] tracking-[0.08em] text-ivory/40 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {footer.copyright} · Designed by{" "}
            <a
              href="https://www.facebook.com/nqh2904/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/65 underline decoration-ivory/25 underline-offset-4 transition-colors hover:text-brass"
            >
              Hao
            </a>
          </span>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-brass">
            {dictionary.common.backTop}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
