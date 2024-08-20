import { Router } from "express";

import {
	createFloor,
	deleteFloor,
	getFloors,
	updateFloor,
} from "../helpers/floors";
import * as serverResponses from "../utils/responses";
import { messages } from "../utils/messages";

export const router = Router();

router.post("", async (req, res) => {
	try {
		const result = await createFloor(req.body);

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
		const result = await getFloors();

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

		const result = await updateFloor(
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

		const result = await deleteFloor({
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

export const path = "/floors";
