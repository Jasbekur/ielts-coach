/**
 * lib/uzbek-metadata.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Uzbek-language SEO metadata system for ieltssensei.uz
 *
 * Strategy:
 *  • Primary locale  : uz_UZ  (Latin Uzbek)
 *  • Alternate locale: en_US, ru_RU
 *  • City targeting  : Toshkent · Samarqand · Farg'ona · Buxoro
 *  • Uzbek terms     : Yozish · Gapirish · O'qish · Eshitish · Mashq
 *  • Title budget    : raw title ≤ 44 chars  →  "title | IELTS Sensei" ≤ 60
 *  • Description     : 150–160 chars per page
 *
 * Usage:
 *   import { UZ_PAGE_METADATA } from "@/lib/uzbek-metadata";
 *   export const metadata = UZ_PAGE_METADATA.home;
 */

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ieltssensei.uz";
const SITE_NAME = "IELTS Sensei";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// ─── Term & city constants ────────────────────────────────────────────────────

/** Official Uzbek IELTS term mapping */
export const UZ_TERMS = {
  writing:     "Yozish",
  speaking:    "Gapirish",
  reading:     "O'qish",
  listening:   "Eshitish",
  practice:    "Mashq",
  preparation: "Tayyorgarlik",
  exam:        "Imtihon",
  score:       "Ball",
  band:        "Band",
  free:        "Bepul",
  online:      "Onlayn",
  ai:          "AI",
} as const;

/** Cities in Uzbek with locative case suffix (prep = "da/da") */
export const UZ_CITIES = ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"] as const;
export type UzCity = (typeof UZ_CITIES)[number];

const CITY_PREP: Record<UzCity, string> = {
  "Toshkent":  "Toshkentda",
  "Samarqand": "Samarqandda",
  "Farg'ona":  "Farg'onada",
  "Buxoro":    "Buxoroda",
};

/** Sitewide Uzbek base keywords — appended to every page */
const BASE_KEYWORDS: string[] = [
  "IELTS",
  "IELTS Toshkent",
  "IELTS kurslari",
  "IELTS imtihoni",
  "IELTS tayyorgarlik",
  "IELTS onlayn",
  "IELTS band 7",
  "IELTS Uzbekiston",
  "IELTS O'zbekiston",
  "IELTS bali",
  "IELTS sensei",
  "IELTS AI",
];

// ─── Core builder ─────────────────────────────────────────────────────────────

interface UzMetaOptions {
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  cities?: UzCity[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

function buildUzMetadata(
  /** Raw title WITHOUT "| IELTS Sensei" — root layout template appends it.
   *  Keep ≤ 44 chars so full SERP title stays ≤ 60. */
  title: string,
  /** 150–160 chars. Include Uzbek city name when applicable. */
  description: string,
  options: UzMetaOptions = {}
): Metadata {
  const {
    path = "/",
    image = DEFAULT_OG_IMAGE,
    keywords = [],
    noIndex = false,
    type = "website",
    cities = [],
    publishedTime,
    modifiedTime,
    author,
  } = options;

  const url = `${BASE_URL}${path}`;
  const ogTitle = `${title} | ${SITE_NAME}`;

  // Auto-expand city keywords
  const cityKeywords = cities.flatMap((city) => [
    `IELTS ${city}`,
    `IELTS kurslari ${CITY_PREP[city]}`,
    `IELTS imtihon ${city}`,
    `IELTS ${city.toLowerCase()} tayyorgarlik`,
  ]);

  const allKeywords = Array.from(
    new Set([...BASE_KEYWORDS, ...keywords, ...cityKeywords])
  );

  return {
    title,
    description,
    keywords: allKeywords,
    authors: author
      ? [{ name: author }]
      : [{ name: SITE_NAME, url: BASE_URL }],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        uz:          url,
        en:          url,   // same URL, serve same content
        "x-default": url,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "uz_UZ",
      alternateLocale: ["en_US", "ru_RU"],
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
      creator: "@ieltssensei",
      site: "@ieltssensei",
    },
  };
}

// ─── Static page metadata ─────────────────────────────────────────────────────

export const UZ_PAGE_METADATA = {

  // ── Home ──────────────────────────────────────────────────────────────────
  // Target: broad IELTS + city search in Uzbekistan
  // Title (43 chars): "IELTS Tayyorgarlik — AI bilan band 7+ ga"
  home: buildUzMetadata(
    "IELTS Tayyorgarlik — AI bilan band 7+ ga",
    "IELTS Toshkent, Samarqand, Farg'ona, Buxoro. Sun'iy intellekt Yozish va Gapirish ballini 15 soniyada beradi. Bepul boshlang, 8 haftada Band 7.5 ga erishing.",
    {
      path: "/",
      keywords: [
        "IELTS tayyorgarlik Toshkent",
        "IELTS kurslari Samarqand",
        "IELTS kurslari Farg'ona",
        "IELTS kurslari Buxoro",
        "IELTS sun'iy intellekt",
        "IELTS bepul mashq",
        "IELTS band 7.5",
        "IELTS mock test",
        "IELTS 2024 2025",
      ],
      cities: ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"],
    }
  ),

  // ── Writing ───────────────────────────────────────────────────────────────
  // Target: "IELTS yozish", "IELTS essay Toshkent"
  // Title (43 chars): "IELTS Yozish Mashqi — Task 1 & Task 2 AI"
  writing: buildUzMetadata(
    "IELTS Yozish Mashqi — Task 1 & Task 2 AI",
    "IELTS Yozish bo'yicha Task 1 va Task 2 mashqlari. Toshkent talabalariga TR, CC, LR, GRA mezonlari bo'yicha sun'iy intellekt 15 soniyada ball beradi. Bepul.",
    {
      path: "/writing",
      keywords: [
        "IELTS yozish Toshkent",
        "IELTS yozish mashqi",
        "IELTS task 2 Samarqand",
        "IELTS essay tekshiruv",
        "IELTS writing ball",
        "IELTS yozish Farg'ona",
        "IELTS task 1 Buxoro",
        "IELTS writing AI tekshiruv",
        "IELTS essay band ball",
      ],
      cities: ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"],
    }
  ),

  // ── Speaking ──────────────────────────────────────────────────────────────
  // Target: "IELTS gapirish", "IELTS speaking Toshkent"
  // Title (42 chars): "IELTS Gapirish Mashqi — 3 qism, AI balli"
  speaking: buildUzMetadata(
    "IELTS Gapirish Mashqi — 3 qism, AI balli",
    "IELTS Gapirish 1, 2, 3-qismlar. Haqiqiy cue cardlar va AI baholash: talaffuz, grammatika, ravonlik. Toshkent, Samarqand, Farg'ona, Buxoro uchun onlayn.",
    {
      path: "/speaking",
      keywords: [
        "IELTS gapirish Toshkent",
        "IELTS speaking mashq",
        "IELTS cue card",
        "IELTS gapirish ball",
        "IELTS speaking Samarqand",
        "IELTS speaking Farg'ona",
        "IELTS talaffuz tekshiruv",
        "IELTS part 2 gapirish",
        "IELTS speaking Buxoro",
      ],
      cities: ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"],
    }
  ),

  // ── Listening ─────────────────────────────────────────────────────────────
  // Target: "IELTS eshitish", "IELTS listening Toshkent"
  // Title (43 chars): "IELTS Eshitish — 4 bo'lim, 40 savol onlayn"
  listening: buildUzMetadata(
    "IELTS Eshitish — 4 bo'lim, 40 savol onlayn",
    "IELTS Eshitish bo'yicha Cambridge formatidagi haqiqiy testlar. Toshkent va butun O'zbekiston uchun 4 bo'lim, 40 savol, vaqt cheklovli rejim. Bepul boshlang.",
    {
      path: "/listening",
      keywords: [
        "IELTS eshitish Toshkent",
        "IELTS listening mashq",
        "IELTS listening test onlayn",
        "IELTS eshitish Samarqand",
        "IELTS eshitish Farg'ona",
        "IELTS Cambridge eshitish",
        "IELTS 40 savol eshitish",
        "IELTS listening Buxoro",
      ],
      cities: ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"],
    }
  ),

  // ── Reading ───────────────────────────────────────────────────────────────
  // Target: "IELTS o'qish", "IELTS reading Toshkent"
  // Title (44 chars): "IELTS O'qish — Academic & General, 10 000+"
  reading: buildUzMetadata(
    "IELTS O'qish — Academic & General, 10 000+",
    "IELTS O'qish Academic va General Training. 10 000+ savol: Toshkent, Samarqand, Farg'ona, Buxoro talabalariga moslashtirilgan vaqt cheklovli onlayn mashq.",
    {
      path: "/reading",
      keywords: [
        "IELTS o'qish Toshkent",
        "IELTS reading mashq",
        "IELTS academic reading",
        "IELTS general reading",
        "IELTS o'qish Samarqand",
        "IELTS o'qish Farg'ona",
        "IELTS reading Buxoro",
        "IELTS 40 savol o'qish",
      ],
      cities: ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"],
    }
  ),

  // ── Pricing ───────────────────────────────────────────────────────────────
  // Target: "IELTS narxi", "IELTS kurslari narxi Toshkent"
  // Title (40 chars): "IELTS Sensei Narxlar — Bepuldan Premium"
  pricing: buildUzMetadata(
    "IELTS Sensei Narxlar — Bepuldan Premium",
    "IELTS Sensei to'rt rejim: Bepul, Starter $4.99, Elite $12.99, Premium $29. Toshkent va butun O'zbekiston uchun eng arzon IELTS AI tayyorgarlik platformasi.",
    {
      path: "/pricing",
      keywords: [
        "IELTS narxi Toshkent",
        "IELTS kurslari narxi",
        "IELTS bepul mashq",
        "IELTS tayyorgarlik narxi",
        "IELTS AI arzon",
        "IELTS kurs Samarqand narx",
      ],
      cities: ["Toshkent", "Samarqand"],
    }
  ),

  // ── Demo ──────────────────────────────────────────────────────────────────
  // Title (40 chars): "IELTS Sensei Demo — AI ballini ko'ring"
  demo: buildUzMetadata(
    "IELTS Sensei Demo — AI ballini ko'ring",
    "Ro'yxatdan o'tmasdan IELTS Sensei demo ni sinab ko'ring. Toshkent va O'zbekiston talabalari uchun sun'iy intellekt tomonidan haqiqiy ball va tavsiyalar.",
    {
      path: "/demo",
      keywords: [
        "IELTS demo Toshkent",
        "IELTS AI sinov bepul",
        "IELTS namuna javob",
        "IELTS bepul sinov",
      ],
      cities: ["Toshkent"],
    }
  ),

  // ── Blog ──────────────────────────────────────────────────────────────────
  // Title (38 chars): "IELTS Blog — Bepul maslahat va usullar"
  blog: buildUzMetadata(
    "IELTS Blog — Bepul maslahat va usullar",
    "IELTS bo'yicha bepul qo'llanmalar: Yozish, Gapirish, O'qish, Eshitish. Band 7+ strategiyalari Toshkent, Samarqand, Farg'ona va Buxoro uchun. Har hafta yangi.",
    {
      path: "/blog",
      keywords: [
        "IELTS blog O'zbekiston",
        "IELTS maslahatlar Toshkent",
        "IELTS strategiya",
        "IELTS band 7 qo'llanma",
        "IELTS yozish maslahat",
        "IELTS gapirish maslahat",
      ],
      cities: ["Toshkent", "Samarqand"],
    }
  ),

  // ── Sign up ───────────────────────────────────────────────────────────────
  // Title (42 chars): "Bepul Ro'yxatdan O'ting — IELTS AI Mashq"
  signup: buildUzMetadata(
    "Bepul Ro'yxatdan O'ting — IELTS AI Mashq",
    "IELTS Sensei'ga bepul ro'yxatdan o'ting. Toshkent, Samarqand, Farg'ona va Buxoro talabalari: AI yordamida Yozish va Gapirish ballini bepul oling.",
    {
      path: "/signup",
      keywords: [
        "IELTS ro'yxatdan Toshkent",
        "IELTS bepul kurs",
        "IELTS platformasi",
        "IELTS AI mashq bepul",
      ],
      cities: ["Toshkent", "Samarqand", "Farg'ona", "Buxoro"],
    }
  ),

  // ── Login ─────────────────────────────────────────────────────────────────
  // noIndex = false intentionally — login pages can rank for brand queries
  // Title (36 chars): "Kirish — IELTS Sensei hisobingizga"
  login: buildUzMetadata(
    "Kirish — IELTS Sensei hisobingizga",
    "IELTS Sensei hisobingizga kiring va tayyorgarlikni davom ettiring. Toshkent va butun O'zbekiston talabalari uchun sun'iy intellekt bilan IELTS mashqi.",
    {
      path: "/login",
      keywords: ["IELTS kirish", "IELTS hisob"],
    }
  ),

  // ── Dashboard (private — noIndex) ─────────────────────────────────────────
  dashboard: buildUzMetadata(
    "Boshqaruv paneli — IELTS Progressingiz",
    "IELTS ball natijalaringizni, mashq tarixingizni va zaif tomonlaringizni kuzating. Maqsadli bandingizga erishish uchun shaxsiylashtirilgan tavsiyalar.",
    { path: "/dashboard", noIndex: true }
  ),

  // ── History (private — noIndex) ───────────────────────────────────────────
  history: buildUzMetadata(
    "Mashq Tarixi — Barcha IELTS Urinishlaringiz",
    "Barcha IELTS Yozish va Gapirish urinishlaringizni ko'rib chiqing. Vaqt o'tishi bilan band ballingizning o'sishini kuzating.",
    { path: "/history", noIndex: true }
  ),

  // ── Forgot password (noIndex) ─────────────────────────────────────────────
  forgotPassword: buildUzMetadata(
    "Parolni Tiklash — IELTS Sensei",
    "IELTS Sensei hisobingiz uchun parolni elektron pochta orqali tiklang.",
    { path: "/forgot-password", noIndex: true }
  ),

  // ── Reset password (noIndex) ──────────────────────────────────────────────
  resetPassword: buildUzMetadata(
    "Yangi Parol O'rnatish — IELTS Sensei",
    "IELTS Sensei hisobingiz uchun yangi parol o'rnating.",
    { path: "/reset-password", noIndex: true }
  ),
} as const;

// ─── City landing page generator ──────────────────────────────────────────────
// For future /toshkent, /samarqand, /fargona, /buxoro pages
// Also supports city+skill combos: /toshkent/yozish etc.

export function generateCityMetadata(
  city: UzCity,
  skill?: keyof Pick<typeof UZ_TERMS, "writing" | "speaking" | "reading" | "listening">
): Metadata {
  const skillUz = skill ? UZ_TERMS[skill] : null;
  const prep = CITY_PREP[city];
  const slugCity = city.toLowerCase().replace(/['']/g, "");
  const path = skill ? `/${slugCity}/${skill}` : `/${slugCity}`;

  if (skillUz && skill) {
    return buildUzMetadata(
      `IELTS ${skillUz} ${prep} — AI bilan band ball`,
      `${city} talabalari uchun IELTS ${skillUz} mashqi. Sun'iy intellekt 15 soniyada aniq ball beradi. ${prep} eng yaxshi IELTS natijasiga erishish uchun bepul boshlang.`,
      {
        path,
        keywords: [
          `IELTS ${skillUz} ${city}`,
          `IELTS ${skill} ${prep}`,
          `IELTS ${prep}`,
          `IELTS kurs ${city}`,
          `IELTS ${skillUz.toLowerCase()} mashq ${city}`,
        ],
        cities: [city],
      }
    );
  }

  return buildUzMetadata(
    `IELTS Kurslari ${prep} — Onlayn AI Tayyorgarlik`,
    `${city} uchun eng yaxshi onlayn IELTS tayyorgarlik. AI bilan Yozish, Gapirish, O'qish, Eshitish mashqlari. Band 7+ ga erishish uchun bepul boshlang — ${prep}.`,
    {
      path,
      keywords: [
        `IELTS ${city}`,
        `IELTS kurs ${city}`,
        `IELTS tayyorgarlik ${prep}`,
        `IELTS onlayn ${city}`,
        `IELTS band 7 ${city}`,
        `IELTS AI ${city}`,
      ],
      cities: [city],
    }
  );
}

// ─── Blog post metadata generator ────────────────────────────────────────────

export function generateBlogPostUzMetadata(params: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  tags?: string[];
  image?: string;
}): Metadata {
  const { title, description, slug, publishedAt, modifiedAt, author, tags = [], image } = params;

  const tagKeywords = tags.flatMap((tag) => [
    tag,
    `IELTS ${tag}`,
    `${tag} Toshkent`,
    `${tag} O'zbekiston`,
  ]);

  return buildUzMetadata(title, description, {
    path: `/blog/${slug}`,
    image: image ?? DEFAULT_OG_IMAGE,
    keywords: tagKeywords,
    type: "article",
    publishedTime: publishedAt,
    modifiedTime: modifiedAt ?? publishedAt,
    author: author ?? "IELTS Sensei",
    cities: ["Toshkent"],
  });
}

// ─── LocalBusiness / EducationalOrganization JSON-LD ─────────────────────────
// Inject via <LocalBusinessSchema /> in app/layout.tsx

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${BASE_URL}/#organization`,
      name: "IELTS Sensei",
      alternateName: [
        "IELTS Sensei Uzbekistan",
        "IELTS Sensei O'zbekiston",
        "ieltssensei.uz",
      ],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${BASE_URL}/og-image.png`,
      description:
        "O'zbekistondagi eng yaxshi onlayn IELTS tayyorgarlik platformasi. Sun'iy intellekt yordamida Yozish va Gapirish bo'yicha 15 soniyada band ball oling.",
      inLanguage: ["uz", "en"],
      sameAs: [
        "https://instagram.com/ieltssensei_uz",
        "https://t.me/ieltssensei_uz",
      ],
      areaServed: UZ_CITIES.map((city) => ({
        "@type": "City",
        name: city,
        containedInPlace: {
          "@type": "Country",
          name: "O'zbekiston",
          sameAs: "https://www.wikidata.org/wiki/Q265",
        },
      })),
      availableLanguage: [
        { "@type": "Language", name: "Uzbek",   alternateName: "uz" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "10000",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IELTS Tayyorgarlik Kurslari",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "IELTS Yozish Mashqi — Task 1 va Task 2",
              description:
                "Sun'iy intellekt bilan IELTS Yozish Task 1 va Task 2 bo'yicha 15 soniyada band ball. Toshkent, Samarqand, Farg'ona, Buxoro talabalari uchun.",
              url: `${BASE_URL}/writing`,
              provider: { "@type": "Organization", name: "IELTS Sensei" },
              inLanguage: "uz",
            },
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "IELTS Gapirish Mashqi — 1, 2, 3-qism",
              description:
                "Sun'iy intellekt bilan IELTS Gapirish 1, 2, 3-qismlar bo'yicha talaffuz, grammatika va ravonlik baholash.",
              url: `${BASE_URL}/speaking`,
              provider: { "@type": "Organization", name: "IELTS Sensei" },
              inLanguage: "uz",
            },
            price: "12.99",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "IELTS O'qish Mashqi — Academic va General",
              description:
                "10 000+ IELTS O'qish savollari Academic va General Training uchun. Vaqt cheklovli, avtomatik baholash.",
              url: `${BASE_URL}/reading`,
              provider: { "@type": "Organization", name: "IELTS Sensei" },
              inLanguage: "uz",
            },
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "IELTS Eshitish Mashqi — Cambridge formati",
              description:
                "Cambridge formatida IELTS Eshitish 4 bo'lim, 40 savol. Audio bir marta ijro etiladi — xuddi haqiqiy imtihondek.",
              url: `${BASE_URL}/listening`,
              provider: { "@type": "Organization", name: "IELTS Sensei" },
              inLanguage: "uz",
            },
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "IELTS Sensei",
      description:
        "IELTS Tayyorgarlik — Sun'iy intellekt bilan band ball 15 soniyada",
      inLanguage: ["uz", "en"],
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
} as const;
