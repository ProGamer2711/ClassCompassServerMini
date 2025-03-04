import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

import { RefreshTokenPayload } from "../entities/refresh-token-payload.entity";

export type RefreshTokenPayloadInput = Pick<RefreshTokenPayload, "sessionId">;

export class RefreshTokenPayloadDto implements RefreshTokenPayloadInput {
	/**
	 * The session's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	sessionId: string;
}
