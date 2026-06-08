import { PAGE_METADATA } from "@/lib/metadata";

export const metadata = PAGE_METADATA.demo;

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
