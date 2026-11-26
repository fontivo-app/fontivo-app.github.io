import {
  FONTIVO_VERSION_TAG,
  FONTIVO_MAJOR_MINOR,
  FONTIVO_FONTS_VERSION_TAG,
} from "./version";
import { siteConfig } from "./site";

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Download",
    href: "/download",
    badge: FONTIVO_VERSION_TAG,
  },
  {
    title: "Docs",
    href: "/docs",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
];

export const footerNavigation: {
  product: NavSection;
  resources: NavSection;
  community: NavSection;
} = {
  product: {
    title: "Product",
    items: [
      { title: `Download Desktop v${FONTIVO_MAJOR_MINOR}`, href: "/download" },
      { title: "Font Packs (~11K Fonts)", href: "/download#font-packs" },
      { title: "Desktop Features", href: "/features" },
      { title: "About & Developers", href: "/about" },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      { title: "Quick Start Docs", href: "/docs" },
      { title: "Frequently Asked Questions", href: "/faq" },
      { title: "System Requirements", href: "/download#requirements" },
      {
        title: `Fontivo Fonts Release ${FONTIVO_FONTS_VERSION_TAG}`,
        href: siteConfig.links.fontsLatestRelease,
        external: true,
      },
    ],
  },
  community: {
    title: "Open Source",
    items: [
      {
        title: "Fontivo App (GitHub)",
        href: siteConfig.links.github,
        external: true,
      },
      {
        title: "Fontivo Fonts (GitHub)",
        href: siteConfig.links.fontsGithub,
        external: true,
      },
      {
        title: "Official Website",
        href: siteConfig.links.website,
        external: true,
      },
      {
        title: "MIT License",
        href: `${siteConfig.links.github}/blob/main/LICENSE`,
        external: true,
      },
    ],
  },
};
