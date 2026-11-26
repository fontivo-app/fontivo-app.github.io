"use client";

import * as React from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { FAQItem, faqCategories } from "@/config/faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

interface FAQClientProps {
  initialItems: FAQItem[];
}

export function FAQClient({ initialItems }: FAQClientProps) {
  const { t, locale } = useTranslation();
  const isAr = locale === "ar";
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [openId, setOpenId] = React.useState<string | null>(
    initialItems[0]?.id ?? null,
  );

  const filteredItems = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialItems.filter((item) => {
      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.questionAr.toLowerCase().includes(q) ||
        item.answerAr.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [initialItems, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      <SectionHeader
        badge={t("faqPage.badge")}
        badgeVariant="purple"
        title={t("faqPage.title")}
        description={t("faqPage.subtitle")}
        align="center"
        className="mb-8"
      />

      {/* Search & Category Tabs */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("faqPage.searchPlaceholder")}
            className="w-full h-11 ps-11 pe-10 rounded-xl bg-brand-surface-200 border border-brand-border text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-coral"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t("common.resetFilters")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {faqCategories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  active
                    ? "bg-brand-coral text-brand-navy border-brand-coral font-semibold"
                    : "bg-brand-surface-200/70 text-brand-text-secondary border-brand-border hover:text-white",
                )}
              >
                {isAr ? cat.labelAr : cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-brand-border bg-brand-surface-200/60 p-8 text-center space-y-4">
            <p className="text-sm text-brand-text-secondary">
              {t("faqPage.emptyMessage")}
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              {t("common.resetFilters")}
            </Button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isOpen = openId === item.id;
            const qText = isAr ? item.questionAr : item.question;
            const aText = isAr ? item.answerAr : item.answer;
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-2xl border transition-colors",
                  isOpen
                    ? "border-brand-coral/50 bg-brand-surface-200/80"
                    : "border-brand-border bg-brand-surface-200/50",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-start"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white break-words">
                    {qText}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-brand-text-muted shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-brand-coral-light",
                    )}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="px-5 pb-5 pt-3 text-sm text-brand-text-secondary leading-relaxed border-t border-brand-border-subtle/50"
                  >
                    {aText}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
