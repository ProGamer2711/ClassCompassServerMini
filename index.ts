import path from "path";

import { env } from "./config/env";
import { redisClient } from "./config/db";
import { createIndexes } from "./utils/caching";
import app from "./server/app";
import { registerRoutes } from "./server/routes";

const port = env.PORT ?? 8393;

try {
	await redisClient.connect();
	console.log("Connected to Redis");

	const modelsPath = path.join(__dirname, "models");
	createIndexes(modelsPath);

	await registerRoutes();

	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}/`);
	});
} catch (err) {
	console.error(`Failed to start server: ${err}`);

	process.exit(1);
}
