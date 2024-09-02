import fs from "fs";
import { join } from "path";

import { Router } from "express";

import {
	createFloor,
	deleteFloor,
	getFloors,
	updateFloor,
} from "../helpers/floors";
import * as serverResponses from "../utils/responses";
import { messages } from "../types/messages";
import { floorMasksPath, floorPlansPath, upload } from "..";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await createFloor(req.body);

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.CREATED, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

// router.get("", async (_, res) => {
// 	try {
// 		const result = await getFloors();

// 		if ("error" in result) {
// 			return serverResponses.sendError(
// 				res,
// 				messages.BAD_REQUEST,
// 				result.error
// 			);
// 		}

// 		return serverResponses.sendSuccess(res, messages.OK, result);
// 	} catch (error) {
// 		console.error(error);

// 		return serverResponses.sendError(
// 			res,
// 			messages.INTERNAL_SERVER_ERROR,
// 			error
// 		);
// 	}
// });

router.get("/:buildingId", async (req, res) => {
	try {
		const { buildingId } = req.params;

		const result = await getFloors({ buildingId });

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await updateFloor(
			{
				id,
			},
			req.body
		);

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await deleteFloor({
			id,
		});

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

// TODO: Maybe add helper functions for the routes below
router.post("/:id/plan", upload.single("plan"), async (req, res) => {
	try {
		const { id } = req.params;

		// if there is no file, return an error
		if (!req.file) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				// TODO: Change this message / make it dynamic
				"Файлът не можа да бъде качен"
			);
		}

		// delete any existing file
		const floors = await getFloors({
			id,
		});

		if ("error" in floors) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				floors.error
			);
		}

		if (floors.length === 0) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No floors found",
			});
		}

		// if a file already exists, delete it
		if (
			floors[0].planFilename &&
			fs.existsSync(join(floorPlansPath, floors[0].planFilename))
		) {
			fs.unlinkSync(join(floorPlansPath, floors[0].planFilename));
		}

		const result = await updateFloor(
			{
				id,
			},
			{
				planFilename: req.file?.filename,
			}
		);

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.get("/:id/plan", async (req, res) => {
	try {
		const { id } = req.params;

		const floors = await getFloors({
			id,
		});

		if ("error" in floors) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				floors.error
			);
		}

		if (floors.length === 0) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No floors found",
			});
		}

		if (!floors[0].planFilename) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No plan found",
			});
		}

		const filePath = join(floorPlansPath, floors[0].planFilename);

		if (!fs.existsSync(filePath)) {
			// remove the filename from the database
			await updateFloor(
				{
					id,
				},
				{
					planFilename: null,
				}
			);

			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		return res.sendFile(filePath);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.delete("/:id/plan", async (req, res) => {
	try {
		const { id } = req.params;

		const floors = await getFloors({
			id,
		});

		if ("error" in floors) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				floors.error
			);
		}

		if (floors.length === 0) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No floors found",
			});
		}

		if (!floors[0].planFilename) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No plan found",
			});
		}

		const filePath = join(floorPlansPath, floors[0].planFilename);

		const result = await updateFloor(
			{
				id,
			},
			{
				planFilename: null,
			}
		);

		if (!fs.existsSync(filePath)) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		fs.unlinkSync(filePath);

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.post("/:id/mask", upload.single("mask"), async (req, res) => {
	try {
		const { id } = req.params;

		// if there is no file, return an error
		if (!req.file) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				// TODO: Change this message / make it dynamic
				"Файлът не можа да бъде качен"
			);
		}

		// delete any existing file
		const floors = await getFloors({
			id,
		});

		if ("error" in floors) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				floors.error
			);
		}

		if (floors.length === 0) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No floors found",
			});
		}

		// if a file already exists, delete it
		if (
			floors[0].maskFilename &&
			fs.existsSync(join(floorMasksPath, floors[0].maskFilename))
		) {
			fs.unlinkSync(join(floorMasksPath, floors[0].maskFilename));
		}

		const result = await updateFloor(
			{
				id,
			},
			{
				maskFilename: req.file?.filename,
			}
		);

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.get("/:id/mask", async (req, res) => {
	try {
		const { id } = req.params;

		const floors = await getFloors({
			id,
		});

		if ("error" in floors) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				floors.error
			);
		}

		if (floors.length === 0) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No floors found",
			});
		}

		if (!floors[0].maskFilename) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No mask found",
			});
		}

		const filePath = join(floorMasksPath, floors[0].maskFilename);

		if (!fs.existsSync(filePath)) {
			// remove the filename from the database
			await updateFloor(
				{
					id,
				},
				{
					maskFilename: null,
				}
			);

			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		return res.sendFile(filePath);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

router.delete("/:id/mask", async (req, res) => {
	try {
		const { id } = req.params;

		const floors = await getFloors({
			id,
		});

		if ("error" in floors) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				floors.error
			);
		}

		if (floors.length === 0) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No floors found",
			});
		}

		if (!floors[0].maskFilename) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "No mask found",
			});
		}

		const filePath = join(floorMasksPath, floors[0].maskFilename);

		const result = await updateFloor(
			{
				id,
			},
			{
				maskFilename: null,
			}
		);

		if (!fs.existsSync(filePath)) {
			return serverResponses.sendError(res, messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		fs.unlinkSync(filePath);

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		return serverResponses.sendSuccess(res, messages.OK, result);
	} catch (error) {
		console.error(error);

		return serverResponses.sendError(
			res,
			messages.INTERNAL_SERVER_ERROR,
			error
		);
	}
});

export const path = "/floors";
