import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

import { AccessTokenPayload } from "../entities/access-token-payload.entity";

export type AccessTokenPayloadInput = Pick<AccessTokenPayload, "userId">;

export class AccessTokenPayloadDto implements AccessTokenPayloadInput {
	/**
	 * The user's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	userId: string;
}
