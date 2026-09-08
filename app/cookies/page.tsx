import type { Metadata } from "next";
import CookiesContent from "./content";

export const metadata: Metadata = { title: "Cookie Policy | Global Currency Converter", description: "Learn how Global Currency Converter handles essential storage and future analytics or advertising technologies.", alternates: { canonical: "/cookies" } };
export default function CookiesPage() { return <CookiesContent />; }
