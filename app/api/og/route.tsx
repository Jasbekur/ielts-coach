import { ImageResponse } from "@vercel/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";

  // Fallback values for homepage / generic OG
  let title = "IELTS Sensei — AI IELTS Preparation";
  let description = "Examiner-grade feedback in 15 seconds. Free to start.";
  let tags: string[] = [];

  if (slug) {
    try {
      // Edge runtime can't use fs — pass title/desc directly as query params
      // Blog [slug]/page.tsx passes slug; we also accept title/desc overrides
      const t = searchParams.get("title");
      const d = searchParams.get("desc");
      const tg = searchParams.get("tags");
      if (t) title = decodeURIComponent(t);
      if (d) description = decodeURIComponent(d);
      if (tg) tags = decodeURIComponent(tg).split(",").filter(Boolean);
    } catch {}
  }

  // Trim for display
  const displayTitle = title.length > 70 ? title.slice(0, 67) + "..." : title;
  const displayDesc = description.length > 100 ? description.slice(0, 97) + "..." : description;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
          color: "#f1f5f9",
        }}
      >
        {/* Header bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#dc2626",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            IS
          </div>
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#94a3b8" }}>
            IELTS Sensei
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, justifyContent: "center" }}>
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "10px" }}>
              {tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    background: "rgba(220, 38, 38, 0.2)",
                    border: "1px solid rgba(220, 38, 38, 0.4)",
                    color: "#fca5a5",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: displayTitle.length > 50 ? "44px" : "52px",
              fontWeight: "800",
              lineHeight: "1.15",
              color: "#f8fafc",
              letterSpacing: "-0.5px",
            }}
          >
            {displayTitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: "1.5",
            }}
          >
            {displayDesc}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#64748b", fontSize: "16px" }}>ieltssensei.uz</span>
          <div
            style={{
              background: "#dc2626",
              color: "white",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Free practice →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
