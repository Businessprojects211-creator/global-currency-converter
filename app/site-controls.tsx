"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function SiteControls() {
  const [consent, setConsent] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<React.CSSProperties>({});
  const [navPosition, setNavPosition] = useState<React.CSSProperties>({});
  useEffect(() => setConsent(window.localStorage.getItem("global-convert-consent")), []);
  useEffect(() => {
    function positionMenu() {
      const siteHeader = document.querySelector<HTMLElement>(".site-header");
      const header = siteHeader || document.querySelector<HTMLElement>(".legal");
      if (!header) return;
      const bounds = header.getBoundingClientRect();
      const top = siteHeader ? bounds.top + window.scrollY + Math.max(16, (bounds.height - 34) / 2) : bounds.top + window.scrollY + 28;
      const right = Math.max(12, window.innerWidth - bounds.right + 12);
      setMenuPosition({ top: `${top}px`, right: `${right}px` });
      setNavPosition({ top: `${top + 42}px`, right: `${right}px` });
    }
    positionMenu(); window.addEventListener("resize", positionMenu); window.addEventListener("scroll", positionMenu);
    return () => { window.removeEventListener("resize", positionMenu); window.removeEventListener("scroll", positionMenu); };
  }, []);
  function choose(value: string) { window.localStorage.setItem("global-convert-consent", value); setConsent(value); }
  return <>
    <style>{`.site-header .menu-button{display:none}.site-menu-button{display:none}@media(max-width:900px){.site-header{position:relative;padding-right:58px}.site-header>a:not(.brand){display:block;min-width:0;max-width:calc(100% - 20px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.site-menu-button{display:grid;place-items:center;position:absolute;z-index:100;width:34px;height:34px;border:0;border-radius:7px;background:var(--paper);color:var(--ink);font-size:23px;line-height:28px;padding:0;cursor:pointer;box-shadow:0 4px 12px #173d2518}.site-menu-button.is-open{background:var(--lime);color:var(--ink)}.mobile-nav{display:flex;position:absolute;z-index:99;width:min(250px,calc(100vw - 40px));flex-direction:column;gap:0;padding:8px;background:var(--card);border:1px solid var(--line);border-radius:10px;box-shadow:0 16px 35px #173d2520}.mobile-nav a{padding:12px 14px;border-radius:6px;font-size:12px;font-weight:700;color:var(--muted)}.mobile-nav a:hover{background:var(--paper);color:var(--green)}}@media(max-width:420px){.site-header{padding-left:16px;padding-right:54px}.site-header>a:not(.brand){font-size:11px}.mobile-nav{width:calc(100vw - 32px)}}`}</style>
    <button className={`site-menu-button${menu ? " is-open" : ""}`} style={menuPosition} aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={20} strokeWidth={2.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={2.5} aria-hidden="true" />}</button>
    {menu && <nav className="mobile-nav" style={navPosition}><a href="/#converter" onClick={() => setMenu(false)}>Converter</a><a href="/calculator" onClick={() => setMenu(false)}>Calculator</a><a href="/popular-pairs" onClick={() => setMenu(false)}>Popular pairs</a><a href="/guides" onClick={() => setMenu(false)}>Currency guides</a><a href="/faq" onClick={() => setMenu(false)}>FAQ</a><a href="/history" onClick={() => setMenu(false)}>Rate history</a><a href="/multi-currency-converter" onClick={() => setMenu(false)}>Compare currencies</a><a href="/about" onClick={() => setMenu(false)}>About</a><a href="/contact" onClick={() => setMenu(false)}>Contact</a><a href="/rate-methodology" onClick={() => setMenu(false)}>Rate methodology</a></nav>}
    {consent === null && <aside className="consent" role="dialog" aria-label="Cookie preferences"><div><strong>Your privacy matters</strong><p>We use essential storage for preferences. Optional analytics and advertising stay off unless you choose to allow them.</p></div><div className="consent-actions"><button onClick={() => choose("rejected")}>Reject optional</button><button className="consent-accept" onClick={() => choose("accepted")}>Allow optional</button></div></aside>}
  </>;
}
