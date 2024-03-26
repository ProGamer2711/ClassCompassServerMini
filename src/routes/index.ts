import { Request, Response, Router, raw } from "express";
import crypto from "crypto";
import { exec } from "child_process";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

function verifySignature(req: Request, body: string) {
	const signature: string = req.headers["x-hub-signature"] as string;

	if (!signature) {
		throw new Error("Signature header not found");
	}

	const hmac = crypto.createHmac("sha1", webhookSecret);
	const digest = "sha1=" + hmac.update(body).digest("hex");

	// Use secure comparison to avoid timing attacks
	if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
		throw new Error("Signature verification failed");
	}
}

export const router = Router();

router.post(
	"/webhook",
	raw({ type: "application/json" }),
	(req: Request, res: Response) => {
		try {
			// Verify the signature of the incoming request
			verifySignature(req, req.body.toString());

			// Parse the JSON payload
			const payload = JSON.parse(req.body.toString());

			// Handle the payload (e.g., trigger deployment)
			console.log("Received payload:", payload);

			// Execute deployment command (replace with your deployment script or logic)
			exec("git pull origin master", error => {
				if (error) {
					console.error("Deployment error:", error);
					res.status(500).send("Deployment failed");
				} else {
					console.log("Deployment successful");
					res.status(200).send("Deployment successful");
				}
			});
		} catch (error) {
			console.error("Error processing webhook:", error.message);
			res.status(400).send("Error: " + error.message);
		}
	}
);

export const path = "/";
