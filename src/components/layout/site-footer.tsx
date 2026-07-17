import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Dictionary, Locale } from "@/lib/i18n";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="brand brand-footer" href={`/${locale}`}>
            <span className="brand-main">BB HOMES</span>
            <span className="brand-sub">{dictionary.footer.tagline}</span>
          </Link>
        </div>
        <div className="footer-address">
          <span>Hanoi, Vietnam</span>
          <p>{dictionary.footer.address}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href={`/${locale}#rooms`}>{dictionary.nav.rooms}</Link>
          <Link href={`/${locale}#gallery`}>{dictionary.nav.gallery}</Link>
          <Link href={`/${locale}#booking`}>{dictionary.nav.contact}</Link>
        </nav>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} {dictionary.footer.copyright}</span>
        <a href="#top">{dictionary.footer.backTop} <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
