import { Router } from "express";

import * as serverResponses from "../utils/responses";
import * as CRUD from "../utils/prisma";
import { messages } from "../types/messages";
import {
	BuildingCreateArgsSchema,
	BuildingDeleteArgsSchema,
	BuildingFindManyArgsSchema,
	BuildingFindUniqueOrThrowArgsSchema,
	BuildingUpdateArgsSchema,
} from "../prisma/generated/zod";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await CRUD.create(
			"building",
			{ data: req.body },
			BuildingCreateArgsSchema
		);

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
// 		const result = await getBuildings();

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

router.get("/school/:schoolId", async (req, res) => {
	try {
		const { schoolId } = req.params;

		const result = await CRUD.findMany(
			"building",
			{ where: { schoolId } },
			BuildingFindManyArgsSchema
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

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await CRUD.findUniqueOrThrow(
			"building",
			{ where: { id } },
			BuildingFindUniqueOrThrowArgsSchema
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

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await CRUD.update(
			"building",
			{
				where: { id },
				data: req.body,
			},
			BuildingUpdateArgsSchema
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

		const result = await CRUD.delete(
			"building",
			{
				where: { id },
			},
			BuildingDeleteArgsSchema
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

export const path = "/buildings";
