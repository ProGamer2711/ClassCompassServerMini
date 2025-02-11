import { PrismaClient } from "@prisma/client";
import { filterSoftDeleted, softDelete } from "./prisma.extension";

export function customPrismaClient(prismaClient: PrismaClient) {
	return prismaClient.$extends(softDelete).$extends(filterSoftDeleted);
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

export class PrismaClientExtended extends PrismaClient {
	customPrismaClient: CustomPrismaClient;

	// constructor() {
	// 	super({
	// 		log: ["query", "info", "warn", "error"],
	// 	});
	// }

	get client() {
		if (!this.customPrismaClient) {
			this.customPrismaClient = customPrismaClient(this);
		}

		return this.customPrismaClient;
	}
}
