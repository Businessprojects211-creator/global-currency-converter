export function validateConversion(amount: number, from: string, to: string) {
  return Number.isFinite(amount) && amount >= 0 && /^[A-Z]{3}$/.test(from) && /^[A-Z]{3}$/.test(to);
}

export function calculateConversion(amount: number, rate: number) {
  return amount * rate;
}
