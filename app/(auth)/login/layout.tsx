import { PAGE_METADATA } from "@/lib/metadata";
export const metadata = PAGE_METADATA.login;
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
