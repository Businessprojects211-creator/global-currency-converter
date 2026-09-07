import Link from "next/link";

export default function NotFound() {
  return <main className="legal"><article><p className="eyebrow">GLOBAL CONVERT</p><h1>Page not found.</h1><p>The page you requested does not exist.</p><Link href="/" className="empty-workspace">Return home →</Link></article></main>;
}
