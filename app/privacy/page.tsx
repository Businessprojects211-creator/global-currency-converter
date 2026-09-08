import type { Metadata } from "next";
import PrivacyContent from "./content";

export const metadata: Metadata = { title: "Privacy Policy | Global Currency Converter", description: "Learn how Global Currency Converter handles technical information, cookies, contact messages, and future advertising.", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() { return <PrivacyContent />; }
