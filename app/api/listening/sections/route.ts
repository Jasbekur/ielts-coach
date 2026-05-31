import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const svc = await createServiceClient();

  const { data, error } = await svc
    .from("test_materials")
    .select("id,title,type,content,created_at")
    .in("type", ["listening_s1","listening_s2","listening_s3","listening_s4"])
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }

  // Only return published sections
  const published = (data ?? []).filter(
    (m: { content?: { status?: string } }) => m.content?.status === "published"
  );

  return NextResponse.json({ data: published });
}
