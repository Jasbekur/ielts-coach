import { Sidebar, MobileNav } from "@/components/shared/Navbar";
import { PrefetchRoutes } from "@/components/shared/PrefetchRoutes";
import { PageTransition } from "@/components/shared/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <PrefetchRoutes />
      <Sidebar />
      {/* Offset by sidebar width; extra bottom padding for mobile nav */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0">
        {/* Subtle gradient overlay on background */}
        <div className="fixed inset-0 md:left-64 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(5,150,105,0.04), transparent)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-7 md:px-8">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
