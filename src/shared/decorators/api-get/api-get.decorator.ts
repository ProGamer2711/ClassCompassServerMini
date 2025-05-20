import { applyDecorators, HttpStatus } from "@nestjs/common";

import { ApiResponsesOptions } from "@decorators/api-responses/api-responses-options.types";
import { ApiResponses } from "@decorators/api-responses/api-responses.decorator";

export function ApiGet({
	type,
	successResponse,
	errorResponses,
}: ApiResponsesOptions) {
	return applyDecorators(
		ApiResponses({
			type,
			successResponse: successResponse ?? HttpStatus.OK,
			errorResponses: errorResponses || [
				HttpStatus.BAD_REQUEST,
				HttpStatus.NOT_FOUND,
			],
		})
	);
}
