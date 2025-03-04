import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { SessionsModule } from "@resources/sessions/sessions.module";
import { UsersModule } from "@resources/users/users.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
	imports: [UsersModule, PassportModule, SessionsModule],
})
export class AuthModule {}
