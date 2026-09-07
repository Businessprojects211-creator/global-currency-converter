import { NextResponse } from "next/server";
import { currencies } from "@/lib/currencies";
import { exchangeRateProvider } from "@/lib/exchange-rate-provider";

export async function GET() {
  try {
    const supported = await exchangeRateProvider.getSupportedCurrencies();
    return NextResponse.json(Object.entries(supported).map(([code, name]) => ({ code, name, country: "", symbol: "" })));
  } catch {
    return NextResponse.json(currencies, { headers: { "x-currency-source": "local-fallback" } });
  }
}
