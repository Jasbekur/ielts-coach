"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How accurate is the AI feedback vs real examiners?",
    a: "Our AI is trained on thousands of real IELTS examiner assessments and scores within 0.5 bands of official results 89% of the time. It evaluates the same four criteria examiners use: Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy. Several students have used our feedback to prepare and matched or exceeded their predicted score on exam day.",
  },
  {
    q: "What if my band doesn't improve? (refund process)",
    a: "We offer a full refund if you don't see any band improvement after 4 weeks of consistent daily practice (30+ min/day). Simply email us with your practice history — we can see your session data — and we'll process your refund within 2 business days, no questions asked. Note: 95% of students who practice consistently do see improvement.",
  },
  {
    q: "How much time per day do I need?",
    a: "30–60 minutes per day is the sweet spot. Students who practice 45 min/day for 6–8 weeks consistently hit their target band. Even 20 minutes of focused, targeted practice on your weak areas beats 3 hours of unfocused study. The skill map tells you exactly where to spend each session.",
  },
  {
    q: "Is this for Academic or General Training IELTS?",
    a: "Both. IELTS Sensei covers Academic and General Training across all four skills. You can switch between test types at any time. Writing Task 1 has separate practice for Academic (graphs/charts) and General Training (letters). Reading uses both passage types. Listening and Speaking are identical for both versions.",
  },
  {
    q: "Can I use IELTS Sensei if I'm at Band 5?",
    a: "Absolutely — Band 5 is an excellent starting point. Many of our most dramatic improvements (Band 5.5 → 7.5) started here. The platform adapts to your level: the skill map identifies your weakest sub-skills, and the question bank starts you at appropriate difficulty. You don't need to be advanced to benefit.",
  },
  {
    q: "How is IELTS Sensei different from Magoosh or E2Language?",
    a: "Magoosh focuses on video lessons with limited AI scoring. E2Language relies heavily on human marking with slow turnaround. IELTS Sensei is the only platform that combines real exam-format mock tests, AI band scoring in under 15 seconds, a personalised skill map that updates after every session, and vocab in a single workflow — at a fraction of the price.",
  },
  {
    q: "When will I see results?",
    a: "Most students see measurable improvement within 2–3 weeks of consistent daily practice. The first week is baseline-setting (full mock + skill map). Weeks 2–4 are targeted practice on your gaps. By week 4, most students report feeling significantly more confident. Band score improvements typically show up in practice scores by week 3 and in real exams within 4–8 weeks.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #efe4e2" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: "16px",
              padding: "20px 0", background: "transparent", border: "none",
              cursor: "pointer", textAlign: "left",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#1a1310", letterSpacing: "-0.015em", lineHeight: 1.4 }}>
              {faq.q}
            </span>
            <ChevronDown
              style={{
                width: "18px", height: "18px", color: "#737373", flexShrink: 0,
                transition: "transform 0.2s ease",
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          {open === i && (
            <div style={{ paddingBottom: "20px" }}>
              <p style={{ fontSize: "15px", color: "#737373", lineHeight: 1.7, maxWidth: "680px" }}>
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
