import { applyDecorators } from "@nestjs/common";

import { ApiMethodOptions } from "@decorators/api-responses/api-responses-options.types";
import { ApiResponses } from "@decorators/api-responses/api-responses.decorator";

export function ApiPost({ type, errorResponses }: ApiMethodOptions) {
	return applyDecorators(
		ApiResponses({
			type,
			successResponse: "CREATED",
			errorResponses,
		})
	);
}
