import { RateLimitResponse } from './types';
export class RateLimiter implements DurableObject {
  state: DurableObjectState;
  constructor(state: DurableObjectState, env: any) { this.state = state; }
  async fetch(request: Request): Promise<Response> {
    return new Response("wip");
  }
}
