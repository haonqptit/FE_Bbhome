import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans_JP, Noto_Serif_JP, Prata } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

import "../globals.css";

const displayFont = Prata({ subsets: ["latin", "vietnamese"], weight: "400", variable: "--font-prata", display: "swap" });
const sansFont = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500"], variable: "--font-be-vietnam", display: "swap" });
const jaSerifFont = Noto_Serif_JP({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-noto-serif-jp", display: "swap" });
const jaSansFont = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-noto-sans-jp", display: "swap" });

export const metadata: Metadata = {
  title: { default: "BB Homes Hanoi — Quiet Luxury Stay", template: "%s | BB Homes Hanoi" },
  description: "A quiet, warm boutique stay in the heart of Hanoi.",
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${displayFont.variable} ${sansFont.variable} ${jaSerifFont.variable} ${jaSansFont.variable}`}
      suppressHydrationWarning
    >
      <body className={lang === "ja" ? "locale-ja" : undefined}>
        <a className="skip-link" href="#main-content">
          {lang === "vi" ? "Bỏ qua điều hướng" : "本文へスキップ"}
        </a>
        <SiteHeader locale={lang} dictionary={{ nav: dictionary.nav, common: dictionary.common }} />
        <main id="main-content">{children}</main>
        <SiteFooter locale={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}
