"use client";

import { useEffect, useState } from "react";
import { Calculator as CalculatorIcon, Delete, Equal, RotateCcw } from "lucide-react";
import { calculateExpression } from "@/lib/calculator";

const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "%", "+"];

export default function CalculatorPage() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  function append(value: string) { setExpression((current) => current + value); setError(""); }
  function clear() { setExpression(""); setResult(""); setError(""); }
  function solve() { try { const value = calculateExpression(expression); setResult(String(Number(value.toFixed(10)))); setError(""); } catch (reason) { setResult(""); setError(reason instanceof Error ? reason.message : "Invalid expression"); } }
  function handleKey(event: KeyboardEvent) { if (/^[0-9.+\-*/%()]$/.test(event.key)) append(event.key); else if (event.key === "Enter" || event.key === "=") solve(); else if (event.key === "Backspace") setExpression((current) => current.slice(0, -1)); else if (event.key === "Escape") clear(); }
  useEffect(() => { window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey); });
  return <><header className="site-header"><a className="brand" href="/"><span className="brand-mark">↗</span> Global<span>Convert</span></a><nav><a href="/#converter">Converter</a><a href="/calculator">Calculator</a><a href="/history">Rate history</a><a href="/search">Currencies</a></nav><a className="calculator-back" href="/">← Home</a></header><main className="calculator-page"><div className="calculator-intro"><p className="eyebrow">EVERYDAY MONEY TOOLS</p><h1>Calculate with confidence.</h1><p>Quick arithmetic for budgets, fees, percentages, and exchange-rate planning. Your calculation stays in this browser.</p><a href="/#converter">Need a currency conversion instead? →</a></div><section className="calculator-card" aria-label="Calculator"><div className="calculator-display"><span>{expression || "0"}</span><strong>{result || "0"}</strong>{error && <small>{error}</small>}</div><div className="calculator-toolbar"><button onClick={clear} aria-label="Clear calculator"><RotateCcw size={17} /> Clear</button><button onClick={() => setExpression((current) => current.slice(0, -1))} aria-label="Delete last character"><Delete size={17} /></button></div><div className="calculator-grid">{keys.map((key) => <button key={key} onClick={() => append(key)} className={"calculator-key " + ("/*+-".includes(key) ? "operator" : "")}>{key}</button>)}<button className="calculator-key paren" onClick={() => append("(")}> ( </button><button className="calculator-key paren" onClick={() => append(")")}>)</button><button className="calculator-equals" onClick={solve}><Equal size={20} /> Calculate</button></div></section></main></>;
}
