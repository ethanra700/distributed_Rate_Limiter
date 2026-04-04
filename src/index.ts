import { Env, RateLimitResponse } from './types';
export { RateLimiter } from './RateLimiter';
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const clientIP = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const customPolicy = await env.POLICY_KV.get(`policy:${clientIP}`);
    if (customPolicy === 'blocked') return new Response('Access Denied', { status: 403 });
    
    const doId = env.RATE_LIMITER_DO.idFromName(clientIP);
    const stub = env.RATE_LIMITER_DO.get(doId);
    const doRequest = new Request(request.url, { method: 'POST' });
    const limitCheck = await stub.fetch(doRequest);
    const result: RateLimitResponse = await limitCheck.json();
    
    if (!result.allowed) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      return new Response('Rate Limit Exceeded', { status: 429, headers: { 'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString() } });
    }
    return new Response('Origin Response Success', { status: 200 });
  }
};
