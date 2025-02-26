import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class TokenPayloadDto {
	constructor(partial: Partial<TokenPayloadDto>) {
		Object.assign(this, partial);
	}

	/**
	 * The user's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	sub: string;
}
