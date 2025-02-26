import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "@resources/users/users.module";

import { AccessTokenModule } from "./access-token.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RefreshTokenModule } from "./refresh-token.module";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, AccessTokenStrategy],
	imports: [
		UsersModule,
		PassportModule,
		AccessTokenModule,
		RefreshTokenModule,
	],
})
export class AuthModule {}
