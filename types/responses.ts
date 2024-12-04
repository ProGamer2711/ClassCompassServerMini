import type { Message } from "./messages";

// Conditional types for success and error responses
type SuccessResponse<T> = Message & { success: true; data: T };

// TODO: provide better typing for error
type ErrorResponse = Message & { success: false; error: any };

export type Response<T> = SuccessResponse<T> | ErrorResponse;
