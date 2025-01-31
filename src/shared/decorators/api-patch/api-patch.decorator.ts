import { applyDecorators } from "@nestjs/common";

import { ApiMethodOptions } from "@decorators/api-responses/api-responses-options.types";
import { ApiResponses } from "@decorators/api-responses/api-responses.decorator";

export function ApiPatch({ type, errorResponses }: ApiMethodOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: "OK",
		errorResponses,
	});

	return applyDecorators(ApiResponsesDecorator);
}
