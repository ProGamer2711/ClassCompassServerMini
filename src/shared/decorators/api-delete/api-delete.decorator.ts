import { applyDecorators } from "@nestjs/common";

import { ApiResponsesOptions } from "@decorators/api-responses/api-responses-options.types";
import { ApiResponses } from "@decorators/api-responses/api-responses.decorator";

export function ApiDelete({
	type,
	successResponse,
	errorResponses,
}: ApiResponsesOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: successResponse ?? "OK",
		errorResponses: {
			CONFLICT: false,
			...errorResponses,
		},
	});

	return applyDecorators(ApiResponsesDecorator);
}
