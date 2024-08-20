// Define an enum for HTTP status codes
enum StatusCode {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}

// Define an enum for message keys
enum MessageKey {
	OK = "OK",
	CREATED = "CREATED",
	BAD_REQUEST = "BAD_REQUEST",
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	NOT_FOUND = "NOT_FOUND",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

// Update the Message interface to use the StatusCode enum
export interface Message {
	statusCode: StatusCode;
	message: string;
	success: boolean;
}

// Update the messages object to use the MessageKey enum
export const messages: Record<MessageKey, Message> = {
	[MessageKey.OK]: {
		statusCode: StatusCode.OK,
		message: "Успешно изпълнено",
		success: true,
	},
	[MessageKey.CREATED]: {
		statusCode: StatusCode.CREATED,
		message: "Ресурсът беше създаден успешно",
		success: true,
	},
	[MessageKey.BAD_REQUEST]: {
		statusCode: StatusCode.BAD_REQUEST,
		message: "Грешка в заявката",
		success: false,
	},
	[MessageKey.UNAUTHORIZED]: {
		statusCode: StatusCode.UNAUTHORIZED,
		message: "Неоторизиран достъп",
		success: false,
	},
	[MessageKey.FORBIDDEN]: {
		statusCode: StatusCode.FORBIDDEN,
		message: "Забранен достъп",
		success: false,
	},
	[MessageKey.NOT_FOUND]: {
		statusCode: StatusCode.NOT_FOUND,
		message: "Ресурсът не беше намерен",
		success: false,
	},
	[MessageKey.INTERNAL_SERVER_ERROR]: {
		statusCode: StatusCode.INTERNAL_SERVER_ERROR,
		message: "Вътрешна грешка на сървъра",
		success: false,
	},
};
