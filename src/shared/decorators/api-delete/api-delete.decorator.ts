import { applyDecorators } from "@nestjs/common";
import { ApiMethodOptions } from "@decorators/api-responses/api-responses-options.interface";
import { ApiResponses } from "@decorators/api-responses/api-responses.decorator";

export function ApiDelete({ type, errorResponses }: ApiMethodOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: "OK",
		errorResponses: {
			CONFLICT: false,
			...errorResponses,
		},
	});

	return applyDecorators(ApiResponsesDecorator);
}
