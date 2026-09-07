import type { Metadata } from "next";
import Converter from "../../../converter";
import { getCurrency } from "@/lib/currencies";
import AdBanner from "@/components/ads/AdBanner";

type Props = { params: Promise<{ from: string; to: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { from, to } = await params; const source = getCurrency(from.toUpperCase()); const target = getCurrency(to.toUpperCase()); return { title: `${from.toUpperCase()} to ${to.toUpperCase()} Converter | GlobalConvert`, description: `Convert ${source?.name || from} to ${target?.name || to} with current exchange rates.` }; }
export default async function PairPage({ params }: Props) { const { from, to } = await params; return <><header className="site-header"><a className="brand" href="/"><span className="brand-mark">↗</span> Global<span>Convert</span></a><a href="/">← Back to converter</a></header><main className="pair-page"><div><p className="eyebrow">PAIR CONVERTER</p><h1>{from.toUpperCase()} <span>→</span> {to.toUpperCase()}</h1><p>Use current exchange-rate data to convert between {getCurrency(from.toUpperCase())?.name || from.toUpperCase()} and {getCurrency(to.toUpperCase())?.name || to.toUpperCase()}.</p><AdBanner slot="pair-sidebar" /></div><div><Converter /><AdBanner slot="pair-after-converter" className="ad-secondary" /></div></main></>; }
