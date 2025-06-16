import {
	applyDecorators,
	BadRequestException,
	ConflictException,
	HttpStatus,
	NotFoundException,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiResponse,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
} from "@nestjs/swagger";

import { ApiResponsesOptions } from "./api-responses-options.types";

// TODO: Maybe use an object for the success response to allow for easier addition of more success responses
export function ApiResponses({
	type,
	successResponse = HttpStatus.OK,
	errorResponses = [
		HttpStatus.BAD_REQUEST,
		HttpStatus.NOT_FOUND,
		HttpStatus.CONFLICT,
		HttpStatus.UNAUTHORIZED,
		HttpStatus.FORBIDDEN,
	],
}: ApiResponsesOptions) {
	const ResponseDecorator = ApiResponse({
		status: successResponse,
		type,
	});

	// add all the errors in an array and spread it in applyDecorators
	const errorDecorators = errorResponses.map(errorResponse => {
		switch (errorResponse) {
			case HttpStatus.BAD_REQUEST:
				return ApiBadRequestResponse({
					description: "Invalid data was provided.",
					example: new BadRequestException("Message").getResponse(),
				});

			case HttpStatus.NOT_FOUND:
				return ApiNotFoundResponse({
					description: "A resource was not found.",
					example: new NotFoundException("Message").getResponse(),
				});

			case HttpStatus.CONFLICT:
				return ApiConflictResponse({
					description: "A unique constraint violation occurred.",
					example: new ConflictException("Message").getResponse(),
				});

			case HttpStatus.UNAUTHORIZED:
				return ApiUnauthorizedResponse({
					description: "Authentication credentials were missing or invalid.",
					example: { statusCode: 401, message: "Unauthorized" },
				});

			case HttpStatus.FORBIDDEN:
				return ApiForbiddenResponse({
					description: "You do not have permission to access this resource.",
					example: { statusCode: 403, message: "Forbidden" },
				});

			default:
				throw new Error(`Unsupported error type: ${errorResponse}`);
		}
	});

	return applyDecorators(ResponseDecorator, ...errorDecorators);
}
