import AdBanner from "./AdBanner";

export default function PageAdShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <AdBanner slot="global-top" className="ad-global ad-global-top" />
    {children}
    <AdBanner slot="global-after-content" className="ad-global ad-global-after" />
    <AdBanner slot="global-lower-content" className="ad-global ad-global-lower" />
    <AdBanner slot="global-bottom" className="ad-global ad-global-bottom" />
  </>;
}
