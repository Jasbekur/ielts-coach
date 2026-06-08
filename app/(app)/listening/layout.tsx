import { PAGE_METADATA } from "@/lib/metadata";
import { BreadcrumbSchema, CourseSchema } from "@/components/shared/StructuredData";

export const metadata = PAGE_METADATA.listening;

export default function ListeningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ieltssensei.uz" },
          { name: "Listening Practice", url: "https://ieltssensei.uz/listening" },
        ]}
      />
      <CourseSchema
        name="IELTS Listening Practice — 4 Sections, 40 Questions"
        description="Practice IELTS Listening with full section-style tests. Improve speed and accuracy across all question types."
        url="https://ieltssensei.uz/listening"
      />
      {children}
    </>
  );
}
