import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	REDIS_URL: z.string().url(),
	PORT: z.string().optional(),
	WHITELISTED_DOMAINS: z.string().optional(),
	NODE_ENV: z
		.enum(["development", "production"], {
			message: 'NODE_ENV must be either "development" or "production"',
		})
		.default("development"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(result.error.errors);
	process.exit(1);
}

export const env = result.data;
