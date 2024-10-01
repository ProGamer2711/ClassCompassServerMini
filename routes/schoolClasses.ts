import { Router } from "express";

import * as CRUD from "../utils/prisma";
import * as serverResponses from "../utils/responses";
import { messages } from "../types/messages";
import {
	SchoolClassCreateArgsSchema,
	SchoolClassDeleteArgsSchema,
	SchoolClassFindManyArgsSchema,
	SchoolClassFindUniqueOrThrowArgsSchema,
	SchoolClassUpdateArgsSchema,
} from "../prisma/generated/zod";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await CRUD.create(
			"schoolClass",
			{ data: req.body },
			SchoolClassCreateArgsSchema
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
// 		const result = await getSchoolClassеs();

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
			"schoolClass",
			{ where: { schoolId } },
			SchoolClassFindManyArgsSchema
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
			"schoolClass",
			{ where: { id } },
			SchoolClassFindUniqueOrThrowArgsSchema
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
			"schoolClass",
			{
				where: { id },
				data: req.body,
			},
			SchoolClassUpdateArgsSchema
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
			"schoolClass",
			{
				where: { id },
			},
			SchoolClassDeleteArgsSchema
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

export const path = "/classes";
