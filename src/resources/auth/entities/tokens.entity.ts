import { ApiSchema } from "@nestjs/swagger";

@ApiSchema({
	description: "A object containing the access and refresh tokens for a user",
})
export class TokensEntity {
	constructor(partial: Partial<TokensEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The jwt access token
	 */
	accessToken: string;

	/**
	 * The jwt refresh token
	 */
	refreshToken: string;
}
