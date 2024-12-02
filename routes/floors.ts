import fs from "fs";
import { join } from "path";

import { Router } from "express";

import * as CRUD from "../utils/prisma";
import { messages } from "../types/messages";
import { floorMasksPath, floorPlansPath, upload } from "..";
import {
	FloorCreateArgsSchema,
	FloorDeleteArgsSchema,
	FloorFindManyArgsSchema,
	FloorFindUniqueOrThrowArgsSchema,
	FloorUpdateArgsSchema,
} from "../prisma/generated/zod";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await CRUD.create(
			"floor",
			{ data: req.body },
			FloorCreateArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.CREATED, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

// router.get("", async (_, res) => {
// 	try {
// 		const result = await getFloors();

// 		if ("error" in result) {
// 			return serverResponses.send(
// 				res,
// 				messages.BAD_REQUEST,
// 				result.error
// 			);
// 		}

// 		return serverResponses.send(res, messages.OK, result);
// 	} catch (error) {
// 		console.error(error);

// 		return serverResponses.send(
// 			res,
// 			messages.INTERNAL_SERVER_ERROR,
// 			error
// 		);
// 	}
// });

router.get("/building/:buildingId", async (req, res) => {
	try {
		const { buildingId } = req.params;

		const result = await CRUD.findMany(
			"floor",
			{ where: { buildingId } },
			FloorFindManyArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await CRUD.findUniqueOrThrow(
			"floor",
			{ where: { id } },
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await CRUD.update(
			"floor",
			{
				where: { id },
				data: req.body,
			},
			FloorUpdateArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await CRUD.delete(
			"floor",
			{
				where: { id },
			},
			FloorDeleteArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

// TODO: Maybe add helper functions for the routes below
router.post("/:id/plan", upload.single("plan"), async (req, res) => {
	try {
		const { id } = req.params;

		// if there is no file, return an error
		if (!req.file) {
			return res.sendResponse(
				messages.BAD_REQUEST,
				// TODO: Change this message / make it dynamic
				"Файлът не можа да бъде качен"
			);
		}

		// delete any existing file
		const floor = await CRUD.findUniqueOrThrow(
			"floor",
			{
				where: { id },
			},
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in floor) {
			return res.sendResponse(messages.BAD_REQUEST, floor.error);
		}

		// if a file already exists, delete it
		if (
			floor.planFilename &&
			fs.existsSync(join(floorPlansPath, floor.planFilename))
		) {
			fs.unlinkSync(join(floorPlansPath, floor.planFilename));
		}

		const result = await CRUD.update(
			"floor",
			{
				where: { id },
				data: {
					planFilename: req.file?.filename,
				},
			},
			FloorUpdateArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.get("/:id/plan", async (req, res) => {
	try {
		const { id } = req.params;

		const floor = await CRUD.findUniqueOrThrow(
			"floor",
			{
				where: { id },
			},
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in floor) {
			return res.sendResponse(messages.BAD_REQUEST, floor.error);
		}

		if (!floor.planFilename) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "No plan found",
			});
		}

		const filePath = join(floorPlansPath, floor.planFilename);

		if (!fs.existsSync(filePath)) {
			// remove the filename from the database
			await CRUD.update(
				"floor",
				{
					where: { id },
					data: {
						planFilename: null,
					},
				},
				FloorUpdateArgsSchema
			);

			return res.sendResponse(messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		return res.sendFile(filePath);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.delete("/:id/plan", async (req, res) => {
	try {
		const { id } = req.params;

		const floor = await CRUD.findUniqueOrThrow(
			"floor",
			{
				where: { id },
			},
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in floor) {
			return res.sendResponse(messages.BAD_REQUEST, floor.error);
		}

		if (!floor.planFilename) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "No plan found",
			});
		}

		const filePath = join(floorPlansPath, floor.planFilename);

		const result = await CRUD.update(
			"floor",
			{
				where: {
					id,
				},
				data: {
					planFilename: null,
				},
			},
			FloorUpdateArgsSchema
		);

		if (!fs.existsSync(filePath)) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		fs.unlinkSync(filePath);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.post("/:id/mask", upload.single("mask"), async (req, res) => {
	try {
		const { id } = req.params;

		// if there is no file, return an error
		if (!req.file) {
			return res.sendResponse(
				messages.BAD_REQUEST,
				// TODO: Change this message / make it dynamic
				"Файлът не можа да бъде качен"
			);
		}

		// delete any existing file
		const floor = await CRUD.findUniqueOrThrow(
			"floor",
			{
				where: { id },
			},
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in floor) {
			return res.sendResponse(messages.BAD_REQUEST, floor.error);
		}

		// if a file already exists, delete it
		if (
			floor.maskFilename &&
			fs.existsSync(join(floorMasksPath, floor.maskFilename))
		) {
			fs.unlinkSync(join(floorMasksPath, floor.maskFilename));
		}

		const result = await CRUD.update(
			"floor",
			{
				where: {
					id,
				},
				data: {
					maskFilename: req.file?.filename,
				},
			},
			FloorUpdateArgsSchema
		);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.get("/:id/mask", async (req, res) => {
	try {
		const { id } = req.params;

		const floor = await CRUD.findUniqueOrThrow(
			"floor",
			{
				where: { id },
			},
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in floor) {
			return res.sendResponse(messages.BAD_REQUEST, floor.error);
		}

		if (!floor.maskFilename) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "No mask found",
			});
		}

		const filePath = join(floorMasksPath, floor.maskFilename);

		if (!fs.existsSync(filePath)) {
			// remove the filename from the database
			await CRUD.update(
				"floor",
				{
					where: {
						id,
					},
					data: {
						maskFilename: null,
					},
				},
				FloorUpdateArgsSchema
			);

			return res.sendResponse(messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		return res.sendFile(filePath);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

router.delete("/:id/mask", async (req, res) => {
	try {
		const { id } = req.params;

		const floors = await CRUD.findUniqueOrThrow(
			"floor",
			{
				where: { id },
			},
			FloorFindUniqueOrThrowArgsSchema
		);

		if ("error" in floors) {
			return res.sendResponse(messages.BAD_REQUEST, floors.error);
		}

		if (!floors.maskFilename) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "No mask found",
			});
		}

		const filePath = join(floorMasksPath, floors.maskFilename);

		const result = await CRUD.update(
			"floor",
			{
				where: {
					id,
				},
				data: {
					maskFilename: null,
				},
			},
			FloorUpdateArgsSchema
		);

		if (!fs.existsSync(filePath)) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "File not found",
			});
		}

		fs.unlinkSync(filePath);

		if ("error" in result) {
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.OK, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

export const path = "/floors";
