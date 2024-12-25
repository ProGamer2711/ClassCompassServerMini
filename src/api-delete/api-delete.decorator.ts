import { applyDecorators, Delete } from "@nestjs/common";
import { ApiMethodOptions } from "src/api-responses/api-responses-options.interface";
import { ApiResponses } from "src/api-responses/api-responses.decorator";

export function ApiDelete({ type, path, errorResponses }: ApiMethodOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: "OK",
		errorResponses: {
			CONFLICT: false,
			...errorResponses,
		},
	});

	return applyDecorators(Delete(path), ApiResponsesDecorator);
}
