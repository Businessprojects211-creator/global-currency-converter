import type { Metadata } from "next";
export const metadata: Metadata = { title: "Currency Directory | GlobalConvert", description: "Search currency codes, names, symbols, and countries in the GlobalConvert directory.", alternates: { canonical: "/search" } };
export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
