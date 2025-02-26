import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

import { UsersService } from "@resources/users/users.service";

import { TokenPayloadDto } from "./dto/token-payload.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		// private readonly configService: ConfigService,
		@Inject("JWT_ACCESS_TOKEN_SERVICE")
		private readonly jwtAccessTokenService: JwtService,
		@Inject("JWT_REFRESH_TOKEN_SERVICE")
		private readonly jwtRefreshTokenService: JwtService
	) {}

	async login(
		user: User
		// response: Response
	) {
		const payload = new TokenPayloadDto({ sub: user.id });

		const accessToken = this.jwtAccessTokenService.sign(payload);

		const refreshToken = this.jwtRefreshTokenService.sign(payload);

		return { accessToken, refreshToken };
	}

	async verifyUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);

		const authenticated = compare(password, user.password);

		if (!authenticated) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return user;
	}
}
