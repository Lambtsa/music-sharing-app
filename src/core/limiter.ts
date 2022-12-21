import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export class Limiter {
  #redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  constructor() {}

  async limit(identifier: string) {
    return new Ratelimit({
      redis: this.#redis,
      limiter: Ratelimit.fixedWindow(5, "5 s"),
    }).limit(identifier);
  }
}
