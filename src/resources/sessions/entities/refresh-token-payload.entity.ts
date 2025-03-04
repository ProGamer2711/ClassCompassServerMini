export type RefreshTokenPayload = {
	sessionId: string;
	iat: number;
	exp: number;
};

export class RefreshTokenPayloadEntity implements RefreshTokenPayload {
	/**
	 * The session's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	sessionId: string;

	/**
	 * The time at which the token was issued
	 * (in seconds since the Unix epoch)
	 * @example 1740993313
	 */
	iat: number;

	/**
	 * The time at which the token will expire
	 * (in seconds since the Unix epoch)
	 * @example 1741598113
	 */
	exp: number;
}
