import type { Metadata } from "next";
export const metadata: Metadata = { title: "Calculator | Global Currency Converter", description: "Use a simple calculator for budgets, fees, percentages, and exchange-rate planning.", alternates: { canonical: "/calculator" } };
export default function CalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
