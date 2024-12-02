import { Router } from "express";

import * as CRUD from "../utils/prisma";
import {
	SchoolFindUniqueOrThrowArgsSchema,
	SchoolCreateArgsSchema,
	SchoolDeleteArgsSchema,
	SchoolUpdateArgsSchema,
} from "../prisma/generated/zod";
import { messages } from "../types/messages";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await CRUD.create(
			"school",
			{ data: req.body },
			SchoolCreateArgsSchema
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

router.get("", async (_, res) => {
	try {
		const result = await CRUD.findMany("school");

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
			"school",
			{
				where: { id },
			},
			SchoolFindUniqueOrThrowArgsSchema
		);

		if (!result) {
			return res.sendResponse(messages.NOT_FOUND, {
				message: "School was not found",
			});
		}

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
			"school",
			{
				where: { id },
				data: req.body,
			},
			SchoolUpdateArgsSchema
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
			"school",
			{
				where: { id },
			},
			SchoolDeleteArgsSchema
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

export const path = "/schools";
