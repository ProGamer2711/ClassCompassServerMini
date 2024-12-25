import { applyDecorators, Get } from "@nestjs/common";
import { ApiMethodOptions } from "src/api-responses/api-responses-options.interface";
import { ApiResponses } from "src/api-responses/api-responses.decorator";

export function ApiGet({ type, path, errorResponses }: ApiMethodOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: "OK",
		errorResponses: {
			CONFLICT: false,
			...errorResponses,
		},
	});

	return applyDecorators(Get(path), ApiResponsesDecorator);
}
