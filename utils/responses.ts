import type { Response } from "express";
import type { Message } from "./messages";

// type ResponseData = Record<string, any> | string | null;

export function sendSuccess(res: Response, message: Message, data: any = null) {
	const responseData: Message & {
		data?: any;
	} = {
		...message,
	};

	if (data) {
		responseData["data"] = data;
	}

	res.status(message.statusCode).json(responseData);
}

export function sendError(res: Response, message: Message, error: any = null) {
	const responseData: Message & {
		error?: any;
	} = {
		...message,
	};

	if (error) {
		responseData["error"] = error;
	}

	res.status(message.statusCode).json(responseData);
}
