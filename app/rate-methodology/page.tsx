export const metadata = { title: "Rate Methodology | Global Currency Converter", description: "How Global Currency Converter receives and presents exchange-rate information." };

export default function RateMethodology() {
  return <main className="legal"><a className="brand" href="/">↗ Global<span>Convert</span></a><article>
    <p className="eyebrow">RATE METHODOLOGY</p><h1>Exchange Rate Methodology</h1>
    <p>Global Currency Converter provides conversion calculations using exchange-rate data from the Frankfurter service and its published upstream data sources.</p>
    <h2>How conversions are calculated</h2><p>When you select currencies, we request the applicable rate and generally calculate:</p><p><strong>Converted Amount = Original Amount × Exchange Rate</strong></p><p>Results may be rounded for display. The data source may use direct or intermediate currency relationships.</p>
    <h2>Reference rates</h2><p>Displayed rates are reference or informational rates. They may differ from rates supplied by banks, foreign-exchange bureaus, card issuers, payment processors, money-transfer services, trading platforms, or other financial institutions, which may add spreads, commissions, or fees.</p>
    <h2>Rate updates</h2><p>Rates may be cached for a short period and are updated according to provider availability. Market activity, weekends, public holidays, provider schedules, maintenance, network interruptions, or unavailable data can affect updates.</p>
    <h2>Supported and limited currencies</h2><p>Currency availability depends on our provider and technical capabilities. Some currencies may have limited activity, infrequent updates, restrictions, or delayed or estimated reference data.</p>
    <h2>Accuracy and verification</h2><p>We make reasonable efforts to provide useful information but cannot guarantee that rates are accurate, complete, current, uninterrupted, or suitable for a particular purpose. A displayed rate is not an executable offer. Verify important information with the provider completing your transaction.</p>
    <h2>Changes</h2><p>We may update data sources, calculation systems, or technical processes as the website develops. Last updated: September 5, 2026.</p>
  </article></main>;
}
