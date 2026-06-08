import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { OfflineBanner } from "@/components/shared/OfflineBanner";
import {
  OrganizationSchema,
  WebAppSchema,
  LocalBusinessSchema,
} from "@/components/shared/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,   // prevents auto-zoom on input focus on iOS
  themeColor: "#ffffff",
};

const BASE_URL = "https://ieltssensei.uz";

export const metadata: Metadata = {
  // ── Base URL (resolves all relative image/canonical paths) ─────────────────
  metadataBase: new URL(BASE_URL),

  // ── Title ───────────────────────────────────────────────────────────────────
  title: {
    default: "IELTS Sensei | AI-Powered IELTS Preparation Uzbekistan",
    template: "%s | IELTS Sensei",
  },

  // ── Description — 148 chars, includes all required brand signals ────────────
  description:
    "IELTS Sensei gives Uzbekistan students AI band score feedback in 15 seconds. Reach your target band with full mock tests. Start free today.",

  // ── Keywords ────────────────────────────────────────────────────────────────
  keywords: [
    "IELTS Sensei",
    "ieltssensei.uz",
    "IELTS preparation Uzbekistan",
    "IELTS online Tashkent",
    "AI IELTS feedback",
    "IELTS band score",
    "IELTS mock test",
    "IELTS writing AI",
    "IELTS speaking practice",
    "IELTS tayyorgarlik",
    "IELTS Toshkent",
    "IELTS O'zbekiston",
  ],

  // ── Authorship ──────────────────────────────────────────────────────────────
  authors:   [{ name: "IELTS Sensei", url: BASE_URL }],
  creator:   "IELTS Sensei",
  publisher: "IELTS Sensei",

  // ── Canonical + hreflang ────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: {
      en:          BASE_URL,
      "uz-UZ":     `${BASE_URL}/uz`,
      "x-default": BASE_URL,
    },
  },

  // ── OpenGraph ───────────────────────────────────────────────────────────────
  openGraph: {
    title:       "IELTS Sensei | AI-Powered IELTS Preparation Uzbekistan",
    description:
      "IELTS Sensei gives Uzbekistan students AI band score feedback in 15 seconds. Reach your target band with full mock tests. Start free today.",
    url:         BASE_URL,
    siteName:    "IELTS Sensei",
    type:        "website",
    locale:      "en_US",
    images: [
      {
        url:    "/og-image.png",   // resolved against metadataBase
        width:  1200,
        height: 630,
        alt:    "IELTS Sensei — AI-Powered IELTS Preparation Uzbekistan",
      },
    ],
  },

  // ── Twitter / X card ────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       "IELTS Sensei | AI-Powered IELTS Preparation Uzbekistan",
    description:
      "AI band score feedback in 15 seconds. Full mock tests for Uzbekistan IELTS students. Free to start.",
    images:  ["/og-image.png"],
    creator: "@ieltssensei",
    site:    "@ieltssensei",
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index:              true,
      follow:             true,
      "max-image-preview": "large",
      "max-snippet":       -1,
      "max-video-preview": -1,
    },
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico",               sizes: "any" },
      { url: "/icon-16x16.png",  type: "image/png", sizes: "16x16" },
      { url: "/icon-32x32.png",  type: "image/png", sizes: "32x32" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ── GSC verification (paste token when ready) ───────────────────────────────
  verification: {
    google: "SPRU7Yhn3AQgpd7K-2AVz4Z9zwD1jYaewpsA5NBpeU0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="uz" signals to Google that this is a Uzbek-language site
    <html lang="uz" className={`${inter.variable} ${jetbrainsMono.variable} ${lora.variable} ${jakarta.variable}`}>
      <head>
        {/* Hreflang — explicit <link> tags for Bing/Yandex (mirrors metadata.alternates) */}
        <link rel="alternate" hrefLang="en"          href={BASE_URL} />
        <link rel="alternate" hrefLang="uz-UZ"       href={`${BASE_URL}/uz`} />
        <link rel="alternate" hrefLang="x-default"   href={BASE_URL} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* JSON-LD: sitewide Organization + WebApp */}
        <OrganizationSchema />
        <WebAppSchema />
        {/* JSON-LD: EducationalOrganization + city areaServed + offer catalog */}
        <LocalBusinessSchema />
        <OfflineBanner />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster
          richColors
          closeButton
          position="bottom-center"
          toastOptions={{ classNames: { toast: "md:!translate-x-0" } }}
        />
      </body>
    </html>
  );
}
