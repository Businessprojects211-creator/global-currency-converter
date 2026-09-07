import { NextResponse } from "next/server";
import { exchangeRateProvider } from "@/lib/exchange-rate-provider";
import { isRateLimited } from "@/lib/rate-limit";

export async function GET(request: Request) {
  if (isRateLimited(request)) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  const base = new URL(request.url).searchParams.get("base")?.toUpperCase() || "USD";
  if (!/^[A-Z]{3}$/.test(base)) return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
  try {
    return NextResponse.json(await exchangeRateProvider.getLatestRates(base));
  } catch {
    return NextResponse.json({ error: "Exchange rates are temporarily unavailable." }, { status: 503 });
  }
}
