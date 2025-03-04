import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { RequestWithSession } from "./request-with-session";

function getCurrentSessionByContext(context: ExecutionContext) {
	const request = context.switchToHttp().getRequest<RequestWithSession>();

	return request.session;
}

export const CurrentSession = createParamDecorator(
	(_, context: ExecutionContext) => getCurrentSessionByContext(context)
);
