import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import { Logger } from "../middleware/logger.middleware";
const logger = new Logger();

const redisClient = createClient({
	url: process.env.REDIS_URL
});
redisClient.on("err", (err) => logger.log(err));
redisClient.connect().catch();

const redisStore = new RedisStore({
	client: redisClient
})

export default redisStore;
