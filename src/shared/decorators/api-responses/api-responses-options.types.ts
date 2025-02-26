export type ErrorType = "BAD_REQUEST" | "NOT_FOUND" | "CONFLICT";
type ResponseType = "CREATED" | "OK";

export class ApiResponsesOptions {
	type: any;
	successResponse?: ResponseType;
	errorResponses?: Partial<Record<ErrorType, boolean>>;
}
