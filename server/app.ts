import express from "express";
import cors from "cors";
import { responseMiddleware } from "../middlewares/response";
import { env } from "../config/env";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins =
	env.NODE_ENV === "production"
		? env.WHITELISTED_DOMAINS?.split(", ") ?? []
		: ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
	cors({
		origin: allowedOrigins,
		optionsSuccessStatus: 200,
	})
);

// app.use((req, res, next) => {
// 	const origin = req.headers.origin ?? "";
// 	if (allowedOrigins.includes(origin)) {
// 		res.setHeader("Access-Control-Allow-Origin", origin);
// 	}
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, PUT, DELETE, OPTIONS"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, X-Token"
// 	);
// 	next();
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(responseMiddleware);

export default app;
