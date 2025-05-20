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
			default:
				throw new Error(`Unsupported error type: ${errorResponse}`);
		}
	});

	return applyDecorators(ResponseDecorator, ...errorDecorators);
}
