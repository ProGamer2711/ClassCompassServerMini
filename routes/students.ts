import { Router } from "express";

import * as CRUD from "../utils/prisma";
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
// 		const result = await getStudents();

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

router.get("/class/:classId", async (req, res) => {
	try {
		const { classId } = req.params;

		const result = await CRUD.findMany(
			"student",
			{ where: { classId } },
			StudentFindManyArgsSchema
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
			"student",
			{
				where: { id },
			},
			StudentFindUniqueOrThrowArgsSchema
		);

		if (!result) {
			return res.sendResponse(
				messages.NOT_FOUND,
				`Student with id ${id} not found`
			);
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
			"student",
			{
				where: {
					id,
				},
			},
			StudentDeleteArgsSchema
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

export const path = "/students";
