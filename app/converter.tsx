"use client";

import { useEffect, useState } from "react";
import { ArrowDownUp, Check, Clipboard, Heart, Link2, Search } from "lucide-react";
import { currencies } from "@/lib/currencies";
import { formatExchangeValue } from "@/lib/formatting";

export default function Converter() {
  const [availableCurrencies, setAvailableCurrencies] = useState(currencies);
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [status, setStatus] = useState("Ready to convert");
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  useEffect(() => { fetch("/api/currencies").then((response) => response.ok ? response.json() : []).then((items) => { if (items.length) setAvailableCurrencies(items); }).catch(() => undefined); }, []);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("global-convert-favorites") || "[]") as { from: string; to: string }[];
    setFavorite(saved.some((pair) => pair.from === from && pair.to === to));
  }, [from, to]);

  async function convert() {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 0) { setStatus("Enter a valid amount"); setResult(null); return; }
    setStatus("Fetching latest rate...");
    try {
      const response = await fetch(`/api/convert?from=${from}&to=${to}&amount=${numericAmount}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data.result); setRate(data.rate); setStatus(`Updated ${data.date || "just now"}`);
    } catch { setStatus("Rates are temporarily unavailable. Try again shortly."); setResult(null); }
  }

  function swap() { setFrom(to); setTo(from); setResult(null); setRate(null); setFavorite(false); setStatus("Currencies swapped"); }
  function toggleFavorite() { const saved = JSON.parse(localStorage.getItem("global-convert-favorites") || "[]") as { from: string; to: string }[]; const exists = saved.some((pair) => pair.from === from && pair.to === to); const next = exists ? saved.filter((pair) => pair.from !== from || pair.to !== to) : [...saved, { from, to }]; localStorage.setItem("global-convert-favorites", JSON.stringify(next)); setFavorite(!exists); setStatus(exists ? "Removed from favorites" : "Saved to favorites"); }
  async function copy() { if (result === null) return; await navigator.clipboard.writeText(`${amount} ${from} = ${formatExchangeValue(result)} ${to}`); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  async function share() { const url = `${window.location.origin}/convert/${from}/${to}?amount=${amount}`; if (navigator.share) await navigator.share({ title: `${from} to ${to}`, url }); else { await navigator.clipboard.writeText(url); setStatus("Share link copied"); } }

  return <section className="converter" id="converter"><div className="converter-top"><div><p className="eyebrow">CURRENCY CONVERTER</p><h2>Make the exchange clear.</h2></div><span className="live-pill"><i /> PROVIDER RATE</span></div><label className="amount-label" htmlFor="amount">Amount</label><div className="amount-input"><span>$</span><input id="amount" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} onKeyDown={(event) => event.key === "Enter" && convert()} /></div><div className="currency-row"><CurrencySelect label="From" value={from} currencies={availableCurrencies} onChange={setFrom} searchLabel="Search currency" /><button className="swap-button" onClick={swap} aria-label="Swap currencies" title="Swap currencies"><ArrowDownUp size={18} /></button><CurrencySelect label="To" value={to} currencies={availableCurrencies} onChange={setTo} searchLabel="Search currency" /></div><button className="convert-button" onClick={convert}>Convert <span>→</span></button><div className={`result ${result === null ? "empty" : ""}`} aria-live="polite">{result === null ? <><span className="result-label">YOUR CONVERTED AMOUNT</span><strong>—</strong><small>{status}</small></> : <><span className="result-label">YOUR CONVERTED AMOUNT</span><strong>{formatExchangeValue(result)} <em>{to}</em></strong><small>1 {from} = {formatExchangeValue(rate ?? 0)} {to} · {status}</small></>}</div><div className="result-actions"><button onClick={copy} disabled={result === null}>{copied ? <Check size={15} /> : <Clipboard size={15} />} {copied ? "Copied" : "Copy result"}</button><button onClick={share}><Link2 size={15} /> Share link</button><button onClick={toggleFavorite}><Heart size={15} fill={favorite ? "currentColor" : "none"} /> {favorite ? "Saved" : "Save pair"}</button></div></section>;
}

function CurrencySelect({ label, value, currencies: availableCurrencies, onChange, searchLabel }: { label: string; value: string; currencies: typeof currencies; onChange: (value: string) => void; searchLabel: string }) {
  const [query, setQuery] = useState("");
  const matches = currencies.filter((currency) => `${currency.code} ${currency.name} ${currency.country}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  return <div className="currency-select"><label>{label}</label><div className="select-face"><strong>{value}</strong><span>{availableCurrencies.find((currency) => currency.code === value)?.name}</span><b>⌄</b></div><div className="select-menu"><div className="search"><Search size={14} /><input placeholder={searchLabel} value={query} onChange={(event) => setQuery(event.target.value)} /></div>{matches.map((currency) => <button type="button" key={currency.code} onClick={() => { onChange(currency.code); setQuery(""); }}><strong>{currency.code}</strong><span>{currency.name}</span></button>)}</div></div>;
}
