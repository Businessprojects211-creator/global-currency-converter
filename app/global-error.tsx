"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="legal"><article><p className="eyebrow">GLOBAL CONVERT</p><h1>Something went wrong.</h1><p>We could not load this page. Please try again.</p><button className="convert-button" onClick={() => reset()}>Try again</button></article></main></body></html>;
}
