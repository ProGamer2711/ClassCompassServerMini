import type { Message } from "./messages";

// every response extends Message interface with "data" or "error" property
// must have one or the other
interface SuccessResponse<T> extends Message {
	data: T | null;
	error?: never;
}

interface ErrorResponse extends Message {
	data?: never;
	// TODO: provide better typing for error
	error: any;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;
