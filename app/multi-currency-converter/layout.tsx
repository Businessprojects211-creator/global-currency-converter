import type { Metadata } from "next";
export const metadata: Metadata = { title: "Multi-Currency Converter | GlobalConvert", description: "Compare one amount across several currencies using provider reference rates.", alternates: { canonical: "/multi-currency-converter" } };
export default function MultiCurrencyLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
