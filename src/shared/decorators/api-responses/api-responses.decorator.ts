import {
	applyDecorators,
	BadRequestException,
	ConflictException,
	NotFoundException,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from "@nestjs/swagger";

import { ApiResponsesOptions, ErrorType } from "./api-responses-options.types";

// TODO: Maybe use an object for the success response to allow for easier addition of more success responses
export function ApiResponses({
	type,
	successResponse = "OK",
	errorResponses,
}: ApiResponsesOptions) {
	// If we have a create we use 201 status code instead of 200
	const ResponseDecorator =
		successResponse === "CREATED" ? ApiCreatedResponse : ApiOkResponse;

	const errorResponsesDefaults: Record<ErrorType, boolean> = {
		BAD_REQUEST: true,
		NOT_FOUND: true,
		CONFLICT: true,
	};

	// add all the errors in an array and spread it in applyDecorators
	const errorDecorators = Object.entries({
		...errorResponsesDefaults,
		...errorResponses,
	})
		.filter(([, isEnabled]) => isEnabled)
		.map(([error]) => {
			switch (error as ErrorType) {
				case "BAD_REQUEST":
					return ApiBadRequestResponse({
						description: "Invalid data was provided.",
						example: new BadRequestException(
							"Message"
						).getResponse(),
					});

				case "NOT_FOUND":
					return ApiNotFoundResponse({
						description: "A resource was not found.",
						example: new NotFoundException("Message").getResponse(),
					});

				case "CONFLICT":
					return ApiConflictResponse({
						description: "A unique constraint violation occurred.",
						example: new ConflictException("Message").getResponse(),
					});

				default:
					throw new Error(`Unsupported error type: ${error}`);
			}
		});

	return applyDecorators(ResponseDecorator({ type }), ...errorDecorators);
}
