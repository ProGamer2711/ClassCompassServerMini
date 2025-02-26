import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
	imports: [
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
	],
	exports: ["JWT_REFRESH_TOKEN_SERVICE"],
})
export class RefreshTokenModule {}
