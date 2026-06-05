import { Sidebar, MobileNav } from "@/components/shared/Navbar";
import { AppContent } from "@/components/shared/AppContent";
import { PrefetchRoutes } from "@/components/shared/PrefetchRoutes";
import { PageTransition } from "@/components/shared/PageTransition";
import { TestModeProvider } from "@/contexts/TestModeContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TestModeProvider>
      <div className="flex min-h-screen">
        <PrefetchRoutes />
        <Sidebar />
        <AppContent>
          <PageTransition>{children}</PageTransition>
        </AppContent>
        <MobileNav />
      </div>
    </TestModeProvider>
  );
}
