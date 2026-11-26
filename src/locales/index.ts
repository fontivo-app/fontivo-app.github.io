import { en, Translations } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";

export const locales: Record<Locale, Translations> = {
  en,
  ar,
};

export { en, ar };
export type { Translations };
