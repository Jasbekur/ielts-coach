import { PAGE_METADATA } from "@/lib/metadata";
import { BreadcrumbSchema, CourseSchema } from "@/components/shared/StructuredData";

export const metadata = PAGE_METADATA.reading;

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ieltssensei.uz" },
          { name: "Reading Practice", url: "https://ieltssensei.uz/reading" },
        ]}
      />
      <CourseSchema
        name="IELTS Reading Practice — 3 Passages, 40 Questions"
        description="Practice IELTS Academic Reading with timed full-length passages. Build skimming and scanning speed for exam day."
        url="https://ieltssensei.uz/reading"
      />
      {children}
    </>
  );
}
