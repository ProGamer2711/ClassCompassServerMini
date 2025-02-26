import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { validateOrReject } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from "@resources/users/users.service";

import { TokenPayloadDto } from "../dto/token-payload.dto";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	"access-token"
) {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<string>(
				"JWT_ACCESS_TOKEN_SECRET"
			),
		});
	}

	async validate(payload: TokenPayloadDto) {
		const dto = new TokenPayloadDto(payload);

		await validateOrReject(dto).catch(() => {
			console.error("Invalid access token payload", payload);

			throw new UnauthorizedException("Invalid access token payload");
		});

		return this.usersService.findOne(payload.sub);
	}
}
