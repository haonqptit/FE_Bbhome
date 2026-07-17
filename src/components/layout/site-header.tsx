import { Menu, X } from "lucide-react";
import Link from "next/link";

import type { Dictionary, Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const alternateLocale = locale === "vi" ? "ja" : "vi";

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="BB Homes - Home">
          <span className="brand-main">BB HOMES</span>
          <span className="brand-sub">HANOI · VIETNAM</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href={`/${locale}`}>{nav.home}</Link>
          <Link href={`/${locale}#story`}>{nav.story}</Link>
          <Link href={`/${locale}#rooms`}>{nav.rooms}</Link>
          <Link href={`/${locale}#experience`}>{nav.experience}</Link>
          <Link href={`/${locale}#gallery`}>{nav.gallery}</Link>
        </nav>

        <div className="header-actions">
          <Link className="language-link" href={`/${alternateLocale}`} hrefLang={alternateLocale}>
            {alternateLocale.toUpperCase()}
          </Link>
          <Link className="header-book" href={`/${locale}#booking`}>{nav.book}</Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <Menu className="menu-open" aria-hidden="true" />
            <X className="menu-close" aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile navigation">
            <Link href={`/${locale}`}>{nav.home}</Link>
            <Link href={`/${locale}#story`}>{nav.story}</Link>
            <Link href={`/${locale}#rooms`}>{nav.rooms}</Link>
            <Link href={`/${locale}#experience`}>{nav.experience}</Link>
            <Link href={`/${locale}#gallery`}>{nav.gallery}</Link>
            <Link href={`/${locale}#booking`}>{nav.book}</Link>
            <Link href={`/${alternateLocale}`} hrefLang={alternateLocale}>
              {alternateLocale === "vi" ? "Tiếng Việt" : "日本語"}
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
