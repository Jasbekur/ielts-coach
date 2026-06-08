import { LOCAL_BUSINESS_SCHEMA } from "@/lib/uzbek-metadata";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ieltssensei.uz";

// Organization — sitewide
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "IELTS Sensei",
          url: BASE_URL,
          logo: `${BASE_URL}/logo.png`,
          sameAs: [],
          contactPoint: { "@type": "ContactPoint", telephone: "+998881238262", contactType: "customer support", availableLanguage: ["English", "Uzbek"] },
          description: "AI-powered IELTS preparation platform. Get examiner-grade band scores for Writing and Speaking in under 15 seconds.",
        }),
      }}
    />
  );
}

// WebApplication — for the app itself
export function WebAppSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "IELTS Sensei",
          url: BASE_URL,
          applicationCategory: "EducationApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Free IELTS practice with AI feedback",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "120",
          },
          featureList: [
            "IELTS Writing Task 1 & 2 AI scoring",
            "IELTS Speaking Parts 1-3 feedback",
            "IELTS Listening practice tests",
            "IELTS Reading practice tests",
            "Band score tracking",
            "Personalized recommendations",
          ],
        }),
      }}
    />
  );
}

// EducationalOrganization + WebSite @graph — city-targeted local SEO
export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
    />
  );
}

// BreadcrumbList — pass items array
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}

// FAQ — pass questions array
export function FAQSchema({ questions }: { questions: { q: string; a: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      }}
    />
  );
}

// Article — for blog posts
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          url,
          datePublished,
          dateModified: dateModified || datePublished,
          image: image || `${BASE_URL}/og-image.png`,
          publisher: {
            "@type": "Organization",
            name: "IELTS Sensei",
            logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
          },
        }),
      }}
    />
  );
}

// Course — for practice modules
export function CourseSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name,
          description,
          url,
          provider: { "@type": "Organization", name: "IELTS Sensei", url: BASE_URL },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        }),
      }}
    />
  );
}
