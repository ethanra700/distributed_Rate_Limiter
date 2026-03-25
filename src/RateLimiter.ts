import { RateLimitResponse } from './types';
export class RateLimiter implements DurableObject {
  state: DurableObjectState;
  timestamps: number[] = [];
  windowSizeMs = 60000;
  limit = 100;
  constructor(state: DurableObjectState, env: any) { this.state = state; }
  async fetch(request: Request): Promise<Response> {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.windowSizeMs);
    const allowed = this.timestamps.length < this.limit;
    if (allowed) {
      this.timestamps.push(now);
      this.state.storage.put('timestamps', this.timestamps);
    }
    const response: RateLimitResponse = { allowed, remaining: Math.max(0, this.limit - this.timestamps.length), resetTime: this.timestamps.length > 0 ? this.timestamps[0] + this.windowSizeMs : now };
    return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } });
  }
}
