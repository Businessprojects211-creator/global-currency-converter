export function formatExchangeValue(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  if (value === 0) return "0";

  const abs = Math.abs(value);

  if (abs >= 1000) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
  }

  if (abs >= 1) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 }).format(value);
  }

  const decimalPlaces = Math.max(3, Math.ceil(-Math.log10(abs)) + 2);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
    useGrouping: false,
  }).format(value);
}
