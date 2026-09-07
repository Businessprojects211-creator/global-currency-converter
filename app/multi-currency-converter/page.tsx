"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { currencies } from "@/lib/currencies";

export default function MultiCurrencyConverter() {
  const [amount, setAmount] = useState("100"); const [base, setBase] = useState("USD"); const [targets, setTargets] = useState(["EUR", "GBP", "UGX", "JPY"]); const [rates, setRates] = useState<Record<string, number>>({}); const [availableCurrencies, setAvailableCurrencies] = useState(currencies);
  useEffect(() => { fetch("/api/currencies").then((response) => response.ok ? response.json() : []).then((items) => { if (items.length) setAvailableCurrencies(items); }).catch(() => undefined); }, []);
  async function refresh() { const response = await fetch(`/api/rates?base=${base}`); const data = await response.json(); setRates(data.rates || {}); }
  const addTarget = () => { const next = availableCurrencies.find((currency) => currency.code !== base && !targets.includes(currency.code)); if (next) setTargets([...targets, next.code]); };
  return <><header className="site-header"><a className="brand" href="/"><span className="brand-mark">↗</span> Global<span>Convert</span></a><a href="/">← Back to converter</a></header><main className="multi-page"><div><p className="eyebrow">COMPARE CURRENCIES</p><h1>One amount.<br /><span>Many answers.</span></h1><p>See the value of your money across several currencies at once.</p></div><section className="converter multi-card"><label className="amount-label" htmlFor="multi-amount">Amount and base currency</label><div className="multi-input"><input id="multi-amount" value={amount} onChange={(event) => setAmount(event.target.value)} /><select value={base} onChange={(event) => { setBase(event.target.value); setRates({}); }}>{availableCurrencies.map((currency) => <option key={currency.code}>{currency.code}</option>)}</select></div><div className="multi-results">{targets.map((target) => <div className="multi-result" key={target}><div><strong>{target}</strong><small>{availableCurrencies.find((currency) => currency.code === target)?.name}</small></div><b>{rates[target] ? (Number(amount) * rates[target]).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—"}</b><button aria-label={`Remove ${target}`} onClick={() => setTargets(targets.filter((item) => item !== target))}><X size={15} /></button></div>)}</div><button className="convert-button" onClick={refresh}>Update rates <span>→</span></button><button className="add-currency" onClick={addTarget}><Plus size={15} /> Add currency</button></section></main></>;
}
