import { PAGE_METADATA } from "@/lib/metadata";
import { BreadcrumbSchema, CourseSchema } from "@/components/shared/StructuredData";

export const metadata = PAGE_METADATA.speaking;

export default function SpeakingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ieltssensei.uz" },
          { name: "Speaking Practice", url: "https://ieltssensei.uz/speaking" },
        ]}
      />
      <CourseSchema
        name="IELTS Speaking Practice — Parts 1, 2 & 3"
        description="Practice IELTS Speaking with real cue cards and get AI band scores for Fluency & Coherence, Lexical Resource, Grammatical Range, and Pronunciation."
        url="https://ieltssensei.uz/speaking"
      />
      {children}
    </>
  );
}
