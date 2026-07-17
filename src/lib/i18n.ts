import "server-only";

export const locales = ["vi", "ja"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  vi: () => import("@/messages/vi.json").then((module) => module.default),
  ja: () => import("@/messages/ja.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
