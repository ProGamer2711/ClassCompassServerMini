import { PrismaClient } from "@prisma/client";

import path from "path";
import fs from "fs";

import express from "express";
import multer from "multer";
import hyperid from "hyperid";
import dotenv from "dotenv";
import cors from "cors";

import { messages } from "./utils/messages";
import * as serverResponses from "./utils/responses";

dotenv.config();

const app = express();

const routesPath = path.join(__dirname, "routes");
const uploadsPath = path.join(__dirname, "uploads");

export const floorPlansPath = path.join(uploadsPath, "floorPlans");
export const floorMasksPath = path.join(uploadsPath, "floorMasks");

// if "uploads" directory does not exist, create it
if (!fs.existsSync(uploadsPath)) {
	fs.mkdirSync(uploadsPath);
}

// if "floorPlans" directory does not exist, create it
if (!fs.existsSync(floorPlansPath)) {
	fs.mkdirSync(floorPlansPath);
}

// if "floorMasks" directory does not exist, create it
if (!fs.existsSync(floorMasksPath)) {
	fs.mkdirSync(floorMasksPath);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Set CORS With Whitelist Array
let whitelistedDomains = process.env.WHITELISTED_DOMAINS?.split(", ") || [];
let allowedOrigins =
	process.env.NODE_ENV === "production"
		? whitelistedDomains
		: ["http://localhost:5500", "http://127.0.0.1:5500"];

app.use(
	cors({
		origin: allowedOrigins,
		optionsSuccessStatus: 200,
	})
);

app.use((req, res, next) => {
	// const origin = req.headers.origin;

	// if (allowedOrigins.includes(origin))
	res.setHeader("Access-Control-Allow-Origin", "*");

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

const port = process.env.PORT || 8393;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}/`);
});

export const client = new PrismaClient();
