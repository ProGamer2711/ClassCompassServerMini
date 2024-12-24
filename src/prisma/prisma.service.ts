import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClientExtended } from "./custom-prisma-client";

@Injectable()
export class PrismaService
	extends PrismaClientExtended
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
