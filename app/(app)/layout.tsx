import { Sidebar, MobileNav } from "@/components/shared/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-60 pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-8">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
