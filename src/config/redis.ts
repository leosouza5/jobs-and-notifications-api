import type { ConnectionOptions } from "bullmq";
import { env } from "./env.js";

export const redisConnection:ConnectionOptions = {
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: Number(env.REDIS_PORT),
}