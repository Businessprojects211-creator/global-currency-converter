import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", service: "global-convert", timestamp: new Date().toISOString() }, { headers: { "cache-control": "no-store" } });
}
