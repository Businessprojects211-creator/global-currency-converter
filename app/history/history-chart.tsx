"use client";

import { useEffect, useState } from "react";
import { currencies } from "@/lib/currencies";

type Point = { date: string; rate: number };
export default function HistoryChart() {
  const [from, setFrom] = useState("USD"); const [to, setTo] = useState("EUR"); const [period, setPeriod] = useState("1Y"); const [availableCurrencies, setAvailableCurrencies] = useState(currencies);
  const [points, setPoints] = useState<Point[]>([]); const [error, setError] = useState("");
  useEffect(() => { fetch("/api/currencies").then((response) => response.ok ? response.json() : []).then((items) => { if (items.length) setAvailableCurrencies(items); }).catch(() => undefined); }, []);
  useEffect(() => { let active = true; setError(""); fetch(`/api/history?from=${from}&to=${to}&period=${period}`).then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error); if (active) setPoints(data.points); }).catch((reason: Error) => active && setError(reason.message)); return () => { active = false; }; }, [from, to, period]);
  const visible = points.filter((_, index) => index % Math.max(1, Math.floor(points.length / 28)) === 0); const values = visible.map((point) => point.rate); const min = Math.min(...values); const max = Math.max(...values); const range = max - min || 1;
  return <section className="converter history-card"><div className="converter-top"><div><p className="eyebrow">HISTORICAL RATES</p><h2>{from} to {to}</h2></div><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>1M</option><option>3M</option><option>6M</option><option>1Y</option></select></div><div className="chart-controls"><select value={from} onChange={(event) => setFrom(event.target.value)}>{availableCurrencies.map((currency) => <option key={currency.code}>{currency.code}</option>)}</select><span>→</span><select value={to} onChange={(event) => setTo(event.target.value)}>{availableCurrencies.map((currency) => <option key={currency.code}>{currency.code}</option>)}</select></div>{error ? <p className="error-message">{error}</p> : <div className="chart" aria-label={`${from} to ${to} historical exchange rate chart`}>{visible.map((point) => <div className="chart-column" key={point.date}><div className="bar" style={{ height: `${((point.rate - min) / range) * 75 + 20}%` }} title={`${point.date}: ${point.rate.toFixed(4)}`} /><small>{point.date.slice(5)}</small></div>)}</div>}<div className="chart-summary"><strong>{points.length ? `${points[points.length - 1].rate.toFixed(4)} ${to}` : "Loading..."}</strong><span>Latest available rate</span></div></section>;
}
