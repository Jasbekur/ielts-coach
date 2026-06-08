import { PAGE_METADATA } from "@/lib/metadata";
import { BreadcrumbSchema, CourseSchema } from "@/components/shared/StructuredData";

export const metadata = PAGE_METADATA.writing;

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ieltssensei.uz" },
          { name: "Writing Practice", url: "https://ieltssensei.uz/writing" },
        ]}
      />
      <CourseSchema
        name="IELTS Writing Practice — Task 1 & Task 2"
        description="Submit your IELTS essay and get AI band scores for Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy in 15 seconds."
        url="https://ieltssensei.uz/writing"
      />
      {children}
    </>
  );
}
