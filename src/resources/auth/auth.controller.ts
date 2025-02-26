import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { User } from "@prisma/client";

import { ApiPost } from "@decorators/index";

import { LoginDto } from "./dto/login.dto";

import { TokensEntity } from "./entities/tokens.entity";

import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user/current-user.decorator";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Logs a user in
	 */
	@Post("login")
	@ApiPost({
		type: TokensEntity,
		successResponse: "OK",
		errorResponses: { CONFLICT: false },
	})
	@ApiBody({
		type: LoginDto,
	})
	@UseGuards(LocalAuthGuard)
	login(@CurrentUser() currentUser: User) {
		return this.authService.login(currentUser);
	}

	@Post("test")
	@ApiPost({
		type: TokensEntity,
		successResponse: "OK",
		errorResponses: { CONFLICT: false },
	})
	@ApiBearerAuth("Access Token")
	@UseGuards(AccessTokenGuard)
	test() {}

	/**
	 * Refreshes a user's access token
	 */
	@Post("refresh")
	@ApiPost({
		type: TokensEntity,
		successResponse: "OK",
		errorResponses: { CONFLICT: false },
	})
	@UseGuards(RefreshTokenGuard)
	refresh() {}
}
