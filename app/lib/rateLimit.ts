import { NextRequest } from 'next/server';

interface Bucket {
  count: number;
  resetAt: number;
}

// Best-effort, per-serverless-instance limiter — good enough to blunt casual
// spam/scripting, not a substitute for a shared store (Redis/Upstash) if this
// site ever needs to survive a real bot wave across many instances.
const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5000;

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Returns true if `key` has exceeded `limit` requests within `windowMs`. */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [k, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (bucket.count >= limit) return true;
  bucket.count += 1;
  return false;
}
