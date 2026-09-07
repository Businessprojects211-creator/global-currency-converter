import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";

const periods: Record<string, number> = { "1M": 30, "3M": 90, "6M": 180, "1Y": 365 };

export async function GET(request: Request) {
  if (isRateLimited(request)) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  const params = new URL(request.url).searchParams;
  const from = (params.get("from") || "USD").toUpperCase();
  const to = (params.get("to") || "EUR").toUpperCase();
  const period = (params.get("period") || "1M").toUpperCase();
  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to) || !periods[period]) {
    return NextResponse.json({ error: "Invalid currencies or period." }, { status: 400 });
  }
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - periods[period]);
  const format = (date: Date) => date.toISOString().slice(0, 10);
  try {
    if (from === to) {
      return NextResponse.json({ from, to, period, points: [{ date: format(end), rate: 1 }] });
    }
    const response = await fetch(`https://api.frankfurter.app/${format(start)}..${format(end)}?from=${from}&to=${to}`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("History provider unavailable");
    const data = await response.json() as { rates: Record<string, Record<string, number>> };
    const points = Object.entries(data.rates).map(([date, rates]) => ({ date, rate: rates[to] })).filter((point) => point.rate !== undefined);
    return NextResponse.json({ from, to, period, points });
  } catch {
    return NextResponse.json({ error: "Historical rates are temporarily unavailable." }, { status: 503 });
  }
}
