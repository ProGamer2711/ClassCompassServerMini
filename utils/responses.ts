import type { Response } from "express";
import type { Message } from "../types/messages";
import type { Response as ResponseType } from "../types/responses";

export function sendSuccess<T>(res: Response, message: Message, data?: T) {
	const responseData: ResponseType<T> = {
		...message,
		data: data ?? null,
	};

	res.status(message.statusCode).json(responseData);
}

export function sendError(res: Response, message: Message, error?: any) {
	const responseData: ResponseType<null> = {
		...message,
		error: error ?? null,
	};

	res.status(message.statusCode).json(responseData);
}
