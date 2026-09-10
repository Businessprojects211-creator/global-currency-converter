const productionSiteUrl = "https://www.globalfxconverter.com";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return productionSiteUrl;

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" || url.hostname.endsWith(".vercel.app")) return productionSiteUrl;
    return url.toString().replace(/\/$/, "");
  } catch {
    return productionSiteUrl;
  }
}

export { productionSiteUrl };
