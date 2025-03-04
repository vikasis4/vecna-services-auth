import { Redis } from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

export default redisClient;
