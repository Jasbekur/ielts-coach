import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice History — IELTS Sensei",
  robots: { index: false, follow: false },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
