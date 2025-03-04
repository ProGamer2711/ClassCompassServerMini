import { forwardRef, Module } from "@nestjs/common";

import { PrismaModule } from "@prisma/prisma.module";

import { SessionCleanupService } from "./session-cleanup.service";
import { SessionsService } from "./sessions.service";
import { AccessTokenModule } from "../access-tokens/access-token.module";
import { RefreshTokenModule } from "../refresh-tokens/refresh-token.module";

@Module({
	providers: [SessionsService, SessionCleanupService],
	imports: [
		PrismaModule,
		AccessTokenModule,
		forwardRef(() => RefreshTokenModule),
	],
	exports: [SessionsService],
})
export class SessionsModule {}
