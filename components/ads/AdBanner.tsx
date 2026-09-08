"use client";

import Script from "next/script";
import { useEffect } from "react";

type AdBannerProps = { slot: string; className?: string };

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const enabled = process.env.ADS_ENABLED === "true";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slotId = process.env[`ADSENSE_SLOT_${slot.replaceAll("-", "_").toUpperCase()}`];
  useEffect(() => {
    if (!enabled || !client || !slotId) return;
    const windowWithAds = window as Window & { adsbygoogle?: { push: (value: object) => void } };
    const ads = windowWithAds.adsbygoogle || { push: () => undefined };
    windowWithAds.adsbygoogle = ads;
    try { ads.push({}); } catch { /* The provider can finish loading after the unit renders. */ }
  }, [client, enabled, slotId]);
  return <>
    {enabled && client && <Script id="adsense-script" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} />}
    <aside className={`ad-slot ${className}`} aria-label="Advertisement" data-ad-slot={slot} data-ads-enabled={enabled}>
      {enabled && client && slotId ? <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" /> : null}
    </aside>
  </>;
}
