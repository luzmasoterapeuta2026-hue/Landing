import { NextResponse } from "next/server";
import { getCursos, getVideos } from "@/lib/sheets";

// Live-refresh endpoint polled by the client when NEXT_PUBLIC_SHEETS_LIVE_REFRESH
// is enabled. Always fetches fresh from Google Sheets (no ISR cache) so an
// already-open page can update its courses/videos without a reload.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");

  if (type === "cursos") {
    return NextResponse.json(await getCursos({ fresh: true }));
  }
  if (type === "videos") {
    return NextResponse.json(await getVideos({ fresh: true }));
  }

  return NextResponse.json(
    { error: "Missing or invalid 'type' (expected 'cursos' or 'videos')." },
    { status: 400 }
  );
}
