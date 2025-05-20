import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Session, User } from "@prisma/client";
import { compare } from "bcryptjs";

import { SessionsService } from "@resources/sessions/sessions.service";
import { UsersService } from "@resources/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly sessionsService: SessionsService
	) {}

	async login(user: User) {
		return this.sessionsService.authenticate(user.id);
	}

	async refresh(session: Session) {
		return this.sessionsService.refresh(session);
	}

	async logout(session: Session) {
		this.sessionsService.revoke(session.id);
	}

	async verifyUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);

		const authenticated = await compare(password, user.password);

		if (!authenticated) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return user;
	}
}
