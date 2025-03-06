import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { Session, User } from "@prisma/client";

import { CurrentUser } from "@resources/access-tokens/current-user.decorator";
import { CurrentSession } from "@resources/refresh-tokens/current-session.decorator";
import { TokensEntity } from "@resources/sessions/entities/tokens.entity";

import { LoginDto } from "./dto/login.dto";

import { ApiPost } from "@decorators";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Logs a user in
	 */
	// TODO: Fix the reponse types
	@HttpCode(HttpStatus.OK)
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

	/**
	 * Refreshes a user's access token
	 */
	@Post("refresh")
	@ApiPost({
		type: TokensEntity,
		successResponse: "OK",
		errorResponses: { CONFLICT: false },
	})
	@ApiBearerAuth("Refresh Token")
	@UseGuards(RefreshTokenGuard)
	refresh(@CurrentSession() currentSession: Session) {
		return this.authService.refresh(currentSession);
	}

	/**
	 * Logs a user out
	 */
	@Post("logout")
	@ApiPost({
		type: null,
		successResponse: "OK",
		errorResponses: { CONFLICT: false },
	})
	@ApiBearerAuth("Refresh Token")
	@UseGuards(RefreshTokenGuard)
	logout(@CurrentSession() currentSession: Session) {
		return this.authService.logout(currentSession);
	}
}
