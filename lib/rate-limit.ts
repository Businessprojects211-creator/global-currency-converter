type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;

export function isRateLimited(request: Request): boolean {
  const now = Date.now();
  const forwarded = request.headers.get("x-forwarded-for");
  const key = forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "anonymous";
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}
