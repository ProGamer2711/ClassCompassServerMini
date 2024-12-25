import { applyDecorators, Post } from "@nestjs/common";
import { ApiMethodOptions } from "src/api-responses/api-responses-options.interface";
import { ApiResponses } from "src/api-responses/api-responses.decorator";

export function ApiPost({ type, path, errorResponses }: ApiMethodOptions) {
	const ApiResponsesDecorator = ApiResponses({
		type,
		successResponse: "CREATED",
		errorResponses,
	});

	return applyDecorators(Post(path), ApiResponsesDecorator);
}
