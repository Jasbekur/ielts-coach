"use client";

import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const onOffline = () => setOffline(true);
    const onOnline  = () => setOffline(false);
    window.addEventListener("offline", onOffline);
    window.addEventListener("online",  onOnline);
    setOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online",  onOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
      background: "#dc2626", color: "#fff",
      padding: "10px 20px", textAlign: "center",
      fontSize: "13px", fontWeight: 600,
      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
    }}>
      <span>⚠️</span>
      You are offline — check your connection. Answers are saved locally and won&apos;t be lost.
    </div>
  );
}
