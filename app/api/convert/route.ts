import { NextResponse } from "next/server";
import { exchangeRateProvider } from "@/lib/exchange-rate-provider";
import { isRateLimited } from "@/lib/rate-limit";

export async function GET(request: Request) {
  if (isRateLimited(request)) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  const params = new URL(request.url).searchParams;
  const from = (params.get("from") || "USD").toUpperCase();
  const to = (params.get("to") || "EUR").toUpperCase();
  const amount = Number(params.get("amount"));
  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to) || !Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: "Please provide valid currencies and amount." }, { status: 400 });
  }
  if (from === to) return NextResponse.json({ amount, from, to, rate: 1, result: amount });
  try {
    const data = await exchangeRateProvider.getLatestRates(from);
    const rate = data.rates[to];
    if (!rate) return NextResponse.json({ error: "Currency pair is unavailable." }, { status: 404 });
    return NextResponse.json({ amount, from, to, rate, result: amount * rate, date: data.date });
  } catch {
    return NextResponse.json({ error: "Exchange rates are temporarily unavailable." }, { status: 503 });
  }
}
