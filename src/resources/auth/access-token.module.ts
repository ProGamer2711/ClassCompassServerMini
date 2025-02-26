import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>(
					"JWT_ACCESS_TOKEN_SECRET"
				),
				signOptions: {
					expiresIn: `${configService.getOrThrow<number>(
						"JWT_ACCESS_TOKEN_EXPIRATION_SECONDS"
					)}s`,
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [
		{
			provide: "JWT_ACCESS_TOKEN_SERVICE",
			useExisting: JwtService,
		},
	],
	exports: ["JWT_ACCESS_TOKEN_SERVICE"],
})
export class AccessTokenModule {}
