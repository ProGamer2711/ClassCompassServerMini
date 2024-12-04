export type MessageKeys =
	| "OK"
	| "CREATED"
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "INTERNAL_SERVER_ERROR";

enum StatusCode {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}

export interface Message {
	statusCode: StatusCode;
	message: string;
}

export const messages: Readonly<Record<MessageKeys, Message>> = {
	OK: {
		statusCode: StatusCode.OK,
		message: "Успешно изпълнено",
	},
	CREATED: {
		statusCode: StatusCode.CREATED,
		message: "Ресурсът беше създаден успешно",
	},
	BAD_REQUEST: {
		statusCode: StatusCode.BAD_REQUEST,
		message: "Грешка в заявката",
	},
	UNAUTHORIZED: {
		statusCode: StatusCode.UNAUTHORIZED,
		message: "Неоторизиран достъп",
	},
	FORBIDDEN: {
		statusCode: StatusCode.FORBIDDEN,
		message: "Забранен достъп",
	},
	NOT_FOUND: {
		statusCode: StatusCode.NOT_FOUND,
		message: "Ресурсът не беше намерен",
	},
	INTERNAL_SERVER_ERROR: {
		statusCode: StatusCode.INTERNAL_SERVER_ERROR,
		message: "Вътрешна грешка на сървъра",
	},
};
