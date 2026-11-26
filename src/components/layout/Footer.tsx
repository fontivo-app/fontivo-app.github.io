"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerNavigation } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { useTranslation, localePath } from "@/context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, locale } = useTranslation();

  const sections = [
    {
      title: t("footer.product", footerNavigation.product.title),
      items: footerNavigation.product.items,
      labelsAr: [
        "تحميل التطبيق المكتبي",
        "حزم الخطوط (10,939 خطًا)",
        "مزايا التطبيق",
        "عن المشروع والمطورين",
      ],
    },
    {
      title: t("footer.resources", footerNavigation.resources.title),
      items: footerNavigation.resources.items,
      labelsAr: [
        "الدليل السريع",
        "الأسئلة الشائعة",
        "متطلبات التشغيل",
        "مكتبة الخطوط",
      ],
    },
    {
      title: t("footer.openSource", footerNavigation.community.title),
      items: footerNavigation.community.items,
      labelsAr: [
        "مستودع التطبيق (GitHub)",
        "مستودع الخطوط (GitHub)",
        "الموقع الرسمي",
        "رخصة MIT",
      ],
    },
  ];

  return (
    <footer className="border-t border-brand-border-subtle bg-brand-darker py-12 text-brand-text-secondary">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-10 text-start">
          {/* Brand & Developers Summary (no localization control in footer) */}
          <div className="flex flex-col space-y-4 lg:col-span-5 min-w-0">
            <Link
              href={localePath(locale, "/")}
              className="inline-flex items-center gap-2.5 w-fit"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-surface-200 border border-brand-border-subtle p-1.5 shrink-0">
                <Image
                  src="/brand/fontivo-mark.svg"
                  alt="Fontivo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Fontivo
              </span>
            </Link>

            <p className="text-sm text-brand-text-secondary leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>

            <p className="text-xs text-brand-text-muted leading-relaxed">
              {locale === "ar" ? (
                <>
                  تطوير:{" "}
                  <a
                    href="https://ahmed-fahmy.engineer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-coral-light underline underline-offset-4 transition-colors font-semibold"
                  >
                    م. أحمد فهمي
                  </a>{" "}
                  و{" "}
                  <a
                    href="https://mohamed-elashwah.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-lavender-light underline underline-offset-4 transition-colors font-semibold"
                  >
                    م. محمد الأشوح
                  </a>
                </>
              ) : (
                <>
                  Developed by{" "}
                  <a
                    href="https://ahmed-fahmy.engineer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-coral-light underline underline-offset-4 transition-colors font-semibold"
                  >
                    Eng. Ahmed Fahmy
                  </a>{" "}
                  &amp;{" "}
                  <a
                    href="https://mohamed-elashwah.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-lavender-light underline underline-offset-4 transition-colors font-semibold"
                  >
                    Eng. Mohamed Elashwah
                  </a>
                </>
              )}
            </p>
          </div>

          {/* 3 Clean Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="flex flex-col space-y-3 min-w-0"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {section.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {section.items.map((item, idx) => {
                    const label =
                      locale === "ar"
                        ? section.labelsAr[idx] || item.title
                        : item.title;
                    return (
                      <li key={item.href}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-brand-text-secondary transition-colors hover:text-brand-coral-light break-words"
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            href={localePath(locale, item.href)}
                            className="inline-block text-brand-text-secondary transition-colors hover:text-brand-coral-light break-words"
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Bottom Bar */}
        <div className="border-t border-brand-border-subtle pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-text-muted">
          <p>{t("footer.copyright", { year: currentYear })}</p>
          <span className="font-mono text-brand-lavender-light">
            {t("common.mitLicense", "MIT License")} •{" "}
            {t("footer.sha256Verified")}
          </span>
        </div>
      </Container>
    </footer>
  );
}
