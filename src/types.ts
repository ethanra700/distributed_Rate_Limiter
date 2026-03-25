export interface Env {
  POLICY_KV: KVNamespace;
  RATE_LIMITER_DO: DurableObjectNamespace;
}
export interface RateLimitResponse {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}
