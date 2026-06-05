import { Sidebar, MobileNav } from "@/components/shared/Navbar";
import { AppContent } from "@/components/shared/AppContent";
import { PrefetchRoutes } from "@/components/shared/PrefetchRoutes";
import { PageTransition } from "@/components/shared/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <PrefetchRoutes />
      <Sidebar />
      <AppContent>
        <PageTransition>{children}</PageTransition>
      </AppContent>
      <MobileNav />
    </div>
  );
}
