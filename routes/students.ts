import { Router } from "express";

import * as CRUD from "../utils/prisma";
import * as serverResponses from "../utils/responses";
import { messages } from "../types/messages";
import {
	StudentCreateArgsSchema,
	StudentDeleteArgsSchema,
	StudentFindManyArgsSchema,
	StudentFindUniqueOrThrowArgsSchema,
	StudentUpdateArgsSchema,
} from "../prisma/generated/zod";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await CRUD.create(
			"student",
			{ data: req.body },
			StudentCreateArgsSchema
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
// 		const result = await getStudents();

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

router.get("/class/:classId", async (req, res) => {
	try {
		const { classId } = req.params;

		const result = await CRUD.findMany(
			"student",
			{ where: { classId } },
			StudentFindManyArgsSchema
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
			"student",
			{
				where: { id },
			},
			StudentFindUniqueOrThrowArgsSchema
		);

		if (!result) {
			return serverResponses.sendError(
				res,
				messages.NOT_FOUND,
				`Student with id ${id} not found`
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
			"student",
			{
				where: {
					id,
				},
				data: req.body,
			},
			StudentUpdateArgsSchema
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
			"student",
			{
				where: {
					id,
				},
			},
			StudentDeleteArgsSchema
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

export const path = "/students";
