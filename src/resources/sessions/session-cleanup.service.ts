import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class SessionCleanupService {
	constructor(private readonly prisma: PrismaService) {}

	@Cron(CronExpression.EVERY_HOUR)
	async deleteExpiredSessions() {
		await this.prisma.client.session.deleteMany({
			where: {
				expiresAt: {
					lte: new Date(),
				},
			},
		});
	}
}
