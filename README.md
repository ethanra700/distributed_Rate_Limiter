# Edge-Native Distributed Rate Limiter
A high-performance, edge-native distributed rate limiter built with TypeScript and Cloudflare Workers. 

Leverages Durable Objects to maintain consistent, race-condition-free sliding window counters without a centralized database. Cloudflare KV is used for per-IP routing and custom blocklists, featuring token-based throttling and connection tarpitting to shield APIs from abusive traffic.
