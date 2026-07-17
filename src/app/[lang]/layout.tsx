import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

import "../globals.css";

const displayFont = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], variable: "--font-display", display: "swap" });
const vietnameseFont = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600"], variable: "--font-sans", display: "swap" });
const japaneseFont = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-japanese", display: "swap" });

export const metadata: Metadata = {
  title: { default: "BB Homes Hanoi", template: "%s | BB Homes Hanoi" },
  description: "A quiet, warm stay in the heart of Hanoi.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${displayFont.variable} ${vietnameseFont.variable} ${japaneseFont.variable}`}>
      <body className={lang === "ja" ? "locale-ja" : undefined}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader locale={lang} nav={dictionary.nav} />
        <main id="main-content">{children}</main>
        <SiteFooter locale={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}
