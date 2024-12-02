import path from "path";
import fs from "fs";

import dotenv from "dotenv";
import { z } from "zod";
import hyperid from "hyperid";
import multer from "multer";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

import { messages } from "./types/messages";
import * as serverResponses from "./utils/responses";
import { createIndexes } from "./utils/caching";
import { responseMiddleware } from "./middlewares/response";

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

const env = result.data;

const routesPath = path.join(__dirname, "routes");
const modelsPath = path.join(__dirname, "models");
const uploadsPath = path.join(__dirname, "uploads");

export const floorPlansPath = path.join(uploadsPath, "floorPlans");
export const floorMasksPath = path.join(uploadsPath, "floorMasks");

// if any of the directories does not exist, create it
if (!fs.existsSync(routesPath)) {
	fs.mkdirSync(routesPath);
}

if (!fs.existsSync(modelsPath)) {
	fs.mkdirSync(modelsPath);
}

if (!fs.existsSync(uploadsPath)) {
	fs.mkdirSync(uploadsPath);
}

if (!fs.existsSync(floorPlansPath)) {
	fs.mkdirSync(floorPlansPath);
}

if (!fs.existsSync(floorMasksPath)) {
	fs.mkdirSync(floorMasksPath);
}

const instance = hyperid({ urlSafe: true });

const storage = multer.diskStorage({
	destination: (req, _, cb) => {
		const route = req.path;

		if (route.endsWith("/plan")) {
			cb(null, floorPlansPath);
		} else if (route.endsWith("/mask")) {
			cb(null, floorMasksPath);
		} else {
			cb(new Error("Invalid route"), "");
		}
	},
	filename: (_, file, cb) => {
		cb(null, `${instance()}.${file.originalname.split(".").pop()}`);
	},
});

export const upload = multer({
	storage,
	limits: {
		// 1GB
		fileSize: 1024 * 1024 * 1024,
	},
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
let whitelistedDomains = env.WHITELISTED_DOMAINS?.split(", ") ?? [];

let allowedOrigins =
	env.NODE_ENV === "production"
		? whitelistedDomains
		: ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
	cors({
		origin: allowedOrigins,
		optionsSuccessStatus: 200,
	})
);

app.use((req, res, next) => {
	const origin = req.headers.origin ?? "";

	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, X-Token"
	);

	next();
});

app.use(responseMiddleware);

// Register Routes
try {
	const routeFiles = fs.readdirSync(routesPath);

	const routePromises = routeFiles.map(async file => {
		const route = await import(path.join(routesPath, file));

		app.use(route.path, route.router);
	});

	await Promise.all(routePromises);

	app.all("*", (_, res) => {
		res.sendResponse(messages.NOT_FOUND, { message: "Route not found" });
	});
} catch (error) {
	console.error(error);

	app.all("*", (_, res) => {
		res.sendResponse(messages.INTERNAL_SERVER_ERROR, {
			message: "An error occurred while loading routes",
		});
	});
}

export const prismaClient = new PrismaClient();

export const redisClient = createClient({
	url: env.REDIS_URL,
});

redisClient.on("error", err => {
	console.log(err);
});

const port = env.PORT ?? 8393;

(async () => {
	await redisClient
		.on("connect", async () => {
			console.log("Connected to Redis");
		})
		.connect();

	createIndexes(modelsPath);

	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}/`);
	});
})();
