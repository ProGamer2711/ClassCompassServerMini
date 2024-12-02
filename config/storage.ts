import path from "path";
import fs from "fs";
import multer from "multer";
import hyperid from "hyperid";

const uploadsPath = path.join(__dirname, "../uploads");

export const floorPlansPath = path.join(uploadsPath, "floorPlans");
export const floorMasksPath = path.join(uploadsPath, "floorMasks");

// Ensure directories exist (this will also create the uploads directory if it doesn't exist)
[floorPlansPath, floorMasksPath].forEach(directory => {
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}
});

const instance = hyperid({ urlSafe: true });

export const upload = multer({
	storage: multer.diskStorage({
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
	}),
	limits: {
		fileSize: 1024 * 1024 * 1024, // 1GB
	},
});
