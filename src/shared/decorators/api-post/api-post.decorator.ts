import { applyDecorators, HttpStatus } from "@nestjs/common";

import { ApiResponsesOptions } from "@decorators/api-responses/api-responses-options.types";
import { ApiResponses } from "@decorators/api-responses/api-responses.decorator";

export function ApiPost({
	type,
	successResponse,
	errorResponses,
}: ApiResponsesOptions) {
	return applyDecorators(
		ApiResponses({
			type,
			successResponse: successResponse ?? HttpStatus.CREATED,
			errorResponses,
		})
	);
}
