"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Locale, Translations, locales, en } from "@/locales";

export function localePath(locale: Locale, path: string): string {
  if (!path) return `/${locale}`;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:")
  ) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  if (
    normalized === "/en" ||
    normalized === "/ar" ||
    normalized.startsWith("/en/") ||
    normalized.startsWith("/ar/") ||
    normalized.startsWith("/en#") ||
    normalized.startsWith("/ar#")
  ) {
    return normalized;
  }
  if (normalized.startsWith("/#")) {
    return `/${locale}${normalized.slice(1)}`;
  }
  return `/${locale}${normalized}`;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  t: (
    path: string,
    paramsOrFallback?: string | Record<string, string | number>,
  ) => string;
  dict: Translations;
}

function getNestedValue(obj: unknown, parts: string[]): unknown {
  let current: unknown = obj;
  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      part in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function resolveTranslation(
  dict: Translations | Record<string, unknown>,
  path: string,
  paramsOrFallback?: string | Record<string, string | number>,
): string {
  const parts = path.split(".");
  let current = getNestedValue(dict, parts);

  if (typeof current !== "string") {
    current = getNestedValue(en, parts);
  }

  if (typeof current !== "string") {
    if (typeof paramsOrFallback === "string") return paramsOrFallback;
    return path;
  }

  let result = current;
  if (paramsOrFallback && typeof paramsOrFallback === "object") {
    for (const [key, value] of Object.entries(paramsOrFallback)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
    }
  }

  return result;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  dir: "ltr",
  isRTL: false,
  t: (
    path: string,
    paramsOrFallback?: string | Record<string, string | number>,
  ) => resolveTranslation(en, path, paramsOrFallback),
  dict: en,
});

const STORAGE_KEY = "fontivo_locale";

function applyDocumentLocale(loc: Locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = loc;
    document.documentElement.dir = loc === "ar" ? "rtl" : "ltr";
  }
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? "en");

  useEffect(() => {
    if (initialLocale === "en" || initialLocale === "ar") {
      setLocaleState(initialLocale);
      applyDocumentLocale(initialLocale);
      try {
        localStorage.setItem(STORAGE_KEY, initialLocale);
      } catch {
        // Ignore storage errors
      }
      return;
    }

    try {
      const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
      if (pathname === "/ar" || pathname.startsWith("/ar/")) {
        setLocaleState("ar");
        applyDocumentLocale("ar");
        return;
      }
      if (pathname === "/en" || pathname.startsWith("/en/")) {
        setLocaleState("en");
        applyDocumentLocale("en");
        return;
      }

      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const urlLang = searchParams?.get("lang");

      if (urlLang === "ar" || urlLang === "en") {
        setLocaleState(urlLang);
        applyDocumentLocale(urlLang);
        localStorage.setItem(STORAGE_KEY, urlLang);
        return;
      }

      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "ar") {
        setLocaleState(saved);
        applyDocumentLocale(saved);
        return;
      }

      const browserLang = navigator.language?.toLowerCase() || "";
      const detected: Locale = browserLang.startsWith("ar") ? "ar" : "en";
      setLocaleState(detected);
      applyDocumentLocale(detected);
    } catch {
      applyDocumentLocale("en");
    }
  }, [initialLocale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    applyDocumentLocale(nextLocale);
    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const dict = locales[locale] || en;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const isRTL = locale === "ar";

  const t = useCallback(
    (
      path: string,
      paramsOrFallback?: string | Record<string, string | number>,
    ) => {
      return resolveTranslation(dict, path, paramsOrFallback);
    },
    [dict],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dir: dir as "ltr" | "rtl",
      isRTL,
      t,
      dict,
    }),
    [locale, setLocale, dir, isRTL, t, dict],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
