import type { Request, Response, NextFunction } from "express";
import type { Message } from "../types/messages";
import type { Response as ResponseType } from "../types/responses";

export const responseMiddleware = (
	_: Request,
	res: Response,
	next: NextFunction
) => {
	res.sendResponse = function <T>(message: Message, data: T) {
		if (message.statusCode < 400) {
			const responseData: ResponseType<T> = {
				...message,
				success: true,
				data,
			};
			res.status(message.statusCode).json(responseData);
		} else {
			const responseData: ResponseType<null> = {
				...message,
				success: false,
				error: data,
			};
			res.status(message.statusCode).json(responseData);
		}
	};

	next();
};
