import Redis from "ioredis";

let client: Redis | null = null;

export function getRedis(): Redis {
  if (!client) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL is not set");
    client = new Redis(url, {
      connectTimeout: 250,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 0,
      lazyConnect: false,
      retryStrategy: () => null,
    });
    client.on("error", (err) => {
      console.error("[redis] error:", err.message);
    });
  }
  return client;
}
