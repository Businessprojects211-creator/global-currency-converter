import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata = { title: "Currency Guides | GlobalConvert", description: "Clear educational guides about exchange rates, currency pairs, conversion, and international payments." };

export default function GuidesPage() {
  return <><header className="site-header"><Link className="brand" href="/"><span className="brand-mark">↗</span> Global<span>Convert</span></Link><nav><Link href="/#converter">Converter</Link><Link href="/calculator">Calculator</Link><Link href="/guides">Currency guides</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav></header><main className="directory-page"><p className="eyebrow">LEARN THE BASICS</p><h1>Currency guides.</h1><p className="directory-intro">Practical explanations for understanding exchange rates, comparing providers, and planning international payments.</p><div className="guide-grid">{guides.map((guide) => <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}><span className="eyebrow">GUIDE</span><h2>{guide.title}</h2><p>{guide.description}</p><strong>Read guide <span>→</span></strong></Link>)}</div></main></>;
}
