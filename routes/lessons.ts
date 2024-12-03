import { Router } from "express";
import moment from "moment-timezone";

import * as CRUD from "../utils/prisma";
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
			return res.sendResponse(messages.BAD_REQUEST, result.error);
		}

		return res.sendResponse(messages.CREATED, result);
	} catch (error) {
		console.error(error);

		return res.sendResponse(messages.INTERNAL_SERVER_ERROR, error);
	}
});

// TODO: Make a separate getter for the lessons based on another parent entity
router.get("", async (_, res) => {
	try {
		const result = await CRUD.findMany("lesson");

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
			"lesson",
			{ where: { id } },
			LessonFindUniqueOrThrowArgsSchema
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
			"lesson",
			{
				where: { id },
				data: req.body,
			},
			LessonUpdateArgsSchema
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
			"lesson",
			{
				where: { id },
			},
			LessonDeleteArgsSchema
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

export const path = "/lessons";
