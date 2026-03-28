import { Env, RateLimitResponse } from './types';
export { RateLimiter } from './RateLimiter';
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const clientIP = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const customPolicy = await env.POLICY_KV.get(`policy:${clientIP}`);
    if (customPolicy === 'blocked') return new Response('Access Denied', { status: 403 });
    return new Response('Origin Response Success', { status: 200 });
  }
};
