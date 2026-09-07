export type LatestRates = { amount: number; base: string; date: string; rates: Record<string, number> };

export interface ExchangeRateProvider {
  getLatestRates(base: string): Promise<LatestRates>;
  getSupportedCurrencies(): Promise<Record<string, string>>;
}

const frankfurter: ExchangeRateProvider = {
  async getLatestRates(base) {
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${encodeURIComponent(base)}`, { next: { revalidate: 900 } });
      if (!response.ok) throw new Error("Primary provider unavailable");
      const data = await response.json() as LatestRates;
      if (Object.keys(data.rates).length > 0) {
        const fallbackResponse = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`, { next: { revalidate: 900 } });
        const fallback = await fallbackResponse.json() as { result: string; time_last_update_utc?: string; rates?: Record<string, number> };
        if (fallback.result === "success" && fallback.rates) {
          const fallbackDate = fallback.time_last_update_utc ? new Date(fallback.time_last_update_utc).toISOString().slice(0, 10) : data.date;
          return { amount: 1, base, date: fallbackDate, rates: { ...fallback.rates, ...data.rates } };
        }
      }
      return data;
    } catch {
      const fallbackResponse = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`, { next: { revalidate: 900 } });
      if (!fallbackResponse.ok) throw new Error("Exchange rate providers unavailable");
      const fallback = await fallbackResponse.json() as { result: string; time_last_update_utc?: string; rates?: Record<string, number> };
      if (fallback.result !== "success" || !fallback.rates) throw new Error("Exchange rate provider unavailable");
      return { amount: 1, base, date: fallback.time_last_update_utc ? new Date(fallback.time_last_update_utc).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10), rates: fallback.rates };
    }
  },
  async getSupportedCurrencies() {
    const [primaryResponse, fallbackResponse] = await Promise.all([
      fetch("https://api.frankfurter.app/currencies", { next: { revalidate: 86400 } }),
      fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 86400 } })
    ]);
    const primary = primaryResponse.ok ? await primaryResponse.json() as Record<string, string> : {};
    const fallback = fallbackResponse.ok ? await fallbackResponse.json() as { rates?: Record<string, number> } : {};
    const codes = Object.keys(fallback.rates || {});
    if (!Object.keys(primary).length && !codes.length) throw new Error("Currency providers unavailable");
    return Object.fromEntries([...new Set([...Object.keys(primary), ...codes])].map((code) => [code, primary[code] || code]));
  }
};

export const exchangeRateProvider = frankfurter;
