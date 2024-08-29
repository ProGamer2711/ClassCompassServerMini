import { Request, Response, Router, raw } from "express";
import crypto from "crypto";
import { exec } from "child_process";

const webhookSecret = process.env.WEBHOOK_SECRET || "";
const repoPath = process.env.REPO_PATH || "";

export const router = Router();

// router.get("/", (_, res) => {
// 	res.status(200).json({ message: "Сървърът работи нормално." });
// });

router.post(
	"/webhook",
	raw({ type: "application/json" }),
	(req: Request, res: Response) => {
		const signature = req.headers["x-hub-signature"] as string;
		if (!signature) {
			return res.status(400).send("Signature header not found");
		}

		const payloadBody = JSON.stringify(req.body);

		const hash = crypto
			.createHmac("sha1", webhookSecret)
			.update(payloadBody)
			.digest("hex");
		const expectedSignature = `sha1=${hash}`;

		if (
			!crypto.timingSafeEqual(
				Buffer.from(signature),
				Buffer.from(expectedSignature)
			)
		) {
			return res.status(403).send("Signature verification failed");
		}

		// Signature verified, execute git pull
		exec(`cd ${repoPath} && git pull`, error => {
			if (error) {
				console.error("Deployment error:", error);
				return res.status(500).send("Deployment failed");
			}

			console.log("Deployment successful");
			res.status(200).send("Deployment successful");
		});
	}
);

export const path = "/";
