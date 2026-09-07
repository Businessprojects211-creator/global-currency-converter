import { NextResponse } from "next/server";

const pairs = [
  ["USD", "EUR"], ["USD", "GBP"], ["USD", "UGX"], ["USD", "KES"],
  ["EUR", "USD"], ["GBP", "USD"], ["UGX", "USD"], ["KES", "UGX"],
  ["USD", "NGN"], ["USD", "ZAR"], ["USD", "INR"], ["USD", "CNY"],
  ["USD", "JPY"], ["USD", "CAD"], ["USD", "AUD"]
].map(([from, to]) => ({ from, to, path: `/convert/${from}/${to}` }));

export function GET() {
  return NextResponse.json(pairs, { headers: { "cache-control": "public, max-age=3600" } });
}
