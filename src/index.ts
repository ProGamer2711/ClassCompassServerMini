import dotenv from "dotenv";
import cors from "cors";

import express from "express";

import mongoose from "mongoose";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();

const routesPath = path.join(__dirname, "routes");

app.use(express.json());

// Set CORS With Whitelist Array
let whitelistedDomains = (process.env.WHITELISTED_DOMAINS || "").split(", ");
let allowedOrigins =
	process.env.NODE_ENV === "production"
		? whitelistedDomains
		: ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
	cors({
		origin: "*",
		optionsSuccessStatus: 200,
	})
);

app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin))
		res.setHeader("Access-Control-Allow-Origin", origin);

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, X-Token, Origin"
	);

	next();
});

// Register Routes
try {
	fs.readdirSync(routesPath).forEach(file => {
		const route = require(path.join(routesPath, file));
		app.use(route.path, route.router);
	});

	app.all("*", (_, res) =>
		res.status(404).json({
			error: "Тази страница не е намерена",
		})
	);
} catch (error) {
	console.error(error);
	app.all("*", (_, res) =>
		res.status(500).json({
			error: "Вътрешна грешка на сървъра",
		})
	);
}

const port = process.env.PORT || 8393;

mongoose.set("strictQuery", false);

// Connect To MongoDB
mongoose.connect(process.env.DB_URI || "").then(() => {
	console.log("Connected to MongoDB");

	// Start The Server
	app.listen(port, () => console.log(`Server started on port ${port}`));
});
