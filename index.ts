import path from "path";
import fs from "fs";

import dotenv from "dotenv";
import hyperid from "hyperid";
import multer from "multer";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { Redis } from "ioredis";

import { messages } from "./utils/messages";
import * as serverResponses from "./utils/responses";

dotenv.config();

const routesPath = path.join(__dirname, "routes");
const uploadsPath = path.join(__dirname, "uploads");

export const floorPlansPath = path.join(uploadsPath, "floorPlans");
export const floorMasksPath = path.join(uploadsPath, "floorMasks");

// if any of the directories does not exist, create it
if (!fs.existsSync(routesPath)) {
	fs.mkdirSync(routesPath);
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
	destination: (req, _file, cb) => {
		const route = req.path;

		if (route.endsWith("/plan")) {
			cb(null, floorPlansPath);
		} else if (route.endsWith("/mask")) {
			cb(null, floorMasksPath);
		} else {
			cb(new Error("Invalid route"), "");
		}
	},
	filename: (_req, file, cb) => {
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
let whitelistedDomains = process.env.WHITELISTED_DOMAINS?.split(", ") ?? [];

let allowedOrigins =
	process.env.NODE_ENV === "production"
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

// Register Routes
try {
	fs.readdirSync(routesPath).forEach(file => {
		const route = require(path.join(routesPath, file));
		app.use(route.path, route.router);
	});

	app.all("*", (_, res) => {
		serverResponses.sendError(res, messages.NOT_FOUND);
	});
} catch (error) {
	console.error(error);

	app.all("*", (_, res) => {
		serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
	});
}

export const prismaClient = new PrismaClient();

export const redisClient = new Redis(process.env.REDIS_URL ?? "");

redisClient.on("connect", () => {
	console.log("Connected to Redis");
});

const port = process.env.PORT ?? 8393;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}/`);
});
