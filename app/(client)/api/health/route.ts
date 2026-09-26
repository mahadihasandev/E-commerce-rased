import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "shop-nextjs-frontend",
    uptime: "healthy",
    time: new Date().toISOString(),
  });
}
