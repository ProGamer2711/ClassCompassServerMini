import { Router } from "express";
import moment from "moment-timezone";

import * as CRUD from "../utils/prisma";
import * as serverResponses from "../utils/responses";
import { messages } from "../types/messages";
import {
	LessonCreateArgsSchema,
	LessonDeleteArgsSchema,
	LessonFindUniqueOrThrowArgsSchema,
	LessonUpdateArgsSchema,
} from "../prisma/generated/zod";

export const router = Router();

router.post("", async (req, res) => {
	try {
		req.body.startTime = moment
			.tz("2000-01-01", "Europe/Sofia")
			.add(req.body.startTime, "minutes")
			.toDate();

		req.body.endTime = moment
			.tz("2000-01-01", "Europe/Sofia")
			.add(req.body.endTime, "minutes")
			.toDate();

		const result = await CRUD.create(
			"lesson",
			{ data: req.body },
			LessonCreateArgsSchema
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

// TODO: Make a separate getter for the lessons based on another parent entity
router.get("", async (_, res) => {
	try {
		const result = await CRUD.findMany("lesson");

		if ("error" in result) {
			return serverResponses.sendError(
				res,
				messages.BAD_REQUEST,
				result.error
			);
		}

		// // ? Should this be here or in the frontend
		// // TODO: check if this is the best way to do this
		// interface ParsedLesson extends Omit<Lesson, "startTime" | "endTime"> {
		// 	startTime: string;
		// 	endTime: string;
		// }

		// let parsedResult: ParsedLesson[] = [];

		// result.forEach(lesson => {
		// 	parsedResult.push({
		// 		...lesson,
		// 		startTime: moment
		// 			.tz(lesson.startTime, "Europe/Sofia")
		// 			.format("HH:mm"),
		// 		endTime: moment
		// 			.tz(lesson.endTime, "Europe/Sofia")
		// 			.format("HH:mm"),
		// 	});
		// });
		// // & End of the TODO

		// return serverResponses.sendSuccess(res, messages.OK, parsedResult);

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
			"lesson",
			{ where: { id } },
			LessonFindUniqueOrThrowArgsSchema
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
			"lesson",
			{
				where: { id },
				data: req.body,
			},
			LessonUpdateArgsSchema
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
			"lesson",
			{
				where: { id },
			},
			LessonDeleteArgsSchema
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

export const path = "/lessons";
