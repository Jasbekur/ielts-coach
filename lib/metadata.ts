/**
 * lib/metadata.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Primary metadata exports for ieltssensei.uz
 *
 * PAGE_METADATA now points to the Uzbek metadata system (UZ_PAGE_METADATA)
 * so every page automatically ships with uz_UZ locale, city-targeted keywords,
 * Uzbek descriptions, and hreflang alternates.
 *
 * The English generateMetadata() helper is kept for blog posts and any
 * future pages that need a quick non-Uzbek override.
 */

import type { Metadata } from "next";
export {
  UZ_PAGE_METADATA,
  UZ_TERMS,
  UZ_CITIES,
  generateCityMetadata,
  generateBlogPostUzMetadata,
  LOCAL_BUSINESS_SCHEMA,
} from "@/lib/uzbek-metadata";
import { UZ_PAGE_METADATA } from "@/lib/uzbek-metadata";

const BASE_URL  = process.env.NEXT_PUBLIC_APP_URL || "https://ieltssensei.uz";
const SITE_NAME = "IELTS Sensei";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// ─── English helper (kept for blog posts / ad-hoc pages) ─────────────────────

export function generateMetadata(
  title: string,
  description: string,
  options: {
    path?: string;
    image?: string;
    type?: "website" | "article";
    keywords?: string[];
    noIndex?: boolean;
    locale?: string;
  } = {}
): Metadata {
  const {
    path = "",
    image = DEFAULT_OG_IMAGE,
    type = "website",
    keywords = [],
    noIndex = false,
    locale = "uz_UZ",   // default to Uzbek locale sitewide
  } = options;

  const url      = `${BASE_URL}${path}`;
  const ogTitle  = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: [
      "IELTS", "IELTS preparation", "IELTS Uzbekistan",
      "IELTS Toshkent", "IELTS online", "band score",
      ...keywords,
    ],
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: { uz: url, en: url, "x-default": url },
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
      locale,
      alternateLocale: ["en_US", "ru_RU"],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
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

// ─── PAGE_METADATA — now backed by Uzbek metadata ────────────────────────────
// All existing imports of PAGE_METADATA continue to work unchanged.

export const PAGE_METADATA = {
  home:           UZ_PAGE_METADATA.home,
  login:          UZ_PAGE_METADATA.login,
  signup:         UZ_PAGE_METADATA.signup,
  dashboard:      UZ_PAGE_METADATA.dashboard,
  writing:        UZ_PAGE_METADATA.writing,
  speaking:       UZ_PAGE_METADATA.speaking,
  listening:      UZ_PAGE_METADATA.listening,
  reading:        UZ_PAGE_METADATA.reading,
  history:        UZ_PAGE_METADATA.history,
  demo:           UZ_PAGE_METADATA.demo,
  pricing:        UZ_PAGE_METADATA.pricing,
  blog:           UZ_PAGE_METADATA.blog,
  forgotPassword: UZ_PAGE_METADATA.forgotPassword,
  resetPassword:  UZ_PAGE_METADATA.resetPassword,
} as const;
