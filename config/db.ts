import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { env } from "./env";

export const prismaClient = new PrismaClient();

export const redisClient = createClient({ url: env.REDIS_URL });

redisClient.on("error", err => {
	console.error(`Redis Error: ${err}`);
});
