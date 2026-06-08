import type { Metadata } from "next";

const BASE_URL = "https://ieltssensei.uz";

export const metadata: Metadata = {
  title: "Pricing — Free, Starter, Elite & Premium Plans",
  description:
    "Start free with Reading & Listening forever. Upgrade to get AI Writing feedback ($4.99/mo), Speaking practice ($12.99/mo), or unlimited tutoring ($29/mo). Cancel anytime.",
  alternates: { canonical: `${BASE_URL}/pricing` },
  openGraph: {
    title: "IELTS Sensei Pricing — Free to Paid Plans",
    description:
      "Reading & Listening free forever. Unlock AI Writing & Speaking feedback from $4.99/month. Cancel anytime, no credit card for free tier.",
    url: `${BASE_URL}/pricing`,
    siteName: "IELTS Sensei",
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "IELTS Sensei Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Sensei Pricing — Free to Paid Plans",
    description: "Reading & Listening free forever. AI Writing & Speaking from $4.99/mo.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@ieltssensei",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
