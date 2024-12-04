import { Router, raw } from "express";
import crypto from "crypto";
import { exec } from "child_process";
import { messages } from "../types/messages";

const webhookSecret = process.env.WEBHOOK_SECRET ?? "";
const repoPath = process.env.REPO_PATH ?? "";

export const router = Router();

router.get("/", (_, res) => {
	res.sendResponse(messages.OK, { message: "Сървърът работи нормално." });
});

router.post("/webhook", raw({ type: "application/json" }), (req, res) => {
	const signature = req.headers["x-hub-signature"] as string;

	if (!signature) {
		return res.sendResponse(messages.BAD_REQUEST, {
			message: "Signature header not found",
		});
	}

	const payloadBody = JSON.stringify(req.body);

	const hash = crypto
		.createHmac("sha1", webhookSecret)
		.update(payloadBody)
		.digest("hex");

	const expectedSignature = `sha1=${hash}`;

	if (
		!crypto.timingSafeEqual(
			new Uint8Array(Buffer.from(signature)),
			new Uint8Array(Buffer.from(expectedSignature))
		)
	) {
		return res.sendResponse(messages.FORBIDDEN, {
			message: "Signature verification failed",
		});
	}

	// Signature verified, execute git pull
	exec(`cd ${repoPath} && git pull`, error => {
		if (error) {
			console.error("Deployment error:", error);

			return res.sendResponse(messages.INTERNAL_SERVER_ERROR, {
				message: "Deployment failed",
			});
		}

		console.log("Deployment successful");

		res.sendResponse(messages.OK, { message: "Deployment successful" });
	});
});

export const path = "/";
