"use client";

import Script from "next/script";
import { useEffect } from "react";

type AdBannerProps = {
  slot: string;
  className?: string;
};

export default function AdBanner({
  slot,
  className = "",
}: AdBannerProps) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Keep this explicit because NEXT_PUBLIC_ environment variables
  // are exposed to the browser by Next.js.
  const slotIds: Record<string, string | undefined> = {
    "global-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_GLOBAL_TOP,
    "global-after-content":
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_GLOBAL_AFTER_CONTENT,
    "global-lower-content":
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_GLOBAL_LOWER_CONTENT,
    "global-bottom":
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_GLOBAL_BOTTOM,
  };

  const slotId = slotIds[slot];

  useEffect(() => {
    if (!enabled || !client || !slotId) return;

    const windowWithAds = window as Window & {
      adsbygoogle?: { push: (value: object) => void };
    };

    const ads =
      windowWithAds.adsbygoogle || {
        push: () => undefined,
      };

    windowWithAds.adsbygoogle = ads;

    try {
      ads.push({});
    } catch {
      // AdSense may finish loading after the ad unit renders.
    }
  }, [client, enabled, slotId]);

  return (
    <>
      {enabled && client && (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        />
      )}

      <aside
        className={`ad-slot ${className}`}
        aria-label="Advertisement"
        data-ad-slot={slot}
        data-ads-enabled={enabled}
      >
        {enabled && client && slotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : null}
      </aside>
    </>
  );
}