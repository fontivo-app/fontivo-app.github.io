import { FONTIVO_VERSION } from "@/config/version";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora, Tajawal } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { assetPath, BASE_PATH } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#130C16",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    { name: "Eng. Ahmed Fahmy", url: siteConfig.links.author },
    { name: "Eng. Mohamed Elashwah", url: siteConfig.links.designerPortfolio },
  ],
  creator: siteConfig.creator,
  metadataBase: new URL(`${siteConfig.url}/`),
  icons: {
    icon: [
      { url: assetPath("/favicon.ico") },
      { url: assetPath("/brand/icon.ico") },
      { url: assetPath("/brand/fontivo-icon.svg"), type: "image/svg+xml" },
    ],
    apple: [{ url: assetPath("/brand/fontivo-icon.png") }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Ahmedfahmy8308",
  },
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      en: `${siteConfig.url}/en`,
      ar: `${siteConfig.url}/ar`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  operatingSystem: "Windows 10, Windows 11 (64-bit), macOS, Linux",
  applicationCategory: "DesignApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  softwareVersion: FONTIVO_VERSION,
  description: siteConfig.description,
  author: [
    {
      "@type": "Person",
      name: "Eng. Ahmed Fahmy",
      jobTitle: "Software Engineer",
      url: siteConfig.links.author,
    },
    {
      "@type": "Person",
      name: "Eng. Mohamed Elashwah",
      jobTitle: "Graphic Designer",
      url: siteConfig.links.designerPortfolio,
    },
  ],
  url: siteConfig.url,
  downloadUrl: siteConfig.links.latestRelease,
  license: "https://opensource.org/licenses/MIT",
};

const localeInitScript = `(function(){try{var base=${JSON.stringify(BASE_PATH)};var path=window.location.pathname||"";if(base&&(path===base||path.indexOf(base+"/")===0)){path=path.slice(base.length)||"/";}var l=(path==="/ar"||path.indexOf("/ar/")===0)?"ar":((path==="/en"||path.indexOf("/en/")===0)?"en":null);if(!l){var s=window.localStorage.getItem("fontivo_locale");var n=(window.navigator.language||"").toLowerCase();l=(s==="ar"||s==="en")?s:(n.indexOf("ar")===0?"ar":"en");}document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${tajawal.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-brand-navy text-brand-text-primary antialiased flex flex-col font-sans selection:bg-brand-coral selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}
