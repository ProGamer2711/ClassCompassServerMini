import { Router } from "express";
import moment from "moment-timezone";

import {
	createLesson,
	deleteLesson,
	getLessons,
	updateLesson,
} from "../helpers/lessons";
import * as serverResponses from "../utils/responses";
import { messages } from "../types/messages";
// import type { Lesson } from "@prisma/client";

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

		const result = await createLesson(req.body);

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

router.get("", async (_, res) => {
	try {
		const result = await getLessons();

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

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await updateLesson(
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

		const result = await deleteLesson({
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

export const path = "/lessons";
