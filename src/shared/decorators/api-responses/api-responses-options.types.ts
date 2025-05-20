import { HttpStatus } from "@nestjs/common";
import { ErrorHttpStatusCode } from "@nestjs/common/utils/http-error-by-code.util";

export class ApiResponsesOptions {
	type: any;
	successResponse?: HttpStatus;
	errorResponses?: ErrorHttpStatusCode[];
}
