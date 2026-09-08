import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const guide = getGuide((await params).slug); return guide ? { title: `${guide.title} | GlobalConvert`, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` }, openGraph: { title: `${guide.title} | GlobalConvert`, description: guide.description, type: "article" } } : {}; }
const guidePairs: Record<string, [string, string][]> = { "how-to-convert-usd-to-ugx": [["USD", "UGX"]], "how-to-convert-ugx-to-usd": [["UGX", "USD"]], "understanding-currency-pairs": [["USD", "UGX"], ["EUR", "USD"]], "how-exchange-rates-affect-international-transfers": [["USD", "UGX"], ["USD", "KES"]] };

export default async function GuidePage({ params }: Props) { const guide = getGuide((await params).slug); if (!guide) notFound(); const pairLinks = guidePairs[guide.slug] || []; return <><header className="site-header"><Link className="brand" href="/"><span className="brand-mark">↗</span> Global<span>Convert</span></Link><Link href="/guides">← All guides</Link></header><main className="article-page"><article className="article-content"><p className="eyebrow">CURRENCY GUIDE</p><h1>{guide.title}</h1><p className="article-intro">{guide.intro}</p>{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<section><h2>Try a conversion</h2><p>Use the <Link href="/#converter">GlobalConvert converter</Link> for a current provider reference, then verify important rates and fees with your financial institution.</p>{pairLinks.length > 0 && <ul>{pairLinks.map(([from, to]) => <li key={`${from}-${to}`}><Link href={`/convert/${from.toLowerCase()}/${to.toLowerCase()}`}>{from} to {to} converter</Link></li>)}</ul>}</section><section><h2>Related guides</h2><ul>{guide.related.map((slug) => { const related = getGuide(slug); return related ? <li key={slug}><Link href={`/guides/${slug}`}>{related.title}</Link></li> : null; })}</ul></section></article></main></>;
}
