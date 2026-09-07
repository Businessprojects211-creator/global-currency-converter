import HistoryChart from "./history-chart";

export default function HistoryPage() {
  return <><header className="site-header"><a className="brand" href="/"><span className="brand-mark">↗</span> Global<span>Convert</span></a><a href="/">← Back to converter</a></header><main className="pair-page"><div><p className="eyebrow">RATE HISTORY</p><h1>See the <span>trend.</span></h1><p>Explore how a currency pair has moved over the last year using daily provider data.</p></div><HistoryChart /></main></>;
}
