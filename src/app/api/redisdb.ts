import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.REDIS_RL_KV_REST_API_URL!,
  token: process.env.REDIS_RL_KV_REST_API_TOKEN!,
});
