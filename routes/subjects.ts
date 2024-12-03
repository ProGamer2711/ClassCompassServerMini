import { Router } from "express";

import * as CRUD from "../utils/prisma";
import { messages } from "../types/messages";
import {
	SubjectCreateArgsSchema,
	SubjectDeleteArgsSchema,
	SubjectFindManyArgsSchema,
	SubjectFindUniqueOrThrowArgsSchema,
	SubjectUpdateArgsSchema,
} from "../prisma/generated/zod";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await CRUD.create(
			"subject",
			{ data: req.body },
			SubjectCreateArgsSchema
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
// 		const result = await getSubjects();

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

router.get("/school/:schoolId", async (req, res) => {
	try {
		const { schoolId } = req.params;

		const result = await CRUD.findMany(
			"subject",
			{ where: { schoolId } },
			SubjectFindManyArgsSchema
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
			"subject",
			{ where: { id } },
			SubjectFindUniqueOrThrowArgsSchema
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
			"subject",
			{
				where: { id },
				data: req.body,
			},
			SubjectUpdateArgsSchema
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
			"subject",
			{
				where: { id },
			},
			SubjectDeleteArgsSchema
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

export const path = "/subjects";
