import { Env, RateLimitResponse } from './types';
export { RateLimiter } from './RateLimiter';
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response('Origin Response Success', { status: 200 });
  }
};
