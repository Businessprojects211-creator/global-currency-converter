import type { Metadata } from "next";
import "./globals.css";
import "./controls.css";
import "./directory.css";
import "./workspace.css";
import "./calculator.css";
import "./responsive.css";
import SiteControls from "./site-controls";
import PageAdShell from "@/components/ads/PageAdShell";

export const metadata: Metadata = {
  title: "Global Currency Converter | Provider Exchange Rates",
  description: "Convert currencies instantly with reliable exchange rates and a clear, fast interface.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: { icon: "/icon.svg", shortcut: "/favicon.svg", apple: "/icon.svg" },
  openGraph: { title: "Global Currency Converter", description: "Fast currency conversion for the world." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageAdShell>{children}</PageAdShell><SiteControls /></body></html>;
}
