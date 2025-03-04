import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { SessionsModule } from "@resources/sessions/sessions.module";

import { RefreshTokenStrategy } from "./refresh-token.strategy";

@Module({
	imports: [
		forwardRef(() => SessionsModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>(
					"JWT_REFRESH_TOKEN_SECRET"
				),
				signOptions: {
					expiresIn: `${configService.getOrThrow<number>(
						"JWT_REFRESH_TOKEN_EXPIRATION_SECONDS"
					)}s`,
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [
		{
			provide: "JWT_REFRESH_TOKEN_SERVICE",
			useExisting: JwtService,
		},
		RefreshTokenStrategy,
	],
	exports: ["JWT_REFRESH_TOKEN_SERVICE"],
})
export class RefreshTokenModule {}
