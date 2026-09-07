import { NextResponse } from "next/server";
import { currencies } from "@/lib/currencies";
import { exchangeRateProvider } from "@/lib/exchange-rate-provider";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().toLowerCase() || "";
  if (query.length < 1) return NextResponse.json([]);
  let catalog = currencies;
  try {
    const supported = await exchangeRateProvider.getSupportedCurrencies();
    catalog = Object.entries(supported).map(([code, name]) => ({ code, name, country: "", symbol: "" }));
  } catch {}
  const results = catalog.filter((currency) => `${currency.code} ${currency.name} ${currency.country}`.toLowerCase().includes(query)).slice(0, 12).map((currency) => ({ ...currency, path: `/currency/${currency.code.toLowerCase()}` }));
  return NextResponse.json(results, { headers: { "cache-control": "public, max-age=3600" } });
}
