export type Currency = {
  code: string;
  name: string;
  country: string;
  symbol: string;
};

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", country: "United States", symbol: "$" },
  { code: "EUR", name: "Euro", country: "European Union", symbol: "€" },
  { code: "GBP", name: "British Pound", country: "United Kingdom", symbol: "£" },
  { code: "UGX", name: "Ugandan Shilling", country: "Uganda", symbol: "USh" },
  { code: "KES", name: "Kenyan Shilling", country: "Kenya", symbol: "KSh" },
  { code: "NGN", name: "Nigerian Naira", country: "Nigeria", symbol: "₦" },
  { code: "ZAR", name: "South African Rand", country: "South Africa", symbol: "R" },
  { code: "INR", name: "Indian Rupee", country: "India", symbol: "₹" },
  { code: "CNY", name: "Chinese Yuan", country: "China", symbol: "¥" },
  { code: "JPY", name: "Japanese Yen", country: "Japan", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", country: "Canada", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", country: "Australia", symbol: "$" },
  { code: "CHF", name: "Swiss Franc", country: "Switzerland", symbol: "CHF" },
  { code: "AED", name: "UAE Dirham", country: "United Arab Emirates", symbol: "د.إ" },
  { code: "BRL", name: "Brazilian Real", country: "Brazil", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", country: "Mexico", symbol: "$" },
  { code: "DKK", name: "Danish Krone", country: "Denmark", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", country: "Norway", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", country: "Sweden", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", country: "Poland", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", country: "Czechia", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", country: "Hungary", symbol: "Ft" },
  { code: "TRY", name: "Turkish Lira", country: "Turkey", symbol: "₺" },
  { code: "ILS", name: "Israeli New Shekel", country: "Israel", symbol: "₪" },
  { code: "SAR", name: "Saudi Riyal", country: "Saudi Arabia", symbol: "﷼" },
  { code: "THB", name: "Thai Baht", country: "Thailand", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", country: "Indonesia", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", country: "Malaysia", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", country: "Philippines", symbol: "₱" },
  { code: "KRW", name: "South Korean Won", country: "South Korea", symbol: "₩" },
  { code: "VND", name: "Vietnamese Dong", country: "Vietnam", symbol: "₫" },
  { code: "PKR", name: "Pakistani Rupee", country: "Pakistan", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", country: "Bangladesh", symbol: "৳" },
  { code: "GHS", name: "Ghanaian Cedi", country: "Ghana", symbol: "₵" },
  { code: "TZS", name: "Tanzanian Shilling", country: "Tanzania", symbol: "TSh" },
  { code: "MAD", name: "Moroccan Dirham", country: "Morocco", symbol: "د.م." },
  { code: "EGP", name: "Egyptian Pound", country: "Egypt", symbol: "£" },
  { code: "XOF", name: "West African CFA Franc", country: "West Africa", symbol: "CFA" },
  { code: "NZD", name: "New Zealand Dollar", country: "New Zealand", symbol: "$" }
];

export const getCurrency = (code: string) => currencies.find((currency) => currency.code === code);
