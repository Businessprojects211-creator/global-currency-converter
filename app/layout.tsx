import type { Metadata } from "next";
import "./globals.css";
import "./controls.css";
import "./directory.css";
import "./workspace.css";
import "./calculator.css";
import "./responsive.css";
import SiteControls from "./site-controls";
import PageAdShell from "@/components/ads/PageAdShell";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Global Currency Converter | Provider Exchange Rates",
  description: "Convert currencies instantly with reliable exchange rates and a clear, fast interface.",
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: { title: "Global Currency Converter", description: "Fast currency conversion for the world.", type: "website", siteName: "GlobalConvert" },
  twitter: { card: "summary", title: "Global Currency Converter", description: "Fast currency conversion for the world." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageAdShell>{children}</PageAdShell><SiteControls /></body></html>;
}
