import fs from "fs";
import path from "path";
import app from "./app";
import { messages } from "../types/messages";

const routesPath = path.join(__dirname, "../routes");

export const registerRoutes = async () => {
	try {
		const routeFiles = fs.readdirSync(routesPath);

		const routePromises = routeFiles.map(async file => {
			const route = await import(path.join(routesPath, file));
			app.use(route.path, route.router);
		});

		await Promise.all(routePromises);

		app.all("*", (_, res) => {
			res.sendResponse(messages.NOT_FOUND, {
				message: "Route not found",
			});
		});
	} catch (error) {
		console.error(error);

		app.all("*", (_, res) => {
			res.sendResponse(messages.INTERNAL_SERVER_ERROR, {
				message: "An error occurred while loading routes",
			});
		});
	}
};
