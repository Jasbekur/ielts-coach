"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Silently prefetches all main routes when the app layout mounts.
// This means the FIRST click on any nav item is already preloaded.
const ROUTES = ["/dashboard", "/writing", "/speaking", "/reading", "/history"];

export function PrefetchRoutes() {
  const router = useRouter();

  useEffect(() => {
    // Stagger slightly so it doesn't compete with the current page render
    const timer = setTimeout(() => {
      ROUTES.forEach(route => router.prefetch(route));
    }, 300);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
