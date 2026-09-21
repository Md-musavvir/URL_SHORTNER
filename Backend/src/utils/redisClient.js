import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
  retryStrategy(times) {
    return Math.min(times * 500, 2000);
  },
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

redisClient.on("connect", () => {
  console.log("redis connected");
});

export default redisClient;
