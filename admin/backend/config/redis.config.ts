import { createClient } from "redis";
import { RedisStore } from "connect-redis";

export const redisClient = createClient({
	url: process.env.REDIS_URL as string,
	socket:{
		reconnectStrategy: (times: number):any => Math.min(times * 100, 2000),
	}
});
// redisClient.on('error', (err) => console.log("REDIS CLIENT ERROR", err))
// redisClient.on('connect', () => console.log("CONNECTING TO REDIS..."));
// redisClient.on('ready', () => console.log("REDIS CLIENT READY"));
// redisClient.on('reconnecting', () => console.log("REDIS RECONNECTING..."));
await redisClient.connect();

export const redisStore = new RedisStore({
	client: redisClient
})

