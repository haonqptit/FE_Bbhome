"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Dictionary, Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: { nav: Dictionary["nav"]; common: Dictionary["common"] };
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const { nav, common } = dictionary;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const alternateLocale: Locale = locale === "vi" ? "ja" : "vi";
  const switchPath = pathname.replace(new RegExp(`^/${locale}`), `/${alternateLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when navigating to a new page (adjust-state-during-render pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: `/${locale}`, label: nav.home, exact: true },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/rooms`, label: nav.rooms },
    { href: `/${locale}/services`, label: nav.services },
    { href: `/${locale}/gallery`, label: nav.gallery },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
        solid ? "bg-ivory/92 text-espresso shadow-[0_1px_0_rgba(17,16,9,0.08)] backdrop-blur-md" : "bg-transparent text-ivory"
      }`}
    >
      <div className={`site-container flex items-center justify-between transition-[height] duration-500 ${solid ? "h-[76px]" : "h-[104px]"}`}>
        <Link href={`/${locale}`} aria-label="BB Homes — Home" className="relative z-50 flex flex-col">
          <span className="font-display text-[1.35rem] leading-none tracking-[0.14em]">BB HOMES</span>
          <span className="mt-2 text-[0.6rem] font-medium tracking-[0.34em] text-brass">HANOI · VIETNAM</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.19em] transition-colors ${
                isActive(link.href, link.exact) ? "text-brass" : "hover:text-brass"
              }`}
            >
              {link.label}
              <span
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brass transition-transform duration-300 ${
                  isActive(link.href, link.exact) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href={switchPath}
            hrefLang={alternateLocale}
            className="text-[0.72rem] font-medium uppercase tracking-[0.19em] transition-colors hover:text-brass"
          >
            {alternateLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/booking`}
            className={`border px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.19em] transition-colors duration-300 ${
              solid
                ? "border-espresso hover:bg-espresso hover:text-ivory"
                : "border-ivory/70 hover:bg-ivory hover:text-espresso"
            }`}
          >
            {nav.book}
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? common.close : common.menu}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-50 grid h-11 w-11 place-items-center lg:hidden"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-espresso px-7 pb-10 pt-32 text-ivory transition-[opacity,visibility] duration-400 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {[...links, { href: `/${locale}/booking`, label: nav.book }].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ transitionDelay: menuOpen ? `${120 + index * 60}ms` : "0ms" }}
              className={`border-b border-ivory/10 py-4 font-display text-[1.7rem] transition-[opacity,transform] duration-500 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${"exact" in link && isActive(link.href, link.exact) ? "text-brass" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between">
          <Link href={switchPath} hrefLang={alternateLocale} className="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-brass">
            {common.language}
          </Link>
          <span className="text-[0.68rem] tracking-[0.22em] text-ivory/50">BA ĐÌNH · HANOI</span>
        </div>
      </div>
    </header>
  );
}
