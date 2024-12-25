import { applyDecorators, Patch } from "@nestjs/common";
import { ApiMethodOptions } from "src/api-responses/api-responses-options.interface";
import { ApiResponses } from "src/api-responses/api-responses.decorator";

export function ApiPatch({ type, path, errorResponses }: ApiMethodOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: "OK",
		errorResponses,
	});

	return applyDecorators(Patch(path), ApiResponsesDecorator);
}
