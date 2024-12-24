import {
	applyDecorators,
	BadRequestException,
	ConflictException,
	NotFoundException,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from "@nestjs/swagger";

type ResponseType = "ok" | "created";

interface ApiResponsesOptions {
	type: any;
	responseType?: ResponseType;
}

export function ApiResponses({
	type,
	responseType = "ok",
}: ApiResponsesOptions) {
	const ResponseDecorator =
		responseType === "ok" ? ApiOkResponse : ApiCreatedResponse;

	return applyDecorators(
		ResponseDecorator({ type }),
		ApiBadRequestResponse({
			description: "Invalid data was provided.",
			example: new BadRequestException("Message").getResponse(),
		}),
		ApiNotFoundResponse({
			description: "A resource was not found.",
			example: new NotFoundException("Message").getResponse(),
		}),
		ApiConflictResponse({
			description: "A unique constraint violation occurred.",
			example: new ConflictException("Message").getResponse(),
		})
	);
}
